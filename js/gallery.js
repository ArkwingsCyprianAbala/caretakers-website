
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.activity-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.activity-track');
    const prevButton = carousel.querySelector('.carousel-arrow.prev');
    const nextButton = carousel.querySelector('.carousel-arrow.next');

    if (!track || !prevButton || !nextButton) return;

    const updateButtons = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;

      prevButton.disabled = track.scrollLeft <= 2;
      nextButton.disabled = track.scrollLeft >= maxScroll - 2;
    };

    prevButton.addEventListener('click', () => {
      track.scrollBy({
        left: -track.clientWidth * 0.85,
        behavior: 'smooth'
      });
    });

    nextButton.addEventListener('click', () => {
      track.scrollBy({
        left: track.clientWidth * 0.85,
        behavior: 'smooth'
      });
    });

    track.addEventListener('scroll', updateButtons, {
      passive: true
    });

    window.addEventListener('resize', updateButtons);

    updateButtons();
  });
});
