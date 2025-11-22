document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'jiorroVideos_secure_v1';
  const ADMIN_PASS = 'JIORR0CON$=LE';

  const homeSection = document.getElementById('homeSection');
  const videoSection = document.getElementById('videoSection');
  const adminSection = document.getElementById('adminSection');
  const lensBtn = document.getElementById('lensBtn');
  const backHome = document.getElementById('backHome');
  const adminAnchorBtn = document.getElementById('adminAnchorBtn');
  const adminInputWrap = document.getElementById('adminInputWrap');
  const adminInput = document.getElementById('adminInput');
  const adminSubmit = document.getElementById('adminSubmit');
  const adminBody = document.getElementById('adminBody');
  const searchVideos = document.getElementById('searchVideos');
  const addManualBtn = document.getElementById('addManualBtn');
  const addManualUrl = document.getElementById('addManualUrl');
  const addManualTitle = document.getElementById('addManualTitle');
  const videoContainer = document.getElementById('videoContainer');

  // ==========================
  // Stato locale
  // ==========================
  const getSaved = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const saveAll = (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

  // ==========================
  // Lista iniziale (Cloudinary)
  // ==========================
  const initialVideos = [
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763224890/fx5teli1hhrydb8eemvw.mp4", title: "Video 1", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212600/f56bkcz1xj3afz2zxmp5.mp4", title: "Video 2", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212306/euxyg2hahvutkkghsukg.mp4", title: "Video 3", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212286/zdk4ybgjyfk8zmcouily.mp4", title: "Video 4", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212268/roeghtklpgzwb9nsq1md.mp4", title: "Video 5", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763212254/bome1bxvkulbfbm6x0kq.mp4", title: "Video 6", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136665/ilohoc9j6kilzrrz3tk8.webm", title: "Video 7", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136626/casksoqxamgrimcvbfry.webm", title: "Video 8", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136597/oe7iwyf7jui9jeumvey1.webm", title: "Video 9", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136572/r0r4hgvcqtmeieangrj2.webm", title: "Video 10", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763136530/prhm77yscr43mxeznmzf.webm", title: "Video 11", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763135381/dv3bmf0t6of82tqiby5z.webm", title: "Video 12", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763135360/dxa2nlg5s1oljfiruncd.webm", title: "Video 13", published: true },
    { url: "https://res.cloudinary.com/dng8rjd6u/video/upload/v1763135306/zy8vbkdnlsygo6ohj0fe.webm", title: "Video 14", published: true }
  ];

  if (!localStorage.getItem(STORAGE_KEY)) {
    saveAll(initialVideos);
  }

  // ==========================
  // Navigazione
  // ==========================
  function goHome() {
    homeSection.classList.remove('hidden');
    videoSection.classList.add('hidden');
    adminSection.classList.add('hidden');
  }

  function goVideo() {
    homeSection.classList.add('hidden');
    videoSection.classList.remove('hidden');
    adminSection.classList.add('hidden');
  }

  function goAdmin() {
    homeSection.classList.add('hidden');
    videoSection.classList.add('hidden');
    adminSection.classList.remove('hidden');
  }

  lensBtn.addEventListener('click', () => {
    console.log("Click lente"); // debug
    goVideo();
    renderAll();
  });
  backHome.addEventListener('click', goHome);

  // ==========================
  // Admin login
  // ==========================
  adminAnchorBtn.addEventListener('click', () => {
    adminInputWrap.style.display = adminInputWrap.style.display === 'flex' ? 'none' : 'flex';
  });

  adminSubmit.addEventListener('click', () => {
    if (adminInput.value === ADMIN_PASS) {
      goAdmin();
    } else {
      alert("Password errata");
    }
  });

  // ==========================
  // Render Video
  // ==========================
  function renderAll(filter = "") {
    videoContainer.innerHTML = "";
    const vids = getSaved();
    vids.filter(v => v.published && v.title.toLowerCase().includes(filter.toLowerCase()))
        .forEach((v, i) => {
          const card = document.createElement('div');
          card.className = "card";
          card.innerHTML = `
            <video src="${v.url}" controls></video>
            <h4 class="title">${v.title}</h4>
          `;
          videoContainer.appendChild(card);
        });
  }

  searchVideos.addEventListener('input', (e) => {
    renderAll(e.target.value);
  });

  // ==========================
  // Admin Table
  // ==========================
  function renderAdminTable() {
    adminBody.innerHTML = "";
    const vids = getSaved();
    vids.forEach((v, i) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><video src="${v.url}" width="120" controls></video></td>
        <td>${v.title}</td>
        <td>${v.url}</td>
        <td>${v.published ? "Pubblicato" : "Nascosto"}</td>
        <td>
          <button data-act="toggle" data-i="${i}">${v.published ? "Nascondi" : "Mostra"}</button>
          <button data-act="delete" data-i="${i}">Elimina</button>
        </td>
      `;
      adminBody.appendChild(row);
    });

    adminBody.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vids = getSaved();
        const idx = parseInt(e.target.dataset.i);
        if (e.target.dataset.act === "toggle") {
          vids[idx].published = !vids[idx].published;
        } else if (e.target.dataset.act === "delete") {
          vids.splice(idx, 1);
        }
        saveAll(vids);
        renderAll();
        renderAdminTable();
      });
    });
  }

  // ==========================
  // Aggiunta manuale
  // ==========================
  addManualBtn.addEventListener('click', () => {
    const url = addManualUrl.value.trim();
    const title = addManualTitle.value.trim() || "Untitled";
    if (!url) return;
    const vids = getSaved();
    vids.push({ url, title, published: true });
    saveAll(vids);
    addManualUrl.value = "";
    addManualTitle.value = "";
    renderAll();
    renderAdminTable();
  });

   // ==========================
  // Shortcut J
  // ==========================
  window.addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'j') {
      window.open("https://it.wikipedia.org/wiki/Antonio_D%27Agostino", "_blank");
    }
  });

  // ==========================
  // Bootstrap
  // ==========================
  goHome();
  renderAll();
  renderAdminTable();
}); // <-- chiusura di DOMContentLoaded
