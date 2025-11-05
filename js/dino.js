const dinoSvg = document.querySelector('.dinoSVG');
const scoreText = document.querySelector('.scoreText');
const dinoColor = '#535353';
const runDelay = 230 / 120;
const ticksPerScore = 12;
const gravity = 0.1;

let svgWidth = 640;
let svgHeight = 240;
const groundY = 20 - svgHeight;
let dinoObj = {
    dinoX: 75,
    dinoHeight: 43,
    dinoY: groundY,
    dinoVelocityY: 0,
    dinoState: 'start',
    dinoSpeed: 1,
    dinoScore: 0,
    ableToJump: true
}
let time = 0;
let groundLines = [];
let deleteList = [];
let cactiArr = [];
addGroundLine();

dinoSvg.setAttribute('xmlns', "http://www.w3.org/2000/svg");
dinoSvg.setAttribute('version', "1.1");
dinoSvg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
dinoSvg.setAttribute('width', `${svgWidth}`);
dinoSvg.setAttribute('height', `${svgHeight}`);

function addLine(startPoint, endPoint) {
    let lineStr = `<line x1="${startPoint[0]}" y1="${startPoint[1]}" x2="${endPoint[0]}" y2="${endPoint[1]}" stroke="${dinoColor}"/>`;
    dinoSvg.insertAdjacentHTML('beforeend', lineStr);
}

function clear() {
    while (dinoSvg.hasChildNodes()) {
        dinoSvg.removeChild(dinoSvg.firstChild);
    }
}

function drawDino(state) {
    if (time % 4 !== 0) {
        return;
    }
    clear();
    if (state === 'idle') {
        addLine([dinoObj.dinoX + 22, -dinoObj.dinoY + 0], [dinoObj.dinoX + 38, -dinoObj.dinoY + 0]);
        addLine([dinoObj.dinoX + 22, -dinoObj.dinoY + 1], [dinoObj.dinoX + 38, -dinoObj.dinoY + 1]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 2], [dinoObj.dinoX + 40, -dinoObj.dinoY + 2]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 3], [dinoObj.dinoX + 23, -dinoObj.dinoY + 3]);
        addLine([dinoObj.dinoX + 26, -dinoObj.dinoY + 3], [dinoObj.dinoX + 40, -dinoObj.dinoY + 3]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 4], [dinoObj.dinoX + 23, -dinoObj.dinoY + 4]);
        addLine([dinoObj.dinoX + 26, -dinoObj.dinoY + 4], [dinoObj.dinoX + 40, -dinoObj.dinoY + 4]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 5], [dinoObj.dinoX + 40, -dinoObj.dinoY + 5]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 6], [dinoObj.dinoX + 40, -dinoObj.dinoY + 6]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 7], [dinoObj.dinoX + 40, -dinoObj.dinoY + 7]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 8], [dinoObj.dinoX + 40, -dinoObj.dinoY + 8]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 9], [dinoObj.dinoX + 40, -dinoObj.dinoY + 9]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 10], [dinoObj.dinoX + 40, -dinoObj.dinoY + 10]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 11], [dinoObj.dinoX + 29, -dinoObj.dinoY + 11]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 12], [dinoObj.dinoX + 29, -dinoObj.dinoY + 12]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 13], [dinoObj.dinoX + 35, -dinoObj.dinoY + 13]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 14], [dinoObj.dinoX + 35, -dinoObj.dinoY + 14]);
        addLine([dinoObj.dinoX + 1, -dinoObj.dinoY + 15], [dinoObj.dinoX + (-1), -dinoObj.dinoY + 15]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 15], [dinoObj.dinoX + 27, -dinoObj.dinoY + 15]);
        addLine([dinoObj.dinoX + 1, -dinoObj.dinoY + 16], [dinoObj.dinoX + (-1), -dinoObj.dinoY + 16]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 16], [dinoObj.dinoX + 27, -dinoObj.dinoY + 16]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 17], [dinoObj.dinoX + 1, -dinoObj.dinoY + 17]);
        addLine([dinoObj.dinoX + 15, -dinoObj.dinoY + 17], [dinoObj.dinoX + 27, -dinoObj.dinoY + 17]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 18], [dinoObj.dinoX + 1, -dinoObj.dinoY + 18]);
        addLine([dinoObj.dinoX + 15, -dinoObj.dinoY + 18], [dinoObj.dinoX + 27, -dinoObj.dinoY + 18]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 19], [dinoObj.dinoX + 3, -dinoObj.dinoY + 19]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 19], [dinoObj.dinoX + 32, -dinoObj.dinoY + 19]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 20], [dinoObj.dinoX + 3, -dinoObj.dinoY + 20]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 20], [dinoObj.dinoX + 32, -dinoObj.dinoY + 20]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 21], [dinoObj.dinoX + 5, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 21], [dinoObj.dinoX + 27, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + 30, -dinoObj.dinoY + 21], [dinoObj.dinoX + 32, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 22], [dinoObj.dinoX + 5, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 22], [dinoObj.dinoX + 27, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + 30, -dinoObj.dinoY + 22], [dinoObj.dinoX + 32, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 23], [dinoObj.dinoX + 27, -dinoObj.dinoY + 23]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 24], [dinoObj.dinoX + 27, -dinoObj.dinoY + 24]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 25], [dinoObj.dinoX + 27, -dinoObj.dinoY + 25]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 26], [dinoObj.dinoX + 27, -dinoObj.dinoY + 26]);
        addLine([dinoObj.dinoX + 2, -dinoObj.dinoY + 27], [dinoObj.dinoX + 27, -dinoObj.dinoY + 27]);
        addLine([dinoObj.dinoX + 2, -dinoObj.dinoY + 28], [dinoObj.dinoX + 25, -dinoObj.dinoY + 28]);
        addLine([dinoObj.dinoX + 4, -dinoObj.dinoY + 29], [dinoObj.dinoX + 25, -dinoObj.dinoY + 29]);
        addLine([dinoObj.dinoX + 4, -dinoObj.dinoY + 30], [dinoObj.dinoX + 25, -dinoObj.dinoY + 30]);
        addLine([dinoObj.dinoX + 6, -dinoObj.dinoY + 31], [dinoObj.dinoX + 23, -dinoObj.dinoY + 31]);
        addLine([dinoObj.dinoX + 6, -dinoObj.dinoY + 32], [dinoObj.dinoX + 23, -dinoObj.dinoY + 32]);
        addLine([dinoObj.dinoX + 8, -dinoObj.dinoY + 33], [dinoObj.dinoX + 21, -dinoObj.dinoY + 33]);
        addLine([dinoObj.dinoX + 8, -dinoObj.dinoY + 34], [dinoObj.dinoX + 21, -dinoObj.dinoY + 34]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 35], [dinoObj.dinoX + 15, -dinoObj.dinoY + 35]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 35], [dinoObj.dinoX + 21, -dinoObj.dinoY + 35]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 36], [dinoObj.dinoX + 15, -dinoObj.dinoY + 36]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 36], [dinoObj.dinoX + 21, -dinoObj.dinoY + 36]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 37], [dinoObj.dinoX + 13, -dinoObj.dinoY + 37]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 37], [dinoObj.dinoX + 21, -dinoObj.dinoY + 37]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 38], [dinoObj.dinoX + 13, -dinoObj.dinoY + 38]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 38], [dinoObj.dinoX + 21, -dinoObj.dinoY + 38]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 39], [dinoObj.dinoX + 11, -dinoObj.dinoY + 39]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 39], [dinoObj.dinoX + 21, -dinoObj.dinoY + 39]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 40], [dinoObj.dinoX + 11, -dinoObj.dinoY + 40]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 40], [dinoObj.dinoX + 21, -dinoObj.dinoY + 40]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 41], [dinoObj.dinoX + 13, -dinoObj.dinoY + 41]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 41], [dinoObj.dinoX + 23, -dinoObj.dinoY + 41]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 42], [dinoObj.dinoX + 13, -dinoObj.dinoY + 42]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 42], [dinoObj.dinoX + 23, -dinoObj.dinoY + 42]);
    }
    else if (state === 'run1') {
        addLine([dinoObj.dinoX + 22, -dinoObj.dinoY + 0], [dinoObj.dinoX + 38, -dinoObj.dinoY + 0]);
        addLine([dinoObj.dinoX + 22, -dinoObj.dinoY + 1], [dinoObj.dinoX + 38, -dinoObj.dinoY + 1]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 2], [dinoObj.dinoX + 40, -dinoObj.dinoY + 2]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 3], [dinoObj.dinoX + 23, -dinoObj.dinoY + 3]);
        addLine([dinoObj.dinoX + 26, -dinoObj.dinoY + 3], [dinoObj.dinoX + 40, -dinoObj.dinoY + 3]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 4], [dinoObj.dinoX + 23, -dinoObj.dinoY + 4]);
        addLine([dinoObj.dinoX + 26, -dinoObj.dinoY + 4], [dinoObj.dinoX + 40, -dinoObj.dinoY + 4]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 5], [dinoObj.dinoX + 40, -dinoObj.dinoY + 5]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 6], [dinoObj.dinoX + 40, -dinoObj.dinoY + 6]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 7], [dinoObj.dinoX + 40, -dinoObj.dinoY + 7]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 8], [dinoObj.dinoX + 40, -dinoObj.dinoY + 8]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 9], [dinoObj.dinoX + 40, -dinoObj.dinoY + 9]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 10], [dinoObj.dinoX + 40, -dinoObj.dinoY + 10]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 11], [dinoObj.dinoX + 29, -dinoObj.dinoY + 11]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 12], [dinoObj.dinoX + 29, -dinoObj.dinoY + 12]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 13], [dinoObj.dinoX + 35, -dinoObj.dinoY + 13]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 14], [dinoObj.dinoX + 35, -dinoObj.dinoY + 14]);
        addLine([dinoObj.dinoX + 1, -dinoObj.dinoY + 15], [dinoObj.dinoX + (-1), -dinoObj.dinoY + 15]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 15], [dinoObj.dinoX + 27, -dinoObj.dinoY + 15]);
        addLine([dinoObj.dinoX + 1, -dinoObj.dinoY + 16], [dinoObj.dinoX + (-1), -dinoObj.dinoY + 16]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 16], [dinoObj.dinoX + 27, -dinoObj.dinoY + 16]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 17], [dinoObj.dinoX + 1, -dinoObj.dinoY + 17]);
        addLine([dinoObj.dinoX + 15, -dinoObj.dinoY + 17], [dinoObj.dinoX + 27, -dinoObj.dinoY + 17]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 18], [dinoObj.dinoX + 1, -dinoObj.dinoY + 18]);
        addLine([dinoObj.dinoX + 15, -dinoObj.dinoY + 18], [dinoObj.dinoX + 27, -dinoObj.dinoY + 18]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 19], [dinoObj.dinoX + 3, -dinoObj.dinoY + 19]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 19], [dinoObj.dinoX + 32, -dinoObj.dinoY + 19]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 20], [dinoObj.dinoX + 3, -dinoObj.dinoY + 20]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 20], [dinoObj.dinoX + 32, -dinoObj.dinoY + 20]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 21], [dinoObj.dinoX + 5, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 21], [dinoObj.dinoX + 27, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + 30, -dinoObj.dinoY + 21], [dinoObj.dinoX + 32, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 22], [dinoObj.dinoX + 5, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 22], [dinoObj.dinoX + 27, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + 30, -dinoObj.dinoY + 22], [dinoObj.dinoX + 32, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 23], [dinoObj.dinoX + 27, -dinoObj.dinoY + 23]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 24], [dinoObj.dinoX + 27, -dinoObj.dinoY + 24]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 25], [dinoObj.dinoX + 27, -dinoObj.dinoY + 25]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 26], [dinoObj.dinoX + 27, -dinoObj.dinoY + 26]);
        addLine([dinoObj.dinoX + 2, -dinoObj.dinoY + 27], [dinoObj.dinoX + 27, -dinoObj.dinoY + 27]);
        addLine([dinoObj.dinoX + 2, -dinoObj.dinoY + 28], [dinoObj.dinoX + 25, -dinoObj.dinoY + 28]);
        addLine([dinoObj.dinoX + 4, -dinoObj.dinoY + 29], [dinoObj.dinoX + 25, -dinoObj.dinoY + 29]);
        addLine([dinoObj.dinoX + 4, -dinoObj.dinoY + 30], [dinoObj.dinoX + 25, -dinoObj.dinoY + 30]);
        addLine([dinoObj.dinoX + 6, -dinoObj.dinoY + 31], [dinoObj.dinoX + 23, -dinoObj.dinoY + 31]);
        addLine([dinoObj.dinoX + 6, -dinoObj.dinoY + 32], [dinoObj.dinoX + 23, -dinoObj.dinoY + 32]);
        addLine([dinoObj.dinoX + 8, -dinoObj.dinoY + 33], [dinoObj.dinoX + 21, -dinoObj.dinoY + 33]);
        addLine([dinoObj.dinoX + 8, -dinoObj.dinoY + 34], [dinoObj.dinoX + 21, -dinoObj.dinoY + 34]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 35], [dinoObj.dinoX + 15, -dinoObj.dinoY + 35]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 35], [dinoObj.dinoX + 24, -dinoObj.dinoY + 35]); //
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 36], [dinoObj.dinoX + 15, -dinoObj.dinoY + 36]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 36], [dinoObj.dinoX + 24, -dinoObj.dinoY + 36]); //
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 37], [dinoObj.dinoX + 13, -dinoObj.dinoY + 37]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 38], [dinoObj.dinoX + 13, -dinoObj.dinoY + 38]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 39], [dinoObj.dinoX + 11, -dinoObj.dinoY + 39]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 40], [dinoObj.dinoX + 11, -dinoObj.dinoY + 40]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 41], [dinoObj.dinoX + 13, -dinoObj.dinoY + 41]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 42], [dinoObj.dinoX + 13, -dinoObj.dinoY + 42]);
    }
    else if (state === 'run2') {
        addLine([dinoObj.dinoX + 22, -dinoObj.dinoY + 0], [dinoObj.dinoX + 38, -dinoObj.dinoY + 0]);
        addLine([dinoObj.dinoX + 22, -dinoObj.dinoY + 1], [dinoObj.dinoX + 38, -dinoObj.dinoY + 1]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 2], [dinoObj.dinoX + 40, -dinoObj.dinoY + 2]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 3], [dinoObj.dinoX + 23, -dinoObj.dinoY + 3]);
        addLine([dinoObj.dinoX + 26, -dinoObj.dinoY + 3], [dinoObj.dinoX + 40, -dinoObj.dinoY + 3]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 4], [dinoObj.dinoX + 23, -dinoObj.dinoY + 4]);
        addLine([dinoObj.dinoX + 26, -dinoObj.dinoY + 4], [dinoObj.dinoX + 40, -dinoObj.dinoY + 4]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 5], [dinoObj.dinoX + 40, -dinoObj.dinoY + 5]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 6], [dinoObj.dinoX + 40, -dinoObj.dinoY + 6]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 7], [dinoObj.dinoX + 40, -dinoObj.dinoY + 7]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 8], [dinoObj.dinoX + 40, -dinoObj.dinoY + 8]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 9], [dinoObj.dinoX + 40, -dinoObj.dinoY + 9]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 10], [dinoObj.dinoX + 40, -dinoObj.dinoY + 10]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 11], [dinoObj.dinoX + 29, -dinoObj.dinoY + 11]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 12], [dinoObj.dinoX + 29, -dinoObj.dinoY + 12]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 13], [dinoObj.dinoX + 35, -dinoObj.dinoY + 13]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 14], [dinoObj.dinoX + 35, -dinoObj.dinoY + 14]);
        addLine([dinoObj.dinoX + 1, -dinoObj.dinoY + 15], [dinoObj.dinoX + (-1), -dinoObj.dinoY + 15]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 15], [dinoObj.dinoX + 27, -dinoObj.dinoY + 15]);
        addLine([dinoObj.dinoX + 1, -dinoObj.dinoY + 16], [dinoObj.dinoX + (-1), -dinoObj.dinoY + 16]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 16], [dinoObj.dinoX + 27, -dinoObj.dinoY + 16]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 17], [dinoObj.dinoX + 1, -dinoObj.dinoY + 17]);
        addLine([dinoObj.dinoX + 15, -dinoObj.dinoY + 17], [dinoObj.dinoX + 27, -dinoObj.dinoY + 17]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 18], [dinoObj.dinoX + 1, -dinoObj.dinoY + 18]);
        addLine([dinoObj.dinoX + 15, -dinoObj.dinoY + 18], [dinoObj.dinoX + 27, -dinoObj.dinoY + 18]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 19], [dinoObj.dinoX + 3, -dinoObj.dinoY + 19]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 19], [dinoObj.dinoX + 32, -dinoObj.dinoY + 19]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 20], [dinoObj.dinoX + 3, -dinoObj.dinoY + 20]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 20], [dinoObj.dinoX + 32, -dinoObj.dinoY + 20]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 21], [dinoObj.dinoX + 5, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 21], [dinoObj.dinoX + 27, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + 30, -dinoObj.dinoY + 21], [dinoObj.dinoX + 32, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 22], [dinoObj.dinoX + 5, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 22], [dinoObj.dinoX + 27, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + 30, -dinoObj.dinoY + 22], [dinoObj.dinoX + 32, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 23], [dinoObj.dinoX + 27, -dinoObj.dinoY + 23]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 24], [dinoObj.dinoX + 27, -dinoObj.dinoY + 24]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 25], [dinoObj.dinoX + 27, -dinoObj.dinoY + 25]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 26], [dinoObj.dinoX + 27, -dinoObj.dinoY + 26]);
        addLine([dinoObj.dinoX + 2, -dinoObj.dinoY + 27], [dinoObj.dinoX + 27, -dinoObj.dinoY + 27]);
        addLine([dinoObj.dinoX + 2, -dinoObj.dinoY + 28], [dinoObj.dinoX + 25, -dinoObj.dinoY + 28]);
        addLine([dinoObj.dinoX + 4, -dinoObj.dinoY + 29], [dinoObj.dinoX + 25, -dinoObj.dinoY + 29]);
        addLine([dinoObj.dinoX + 4, -dinoObj.dinoY + 30], [dinoObj.dinoX + 25, -dinoObj.dinoY + 30]);
        addLine([dinoObj.dinoX + 6, -dinoObj.dinoY + 31], [dinoObj.dinoX + 23, -dinoObj.dinoY + 31]);
        addLine([dinoObj.dinoX + 6, -dinoObj.dinoY + 32], [dinoObj.dinoX + 23, -dinoObj.dinoY + 32]);
        addLine([dinoObj.dinoX + 8, -dinoObj.dinoY + 33], [dinoObj.dinoX + 21, -dinoObj.dinoY + 33]);
        addLine([dinoObj.dinoX + 8, -dinoObj.dinoY + 34], [dinoObj.dinoX + 21, -dinoObj.dinoY + 34]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 35], [dinoObj.dinoX + 13, -dinoObj.dinoY + 35]); //
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 35], [dinoObj.dinoX + 21, -dinoObj.dinoY + 35]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 36], [dinoObj.dinoX + 13, -dinoObj.dinoY + 36]); //
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 36], [dinoObj.dinoX + 21, -dinoObj.dinoY + 36]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 37], [dinoObj.dinoX + 15, -dinoObj.dinoY + 37]); //
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 37], [dinoObj.dinoX + 21, -dinoObj.dinoY + 37]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 38], [dinoObj.dinoX + 15, -dinoObj.dinoY + 38]); //
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 38], [dinoObj.dinoX + 21, -dinoObj.dinoY + 38]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 39], [dinoObj.dinoX + 21, -dinoObj.dinoY + 39]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 40], [dinoObj.dinoX + 21, -dinoObj.dinoY + 40]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 41], [dinoObj.dinoX + 23, -dinoObj.dinoY + 41]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 42], [dinoObj.dinoX + 23, -dinoObj.dinoY + 42]);
    }
    else if (state === 'dead') {
        addLine([dinoObj.dinoX + 22, -dinoObj.dinoY + 0], [dinoObj.dinoX + 38, -dinoObj.dinoY + 0]);
        addLine([dinoObj.dinoX + 22, -dinoObj.dinoY + 1], [dinoObj.dinoX + 38, -dinoObj.dinoY + 1]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 2], [dinoObj.dinoX + 40, -dinoObj.dinoY + 2]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 3], [dinoObj.dinoX + 23, -dinoObj.dinoY + 3]); //
        addLine([dinoObj.dinoX + 27, -dinoObj.dinoY + 3], [dinoObj.dinoX + 40, -dinoObj.dinoY + 3]); //
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 4], [dinoObj.dinoX + 23, -dinoObj.dinoY + 4]); //
        addLine([dinoObj.dinoX + 24, -dinoObj.dinoY + 4], [dinoObj.dinoX + 26, -dinoObj.dinoY + 4]); //
        addLine([dinoObj.dinoX + 27, -dinoObj.dinoY + 4], [dinoObj.dinoX + 40, -dinoObj.dinoY + 4]); //
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 5], [dinoObj.dinoX + 23, -dinoObj.dinoY + 5]); //
        addLine([dinoObj.dinoX + 24, -dinoObj.dinoY + 5], [dinoObj.dinoX + 26, -dinoObj.dinoY + 5]); //
        addLine([dinoObj.dinoX + 27, -dinoObj.dinoY + 5], [dinoObj.dinoX + 40, -dinoObj.dinoY + 5]); //
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 6], [dinoObj.dinoX + 23, -dinoObj.dinoY + 6]); //
        addLine([dinoObj.dinoX + 27, -dinoObj.dinoY + 6], [dinoObj.dinoX + 40, -dinoObj.dinoY + 6]); //
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 7], [dinoObj.dinoX + 40, -dinoObj.dinoY + 7]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 8], [dinoObj.dinoX + 40, -dinoObj.dinoY + 8]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 9], [dinoObj.dinoX + 40, -dinoObj.dinoY + 9]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 10], [dinoObj.dinoX + 40, -dinoObj.dinoY + 10]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 11], [dinoObj.dinoX + 40, -dinoObj.dinoY + 11]); //
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 12], [dinoObj.dinoX + 40, -dinoObj.dinoY + 12]); //
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 13], [dinoObj.dinoX + 35, -dinoObj.dinoY + 13]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 14], [dinoObj.dinoX + 35, -dinoObj.dinoY + 14]);
        addLine([dinoObj.dinoX + 1, -dinoObj.dinoY + 15], [dinoObj.dinoX + (-1), -dinoObj.dinoY + 15]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 15], [dinoObj.dinoX + 27, -dinoObj.dinoY + 15]);
        addLine([dinoObj.dinoX + 1, -dinoObj.dinoY + 16], [dinoObj.dinoX + (-1), -dinoObj.dinoY + 16]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 16], [dinoObj.dinoX + 27, -dinoObj.dinoY + 16]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 17], [dinoObj.dinoX + 1, -dinoObj.dinoY + 17]);
        addLine([dinoObj.dinoX + 15, -dinoObj.dinoY + 17], [dinoObj.dinoX + 27, -dinoObj.dinoY + 17]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 18], [dinoObj.dinoX + 1, -dinoObj.dinoY + 18]);
        addLine([dinoObj.dinoX + 15, -dinoObj.dinoY + 18], [dinoObj.dinoX + 27, -dinoObj.dinoY + 18]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 19], [dinoObj.dinoX + 3, -dinoObj.dinoY + 19]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 19], [dinoObj.dinoX + 32, -dinoObj.dinoY + 19]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 20], [dinoObj.dinoX + 3, -dinoObj.dinoY + 20]);
        addLine([dinoObj.dinoX + 12, -dinoObj.dinoY + 20], [dinoObj.dinoX + 32, -dinoObj.dinoY + 20]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 21], [dinoObj.dinoX + 5, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 21], [dinoObj.dinoX + 27, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + 30, -dinoObj.dinoY + 21], [dinoObj.dinoX + 32, -dinoObj.dinoY + 21]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 22], [dinoObj.dinoX + 5, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 22], [dinoObj.dinoX + 27, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + 30, -dinoObj.dinoY + 22], [dinoObj.dinoX + 32, -dinoObj.dinoY + 22]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 23], [dinoObj.dinoX + 27, -dinoObj.dinoY + 23]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 24], [dinoObj.dinoX + 27, -dinoObj.dinoY + 24]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 25], [dinoObj.dinoX + 27, -dinoObj.dinoY + 25]);
        addLine([dinoObj.dinoX + (-1), -dinoObj.dinoY + 26], [dinoObj.dinoX + 27, -dinoObj.dinoY + 26]);
        addLine([dinoObj.dinoX + 2, -dinoObj.dinoY + 27], [dinoObj.dinoX + 27, -dinoObj.dinoY + 27]);
        addLine([dinoObj.dinoX + 2, -dinoObj.dinoY + 28], [dinoObj.dinoX + 25, -dinoObj.dinoY + 28]);
        addLine([dinoObj.dinoX + 4, -dinoObj.dinoY + 29], [dinoObj.dinoX + 25, -dinoObj.dinoY + 29]);
        addLine([dinoObj.dinoX + 4, -dinoObj.dinoY + 30], [dinoObj.dinoX + 25, -dinoObj.dinoY + 30]);
        addLine([dinoObj.dinoX + 6, -dinoObj.dinoY + 31], [dinoObj.dinoX + 23, -dinoObj.dinoY + 31]);
        addLine([dinoObj.dinoX + 6, -dinoObj.dinoY + 32], [dinoObj.dinoX + 23, -dinoObj.dinoY + 32]);
        addLine([dinoObj.dinoX + 8, -dinoObj.dinoY + 33], [dinoObj.dinoX + 21, -dinoObj.dinoY + 33]);
        addLine([dinoObj.dinoX + 8, -dinoObj.dinoY + 34], [dinoObj.dinoX + 21, -dinoObj.dinoY + 34]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 35], [dinoObj.dinoX + 15, -dinoObj.dinoY + 35]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 35], [dinoObj.dinoX + 21, -dinoObj.dinoY + 35]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 36], [dinoObj.dinoX + 15, -dinoObj.dinoY + 36]);
        addLine([dinoObj.dinoX + 18, -dinoObj.dinoY + 36], [dinoObj.dinoX + 21, -dinoObj.dinoY + 36]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 37], [dinoObj.dinoX + 13, -dinoObj.dinoY + 37]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 37], [dinoObj.dinoX + 21, -dinoObj.dinoY + 37]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 38], [dinoObj.dinoX + 13, -dinoObj.dinoY + 38]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 38], [dinoObj.dinoX + 21, -dinoObj.dinoY + 38]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 39], [dinoObj.dinoX + 11, -dinoObj.dinoY + 39]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 39], [dinoObj.dinoX + 21, -dinoObj.dinoY + 39]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 40], [dinoObj.dinoX + 11, -dinoObj.dinoY + 40]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 40], [dinoObj.dinoX + 21, -dinoObj.dinoY + 40]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 41], [dinoObj.dinoX + 13, -dinoObj.dinoY + 41]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 41], [dinoObj.dinoX + 23, -dinoObj.dinoY + 41]);
        addLine([dinoObj.dinoX + 9, -dinoObj.dinoY + 42], [dinoObj.dinoX + 13, -dinoObj.dinoY + 42]);
        addLine([dinoObj.dinoX + 19, -dinoObj.dinoY + 42], [dinoObj.dinoX + 23, -dinoObj.dinoY + 42]);
    }
    else {
        console.error('Invalid dino state');
    }
}

function addGroundLine() {
    groundLines.push([[dinoObj.dinoX, -groundY], [svgWidth, -groundY]]);
}

function updateGround() {
    groundLines[0][0][0] = Math.max(groundLines[0][0][0] - 1, 0);
    for (let i = 1; i < groundLines.length; i++) {
        groundLines[i][0][0] = groundLines[i][0][0] - 1;
        groundLines[i][1][0] = groundLines[i][1][0] - 1;
        if (groundLines[i][1][0] < 0) {
            deleteList.push(i);
        }
    }
    groundLines = groundLines.filter((_, idx) => !deleteList.includes(idx));
    deleteList = [];
}

function addSand() {
    if (Math.random() < 0.02) {
        let sandY = Math.ceil(2 + Math.random() * 14)
        groundLines.push([[svgWidth, -groundY + sandY], [svgWidth + Math.ceil(Math.random() * 2), -groundY + sandY]]);
    }
}

function drawGround() {
    for (const [start, end] of groundLines) {
        addLine(start, end);
    }
}

function drawRunningDino() {
    drawDino(`run${(Math.floor(time / 16) % 2 === 0) ? 1 : 2}`);
}

function randomCacti(maxWidth = Infinity, ableToBranch = true) {
    let resultCacti = {
        posX: null, // Number
        height: null, // Number
        stemWidth: null, // Number
        branches: null // [[Number, Object, String]]
    }
    resultCacti.posX = svgWidth + 100;
    resultCacti.height = 20 + Math.ceil(Math.random() * 40);
    resultCacti.stemWidth = Math.min(1 + Math.floor(Math.random() * 2), maxWidth);
    resultCacti.branches = [];
    if (ableToBranch && resultCacti.stemWidth > 1) {
        if (Math.random() < 0.5) {
            resultCacti.branches.push([10 + Math.floor(Math.random() * (resultCacti.height - 20)), randomCacti(maxWidth = resultCacti.stemWidth - 1, ableToBranch = false), 'right']);
        }
        if (Math.random() < 0.5) {
            resultCacti.branches.push([10 + Math.floor(Math.random() * (resultCacti.height - 20)), randomCacti(maxWidth = resultCacti.stemWidth - 1, ableToBranch = false), 'left']);
        }
    }
    return resultCacti;
}

function genCacti() {
    if (cactiArr.length === 0) {
        if (time >= 1000) {
            cactiArr.push(randomCacti());
            console.log(cactiArr);
        }
        return;
    }
    if (cactiArr[cactiArr.length - 1].posX < svgWidth / 2 - (Math.random() * 50)) {

    }
}

function gameLoop() {    
    if (dinoObj.dinoState === 'start') {
        drawDino('idle');
    }
    else {
        if (dinoObj.dinoState === 'dead') {
            drawDino('dead');
        }
        if (dinoObj.dinoState === 'running' || dinoObj.dinoState === 'jump' || dinoObj.dinoState === 'fall') {
            if (dinoObj.dinoState === 'jump') {
                dinoObj.dinoVelocityY = 5;
                dinoObj.dinoY += 0.01;
                dinoObj.dinoState = 'fall';
            }
            if (dinoObj.dinoY === groundY + dinoObj.dinoHeight) {
                dinoObj.dinoState = 'running';
                dinoObj.dinoVelocityY = 0;
            }
            if (dinoObj.dinoState === 'running') {
                drawRunningDino();
            }
            if (dinoObj.dinoState === 'fall') {
                drawDino('idle');
                dinoObj.dinoVelocityY = Math.max(-10, dinoObj.dinoVelocityY - gravity);
            }
            dinoObj.dinoScore += dinoObj.dinoSpeed / ticksPerScore;
            time++;
            updateGround();
            addSand();
            genCacti();
        }
        drawGround();
    }
    dinoObj.dinoY = Math.max(groundY + dinoObj.dinoHeight, dinoObj.dinoY + dinoObj.dinoVelocityY);
    scoreText.textContent = `${time} ${dinoObj.dinoY} ${groundLines.length}`;
}

setInterval(gameLoop, runDelay);

addEventListener('keydown', (ev) => {
    if (ev.key === ' ') {
        ev.preventDefault();
        dinoObj.dinoState = (dinoObj.dinoState === 'running') ? 'jump' : 'fall';
        console.log('hey');
    }
});

addEventListener('keyup', (ev) => {
    console.log(ev);
    if (ev.key === ' ') {
        ev.preventDefault();
        dinoObj.dinoState = 'fall';
        console.log('bye');
    }
});