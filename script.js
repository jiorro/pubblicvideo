document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'jiorroVideos_secure_v1';
  const ADMIN_PASS = 'JIORR0CON$=LE';
  const MAX_FILE_MB = 800;

  // Helpers
  function getSaved() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch(e){ return []; }
  }
  function setSaved(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr || []));
  }

  // Riferimenti DOM
  const homeSection = document.getElementById('homeSection');
  const videoSection = document.getElementById('videoSection');
  const adminSection = document.getElementById('adminSection');
  const lensBtn = document.getElementById('lensBtn');
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

  // ==========================
  // NAVIGAZIONE
  // ==========================
  lensBtn.addEventListener('click', () => {
    homeSection.classList.add('hidden');
    videoSection.classList.remove('hidden');
    adminSection.classList.add('hidden');
    renderAll();
  });
  backHome.addEventListener('click', () => {
    homeSection.classList.remove('hidden');
    videoSection.classList.add('hidden');
    adminSection.classList.add('hidden');
  });

  // ==========================
  // RENDER VIDEO CARDS
  // ==========================
  function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';

    const v = document.createElement('video');
    v.src = item.url;
    v.controls = true;
    v.preload = 'metadata';
    v.setAttribute('controlsList', 'nodownload');
    v.addEventListener('contextmenu', e => e.preventDefault());

    const t = document.createElement('div');
    t.className = 'title';
    t.textContent = item.title || 'Video senza titolo';

    const vw = document.createElement('div');
    vw.className = 'views';
    vw.textContent = '👁️ ' + (item.views || 0) + ' views';

    // Conteggio views
    let counted = false;
    v.addEventListener('play', () => {
      if (counted) return;
      counted = true;
      const saved = getSaved().map(s => {
        if (s.url === item.url) s.views = (s.views || 0) + 1;
        return s;
      });
      setSaved(saved);
      vw.textContent = '👁️ ' + ((saved.find(s => s.url === item.url)?.views) || 0) + ' views';
      renderAdminTable();
    });

    card.appendChild(v);
    card.appendChild(t);
    card.appendChild(vw);
    return card;
  }

  function renderAll() {
    videoContainer.innerHTML = '';
    const saved = getSaved().filter(v => v.published !== false);
    if (!saved.length) {
      const info = document.createElement('div');
      info.style.color = 'var(--muted)';
      info.textContent = 'Nessun video pubblicato.';
      videoContainer.appendChild(info);
    } else {
      saved.forEach(i => videoContainer.appendChild(createCard(i)));
    }
  }

  // ==========================
  // UPLOAD MODAL + CLOUDINARY
  // ==========================
  openUploadBtn.addEventListener('click', () => uploadModal.classList.add('show'));
  closeUploadBtn.addEventListener('click', () => uploadModal.classList.remove('show'));

  async function handleUpload() {
    const file = fileInput.files[0];
    const title = titleInput.value.trim();
    const overlaySrc = overlaySrcInput.value.trim() || null;

    if (!file) { uploadStatus.textContent = '❌ Seleziona un file video.'; return; }
    if (!file.type.startsWith('video/')) { uploadStatus.textContent = '❌ Non è un video.'; return; }
    const sizeMb = (file.size / (1024*1024)).toFixed(1);
    if (sizeMb > MAX_FILE_MB) { uploadStatus.textContent = `❌ File troppo grande (${sizeMb} MB).`; return; }

    uploadStatus.textContent = '⏳ Caricamento su Cloudinary...';
    uploadProgress.style.width = '0%';

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jiorro_upload"); // tuo preset
    const cloudName = "dng8rjd6u"; // tuo cloud name

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.secure_url) {
        const videoUrl = data.secure_url;

        const saved = getSaved();
        saved.unshift({
          url: videoUrl,
          title,
          overlaySrc,
          views: 0,
          published: true
        });
        setSaved(saved);

        uploadStatus.textContent = '✅ Caricato su Cloudinary';
        uploadProgress.style.width = '100%';

        renderAll();
        renderAdminTable();
        setTimeout(() => uploadModal.classList.remove('show'), 800);
      } else {
        uploadStatus.textContent = '❌ Errore: nessun URL restituito';
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      uploadStatus.textContent = '❌ Errore durante l’upload';
    }
  }

  uploadBtn.addEventListener('click', handleUpload);

  // ==========================
  // ADMIN UNLOCK
  // ==========================
  adminAnchorBtn.addEventListener('click', () => {
    adminInputWrap.style.display = adminInputWrap.style.display === 'flex' ? 'none' : 'flex';
  });
  adminSubmit.addEventListener('click', () => {
    if (adminInput.value === ADMIN_PASS) {
      homeSection.classList.add('hidden');
      videoSection.classList.add('hidden');
      adminSection.classList.remove('hidden');
      renderAdminTable();
    } else {
      alert("Password errata");
    }
  });

  // ==========================
  // ADMIN TABLE
  // ==========================
  function renderAdminTable() {
    adminBody.innerHTML = '';
    const saved = getSaved();
    if (!saved.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 5;
      td.textContent = 'Nessun video salvato.';
      tr.appendChild(td);
      adminBody.appendChild(tr);
      return;
    }
    saved.forEach((item, idx) => {
      const tr = document.createElement('tr');

      const tdPrev = document.createElement('td');
      const prevV = document.createElement('video');
      prevV.src = item.url; prevV.controls = true; prevV.style.maxWidth='180px';
      tdPrev.appendChild(prevV);

      const tdTitle = document.createElement('td');
      const titleInputEl = document.createElement('input');
      titleInputEl.className='input'; titleInputEl.value=item.title||'';
      tdTitle.appendChild(titleInputEl);

      const tdViews = document.createElement('td');
      tdViews.textContent = item.views||0;

      const tdStatus = document.createElement('td');
      tdStatus.textContent = item.published===false?'Non pub':'Pub';

      const tdActions = document.createElement('td');
      const btnSave=document.createElement('button');btnSave.textContent='💾';
      const btnReset=document.createElement('button');btnReset.textContent='🔄';
      const btnToggle=document.createElement('button');btnToggle.textContent=item.published===false?'📢':'🙈
