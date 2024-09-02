
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

// images swap

document.addEventListener('DOMContentLoaded', () => {
    const smallImages = document.querySelectorAll('.small-box');
    const largeImage = document.querySelector('.large-box img');

    smallImages.forEach(smallImg => {
        smallImg.addEventListener('click', () => {
            // Swap the images between the clicked small image and the large image
            const tempSrc = largeImage.src;
            largeImage.src = smallImg.src;
            smallImg.src = tempSrc;
        });
    });
});



