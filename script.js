document.addEventListener('DOMContentLoaded', () => {
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
 document.addEventListener('DOMContentLoaded', () => {
  const homeSection = document.getElementById('homeSection');
  const videoSection = document.getElementById('videoSection');
  const adminSection = document.getElementById('adminSection');
  const lensBtn = document.getElementById('lensBtn');
  const backHome = document.getElementById('backHome');
  const videoContainer = document.getElementById('videoContainer');
  const searchVideos = document.getElementById('searchVideos');
  const adminBody = document.getElementById('adminBody');

  // Guardie dure per la lente
  if (!lensBtn) {
    console.error('lensBtn non trovato nel DOM');
  } else {
    lensBtn.type = 'button';
    lensBtn.style.pointerEvents = 'auto';
    lensBtn.style.position = 'relative';
    lensBtn.style.zIndex = '10';

    lensBtn.addEventListener('click', (e) => {
      console.log('Lente cliccata');
      // Fallback 1: se goVideo non esiste o fallisce, toggla manualmente
      try {
        if (typeof goVideo === 'function') {
          goVideo();
        } else {
          homeSection.classList.add('hidden');
          videoSection.classList.remove('hidden');
          adminSection.classList.add('hidden');
        }
      } catch (err) {
        console.warn('goVideo ha lanciato un errore, uso fallback:', err);
        homeSection.classList.add('hidden');
        videoSection.classList.remove('hidden');
        adminSection.classList.add('hidden');
      }

      // Fallback 2: render video comunque
      try {
        if (typeof renderAll === 'function') {
          renderAll();
        } else {
          // Render minimale di sicurezza per mostrare che il click funziona
          if (videoContainer) {
            videoContainer.innerHTML = '<div class="card"><p>Render fallback: click rilevato</p></div>';
          }
        }
      } catch (err) {
        console.warn('renderAll ha lanciato un errore:', err);
        if (videoContainer) {
          videoContainer.innerHTML = '<div class="card"><p>Render fallback con errore</p></div>';
        }
      }
    });
  }

  // Navigazione esplicita (se le tue funzioni sono già presenti, queste non ti servono)
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

  // Shortcut J (rimesso)
  window.addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'j') {
      window.open("https://it.wikipedia.org/wiki/Antonio_D%27Agostino", "_blank");
    }
  });

  // Bootstrap: parti dalla Home ma prepara tutto
  goHome();
  if (typeof renderAll === 'function') renderAll();
  if (typeof renderAdminTable === 'function') renderAdminTable();
});

                           // ==========================
  // Stato locale
  // ==========================
  const getSaved = () => JSON.parse(localStorage.getItem('videos') || '[]');
  const saveAll = (arr) => localStorage.setItem('videos', JSON.stringify(arr));

  // Lista iniziale (puoi sostituire con i tuoi URL Cloudinary)
  const initialVideos = [
    { url: "https://res.cloudinary.com/demo/video/upload/sample.mp4", title: "Demo Video", views: 0, active: true }
  ];

  if (!localStorage.getItem('videos')) {
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

  lensBtn.addEventListener('click', goVideo);
  backHome.addEventListener('click', goHome);

  adminAnchorBtn.addEventListener('click', () => {
    adminInputWrap.style.display = adminInputWrap.style.display === 'flex' ? 'none' : 'flex';
  });

  adminSubmit.addEventListener('click', () => {
    if (adminInput.value === 'JIORR0CON$=LE') {
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
    vids.filter(v => v.active && v.title.toLowerCase().includes(filter.toLowerCase()))
        .forEach((v, i) => {
          const card = document.createElement('div');
          card.className = "card";
          card.innerHTML = `
            <video src="${v.url}" controls></video>
            <h4>${v.title}</h4>
            <p>Views: ${v.views}</p>
          `;
          card.querySelector('video').addEventListener('play', () => {
            v.views++;
            saveAll(vids);
            renderAdminTable();
          });
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
        <td>${v.views}</td>
        <td>${v.active ? "Attivo" : "Nascosto"}</td>
        <td>
          <button data-act="toggle" data-i="${i}">${v.active ? "Nascondi" : "Mostra"}</button>
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
          vids[idx].active = !vids[idx].active;
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
    vids.push({ url, title, views: 0, active: true });
    saveAll(vids);
    addManualUrl.value = "";
    addManualTitle.value = "";
    renderAll();
    renderAdminTable();
  });

  // ==========================
  // Bootstrap UI
  // ==========================
   // Bootstrap UI
   goHome();
  renderAll();
  renderAdminTable();
    // ==========================
  // Shortcut J → Wikipedia
  // ==========================
  window.addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'j') {
      window.open("https://it.wikipedia.org/wiki/Antonio_D%27Agostino", "_blank");
    }

});
