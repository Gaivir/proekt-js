
document.body.onload = function() {

setTimeout(() => {
    const mask = document.querySelector('.mask');
    if (!mask.classList.contains('hide-mask')) {
        mask.classList.add('hide-mask');
    }
}, 600);
    
}