const openUpload = document.getElementById('openUpload');
const closeUpload = document.getElementById('closeUpload');
const uploadModal = document.getElementById('uploadModal');
const uploadBtn = document.getElementById('uploadBtn');
const videoFile = document.getElementById('videoFile');
const videoTitle = document.getElementById('videoTitle');
const videoContainer = document.getElementById('videoContainer');
const searchInput = document.getElementById('searchInput');
const uploadStatus = document.getElementById('uploadStatus');

// 🔁 Carica video salvati e ordina per views
window.addEventListener('DOMContentLoaded', () => {
  const savedVideos = JSON.parse(localStorage.getItem('jiorroVideos') || '[]');
  savedVideos
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .forEach(({ url, title, views }) => {
      const card = createVideoCard(url, title, views || 0);
      videoContainer.appendChild(card);
    });
});

openUpload.addEventListener('click', () => {
  uploadModal.classList.remove('hidden');
  uploadStatus.textContent = '';
});

closeUpload.addEventListener('click', () => {
  uploadModal.classList.add('hidden');
  uploadStatus.textContent = '';
});

uploadBtn.addEventListener('click', async () => {
  const file = videoFile.files[0];
  const title = videoTitle.value.trim();

  if (!file) {
    uploadStatus.textContent = '❌ Seleziona un file video.';
    return;
  }

  if (!file.type.startsWith('video/')) {
    uploadStatus.textContent = '❌ Il file non è un video valido.';
    return;
  }

  uploadStatus.textContent = '⏳ Caricamento in corso...';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'jiorro_upload');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dng8rjd6u/auto/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (data.error) {
      uploadStatus.textContent = '❌ Errore Cloudinary: ' + data.error.message;
      return;
    }

    const videoUrl = data.secure_url;
    if (!videoUrl) {
      uploadStatus.textContent = '❌ Errore: URL non ricevuto.';
      return;
    }

    const card = createVideoCard(videoUrl, title, 0);
    videoContainer.prepend(card);

    const savedVideos = JSON.parse(localStorage.getItem('jiorroVideos') || '[]');
    savedVideos.unshift({ url: videoUrl, title, views: 0 });
    localStorage.setItem('jiorroVideos', JSON.stringify(savedVideos));

    uploadStatus.style.color = 'green';
    uploadStatus.textContent = '✅ Video caricato!';
    videoFile.value = '';
    videoTitle.value = '';
  } catch (err) {
    uploadStatus.textContent = '❌ Errore durante l\'upload.';
  }
});

// 🔍 Ricerca
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const cards = videoContainer.querySelectorAll('.video-card');
  cards.forEach(card => {
    const src = card.querySelector('video')?.src.toLowerCase() || '';
    const title = card.querySelector('.video-title')?.textContent.toLowerCase() || '';
    const match = src.includes(term) || title.includes(term);
    card.style.display = match ? 'flex' : 'none';
  });
});

// 🧩 Crea card video con views
function createVideoCard(url, title, views = 0) {
  const card = document.createElement('div');
  card.className = 'video-card';

  const videoEl = document.createElement('video');
  videoEl.src = url;
  videoEl.controls = true;
  videoEl.setAttribute('playsinline', '');
  videoEl.setAttribute('preload', 'metadata');

  const titleEl = document.createElement('div');
  titleEl.className = 'video-title';
  titleEl.textContent = title || 'Video senza titolo';

  const viewsEl = document.createElement('div');
  viewsEl.className = 'video-views';
  viewsEl.textContent = `👁️ ${views} views`;

  videoEl.addEventListener('play', () => {
    views++;
    viewsEl.textContent = `👁️ ${views} views`;

    const savedVideos = JSON.parse(localStorage.getItem('jiorroVideos') || '[]');
    const updated = savedVideos.map(v =>
      v.url === url ? { ...v, views } : v
    );
    localStorage.setItem('jiorroVideos', JSON.stringify(updated));
  });

  card.appendChild(videoEl);
  card.appendChild(titleEl);
  card.appendChild(viewsEl);
  return card;
}


