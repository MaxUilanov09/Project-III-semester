const fieldDiv = document.querySelector('.football__field');
const ballDiv = document.querySelector('.football__ball');
const cursorDiv = document.querySelector('.football__cursor');
let fieldWidth = 720;
let fieldHeight = Math.floor(fieldWidth * 0.3);

let ballTop = fieldDiv.getBoundingClientRect().top + 85;
let ballLeft = 92;

let cursorTop = 0;
let cursorLeft = 0;

fieldDiv.style.width = `${fieldWidth}px`;
fieldDiv.style.height = `${fieldHeight}px`;
fieldDiv.style.backgroundColor = '#5ABB58';
fieldDiv.style.borderColor = '#000000';
fieldDiv.style.borderRadius = '37px';
// fieldDiv.style.cursor = 'none';

ballDiv.style.position = 'absolute';
ballDiv.style.top = `${ballTop}px`;
ballDiv.style.left = `${ballLeft}px`;
ballDiv.style.width = '50px';
ballDiv.style.height = '50px';
ballDiv.style.backgroundColor = '#FF0000';

cursorDiv.style.position = 'absolute';
cursorDiv.style.top = `${cursorTop}px`;
cursorDiv.style.left = `${cursorLeft}px`;
cursorDiv.style.width = '44px';
cursorDiv.style.height = '44px';


fieldDiv.addEventListener('mouseenter', () => {
    cursorDiv.style.display = 'block';
})

fieldDiv.addEventListener('mouseout', () => {
    cursorDiv.style.display = 'none';
})

fieldDiv.addEventListener('mousemove', (ev) => {
    cursorDiv.style.top = `${ev.pageY - fieldDiv.getBoundingClientRect().top}px`;
    cursorDiv.style.left = `${ev.pageX - fieldDiv.getBoundingClientRect().left}px`;
})

fieldDiv.addEventListener('click', (ev) => { // box distance check needed
    ballDiv.style.top = `${ev.pageY}px`;
    ballDiv.style.left = `${ev.pageX}px`;
})