const bgImage = document.getElementById('bg-main');

document.body.addEventListener('scroll', isScroll)

function isScroll(){
    const yPos = document.body.scrollTop;

    bgImage.style.backgroundSize = 300 - +yPos/30+'vh';
    bgImage.style.opacity = 1 - +yPos/500;
}
