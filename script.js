const addVideoBtn = document.getElementById("addVideoBtn");
const modal = document.getElementById("uploadModal");
const closeBtn = document.querySelector(".close");
const uploader = document.getElementById("videoUploader");
const gallery = document.getElementById("videoGallery");
const searchInput = document.getElementById("searchInput");

// 🔍 Ricerca istantanea
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".video-box").forEach(box => {
    const title = box.dataset.title.toLowerCase();
    box.style.display = title.includes(query) ? "block" : "none";
  });
});

// ➕ Apri modale
addVideoBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// ❌ Chiudi modale
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// 📤 Upload su Cloudinary
uploader.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "jiorro_upload"); // ← cambia se hai usato un nome diverso

  const res = await fetch("https://api.cloudinary.com/v1_1/dng8rjd6u/video/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  const videoUrl = data.secure_url;

  const box = document.createElement("div");
  box.className = "video-box";
  box.dataset.title = file.name.toLowerCase();
  box.innerHTML = `
    <video controls>
      <source src="${videoUrl}" type="video/mp4">
      Il tuo browser non supporta il video.
    </video>
    <h3>${file.name}</h3>
  `;
  gallery.appendChild(box);
  modal.style.display = "none";
});
