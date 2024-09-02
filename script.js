document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.pre');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    showSlide(currentIndex); // Initial display
});



// Scroller
let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

const imageSlider = document.querySelector('.image-slider');
const imageSlides = document.querySelectorAll('.image-slide');
const slideWidth = imageSlides[0].offsetWidth + parseInt(window.getComputedStyle(imageSlides[0]).marginRight);
const visibleSlides = 2;  // Number of slides visible at one time
const totalSlides = imageSlides.length;
const maxTranslate = -(totalSlides - visibleSlides) * slideWidth;  // Corrected maxTranslate

imageSlider.addEventListener('mousedown', startDrag);
imageSlider.addEventListener('mouseup', endDrag);
imageSlider.addEventListener('mouseleave', endDrag);
imageSlider.addEventListener('mousemove', drag);
imageSlider.addEventListener('transitionend', () => {
    imageSlider.style.transition = 'none';
});

function startDrag(e) {
    isDragging = true;
    startPos = e.clientX;
    imageSlider.style.transition = 'none';  // Disable transition during drag
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -slideWidth / 2 && currentSlide < totalSlides - visibleSlides) {
        currentSlide++;
    }
    if (movedBy > slideWidth / 2 && currentSlide > 0) {
        currentSlide--;
    }

    setPositionByIndex();
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;

    // Restrict slider movement within boundaries
    if (currentTranslate > 0) {
        currentTranslate = 0;
    } else if (currentTranslate < maxTranslate) {
        currentTranslate = maxTranslate;
    }

    imageSlider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentSlide * -slideWidth;
    prevTranslate = currentTranslate;

    // Apply smooth transition when sliding
    imageSlider.style.transition = 'transform 0.5s ease-in-out';
    imageSlider.style.transform = `translateX(${currentTranslate}px)`;
}


// Top Brands

let currentUniqueIndex = 0;

function moveUniqueSlider(index) {
    const slider = document.querySelector('.unique-slider');
    const dots = document.querySelectorAll('.unique-dot');
    const slideWidth = 427 + 20; // Width + margin
    currentUniqueIndex = index;

    slider.style.transform = `translateX(-${currentUniqueIndex * 3 * slideWidth}px)`; // Move by 3 slides

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentUniqueIndex);
    });
}

// Button

let quantity = 1;

document.getElementById('increment').addEventListener('click', function() {
    quantity++;
    document.getElementById('quantity').textContent = quantity;
});

document.getElementById('decrement').addEventListener('click', function() {
    if (quantity > 1) {
        quantity--;
        document.getElementById('quantity').textContent = quantity;
    }
});





