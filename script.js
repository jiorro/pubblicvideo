const openUpload = document.getElementById('openUpload');
const closeUpload = document.getElementById('closeUpload');
const uploadModal = document.getElementById('uploadModal');
const uploadBtn = document.getElementById('uploadBtn');
const videoFile = document.getElementById('videoFile');
const videoContainer = document.getElementById('videoContainer');
const searchInput = document.getElementById('searchInput');
const uploadStatus = document.getElementById('uploadStatus');

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
  if (!file) {
    uploadStatus.textContent = 'Seleziona un file video.';
    return;
  }

  uploadStatus.textContent = 'Caricamento in corso...';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'jiorro_upload'); // 🔧 tuo preset Cloudinary

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/jiorro/video/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    const videoUrl = data.secure_url;

    if (!videoUrl) {
      uploadStatus.textContent = 'Errore: URL non ricevuto.';
      return;
    }

    const videoEl = document.createElement('video');
    videoEl.src = videoUrl;
    videoEl.controls = true;
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('preload', 'metadata');
    videoContainer.prepend(videoEl);

    uploadStatus.textContent = '✅ Video caricato!';
    videoFile.value = '';
  } catch (err) {
    uploadStatus.textContent = 'Errore durante l\'upload.';
    console.error(err);
  }
});

// 🔍 Ricerca
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const videos = videoContainer.querySelectorAll('video');
  videos.forEach(video => {
    const match = video.src.toLowerCase().includes(term);
    video.style.display = match ? 'block' : 'none';
  });
});
