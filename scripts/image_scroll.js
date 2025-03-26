const bgImage = document.getElementById('bg-main');

document.body.addEventListener('scroll', isScroll)

function isScroll(){
    const yPos = document.body.scrollTop;
    bgImage.style.backgroundSize = 120 - +yPos/30+'%';
    bgImage.style.opacity = 1 - +yPos/500;
}
