document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'jiorroVideos_secure_v1';
  const ADMIN_PASS = 'JIORR0CON$=LE';

  // ==========================
  // LISTA VIDEO MANUALE (cloud)
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

  // Sovrascrive SEMPRE localStorage con la lista manuale
  function initSaved() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVideos));
  }
  initSaved();

  // Helpers
  function getSaved() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch(e){ return []; }
  }
  function setSaved(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr || []));
  }

  // ==========================
  // RENDER VIDEO CARDS
  // ==========================
  const videoContainer = document.getElementById('videoContainer');
  const adminBody = document.getElementById('adminBody');

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
    saved.forEach((item) => {
      const tr = document.createElement('tr');
      const tdTitle = document.createElement('td');
      tdTitle.textContent = item.title;
      const tdViews = document.createElement('td');
      tdViews.textContent = item.views;
      const tdStatus = document.createElement('td');
      tdStatus.textContent = item.published ? 'Pub' : 'Non pub';
      tr.appendChild(tdTitle);
      tr.appendChild(tdViews);
      tr.appendChild(tdStatus);
      adminBody.appendChild(tr);
    });
  }

  // Mostra subito i video
  renderAll();
  renderAdminTable();
});
