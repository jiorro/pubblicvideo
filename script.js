document.addEventListener('DOMContentLoaded', () => {
  /* ============= CONFIG ============= */
  const STORAGE_KEY = 'jiorroVideos_secure_v1';
  const ADMIN_PASS = 'JIORR0CON$=LE'; // case-sensitive
  const CLOUDINARY_CLOUD = 'dng8rjd6u';
  const UPLOAD_PRESET = 'jiorro_upload';
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/auto/upload`;
  const MAX_FILE_MB = 800;
  const UPLOAD_TIMEOUT_MS = 3 * 60 * 1000;

  /* ============= Helper storage & UI ============= */
  function getSaved(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch(e){ return []; }
  }
  function setSaved(arr){ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr || [])); }
  function showStatus(msg, type){
    const s = document.getElementById('statusEl');
    s.textContent = msg || '';
    s.className = 'status' + (type ? ' ' + type : '');
  }

  /* ============= Refs ============= */
  const lensBtn = document.getElementById('lensBtn');
  const homeSection = document.getElementById('homeSection');
  const videoSection = document.getElementById('videoSection');
  const adminSection = document.getElementById('adminSection');
  const backHome = document.getElementById('backHome');
  const videoContainer = document.getElementById('videoContainer');
  const searchVideos = document.getElementById('searchVideos');
  const openUploadBtn = document.getElementById('openUpload');
  const uploadModal = document.getElementById('uploadModal');
  const closeUploadBtn = document.getElementById('closeUpload');
  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('videoFile');
  const titleInput = document.getElementById('videoTitle');
  const overlaySrcInput = document.getElementById('overlaySrc');
  const uploadStatus = document.getElementById('uploadStatus');
  const uploadProgress = document.getElementById('uploadProgress');
  const adminAnchorBtn = document.getElementById('adminAnchorBtn');
  const adminInputWrap = document.getElementById('adminInputWrap');
  const adminInput = document.getElementById('adminInput');
  const adminSubmit = document.getElementById('adminSubmit');
  const adminBody = document.getElementById('adminBody');
  const adminToVideo = document.getElementById('adminToVideo');
  const adminToHome = document.getElementById('adminToHome');

  /* ============= NAV helpers ============= */
  function showHome(){
    homeSection.classList.remove('hidden');
    videoSection.classList.add('hidden');
    adminSection.classList.add('hidden');
    showStatus('');
  }
  function showVideo(){
    homeSection.classList.add('hidden');
    adminSection.classList.add('hidden');
    videoSection.classList.remove('hidden');
    renderAll();
  }
  function showAdmin(){
    homeSection.classList.add('hidden');
    videoSection.classList.add('hidden');
    adminSection.classList.remove('hidden');
    renderAdminTable();
  }

  lensBtn.addEventListener('click', showVideo);
  backHome && backHome.addEventListener('click', showHome);

  /* ============= Render pubblico ============= */
  function createCard(item){
    const card = document.createElement('div'); card.className = 'card video-card';
    const v = document.createElement('video');
    v.src = item.url;
    v.controls = true;
    v.preload = 'metadata';
    v.setAttribute('controlsList','nodownload');
    v.addEventListener('contextmenu', e => e.preventDefault());
    if (item.overlaySrc) v.dataset.overlaySrc = item.overlaySrc;

    const t = document.createElement('div'); t.className='title'; t.textContent = item.title || 'Video senza titolo';
    const vw = document.createElement('div'); vw.className='views'; vw.textContent = '👁️ ' + (item.views || 0) + ' views';

    let counted = false;
    v.addEventListener('play', () => {
      if (counted) return; counted = true;
      const saved = getSaved().map(s => { if (s.url === item.url) s.views = (s.views || 0) + 1; return s; });
      setSaved(saved);
      const updated = saved.find(s => s.url === item.url);
      vw.textContent = '👁️ ' + ((updated && updated.views) || 0) + ' views';
      renderAdminTable();
    });

    card.appendChild(v); card.appendChild(t); card.appendChild(vw);
    return card;
  }

  function renderAll(){
    videoContainer.innerHTML = '';
    const saved = getSaved().filter(v => v.published !== false);
    if (!saved.length){
      const info = document.createElement('div'); info.style.color = 'var(--muted)'; info.textContent = 'Nessun video pubblicato.'; videoContainer.appendChild(info);
    } else {
      saved.forEach(i => videoContainer.appendChild(createCard(i)));
    }
  }

  /* ============= Upload ============= */
  function openUpload(){ uploadModal.classList.add('show'); }
  function closeUpload(){ uploadModal.classList.remove('show'); fileInput.value=''; titleInput.value=''; overlaySrcInput.value=''; uploadStatus.textContent=''; uploadProgress.style.width='0%'; }
  openUploadBtn && openUploadBtn.addEventListener('click', openUpload);
  closeUploadBtn && closeUploadBtn.addEventListener('click', closeUpload);

  async function handleUpload(){
    const file = fileInput.files && fileInput.files[0];
    const title = (titleInput.value || '').trim();
    const overlaySrc = (overlaySrcInput.value || '').trim() || null;
    if(!file){ uploadStatus.textContent = '❌ Seleziona un file video.'; return; }
    uploadStatus.textContent = '⏳ Caricamento...';
    uploadProgress.style.width = '50%';
    // simulazione upload
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      const saved = getSaved();
      saved.unshift({ url, title, overlaySrc, views: 0, published:true });
      setSaved(saved);
      renderAll();
      renderAdminTable();
      uploadStatus.textContent = '✅ Caricato';
      uploadProgress.style.width = '100%';
      setTimeout(closeUpload, 1000);
    }, 1500);
  }
  uploadBtn && uploadBtn.addEventListener('click', handleUpload);

  /* ============= Admin unlock ============= */
  adminAnchorBtn.addEventListener('click', () => {
    adminInputWrap.style.display = adminInputWrap.style.display==='flex' ? 'none' : 'flex';
  });
  function tryUnlockAdmin(){
    const v = (adminInput.value || '').trim();
    if(v === ADMIN_PASS){ adminInput.value=''; showAdmin(); }
    else { adminInput.value=''; }
  }
  adminSubmit.addEventListener('click', tryUnlockAdmin);

  /* ============= Admin table ============= */
  function renderAdminTable(){
    adminBody.innerHTML = '';
    const saved = getSaved();
    if(!saved.length){
      const tr = document.createElement('tr'); const td = document.createElement('td'); td.colSpan=5; td.textContent='Nessun video salvato.'; tr.appendChild(td); adminBody.appendChild(tr); return;
    }
    saved.forEach((item, idx) => {
      const tr = document.createElement('tr');
      const tdPrev = document.createElement('td'); const prevV = document.createElement('video'); prevV.src=item.url; prevV.controls=true; prevV.style.maxWidth='160px'; tdPrev.appendChild(prevV);
      const tdTitle = document.createElement('td'); const titleInput=document.createElement('input'); titleInput.className='input'; titleInput.value=item.title||''; tdTitle.appendChild(titleInput);
      const tdViews = document.createElement('td'); tdViews.textContent=(item.views||0)+' views';
      const tdStatus = document.createElement('td'); tdStatus.textContent=item.published===false?'Non pubblicato':'Pubblicato';
      const tdActions = document.createElement('td'); const btnDel=document.createElement('button'); btnDel.className='btn danger'; btnDel.textContent='🗑️'; tdActions.appendChild(btnDel);
      tr.append(tdPrev,tdTitle,tdViews,tdStatus,tdActions); adminBody.appendChild(tr);
      btnDel.addEventListener('click', () => { const s=getSaved(); s.splice(idx,1); setSaved(s); renderAdminTable(); renderAll(); });
    });
  }

  adminToVideo && adminToVideo.addEventListener('click', showVideo);
  adminToHome && adminToHome.addEventListener('click', showHome);

  /* ============= Ricerca client ============= */
  searchVideos && searchVideos.addEventListener('input', ()
