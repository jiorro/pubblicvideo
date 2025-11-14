const openUpload = document.getElementById('openUpload');
const closeUpload = document.getElementById('closeUpload');
const uploadModal = document.getElementById('uploadModal');
const uploadBtn = document.getElementById('uploadBtn');
const videoFile = document.getElementById('videoFile');
const videoContainer = document.getElementById('videoContainer');
const searchInput = document.getElementById('searchInput');

openUpload.addEventListener('click', () => {
  uploadModal.classList.remove('hidden');
});

closeUpload.addEventListener('click', () => {
  uploadModal.classList.add('hidden');
});

uploadBtn.addEventListener('click', async () => {
  const file = videoFile.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'jiorro_preset'); // 🔧 Sostituisci con il tuo preset
  const res = await fetch('https://api.cloudinary.com/v1_1/jiorro/video/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  const videoUrl = data.secure_url;

  const videoEl = document.createElement('video');
  videoEl.src = videoUrl;
  videoEl.controls = true;
  videoContainer.prepend(videoEl);

  uploadModal.classList.add('hidden');
  videoFile.value = '';
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
