// Constant variables
const arrowUp = document.querySelector('.up'),
    arrowDown = document.querySelector('.down');


document.addEventListener('scroll', () => {
    // Variables created at every scroll
    const scrollValue = window.scrollY,
        windowHeight = window.innerHeight;

    // Getting the document height
    const body = document.body,
        html = document.documentElement;
    let documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);

    // Conditions deciding, whether to display the arrows or not.
    (scrollValue > windowHeight) ? arrowUp.classList.add('visible') : arrowUp.classList.remove('visible');
    (documentHeight > windowHeight) ? arrowDown.classList.add('visible') : arrowDown.classList.remove('visible');
});