const toggleNav = () => {
    document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";
}

const gallery = document.querySelector('.gallery');
const images = gallery.querySelectorAll('img');
let currentImageIndex = 0;

function animateGallery() {
  // Set the transform property of the current image to move it to the top of the container
  images[currentImageIndex].style.transform = `translateY(-${gallery.offsetHeight}px)`;

  // Increment the current image index, and wrap back to 0 if it exceeds the number of images
  currentImageIndex = (currentImageIndex + 1) % images.length;

  // Set a timeout to call this function again after 3 seconds
  setTimeout(animateGallery, 3000);
}

// Call the animateGallery function to start the animation
animateGallery();


const body = document.querySelector('body');
const slideUp = document.querySelector('.slide-up');

if (body.getAttribute('data-nav') === 'true') {
  slideUp.style.animationPlayState = 'paused';
}