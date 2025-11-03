const fieldDiv = document.querySelector('.football__field');
const ballDiv = document.querySelector('.football__ball');
const cursorDiv = document.querySelector('.football__cursor');
let fieldWidth = 720;
let fieldHeight = Math.floor(fieldWidth * 0.3);

let ballTop = 85;
let ballLeft = 92;

let cursorTop = 0;
let cursorLeft = 0;

fieldDiv.style.width = `${fieldWidth}px`;
fieldDiv.style.height = `${fieldHeight}px`;
fieldDiv.style.backgroundColor = '#5ABB58';
fieldDiv.style.borderColor = '#000000';
fieldDiv.style.borderRadius = '37px';
fieldDiv.style.cursor = 'none';

ballDiv.style.position = 'absolute';
ballDiv.style.top = `${ballTop}px`;
ballDiv.style.left = `${ballLeft}px`;
ballDiv.style.width = '50px';
ballDiv.style.height = '50px';
ballDiv.style.backgroundColor = '#FF0000';
// ballDiv.style.backgroundImage = './../images/Football_Image.png';

cursorDiv.style.position = 'absolute';
cursorDiv.style.top = `${cursorTop}px`;
cursorDiv.style.left = `${cursorLeft}px`;
cursorDiv.style.width = '44px';
cursorDiv.style.height = '44px';
cursorDiv.style.backgroundImage = './../images/Cursor_Image.png';


fieldDiv.addEventListener('mouseenter', () => {
    cursorDiv.style.display = 'block';
})

fieldDiv.addEventListener('mouseout', () => {
    cursorDiv.style.display = 'none';
})

fieldDiv.addEventListener('mousemove', (ev) => {
    cursorDiv.style.top = `${ev.offsetY}px`;
    cursorDiv.style.left = `${ev.offsetX}px`;
})

fieldDiv.addEventListener('click', (ev) => {
    ballDiv.style.top = `${ev.offsetY}px`;
    ballDiv.style.left = `${ev.offsetX}px`;
})