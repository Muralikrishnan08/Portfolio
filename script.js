document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-carousel-id]');
    carousels.forEach(carouselContainer => {
        const track = carouselContainer.querySelector('.carousel-track');
        const cards = Array.from(track.children);
        const nextButton = carouselContainer.querySelector('.next');
        const prevButton = carouselContainer.querySelector('.prev');
        if (!track || cards.length === 0 || !nextButton || !prevButton) {
            console.warn('Carousel structure is incomplete for:', carouselContainer);
            return;
        }
        let currentIndex = 0;
        let cardWidth = 0;
        let visibleCards = 0;
        function updateCarouselDimensions() {
            cardWidth = cards[0].offsetWidth;
            visibleCards = Math.floor(carouselContainer.offsetWidth / cardWidth);
        }
        const moveToSlide = (targetIndex) => {
            const maxIndex = cards.length - visibleCards;
            if (targetIndex < 0) targetIndex = 0;
            if (targetIndex > maxIndex) targetIndex = maxIndex;
            track.style.transform = `translateX(-${cardWidth * targetIndex}px)`;
            currentIndex = targetIndex;
            updateButtons();
        };
        const updateButtons = () => {
            prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevButton.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';

            const maxIndex = cards.length - visibleCards;
            nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextButton.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        };
        nextButton.addEventListener('click', () => {
            if (currentIndex < cards.length - visibleCards) {
                moveToSlide(currentIndex + 1);
            }
        });
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            }
        });
        window.addEventListener('resize', () => {
            updateCarouselDimensions();
            moveToSlide(currentIndex);
        });
        updateCarouselDimensions();
        updateButtons();
    });
});