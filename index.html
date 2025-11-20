<!doctype html>
<html lang="it">
<head>
  <!-- =========================================================
       META BASE
       ========================================================= -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Jiorro Video Manager</title>
  <meta name="color-scheme" content="dark" />
  <meta name="theme-color" content="#0a0a0b" />

  <!-- =========================================================
       RESET TOTALE DELLA GRAFICA (CSS RESET + THEME DARK)
       Obiettivo: rimuovere ogni eredità stilistica, garantire
       un tema scuro pulito, e introdurre dettagli fosforescenti
       sui contorni dei video. Tutti i componenti sono espliciti.
       ========================================================= -->
  <style>
    /* ---------------------------------------------------------
       0. CSS RESET ESSENZIALE
       --------------------------------------------------------- */
    :root {
      /* Palette principale (dark + neon verde) */
      --bg: #0a0a0b;             /* sfondo principale */
      --panel: #111215;          /* pannelli scuri */
      --panel-2: #141519;        /* pannelli secondari */
      --text: #e9e9ed;           /* testo principale */
      --muted: #9aa0ab;          /* testo secondario */
      --border: #252833;         /* bordi neutri */
      --border-soft: #1e2027;    /* bordi soft */
      --accent: #00ff88;         /* verde fosforescente */
      --accent-soft: rgba(0, 255, 136, 0.35); /* glow morbido */
      --brand: #6fa8ff;          /* blu acceso (secondary) */
      --danger: #ff6b6b;         /* rosso errori */
      --warning: #ffcd4d;        /* giallo warning */
      --ok: #9cff7a;             /* verde ok */
      --shadow: rgba(0, 0, 0, 0.55); /* ombra globale */
      --shadow-strong: rgba(0, 0, 0, 0.7); /* ombra forte */

      /* Componenti */
      --btn-bg: #15161a;
      --btn-border: #2a2f38;
      --btn-text: #e9e9ed;

      --input-bg: #121318;
      --input-border: #2a2f38;
      --input-text: #e9e9ed;
      --input-placeholder: #838a96;

      /* Video neon edge */
      --video-border: var(--accent);
      --video-glow: var(--accent-soft);

      /* Progress bar gradient */
      --progress-start: var(--brand);
      --progress-end: var(--accent);
    }

    /* Hard reset struttura browser */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote,
    pre, a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp, small, strong,
    sub, sup, var, b, u, i, center, dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend, table, caption, tbody, tfoot,
    thead, tr, th, td, article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup, menu, nav, output,
    ruby, section, summary, time, mark, audio, video {
      margin: 0; padding: 0; border: 0; font: inherit; vertical-align: baseline;
    }
    * { box-sizing: border-box; }
    html { height: 100%; }
    body {
      height: 100%;
      background: var(--bg);
      color: var(--text);
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Helvetica Neue", sans-serif;
      line-height: 1.35;
    }
    img, video { max-width: 100%; display: block; }
    ul, ol { list-style-position: inside; }
    button { background: none; border: none; padding: 0; font: inherit; color: inherit; }
    a { color: var(--brand); text-decoration: none; }
    a:hover { text-decoration: underline; }

    /* ---------------------------------------------------------
       1. STRUTTURA LAYOUT
       --------------------------------------------------------- */
    .topbar {
      position: fixed; inset: 0 0 auto 0; height: 68px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 18px;
      background:
        linear-gradient(to bottom, rgba(17, 18, 21, 0.9), rgba(17, 18, 21, 0.7));
      border-bottom: 1px solid var(--border);
      box-shadow: 0 12px 34px var(--shadow);
      z-index: 1000;
      backdrop-filter: blur(6px);
    }
    .brand { font-weight: 800; letter-spacing: 0.3px; color: var(--text); }

    .lens-btn {
      width: 46px; height: 46px; border-radius: 12px;
      background: var(--btn-bg);
      border: 1px solid var(--btn-border);
      color: var(--btn-text);
      font-size: 20px; display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer; transition: transform .12s ease, box-shadow .12s ease;
      box-shadow: 0 8px 22px var(--shadow);
    }
    .lens-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 32px var(--shadow-strong); }

    .status {
      position: fixed; top: 76px; right: 20px;
      font-size: 13px; color: var(--muted);
      z-index: 950; text-align: right;
    }
    .status.success { color: var(--ok); }
    .status.error { color: var(--danger); }
    .status.info  { color: var(--brand); }
    .status.warn  { color: var(--warning); }

    .section { padding-top: 108px; min-height: 100vh; }
    .hidden { display: none; }

    .panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px;
      box-shadow: 0 16px 46px var(--shadow);
    }

    /* ---------------------------------------------------------
       2. HOME
       --------------------------------------------------------- */
    .home-grid {
      display: grid; grid-template-columns: 1.2fr .8fr; gap: 20px; padding: 18px;
    }
    .pill {
      display: inline-block; padding: 6px 10px; border-radius: 999px;
      background: var(--panel-2); color: var(--muted);
      border: 1px solid var(--border);
      font-size: 12px; margin: 3px;
    }
    .pill-list { display: flex; flex-wrap: wrap; padding: 0; margin: 0; list-style: none; }
    .home-title { font-weight: 900; letter-spacing: .2px; margin-bottom: 8px; }
    .home-desc  { color: var(--muted); margin-bottom: 10px; }

    /* ---------------------------------------------------------
       3. VIDEO SECTION
       --------------------------------------------------------- */
    .video-toolbar {
      display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
      padding: 12px; border-radius: 14px; background: var(--panel-2);
      border: 1px solid var(--border);
    }
    .btn {
      background: var(--btn-bg);
      border: 1px solid var(--btn-border);
      color: var(--btn-text);
      padding: 9px 12px; border-radius: 10px;
      cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
      transition: transform .12s ease, box-shadow .12s ease;
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px var(--shadow); }
    .btn.danger { border-color: #5a1f1f; color: #ffdcdc; }

    .input {
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      padding: 9px 12px; border-radius: 10px;
      color: var(--input-text);
      outline: none;
    }
    .input::placeholder { color: var(--input-placeholder); }
    .input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(111,168,255,0.15); }

    .cards {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px; margin-top: 12px;
    }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      padding: 12px; border-radius: 14px;
      box-shadow: 0 12px 34px var(--shadow);
      display: flex; flex-direction: column; gap: 8px;
    }
    /* Bordo e glow fosforescente: richieste dell’utente */
    .card video {
      width: 100%;
      border-radius: 12px;
      background: black;
      border: 2px solid var(--video-border);
      box-shadow: 0 0 18px var(--video-glow), inset 0 0 6px rgba(0,0,0,0.5);
    }
    /* Glow dinamico on hover */
    .card video:hover {
      box-shadow: 0 0 24px var(--video-glow), inset 0 0 8px rgba(0,0,0,0.6);
      transition: box-shadow .15s ease;
    }
    /* Glow durante riproduzione (aggiunto via JS con class .playing) */
    .card video.playing {
      box-shadow: 0 0 28px var(--video-glow), inset 0 0 8px rgba(0,0,0,0.6);
      border-color: var(--accent);
    }

    .title { font-weight: 700; }
    .views { color: var(--muted); font-size: 13px; }

    /* ---------------------------------------------------------
       4. ADMIN TABLE
       --------------------------------------------------------- */
    table.admin-grid { width: 100%; border-collapse: collapse; margin-top: 12px; }
    table.admin-grid th, table.admin-grid td {
      padding: 10px; border-top: 1px solid var(--border); vertical-align: middle;
    }
    table.admin-grid th { text-align: left; color: var(--muted); font-weight: 600; }
    table.admin-grid td .input { width: 100%; }

    .actions { display: flex; gap: 8px; flex-wrap: wrap; }

    /* ---------------------------------------------------------
       5. UPLOAD MODAL
       --------------------------------------------------------- */
    .modal {
      position: fixed; inset: 0;
      display: none; align-items: center; justify-content: center;
      background: rgba(0, 0, 0, 0.55); z-index: 1200;
    }
    .modal.show { display: flex; }
    .modal-panel {
      width: 92%; max-width: 720px;
      background: var(--panel); border: 1px solid var(--border);
      padding: 18px; border-radius: 14px;
      box-shadow: 0 16px 48px var(--shadow);
    }
    .progress { height: 8px; border-radius: 999px; background: #0f1114; margin-top: 8px; overflow: hidden; border: 1px solid var(--border-soft); }
    .progress > i {
      display: block; height: 100%; width: 0%;
      background: linear-gradient(90deg, var(--progress-start), var(--progress-end));
      transition: width .2s ease;
    }
    .status-line { margin-top: 8px; color: var(--muted); min-height: 18px; }
    .status-line.success { color: var(--ok); }
    .status-line.error { color: var(--danger); }

    /* ---------------------------------------------------------
       6. ADMIN ANCHOR
       --------------------------------------------------------- */
    .admin-anchor {
      position: fixed; left: 12px; bottom: 12px; z-index: 1300;
      display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
    }
    .admin-btn {
      width: 46px; height: 46px; border-radius: 999px;
      background: var(--btn-bg); border: 1px solid var(--btn-border);
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--btn-text); font-size: 18px; cursor: pointer;
      box-shadow: 0 8px 24px var(--shadow);
      transition: transform .12s ease;
    }
    .admin-btn:hover { transform: translateY(-2px); }
    .admin-input-wrap { display: none; gap: 8px; align-items: center; }
    .admin-input {
      width: 240px; padding: 8px;
      border-radius: 10px; border: 1px solid var(--input-border);
      background: var(--input-bg); color: var(--text); outline: none;
    }
    .admin-input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(111,168,255,0.15); }

    /* ---------------------------------------------------------
       7. RESPONSIVE
       --------------------------------------------------------- */
    @media (max-width: 980px) {
      .home-grid { grid-template-columns: 1fr; }
      .admin-input { width: 180px; }
      .cards { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
    }
  </style>
</head>
<body>
  <!-- =========================================================
       NAVBAR
       ========================================================= -->
  <header class="topbar" aria-label="Navbar">
    <div class="brand">Jiorro Video Manager</div>
    <button id="lensBtn" class="lens-btn" aria-controls="videoSection" aria-expanded="false" title="Apri sezione video">🔍</button>
  </header>

  <!-- =========================================================
       STATUS OVERLAY (MESSAGGI CONTESTUALI)
       ========================================================= -->
  <div id="statusEl" class="status" role="status" aria-live="polite"></div>

  <!-- =========================================================
       HOME SECTION
       ========================================================= -->
  <main id="homeSection" class="section" aria-label="Home">
    <div class="home-grid">
      <div class="panel">
        <h1 class="home-title">La regione di Canaan</h1>
        <p class="home-desc">Importa, cerca, riproduci e gestisci i tuoi video. Admin completo, upload con progress e tracking views. Tema scuro e contorni fosforescenti sui video.</p>
        <ul class="pill-list">
          <li class="pill">Import automatico</li>
          <li class="pill">Runtime .webm → .mp4</li>
          <li class="pill">Ricerca client</li>
          <li class="pill">Upload preset / fallback</li>
          <li class="pill">Diagnostica URL</li>
        </ul>
      </div>
      <div class="panel">
        <h3 style="margin-bottom:8px">Suggerimenti rapidi</h3>
        <ul style="list-style:none; padding-left:0">
          <li class="pill">🔍 Apri i video dalla navbar</li>
          <li class="pill">🔑 Sblocca l’admin in basso a sinistra</li>
          <li class="pill">J apre un link esterno</li>
        </ul>
      </div>
    </div>
  </main>

  <!-- =========================================================
       VIDEO SECTION
       ========================================================= -->
  <section id="videoSection" class="section hidden" aria-label="Video">
    <div class="panel">
      <div class="video-toolbar" role="toolbar" aria-label="Strumenti video">
        <button id="openUpload" class="btn" aria-controls="uploadModal" aria-expanded="false">⬆️ Carica</button>
        <input id="searchVideos" class="input" placeholder="Cerca per titolo o URL" aria-label="Cerca video" />
        <button id="backHome" class="btn">🏠 Home</button>
      </div>
      <div id="videoContainer" class="cards" aria-live="polite" aria-busy="false"></div>
    </div>
  </section>

  <!-- =========================================================
       ADMIN SECTION
       ========================================================= -->
  <section id="adminSection" class="section hidden" aria-label="Admin">
    <div class="panel">
      <h2>🔧 Pannello amministrazione</h2>
      <p style="color:var(--muted)">Modifica titoli, resetta views, pubblica/nascondi, elimina. Dati persistiti in localStorage.</p>
      <table class="admin-grid" id="adminGrid">
        <thead>
          <tr>
            <th>Anteprima</th>
            <th>Titolo</th>
            <th>Views</th>
            <th>Stato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody id="adminBody"></tbody>
      </table>
    </div>
  </section>

  <!-- =========================================================
       UPLOAD MODAL
       ========================================================= -->
  <div id="uploadModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="uploadTitle">
    <div class="modal-panel" role="document">
      <h3 id="uploadTitle">Upload Video</h3>

      <div style="margin-top:8px">
        <label for="videoFile">File</label><br />
        <input id="videoFile" type="file" accept="video/*" class="input" />
      </div>

      <div style="margin-top:8px">
        <label for="videoTitle">Titolo</label><br />
        <input id="videoTitle" class="input" placeholder="Titolo (opzionale)" />
      </div>

      <div style="margin-top:8px">
        <label for="overlaySrc">Overlay source (opzionale)</label><br />
        <input id="overlaySrc" class="input" placeholder="URL usato da data-overlay-src" />
      </div>

      <div class="progress" aria-hidden="true"><i id="uploadProgress"></i></div>
      <div class="actions" style="margin-top:10px">
        <button id="uploadBtn" class="btn">Carica</button>
        <button id="closeUpload" class="btn">Chiudi</button>
      </div>
      <div id="uploadStatus" class="status-line" aria-live="polite"></div>
    </div>
  </div>

  <!-- =========================================================
       ADMIN ANCHOR
       ========================================================= -->
  <div class="admin-anchor" aria-label="Admin anchor">
    <button id="adminAnchorBtn" class="admin-btn" title="Sblocca admin">🔑</button>
    <div id="adminInputWrap" class="admin-input-wrap" aria-hidden="true">
      <input id="adminInput" class="admin-input" placeholder="Password admin" />
      <button id="adminSubmit" class="btn">Sblocca</button>
      <button id="adminToHome" class="btn">Home</button>
      <button id="adminToVideo" class="btn">Video</button>
    </div>
  </div>

  <!-- =========================================================
       JAVASCRIPT: FUNZIONALITÀ COMPLETE
       ========================================================= -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      /* =========================================================
         CONFIG
         ========================================================= */
      const STORAGE_KEY = 'jiorroVideos_secure_v1';
      const ADMIN_PASS = 'JIORR0CON$=LE';       // password admin (case-sensitive)
      const MAX_FILE_MB = 800;                  // limite locale simulato
      const LINK_J_DEFAULT = "https://it.wikipedia.org/wiki/Antonio_D%27Agostino"; // J apre questo

      /* =========================================================
         HELPERS
         ========================================================= */
      function getSaved() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch (e) {
          console.error('getSaved parse error', e);
          return [];
        }
      }
      function setSaved(arr) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(arr || []));
        } catch (e) {
          console.error('setSaved error', e);
        }
      }
      function showStatus(msg, type) {
        const s = document.getElementById('statusEl');
        s.textContent = msg || '';
        s.className = 'status' + (type ? ' ' + type : '');
      }
      function humanFileSize(bytes) {
        const thresh = 1024;
        if (Math.abs(bytes) < thresh) return bytes + ' B';
        const units = ['KB','MB','GB','TB','PB','EB','ZB','YB'];
        let u = -1;
        do { bytes /= thresh; ++u; } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + ' ' + units[u];
      }

      /* =========================================================
         REFS DOM
         ========================================================= */
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

      /* =========================================================
         NAVIGAZIONE SEZIONI
         ========================================================= */
      function showHome() {
        homeSection.classList.remove('hidden');
        videoSection.classList.add('hidden');
        adminSection.classList.add('hidden');
        showStatus('');
        lensBtn.setAttribute('aria-expanded', 'false');
      }
      function showVideo() {
        homeSection.classList.add('hidden');
        adminSection.classList.add('hidden');
        videoSection.classList.remove('hidden');
        showStatus('✅ Sezione video aperta', 'success');
        setTimeout(() => showStatus(''), 1000);
        lensBtn.setAttribute('aria-expanded', 'true');
        renderAll();
      }
      function showAdmin() {
        homeSection.classList.add('hidden');
        videoSection.classList.add('hidden');
        adminSection.classList.remove('hidden');
        showStatus('🔧 Admin sbloccato', 'success');
        setTimeout(() => showStatus(''), 1000);
        renderAdminTable();
      }
      lensBtn.addEventListener('click', showVideo);
      backHome && backHome.addEventListener('click', showHome);

      /* =========================================================
         RENDER PUBBLICO (CARDS VIDEO)
         ========================================================= */
      function createCard(item) {
        const card = document.createElement('div');
        card.className = 'card video-card';

        const v = document.createElement('video');
        v.src = item.url;
        v.controls = true;
        v.preload = 'metadata';
        v.setAttribute('controlsList', 'nodownload');
        v.addEventListener('contextmenu', e => e.preventDefault());
        if (item.overlaySrc) v.dataset.overlaySrc = item.overlaySrc;

        const t = document.createElement('div');
        t.className = 'title';
        t.textContent = item.title || 'Video senza titolo';

        const vw = document.createElement('div');
        vw.className = 'views';
        vw.textContent = '👁️ ' + (item.views || 0) + ' views';

        // Stato playing: aggiunge glow dinamico (CSS .playing)
        v.addEventListener('play', () => v.classList.add('playing'));
        v.addEventListener('pause', () => v.classList.remove('playing'));
        v.addEventListener('ended', () => v.classList.remove('playing'));

        // Conteggio views (una sola volta per sessione di play)
        let counted = false;
        v.addEventListener('play', () => {
          if (counted) return;
          counted = true;
          const saved = getSaved().map(s => {
            if (s.url === item.url) s.views = (s.views || 0) + 1;
            return s;
          });
          setSaved(saved);
          const updated = saved.find(s => s.url === item.url);
          vw.textContent = '👁️ ' + ((updated && updated.views) || 0) + ' views';
          renderAdminTable();
        });

        card.appendChild(v);
        card.appendChild(t);
        card.appendChild(vw);
        return card;
      }

      function renderAll() {
        videoContainer.innerHTML = '';
        const saved = getSaved()
          .filter(v => v.published !== false)
          .sort((a, b) => (b.views || 0) - (a.views || 0));

        if (!saved.length) {
          const info = document.createElement('div');
          info.style.color = 'var(--muted)';
          info.textContent = 'Nessun video pubblicato. Carica un video per iniziare.';
          videoContainer.appendChild(info);
        } else {
          saved.forEach(i => videoContainer.appendChild(createCard(i)));
        }
      }

      /* =========================================================
         UPLOAD (SIMULAZIONE CON PROGRESS BAR)
         Puoi sostituire facilmente con XHR/Cloudinary.
         ========================================================= */
      function openUpload() {
        uploadModal.classList.add('show');
        openUploadBtn && openUploadBtn.setAttribute('aria-expanded', 'true');
      }
      function closeUpload() {
        uploadModal.classList.remove('show');
        openUploadBtn && openUploadBtn.setAttribute('aria-expanded', 'false');
        uploadStatus.textContent = '';
        uploadProgress.style.width = '0%';
        fileInput.value = '';
        titleInput.value = '';
        overlaySrcInput.value = '';
      }
      openUploadBtn && openUploadBtn.addEventListener('click', openUpload);
      closeUploadBtn && closeUploadBtn.addEventListener('click', closeUpload);

      async function handleUpload() {
        uploadStatus.textContent = '';
        const file = fileInput.files && fileInput.files[0];
        const title = (titleInput.value || '').trim();
        const overlaySrc = (overlaySrcInput.value || '').trim() || null;

        if (!file) { uploadStatus.textContent = '❌ Seleziona un file video.'; return; }
        if (!file.type || !file.type.startsWith('video/')) { uploadStatus.textContent = '❌ Il file selezionato non è un video.'; return; }

        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        if (sizeMb > MAX_FILE_MB) {
          uploadStatus.textContent = `❌ File troppo grande: ${sizeMb} MB (limite locale ${MAX_FILE_MB} MB).`;
          return;
        }

        uploadStatus.textContent = `⏳ Caricamento ${sizeMb} MB...`;
        uploadProgress.style.width = '0%';
        uploadProgress.parentElement.setAttribute('aria-hidden', 'false');

        // Simulazione progress (rimpiazzabile con XHR reale)
        let pct = 0;
        const timer = setInterval(() => {
          pct = Math.min(100, pct + Math.round(10 + Math.random() * 20));
          uploadProgress.style.width = pct + '%';
          uploadStatus.textContent = `⏳ Caricamento ${pct}%`;
          if (pct >= 100) {
            clearInterval(timer);
            const url = URL.createObjectURL(file);
            const saved = getSaved();
            saved.unshift({
              url, title, overlaySrc,
              views: 0, published: true, uploadedAt: Date.now()
            });
            setSaved(saved);
            renderAll();
            renderAdminTable();
            uploadStatus.textContent = '✅ Caricamento completato';
            setTimeout(() => {
              closeUpload();
              showStatus('Video caricato e pubblicato', 'success');
              setTimeout(() => showStatus(''), 1000);
            }, 700);
          }
        }, 180);
      }
      uploadBtn && uploadBtn.addEventListener('click', handleUpload);

      /* =========================================================
         ADMIN UNLOCK
         ========================================================= */
      adminAnchorBtn.addEventListener('click', () => {
        const open = adminInputWrap.style.display === 'flex';
        if (open) {
          adminInputWrap.style.display = 'none';
          adminInputWrap.setAttribute('aria-hidden', 'true');
          adminInput.value = '';
        } else {
          adminInputWrap.style.display = 'flex';
          adminInputWrap.setAttribute('aria-hidden', 'false');
          adminInput.focus(); adminInput.select();
        }
      });

      function tryUnlockAdmin() {
        const v = (adminInput.value || '').trim();
        if (v === ADMIN_PASS) {
          adminInputWrap.style.display = 'none';
          adminInput.value = '';
          showAdmin();
        } else {
          // Feedback visivo rapido
          adminInput.style.transition = 'transform .12s';
          adminInput.style.transform = 'translateX(-6px)';
          setTimeout(() => adminInput.style.transform = 'translateX(6px)', 120);
          setTimeout(() => adminInput.style.transform = '', 240);
          adminInput.focus();
        }
      }
      adminSubmit.addEventListener('click', tryUnlockAdmin);
      adminInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlockAdmin(); });

      /* =========================================================
         ADMIN TABLE (MODIFICA, RESET, PUBBLICA/NASCONDI, ELIMINA)
         ========================================================= */
      function renderAdminTable() {
        adminBody.innerHTML = '';
        const saved = getSaved();

        if (!saved.length) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = 5;
          td.textContent = 'Nessun video salvato.';
          td.style.color = 'var(--muted)';
          tr.appendChild(td);
          adminBody.appendChild(tr);
          return;
        }

        saved.forEach((item, idx) => {
          const tr = document.createElement('tr');

          // Anteprima
          const tdPrev = document.createElement('td');
          const prevV = document.createElement('video');
          prevV.src = item.url;
          prevV.preload = 'metadata';
          prevV.controls = true;
          prevV.style.maxWidth = '180px';
          prevV.setAttribute('controlsList', 'nodownload');
          prevV.addEventListener('contextmenu', e => e.preventDefault());
          // Applica il bordo neon anche in admin
          prevV.style.border = '2px solid var(--video-border)';
          prevV.style.boxShadow = '0 0 14px var(--video-glow)';
          prevV.style.borderRadius = '10px';
          if (item.overlaySrc) prevV.dataset.overlaySrc = item.overlaySrc;
          tdPrev.appendChild(prevV);

          // Titolo editabile
          const tdTitle = document.createElement('td');
          const titleInputEl = document.createElement('input');
          titleInputEl.className = 'input';
          titleInputEl.value = item.title || '';
          tdTitle.appendChild(titleInputEl);

          // Views
          const tdViews = document.createElement('td');
          const pillV = document.createElement('span');
          pillV.className = 'pill';
          pillV.textContent = (item.views || 0) + ' views';
          tdViews.appendChild(pillV);

          // Stato pubblicazione
          const tdStatus = document.createElement('td');
          const pillS = document.createElement('span');
          pillS.className = 'pill ' + (item.published === false ? '' : 'pub');
          pillS.textContent = item.published === false ? 'Non pubblicato' : 'Pubblicato';
          tdStatus.appendChild(pillS);

          // Azioni
          const tdActions = document.createElement('td');
          const actions = document.createElement('div');
          actions.className = 'actions';

          const btnSave = document.createElement('button');
          btnSave.className = 'btn';
          btnSave.textContent = '💾 Salva';

          const btnReset = document.createElement('button');
          btnReset.className = 'btn';
          btnReset.textContent = '🔄 Reset';

          const btnToggle = document.createElement('button');
          btnToggle.className = 'btn';
          btnToggle.textContent = item.published === false ? '📢 Pubblica' : '🙈 Nascondi';

          const btnDel = document.createElement('button');
          btnDel.className = 'btn danger';
          btnDel.textContent = '🗑️ Elimina';

          actions.append(btnSave, btnReset, btnToggle, btnDel);
          tdActions.appendChild(actions);

          tr.append(tdPrev, tdTitle, tdViews, tdStatus, tdActions);
          adminBody.appendChild(tr);

          // Eventi azioni
          btnSave.addEventListener('click', () => {
            const s = getSaved();
            s[idx].title = titleInputEl.value.trim();
            setSaved(s);
            renderAdminTable();
            renderAll();
            showStatus('Titolo aggiornato', 'success');
            setTimeout(() => showStatus(''), 1000);
          });

          btnReset.addEventListener('click', () => {
            if (!confirm('Resetta le views a 0 per questo video?')) return;
            const s = getSaved();
            s[idx].views = 0;
            setSaved(s);
            renderAdminTable();
            renderAll();
            showStatus('Views resettate', 'success');
            setTimeout(() => showStatus(''), 1000);
          });

          btnToggle.addEventListener('click', () => {
            const s = getSaved();
            s[idx].published = !(s[idx].published === false);
            setSaved(s);
            renderAdminTable();
            renderAll();
            showStatus(s[idx].published ? 'Video pubblicato' : 'Video nascosto', 'success');
            setTimeout(() => showStatus(''), 1000);
          });

          btnDel.addEventListener('click', () => {
            if (!confirm("Sei sicuro di eliminare questo video dall'indice locale?")) return;
            const s = getSaved();
            s.splice(idx, 1);
            setSaved(s);
            renderAdminTable();
            renderAll();
            showStatus('Video eliminato', 'error');
            setTimeout(() => showStatus(''), 1200);
          });
        });
      }
      window.renderAdminTable = renderAdminTable;

      adminToVideo && adminToVideo.addEventListener('click', () => {
        videoSection.classList.remove('hidden');
        adminSection.classList.add('hidden');
        renderAll();
      });
      adminToHome && adminToHome.addEventListener('click', () => {
        homeSection.classList.remove('hidden');
        adminSection.classList.add('hidden');
      });

      /* =========================================================
         RICERCA CLIENT-SIDE
         ========================================================= */
      searchVideos && searchVideos.addEventListener('input', () => {
        const term = (searchVideos.value || '').toLowerCase();
        document.querySelectorAll('.video-card').forEach(card => {
          const src = (card.querySelector('video')?.src || '').toLowerCase();
          const title = (card.querySelector('.title')?.textContent || '').toLowerCase();
          card.style.display = (!term || src.includes(term) || title.includes(term)) ? '' : 'none';
        });
      });

      /* =========================================================
         TASTO J → APRI LINK (MODIFICA RICHIESTA)
         Sostituisce eventuale overlay: ora apre Wikipedia.
         ========================================================= */
      function findActiveUnderlyingVideo() {
        const vids = Array.from(document.querySelectorAll('.video-card video, video'))
          .filter(v => v.offsetParent !== null);
        const playing = vids.find(v => !v.paused && !v.ended);
        return playing || vids[0] || null;
      }
      function getJLink(explicitUrl) {
        if (explicitUrl) return explicitUrl;
        const active = findActiveUnderlyingVideo();
        const datasetLink = active && active.dataset && active.dataset.overlayLink;
        return datasetLink || LINK_J_DEFAULT;
      }
      function openJLink(explicitUrl) {
        const url = getJLink(explicitUrl);
        if (!url) return;
        const w = window.open(url, '_blank', 'noopener,noreferrer');
        if (!w) window.location.href = url; // fallback se popup bloccato
      }
      // Manteniamo alias per compatibilità con eventuali riferimenti
      window.toggleOverlayVideo = openJLink;

      window.addEventListener('keyup', (e) => {
        const active = document.activeElement;
        const typing = active && (
          active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.isContentEditable
        );
        if (typing) return;
        if (!e.key || e.key.toLowerCase() !== 'j') return;
        e.preventDefault(); e.stopPropagation();
        openJLink('');
      }, { capture: true });

