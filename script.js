<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Jiorro Video Manager</title>
  <style>
    :root{
      --bg:#0f0f10; --panel:#18181b; --border:#2a2a31; --text:#fff;
      --muted:#b7b7c3; --accent:#6ff66f; --brand:#66aaff; --danger:#ff6666;
      --shadow:rgba(0,0,0,0.35);
    }
    html,body{height:100%;margin:0;background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;}
    *{box-sizing:border-box}
    .topbar{position:fixed;top:0;left:0;right:0;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;background:linear-gradient(to bottom, rgba(24,24,27,0.95), rgba(24,24,27,0.7));border-bottom:1px solid var(--border);z-index:1000;backdrop-filter:blur(6px)}
    .lens-btn{width:44px;height:44px;border-radius:12px;border:1px solid var(--border);background:var(--panel);color:var(--text);font-size:20px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
    .status{position:fixed;top:70px;right:20px;font-size:13px;color:var(--muted);z-index:950;text-align:right}
    .status.success{color:var(--accent)} .status.error{color:var(--danger)}
    .section{padding-top:96px;min-height:100vh}
    .hidden{display:none}
    .panel{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:20px;box-shadow:0 14px 36px var(--shadow)}
    .pill{display:inline-block;padding:4px 8px;border-radius:999px;background:#202025;color:var(--muted);border:1px solid var(--border);font-size:13px;margin:2px}
    .pill-list{display:flex;flex-wrap:wrap;padding:0;margin:0;list-style:none}
    .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-top:12px}
    .card{background:var(--panel);border:1px solid var(--border);padding:10px;border-radius:12px;box-shadow:0 10px 30px var(--shadow);display:flex;flex-direction:column;gap:8px}
    .card video{width:100%;border-radius:8px;background:black}
    table.admin-grid{width:100%;border-collapse:collapse;margin-top:12px}
    table.admin-grid th, table.admin-grid td{padding:10px;border-top:1px solid var(--border);vertical-align:middle}
    .actions{display:flex;gap:8px;flex-wrap:wrap}
    .modal{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.55);z-index:1200}
    .modal.show{display:flex}
    .admin-anchor{position:fixed;left:12px;bottom:12px;z-index:1300;display:flex;flex-direction:column;align-items:flex-start;gap:8px}
    .admin-btn{width:44px;height:44px;border-radius:999px;background:var(--panel);border:1px solid var(--border);display:inline-flex;align-items:center;justify-content:center;color:var(--text);font-size:18px;cursor:pointer}
    .admin-input-wrap{display:none;gap:8px;align-items:center}
    .admin-input{width:220px;padding:8px;border-radius:10px;border:1px solid var(--border);background:var(--panel);color:var(--text)}
  </style>
</head>
<body>
  <header class="topbar">
    <div>Jiorro Video Manager</div>
    <button id="lensBtn" class="lens-btn">🔍</button>
  </header>

  <div id="statusEl" class="status"></div>

  <!-- Home -->
  <main id="homeSection" class="section">
    <div class="panel">
      <h1>La regione di Canaan</h1>
      <p>Import automatico, ricerca client, upload e overlay J.</p>
      <ul class="pill-list">
        <li class="pill">Import automatico</li>
        <li class="pill">Runtime .webm → .mp4</li>
        <li class="pill">Ricerca client</li>
        <li class="pill">Upload preset / fallback</li>
        <li class="pill">Diagnostica URL</li>
      </ul>
    </div>
  </main>

  <!-- Video -->
  <section id="videoSection" class="section hidden">
    <div class="panel">
      <button id="backHome">🏠 Home</button>
      <button id="openUpload">⬆️ Carica</button>
      <input id="searchVideos" class="input" placeholder="Cerca video" />
      <div id="videoContainer" class="cards"></div>
    </div>
  </section>

  <!-- Admin -->
  <section id="adminSection" class="section hidden">
    <div class="panel">
      <h2>🔧 Pannello amministrazione</h2>
      <table class="admin-grid">
        <thead><tr><th>Anteprima</th><th>Titolo</th><th>Views</th><th>Stato</th><th>Azioni</th></tr></thead>
        <tbody id="adminBody"></tbody>
      </table>
    </div>
  </section>

  <!-- Upload Modal -->
  <div id="uploadModal" class="modal">
    <div class="panel">
      <h3>Carica Video</h3>
      <input id="videoFile" type="file" accept="video/*" />
      <input id="videoTitle" class="input" placeholder="Titolo (opzionale)" />
      <input id="overlaySrc" class="input" placeholder="Overlay source (opzionale)" />
      <button id="uploadBtn" class="btn">Carica</button>
      <button id="closeUpload" class="btn">Chiudi</button>
      <div id="uploadStatus"></div>
    </div>
  </div>

  <!-- Admin anchor -->
  <div class="admin-anchor">
    <button id="adminAnchorBtn" class="admin-btn">🔑</button>
    <div id="adminInputWrap" class="admin-input-wrap">
      <input id="adminInput" class="admin-input" placeholder="Password admin" />
      <button id="adminSubmit" class="btn">Sblocca</button>
      <button id="adminToHome" class="btn">Home</button>
      <button id="adminToVideo" class="btn">Video</button>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const STORAGE_KEY = 'jiorroVideos_secure_v1';
      const ADMIN_PASS = 'JIORR0CON$=LE';

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
      const adminAnchorBtn = document.getElementById('adminAnchorBtn');
      const adminInputWrap = document.getElementById('adminInputWrap');
      const adminInput = document.getElementById('adminInput');
      const adminSubmit = document.getElementById('adminSubmit');
      const adminBody = document.getElementById
