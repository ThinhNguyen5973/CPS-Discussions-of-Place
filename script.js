// ============================================
//   CONFIGURE YOUR ALBUM HERE
// ============================================
const IMAGE_FOLDER    = "images/";     // folder where your images live
const IMAGE_PREFIX    = "photo";       // 👈 changed: was ""
const IMAGE_EXTENSION = ".jpg";        // .jpg, .png, .webp, etc.
const START_NUMBER    = 1;             // starting number
const TOTAL_IMAGES    = 164;           // 👈 change this to your total count
// ============================================

// Build the image list automatically
const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
    const num = START_NUMBER + i;
    return `${IMAGE_FOLDER}${IMAGE_PREFIX}${num}${IMAGE_EXTENSION}`;
});

let currentIndex = 0;
const imgEl     = document.getElementById("albumImage");
const counterEl = document.getElementById("counter");

// Preload the next & previous images for smooth navigation
function preloadAdjacent() {
    [-1, 1].forEach(offset => {
        const idx = (currentIndex + offset + images.length) % images.length;
        const pre = new Image();
        pre.src = images[idx];
    });
}

function showImage(index) {
    if (images.length === 0) return;

    // Wrap around at the ends
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentIndex = index;

    // Fade out, swap, fade in
    imgEl.classList.add("fade");
    setTimeout(() => {
        imgEl.src = images[index];
        imgEl.alt = `Image ${index + 1}`;
        counterEl.textContent = `${index + 1} / ${images.length}`;
        imgEl.classList.remove("fade");
        preloadAdjacent();
    }, 200);
}

const nextImage = () => showImage(currentIndex + 1);
const prevImage = () => showImage(currentIndex - 1);

// Button clicks
document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("prevBtn").addEventListener("click", prevImage);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextImage();
    else if (e.key === "ArrowLeft") prevImage();
});

// Touch / swipe support for mobile
let touchStartX = 0;
document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? nextImage() : prevImage();
    }
});

// Initialize
showImage(0);
