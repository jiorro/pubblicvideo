const uploader = document.getElementById("videoUploader");
const gallery = document.getElementById("videoGallery");

uploader.addEventListener("change", (event) => {
  const files = event.target.files;
  for (const file of files) {
    const url = URL.createObjectURL(file);
    const box = document.createElement("div");
    box.className = "video-box";
    box.innerHTML = `
      <video controls>
        <source src="${url}" type="${file.type}">
        Il tuo browser non supporta il video.
      </video>
      <h3>${file.name}</h3>
    `;
    gallery.appendChild(box);
  }
});

const searchInput = document.getElementById("searchInput");
const videoBoxes = document.querySelectorAll(".video-box");
const addVideoBtn = document.getElementById("addVideoBtn");
const modal = document.getElementById("uploadModal");
const closeBtn = document.querySelector(".close");
const uploader = document.getElementById("videoUploader");
const gallery = document.getElementById("videoGallery");

// Ricerca istantanea
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".video-box").forEach(box => {
    const title = box.dataset.title.toLowerCase();
    box.style.display = title.includes(query) ? "block" : "none";
  });
});

// Apri modale
addVideoBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Chiudi modale
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Carica video
uploader.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const box = document.createElement("div");
    box.className = "video-box";
    box.dataset.title = file.name.toLowerCase();
    box.innerHTML = `
      <video controls>
        <source src="${url}" type="${file.type}">
        Il tuo browser non supporta il video.
      </video>
      <h3>${file.name}</h3>
    `;
    gallery.appendChild(box);
    modal.style.display = "none";
  }
});
