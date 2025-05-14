// Shrink header on scroll and adjust video position
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const video = document.querySelector('.video-container video');

    // Shrink the header
    if (window.scrollY > 50) {
        header.style.height = '80px';
    } else {
        header.style.height = '100px';
    }

    // Adjust the video object-position based on scroll
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight; // Maximum scrollable height
    const scrollPercentage = Math.min(scrollPosition / maxScroll, 1); // Normalize to 0-1
    const objectPositionValue = 100 * scrollPercentage; // Map to 0% (top) to 100% (bottom)
    video.style.objectPosition = `center ${objectPositionValue}%`;
});