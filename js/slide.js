document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.card-baner');
    const dotsContainer = document.querySelector('.custom-selector');
    const prevBtn = document.querySelector(".arrow.left");
    const nextBtn = document.querySelector(".arrow.right");
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 6000;

    function generateDots() {
        dotsContainer.innerHTML = '';

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            dot.setAttribute('aria-label', `Slide ${index + 1}`);

            dot.addEventListener('click', () => {
                stopSlideShow();
                currentSlide = index;
                showSlide(currentSlide);
                startSlideShow();
            });

            dotsContainer.appendChild(dot);
        });
    }

    function showSlide(index) {
        slides.forEach(slide => {
            slide.style.transition = 'opacity 0.5s ease-in-out';
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });

        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });

        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        dots[index].classList.add('active');
        dots[index].setAttribute('aria-selected', 'true');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    let touchStartX = 0;
    let touchEndX = 0;

    const bannerCards = document.querySelector('.baner-cards');

    bannerCards.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    bannerCards.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startSlideShow();
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlideShow();
            prevSlide();
            startSlideShow();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
    }

    generateDots();
    showSlide(0);
    startSlideShow();

    bannerCards.addEventListener('mouseenter', stopSlideShow);
    bannerCards.addEventListener('mouseleave', startSlideShow);
});
