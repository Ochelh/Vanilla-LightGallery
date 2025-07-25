export class LightGallery {
  constructor(gallerySelector, lightboxSelector) {
    this.gallery = document.querySelector(gallerySelector);
    this.lightbox = document.querySelector(lightboxSelector);
    this.lightboxImg = this.lightbox.querySelector("#lightbox-img");
    this.closeBtn = this.lightbox.querySelector(".close");
    this.prevBtn = this.lightbox.querySelector(".prev");
    this.nextBtn = this.lightbox.querySelector(".next");

    this.images = [...this.gallery.querySelectorAll("img")];
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.images.forEach((img, index) => {
      img.addEventListener("click", () => this.openLightbox(index));
    });

    this.closeBtn.addEventListener("click", () => this.closeLightbox());
    this.prevBtn.addEventListener("click", () => this.prevImage());
    this.nextBtn.addEventListener("click", () => this.nextImage());

    document.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  openLightbox(index) {
    this.currentIndex = index;
    const fullImage = this.images[index].dataset.full;
    this.lightboxImg.src = fullImage;
    this.lightbox.classList.add("show");
  }

  closeLightbox() {
    this.lightbox.classList.remove("show");
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.openLightbox(this.currentIndex);
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.openLightbox(this.currentIndex);
  }

  handleKeydown(e) {
    if (!this.lightbox.classList.contains("show")) return;
    switch (e.key) {
      case "Escape":
        this.closeLightbox();
        break;
      case "ArrowRight":
        this.nextImage();
        break;
      case "ArrowLeft":
        this.prevImage();
        break;
    }
  }
}
