// DEBUG + HANDLER RAPIDO per #uploadBtn
(async function(){
  console.clear();
  console.log('Debug upload handler start');

  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('videoFile');
  const uploadModal = document.getElementById('uploadModal');
  const uploadStatus = document.getElementById('uploadStatus') || (function(){
    const s = document.createElement('div'); s.id='uploadStatus'; s.style.color='#b7b7c3'; document.body.appendChild(s); return s;
  })();
  const progressBar = document.getElementById('uploadProgress');

  console.log('uploadBtn found:', !!uploadBtn);
  console.log('videoFile found:', !!fileInput);
  console.log('uploadModal found:', !!uploadModal);

  if(!uploadBtn || !fileInput){
    uploadStatus.textContent = 'Errore: elemento upload non trovato. Controlla id #uploadBtn e #videoFile.';
    return;
  }

  // rimuove eventuali listener ridondanti
  uploadBtn.replaceWith(uploadBtn.cloneNode(true));
  const freshBtn = document.getElementById('uploadBtn');

  // leggi configurazione esistente dal window (se presente nel tuo script)
  const CLOUDINARY_CLOUD = (typeof window.CLOUDINARY_CLOUD !== 'undefined') ? window.CLOUDINARY_CLOUD : (typeof CLOUDINARY_CLOUD !== 'undefined' ? CLOUDINARY_CLOUD : '');
  const UPLOAD_PRESET = (typeof window.UPLOAD_PRESET !== 'undefined') ? window.UPLOAD_PRESET : (typeof UPLOAD_PRESET !== 'undefined' ? UPLOAD_PRESET : '');
  const CLOUDINARY_URL = CLOUDINARY_CLOUD ? `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/auto/upload` : '';

  console.log('Config — CLOUDINARY_CLOUD:', CLOUDINARY_CLOUD ? 'SET' : 'NOT SET', 'UPLOAD_PRESET:', UPLOAD_PRESET ? 'SET' : 'NOT SET');

  freshBtn.addEventListener('click', async (ev) => {
    ev.preventDefault();
    uploadStatus.textContent = '';
    try {
      const f = fileInput.files && fileInput.files[0];
      if(!f){ uploadStatus.textContent = '❌ Seleziona un file.'; return; }
      if(!f.type || !f.type.startsWith('video/')){ uploadStatus.textContent = '❌ Il file selezionato non è un video.'; return; }

      freshBtn.disabled = true; freshBtn.classList.add('loading');
      uploadStatus.textContent = `⏳ Preparazione upload: ${f.name}`;

      // se Cloudinary configurato, prova upload XHR con progress (mostra risposta)
      if(CLOUDINARY_CLOUD && UPLOAD_PRESET && CLOUDINARY_URL){
        uploadStatus.textContent = '⏳ Caricamento su Cloudinary...';
        const form = new FormData(); form.append('file', f); form.append('upload_preset', UPLOAD_PRESET);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', CLOUDINARY_URL);
        xhr.upload.onprogress = (ev) => { if(ev.lengthComputable){ const pct = Math.round(ev.loaded/ev.total*100); if(progressBar) progressBar.style.width = pct + '%'; uploadStatus.textContent = `⏳ Caricamento ${pct}%`; } };
        xhr.onload = () => {
          try {
            const res = JSON.parse(xhr.responseText);
            console.info('Cloudinary response:', res);
            if(xhr.status >=200 && xhr.status <300 && res && res.secure_url){
              // salva nel localStorage usato dall'app
              const key = 'jiorroVideos_v3';
              const list = JSON.parse(localStorage.getItem(key) || '[]');
              list.unshift({ url: res.secure_url, title: (document.getElementById('videoTitle')?.value||f.name), views:0, published:true, uploadedAt:Date.now() });
              localStorage.setItem(key, JSON.stringify(list));
              uploadStatus.textContent = '✅ Caricamento completato e registrato';
              if(typeof window.renderAllVideosPublic === 'function') window.renderAllVideosPublic();
            } else {
              uploadStatus.textContent = '❌ Upload Cloudinary fallito: controlla console';
            }
          } catch(e){
            console.error('Parsing response errore', e, xhr.responseText);
            uploadStatus.textContent = '❌ Errore parsing risposta Cloudinary (vedi console)';
          }
          freshBtn.disabled = false; freshBtn.classList.remove('loading'); if(progressBar) setTimeout(()=>progressBar.style.width='0%',1500);
        };
        xhr.onerror = () => { uploadStatus.textContent = '❌ Errore rete durante upload'; freshBtn.disabled=false; freshBtn.classList.remove('loading'); console.error('XHR error'); };
        xhr.ontimeout = () => { uploadStatus.textContent = '❌ Timeout upload'; freshBtn.disabled=false; freshBtn.classList.remove('loading'); console.error('XHR timeout'); };
        xhr.send(form);
        return;
      }

      // fallback locale: crea objectURL e salva per test
      const url = URL.createObjectURL(f);
      const key = 'jiorroVideos_v3';
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      saved.unshift({ url, title: (document.getElementById('videoTitle')?.value||f.name), views:0, published:true, test:true });
      localStorage.setItem(key, JSON.stringify(saved));
      uploadStatus.textContent = '✅ File registrato localmente per test (objectURL)';
      if(typeof window.renderAllVideosPublic === 'function') window.renderAllVideosPublic();
      console.info('Saved objectURL for test:', url);
    } catch(err){
      console.error('Handler upload error:', err);
      uploadStatus.textContent = '❌ Errore interno: vedi Console';
      freshBtn.disabled = false; freshBtn.classList.remove('loading');
    } finally {
      freshBtn.disabled = false; freshBtn.classList.remove('loading');
      setTimeout(()=>uploadStatus.textContent = '', 2500);
    }
  });

  console.log('Handler installato. Prova a selezionare un file e premere Carica.');
})();
