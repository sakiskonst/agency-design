const toggleNav = () => {
  document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";
}

window.addEventListener('load', function() {
  const gallery = document.querySelector('.gallery');
  const images = gallery.querySelectorAll('img');
  let currentImageIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function animateGallery() {
    // Set the transform property of the current image to move it to the top of the container
    images[currentImageIndex].style.transform = `translateX(-${gallery.offsetWidth}px)`;

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

  // Add touch event listeners to the gallery container
  gallery.addEventListener('touchstart', handleTouchStart);
  gallery.addEventListener('touchmove', handleTouchMove);
  gallery.addEventListener('touchend', handleTouchEnd);

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    // Prevent scrolling while swiping
    event.preventDefault();
  }

  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 50) {
      // Swiped right, show previous image
      currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    } else if (deltaX < -50) {
      // Swiped left, show next image
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }

    // Reset the transform property for all images
    images.forEach((image, index) => {
      image.style.transform = (index === currentImageIndex) ? `translateX(-${gallery.offsetWidth}px)` : '';
    });
  }
});
