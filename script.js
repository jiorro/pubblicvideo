/**
 * Jiorro Video Manager - Script completo
 * - Lista manuale iniziale con i tuoi URL Cloudinary
 * - Render cards video, ricerca, conteggio viste
 * - Pannello admin con edit titolo, publish/unpublish, delete, reset
 * - Aggiunta manuale URL dal cloud via pannello admin
 * - Navigazione Home/Video/Admin
 *
 * Requisiti HTML (id):
 * homeSection, videoSection, adminSection,
 * lensBtn, backHome, videoContainer, searchVideos,
 * adminAnchorBtn, adminInputWrap, adminInput, adminSubmit,
 * adminBody, adminToVideo, adminToHome,
 * addManualBtn, addManualUrl, addManualTitle
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================
  // Configurazione
  // ==========================
  const STORAGE_KEY = 'jiorroVideos_secure_v1';
  const ADMIN_PASS = 'JIORR0CON$=LE';
  const OVERWRITE_ON_BOOT = true; // sovrascrive sempre localStorage con initialVideos all'avvio

  // ==========================
  // Lista video manuale (cloud) - GIÀ con i tuoi link
  // ==========================
  const initialVideos = [
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763224890/fx5teli1hhrydb8eemvw.mp4", title: "Video 1", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212600/f56bkcz1xj3afz2zxmp5.mp4", title: "Video 2", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212306/euxyg2hahvutkkghsukg.mp4", title: "Video 3", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212286/zdk4ybgjyfk8zmcouily.mp4", title: "Video 4", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212268/roeghtklpgzwb9nsq1md.mp4", title: "Video 5", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212254/bome1bxvkulbfbm6x0kq.mp4", title: "Video 6", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136665/ilohoc9j6kilzrrz3tk8.webm", title: "Video 7", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136626/casksoqxamgrimcvbfry.webm", title: "Video 8", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136597/oe7iwyf7jui9jeumvey1.webm", title: "Video 9", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136572/r0r4hgvcqtmeieangrj2.webm", title: "Video 10", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136530/prhm77yscr43mxeznmzf.webm", title: "Video 11", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763135381/dv3bmf0t6of82tqiby5z.webm", title: "Video 12", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763135360/dxa2nlg5s1oljfiruncd.webm", title: "Video 13", views: 0, published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763135306/zy8vbkdnlsygo6ohj0fe.webm", title: "Video 14", views: 0, published: true }
  ];

  // ==========================
  // Utils: storage e helpers
  // ==========================
  function getSaved() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function setSaved(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr || []));
  }
  function resetToInitial() {
    setSaved(initialVideos);
  }
  function safeText(str) {
    return (str || '').toString();
  }

  // ==========================
  // Inizializzazione: popola sempre con initialVideos
  // ==========================
  if (OVERWRITE_ON_BOOT) {
    resetToInitial();
  } else if (!getSaved().length) {
    resetToInitial();
  }

  // ==========================
  // Riferimenti DOM
  // ==========================
  const homeSection = document.getElementById('homeSection');
  const videoSection = document.getElementById('videoSection');
  const adminSection = document.getElementById('adminSection');

  const lensBtn = document.getElementById('lensBtn');
  const backHome = document.getElementById('backHome');

  const videoContainer = document.getElementById('videoContainer');
  const searchVideos = document.getElementById('searchVideos');

  const adminAnchorBtn = document.getElementById('adminAnchorBtn');
  const adminInputWrap = document.getElementById('adminInputWrap');
  const adminInput = document.getElementById('adminInput');
  const adminSubmit = document.getElementById('adminSubmit');

  const adminBody = document.getElementById('adminBody');
  const adminToVideo = document.getElementById('adminToVideo');
  const adminToHome = document.getElementById('adminToHome');

  const addManualBtn = document.getElementById('addManualBtn');
  const addManualUrl = document.getElementById('addManualUrl');
  const addManualTitle = document.getElementById('addManualTitle');

  // ==========================
  // Navigazione
  // ==========================
  function goHome() {
    homeSection?.classList.remove('hidden');
    videoSection?.classList.add('hidden');
    adminSection?.classList.add('hidden');
  }
  function goVideo() {
    homeSection?.classList.add('hidden');
    videoSection?.classList.remove('hidden');
    adminSection?.classList.add('hidden');
    renderAll();
  }
  function goAdmin() {
    homeSection?.classList.add('hidden');
    videoSection?.classList.add('hidden');
    adminSection?.classList.remove('hidden');
    renderAdminTable();
  }

  lensBtn?.addEventListener('click', goVideo);
  backHome?.addEventListener('click', goHome);
  adminToVideo?.addEventListener('click', goVideo);
  adminToHome?.addEventListener('click', goHome);

  // ==========================
  // Render: cards video
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

    // Conteggio viste: incrementa alla prima play
    let counted = false;
    v.addEventListener('play', () => {
      if (counted) return;
      counted = true;
      const list = getSaved().map(s => {
        if (s.url === item.url) s.views = (s.views || 0) + 1;
        return s;
      });
      setSaved(list);
      // Aggiorna badge card + tabella admin
      vw.textContent = '👁️ ' + ((list.find(s => s.url === item.url)?.views) || 0) + ' views';
      renderAdminTable();
    });

    const t = document.createElement('div');
    t.className = 'title';
    t.textContent = safeText(item.title || 'Video senza titolo');

    const vw = document.createElement('div');
    vw.className = 'views';
    vw.textContent = '👁️ ' + (item.views || 0) + ' views';

    card.appendChild(v);
    card.appendChild(t);
    card.appendChild(vw);
    return card;
  }

  function renderAll(query = '') {
    if (!videoContainer) return;
    videoContainer.innerHTML = '';

    const q = query.trim().toLowerCase();
    const list = getSaved()
      .filter(v => v.published !== false)
      .filter(v => !q || safeText(v.title).toLowerCase().includes(q) || safeText(v.url).toLowerCase().includes(q));

    if (!list.length) {
      const info = document.createElement('div');
      info.className = 'empty';
      info.textContent = q ? 'Nessun risultato per la ricerca.' : 'Nessun video pubblicato.';
      videoContainer.appendChild(info);
      return;
    }

    list.forEach(item => videoContainer.appendChild(createCard(item)));
  }

  searchVideos?.addEventListener('input', (e) => {
    renderAll(e.target.value || '');
  });

  // ==========================
  // Admin: unlock
  // ==========================
  adminAnchorBtn?.addEventListener('click', () => {
    const visible = adminInputWrap?.style.display === 'flex';
    adminInputWrap.style.display = visible ? 'none' : 'flex';
  });

  adminSubmit?.addEventListener('click', () => {
    if (adminInput?.value === ADMIN_PASS) {
      adminInput.value = '';
      goAdmin();
    } else {
      alert('Password errata');
    }
  });

  // ==========================
  // Admin: tabella gestione
  // ==========================
  function renderAdminTable() {
    if (!adminBody) return;
    adminBody.innerHTML = '';
    const list = getSaved();

    if (!list.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 6;
      td.textContent = 'Nessun video salvato.';
      tr.appendChild(td);
      adminBody.appendChild(tr);
      return;
    }

    list.forEach((item, idx) => {
      const tr = document.createElement('tr');

      // Preview
      const tdPrev = document.createElement('td');
      const prevV = document.createElement('video');
      prevV.src = item.url;
      prevV.controls = true;
      prevV.style.maxWidth = '180px';
      tdPrev.appendChild(prevV);

      // Titolo (editabile)
      const tdTitle = document.createElement('td');
      const titleInputEl = document.createElement('input');
      titleInputEl.className = 'input';
      titleInputEl.value = item.title || '';
      tdTitle.appendChild(titleInputEl);

      // URL (Apri + Copia)
      const tdUrl = document.createElement('td');
      const urlLink = document.createElement('a');
      urlLink.href = item.url;
      urlLink.target = '_blank';
      urlLink.textContent = 'Apri';
      const urlCopyBtn = document.createElement('button');
      urlCopyBtn.textContent = '🔗';
      urlCopyBtn.title = 'Copia URL';
      urlCopyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(item.url);
          urlCopyBtn.textContent = '✅';
          setTimeout(() => urlCopyBtn.textContent = '🔗', 900);
        } catch {
          alert('Copia fallita');
        }
      });
      tdUrl.appendChild(urlLink);
      tdUrl.appendChild(document.createTextNode(' '));
      tdUrl.appendChild(urlCopyBtn);

      // Views
      const tdViews = document.createElement('td');
      tdViews.textContent = item.views || 0;

      // Status
      const tdStatus = document.createElement('td');
      tdStatus.textContent = item.published === false ? 'Non pub' : 'Pub';

      // Azioni
      const tdActions = document.createElement('td');
      const btnSave = document.createElement('button'); btnSave.textContent = '💾'; btnSave.title = 'Salva titolo';
      const btnToggle = document.createElement('button'); btnToggle.textContent = item.published === false ? '⬆️ Pubblica' : '⬇️ Nascondi';
      const btnDelete = document.createElement('button'); btnDelete.textContent = '🗑️'; btnDelete.title = 'Elimina';
      const btnReset = document.createElement('button'); btnReset.textContent = '🔄'; btnReset.title = 'Reset lista';

      btnSave.addEventListener('click', () => {
        const arr = getSaved();
        if (!arr[idx]) return;
        arr[idx].title = titleInputEl.value.trim();
        setSaved(arr);
        renderAll(searchVideos?.value || '');
        renderAdminTable();
      });

      btnToggle.addEventListener('click', () => {
        const arr = getSaved();
        if (!arr[idx]) return;
        arr[idx].published = arr[idx].published === false ? true : false;
        setSaved(arr);
        renderAll(searchVideos?.value || '');
        renderAdminTable();
      });

      btnDelete.addEventListener('click', () => {
        if (!confirm('Confermi eliminazione?')) return;
        const arr = getSaved().filter((_, i) => i !== idx);
        setSaved(arr);
        renderAll(searchVideos?.value || '');
        renderAdminTable();
      });

      btnReset.addEventListener('click', () => {
        if (!confirm('Ripristinare la lista iniziale?')) return;
        resetToInitial();
        renderAll(searchVideos?.value || '');
        renderAdminTable();
      });

      tdActions.appendChild(btnSave);
      tdActions.appendChild(document.createTextNode(' '));
      tdActions.appendChild(btnToggle);
      tdActions.appendChild(document.createTextNode(' '));
      tdActions.appendChild(btnDelete);
      tdActions.appendChild(document.createTextNode(' '));
      tdActions.appendChild(btnReset);

      tr.appendChild(tdPrev);
      tr.appendChild(tdTitle);
      tr.appendChild(tdUrl);
      tr.appendChild(tdViews);
      tr.appendChild(tdStatus);
      tr.appendChild(tdActions);

      adminBody.appendChild(tr);
    });
  }

  // ==========================
  // Admin: aggiunta manuale URL dal cloud
  // ==========================
  addManualBtn?.addEventListener('click', () => {
    const url = (addManualUrl?.value || '').trim();
    const title = (addManualTitle?.value || '').trim();

    if (!url) { alert('Inserisci un URL del cloud.'); return; }
    if (!/^https?:\/\/res\.cloudinary\.com\/.+\/video\/upload\//.test(url)) {
      if (!confirm('URL non sembra Cloudinary video. Aggiungere comunque?')) return;
    }

    const arr = getSaved();
    arr.unshift({
      url,
      title: title || 'Video',
      views: 0,
      published: true
    });
    setSaved(arr);

    addManualUrl.value = '';
    addManualTitle.value = '';

    renderAll(searchVideos?.value || '');
    renderAdminTable();
  });

  // ==========================
  // Bootstrap UI
  // ==========================
  goHome();           // avvio su Home
  renderAll();        // render iniziale (se navighi a Video)
  renderAdminTable(); // prepara tabella admin
});
