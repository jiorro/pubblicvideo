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
