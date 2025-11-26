const dinoSvg = document.querySelector('.dinoSVG');
const dinoKeyCatch = document.querySelector('.dinoKeyCatch');
const dinoColor = '#535353';
const numColor = '#9B9B9B';
const runDelay = 1000 / 480;
const ticksPerScore = 96;
const gravity = 0.075;
const svgWidth = 640;
const svgHeight = 240;
const groundY = 20 - svgHeight;

let dinoObj;
let time;
let startT;
let groundLines;
let groundDeleteList;
let cactiArr;
let cactiDeleteList;
let hitboxArr;
let hitboxDeleteList;
let ΔtArr;
let inDebug = false;
let highestScore = 0;

function setup() {
    dinoObj = {
        dinoX: 75,
        dinoHeight: 43,
        dinoY: groundY + 43,
        dinoVelocityY: 0,
        dinoState: 'start',
        dinoSpeed: 1,
        dinoScore: 0,
        ableToJump: true,
        dinoRect: [75 - 1, -groundY - 43, 41, 44]
    }
    time = 0;
    startT = Date.now();
    groundLines = [];
    groundDeleteList = [];
    cactiArr = [];
    cactiDeleteList = [];
    hitboxArr = [];
    hitboxDeleteList = [];
    ΔtArr = [];
    addGroundLine();
}

dinoSvg.setAttribute('xmlns', "http://www.w3.org/2000/svg");
dinoSvg.setAttribute('version', "1.1");
dinoSvg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
dinoSvg.setAttribute('width', `${svgWidth}`);
dinoSvg.setAttribute('height', `${svgHeight}`);

dinoSvg.style.position = 'relative';
dinoSvg.style.top = `${-svgHeight}px`;
dinoSvg.style.backgroundColor = '#FFFFFF';
dinoSvg.style.borderRadius = '10px';

dinoKeyCatch.style.width = `${svgWidth}px`;
dinoKeyCatch.style.height = `${svgHeight}px`;
dinoKeyCatch.style.zIndex = '100';


function addLine(startPoint, endPoint, color = dinoColor) {
    let lineStr = `<line x1="${startPoint[0]}" y1="${startPoint[1]}" x2="${endPoint[0]}" y2="${endPoint[1]}" stroke="${color}"/>`;
    dinoSvg.insertAdjacentHTML('beforeend', lineStr);
}

function addRect(rect, color) {
    let rectStr = `<rect x="${rect[0]}" y="${rect[1]}" width="${rect[2]}" height="${rect[3]}" fill="${color}" fill-opacity="0.25"/>`;
    dinoSvg.insertAdjacentHTML('beforeend', rectStr);
}

function clear() {
    while (dinoSvg.hasChildNodes()) {
        dinoSvg.removeChild(dinoSvg.firstChild);
    }
}

function drawDino(state) {
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

function drawNum(numPosX, numPosY, i, color = dinoColor) {
    switch (i) {
        case 0:
            addLine([numPosX + 4, numPosY + 0], [numPosX + 11, numPosY + 0], color = color);
            addLine([numPosX + 4, numPosY + 1], [numPosX + 11, numPosY + 1], color = color);
            addLine([numPosX + 2, numPosY + 2], [numPosX + 5, numPosY + 2], color = color);
            addLine([numPosX + 8, numPosY + 2], [numPosX + 13, numPosY + 2], color = color);
            addLine([numPosX + 2, numPosY + 3], [numPosX + 5, numPosY + 3], color = color);
            addLine([numPosX + 8, numPosY + 3], [numPosX + 13, numPosY + 3], color = color);
            addLine([numPosX + 2, numPosY + 4], [numPosX + 5, numPosY + 4], color = color);
            addLine([numPosX + 8, numPosY + 4], [numPosX + 13, numPosY + 4], color = color);
            addLine([numPosX + 0, numPosY + 5], [numPosX + 5, numPosY + 5], color = color);
            addLine([numPosX + 10, numPosY + 5], [numPosX + 15, numPosY + 5], color = color);
            addLine([numPosX + 0, numPosY + 6], [numPosX + 5, numPosY + 6], color = color);
            addLine([numPosX + 10, numPosY + 6], [numPosX + 15, numPosY + 6], color = color);
            addLine([numPosX + 0, numPosY + 7], [numPosX + 5, numPosY + 7], color = color);
            addLine([numPosX + 10, numPosY + 7], [numPosX + 15, numPosY + 7], color = color);
            addLine([numPosX + 0, numPosY + 8], [numPosX + 5, numPosY + 8], color = color);
            addLine([numPosX + 10, numPosY + 8], [numPosX + 15, numPosY + 8], color = color);
            addLine([numPosX + 0, numPosY + 9], [numPosX + 5, numPosY + 9], color = color);
            addLine([numPosX + 10, numPosY + 9], [numPosX + 15, numPosY + 9], color = color);
            addLine([numPosX + 0, numPosY + 10], [numPosX + 5, numPosY + 10], color = color);
            addLine([numPosX + 10, numPosY + 10], [numPosX + 15, numPosY + 10], color = color);
            addLine([numPosX + 0, numPosY + 11], [numPosX + 5, numPosY + 11], color = color);
            addLine([numPosX + 10, numPosY + 11], [numPosX + 15, numPosY + 11], color = color);
            addLine([numPosX + 2, numPosY + 12], [numPosX + 7, numPosY + 12], color = color);
            addLine([numPosX + 10, numPosY + 12], [numPosX + 13, numPosY + 12], color = color);
            addLine([numPosX + 2, numPosY + 13], [numPosX + 7, numPosY + 13], color = color);
            addLine([numPosX + 10, numPosY + 13], [numPosX + 13, numPosY + 13], color = color);
            addLine([numPosX + 2, numPosY + 14], [numPosX + 7, numPosY + 14], color = color);
            addLine([numPosX + 10, numPosY + 14], [numPosX + 13, numPosY + 14], color = color);
            addLine([numPosX + 4, numPosY + 15], [numPosX + 11, numPosY + 15], color = color);
            addLine([numPosX + 4, numPosY + 16], [numPosX + 11, numPosY + 16], color = color);
            break;
        case 1:
            addLine([numPosX + 5, numPosY + 0], [numPosX + 10, numPosY + 0], color = color);
            addLine([numPosX + 5, numPosY + 1], [numPosX + 10, numPosY + 1], color = color);
            addLine([numPosX + 3, numPosY + 2], [numPosX + 10, numPosY + 2], color = color);
            addLine([numPosX + 3, numPosY + 3], [numPosX + 10, numPosY + 3], color = color);
            addLine([numPosX + 3, numPosY + 4], [numPosX + 10, numPosY + 4], color = color);
            addLine([numPosX + 5, numPosY + 5], [numPosX + 10, numPosY + 5], color = color);
            addLine([numPosX + 5, numPosY + 6], [numPosX + 10, numPosY + 6], color = color);
            addLine([numPosX + 5, numPosY + 7], [numPosX + 10, numPosY + 7], color = color);
            addLine([numPosX + 5, numPosY + 8], [numPosX + 10, numPosY + 8], color = color);
            addLine([numPosX + 5, numPosY + 9], [numPosX + 10, numPosY + 9], color = color);
            addLine([numPosX + 5, numPosY + 10], [numPosX + 10, numPosY + 10], color = color);
            addLine([numPosX + 5, numPosY + 11], [numPosX + 10, numPosY + 11], color = color);
            addLine([numPosX + 5, numPosY + 12], [numPosX + 10, numPosY + 12], color = color);
            addLine([numPosX + 5, numPosY + 13], [numPosX + 10, numPosY + 13], color = color);
            addLine([numPosX + 5, numPosY + 14], [numPosX + 10, numPosY + 14], color = color);
            addLine([numPosX + 0, numPosY + 15], [numPosX + 15, numPosY + 15], color = color);
            addLine([numPosX + 0, numPosY + 16], [numPosX + 15, numPosY + 16], color = color);
            break;
        case 2:
            addLine([numPosX + 2, numPosY + 0], [numPosX + 12, numPosY + 0], color = color);
            addLine([numPosX + 2, numPosY + 1], [numPosX + 12, numPosY + 1], color = color);
            addLine([numPosX + 0, numPosY + 2], [numPosX + 4, numPosY + 2], color = color);
            addLine([numPosX + 10, numPosY + 2], [numPosX + 15, numPosY + 2], color = color);
            addLine([numPosX + 0, numPosY + 3], [numPosX + 4, numPosY + 3], color = color);
            addLine([numPosX + 10, numPosY + 3], [numPosX + 15, numPosY + 3], color = color);
            addLine([numPosX + 0, numPosY + 4], [numPosX + 4, numPosY + 4], color = color);
            addLine([numPosX + 10, numPosY + 4], [numPosX + 15, numPosY + 4], color = color);
            addLine([numPosX + 8, numPosY + 5], [numPosX + 15, numPosY + 5], color = color);
            addLine([numPosX + 8, numPosY + 6], [numPosX + 15, numPosY + 6], color = color);
            addLine([numPosX + 4, numPosY + 7], [numPosX + 13, numPosY + 7], color = color);
            addLine([numPosX + 4, numPosY + 8], [numPosX + 13, numPosY + 8], color = color);
            addLine([numPosX + 4, numPosY + 9], [numPosX + 13, numPosY + 9], color = color);
            addLine([numPosX + 2, numPosY + 10], [numPosX + 11, numPosY + 10], color = color);
            addLine([numPosX + 2, numPosY + 11], [numPosX + 11, numPosY + 11], color = color);
            addLine([numPosX + 0, numPosY + 12], [numPosX + 7, numPosY + 12], color = color);
            addLine([numPosX + 0, numPosY + 13], [numPosX + 7, numPosY + 13], color = color);
            addLine([numPosX + 0, numPosY + 14], [numPosX + 7, numPosY + 14], color = color);
            addLine([numPosX + 0, numPosY + 15], [numPosX + 15, numPosY + 15], color = color);
            addLine([numPosX + 0, numPosY + 16], [numPosX + 15, numPosY + 16], color = color);
            break;
        case 3:
            addLine([numPosX + 2, numPosY + 0], [numPosX + 15, numPosY + 0], color = color);
            addLine([numPosX + 2, numPosY + 1], [numPosX + 15, numPosY + 1], color = color);
            addLine([numPosX + 9, numPosY + 2], [numPosX + 13, numPosY + 2], color = color);
            addLine([numPosX + 9, numPosY + 3], [numPosX + 13, numPosY + 3], color = color);
            addLine([numPosX + 9, numPosY + 4], [numPosX + 13, numPosY + 4], color = color);
            addLine([numPosX + 6, numPosY + 5], [numPosX + 11, numPosY + 5], color = color);
            addLine([numPosX + 6, numPosY + 6], [numPosX + 11, numPosY + 6], color = color);
            addLine([numPosX + 4, numPosY + 7], [numPosX + 13, numPosY + 7], color = color);
            addLine([numPosX + 4, numPosY + 8], [numPosX + 13, numPosY + 8], color = color);
            addLine([numPosX + 4, numPosY + 9], [numPosX + 13, numPosY + 9], color = color);
            addLine([numPosX + 10, numPosY + 10], [numPosX + 15, numPosY + 10], color = color);
            addLine([numPosX + 10, numPosY + 11], [numPosX + 15, numPosY + 11], color = color);
            addLine([numPosX + 0, numPosY + 12], [numPosX + 5, numPosY + 12], color = color);
            addLine([numPosX + 10, numPosY + 12], [numPosX + 15, numPosY + 12], color = color);
            addLine([numPosX + 0, numPosY + 13], [numPosX + 5, numPosY + 13], color = color);
            addLine([numPosX + 10, numPosY + 13], [numPosX + 15, numPosY + 13], color = color);
            addLine([numPosX + 0, numPosY + 14], [numPosX + 5, numPosY + 14], color = color);
            addLine([numPosX + 10, numPosY + 14], [numPosX + 15, numPosY + 14], color = color);
            addLine([numPosX + 2, numPosY + 15], [numPosX + 13, numPosY + 15], color = color);
            addLine([numPosX + 2, numPosY + 16], [numPosX + 13, numPosY + 16], color = color);
            break;
        case 4:
            addLine([numPosX + 6, numPosY + 0], [numPosX + 13, numPosY + 0], color = color);
            addLine([numPosX + 6, numPosY + 1], [numPosX + 13, numPosY + 1], color = color);
            addLine([numPosX + 5, numPosY + 2], [numPosX + 13, numPosY + 2], color = color);
            addLine([numPosX + 5, numPosY + 3], [numPosX + 13, numPosY + 3], color = color);
            addLine([numPosX + 4, numPosY + 4], [numPosX + 7, numPosY + 4], color = color);
            addLine([numPosX + 4, numPosY + 4], [numPosX + 13, numPosY + 4], color = color);
            addLine([numPosX + 2, numPosY + 5], [numPosX + 7, numPosY + 5], color = color);
            addLine([numPosX + 9, numPosY + 5], [numPosX + 13, numPosY + 5], color = color);
            addLine([numPosX + 2, numPosY + 6], [numPosX + 6, numPosY + 6], color = color);
            addLine([numPosX + 9, numPosY + 6], [numPosX + 13, numPosY + 6], color = color);
            addLine([numPosX + 0, numPosY + 7], [numPosX + 5, numPosY + 7], color = color);
            addLine([numPosX + 9, numPosY + 7], [numPosX + 13, numPosY + 7], color = color);
            addLine([numPosX + 0, numPosY + 8], [numPosX + 5, numPosY + 8], color = color);
            addLine([numPosX + 9, numPosY + 8], [numPosX + 13, numPosY + 8], color = color);
            addLine([numPosX + 0, numPosY + 9], [numPosX + 4, numPosY + 9], color = color);
            addLine([numPosX + 9, numPosY + 9], [numPosX + 13, numPosY + 9], color = color);
            addLine([numPosX + 0, numPosY + 10], [numPosX + 15, numPosY + 10], color = color);
            addLine([numPosX + 0, numPosY + 11], [numPosX + 15, numPosY + 11], color = color);
            addLine([numPosX + 9, numPosY + 12], [numPosX + 13, numPosY + 12], color = color);
            addLine([numPosX + 9, numPosY + 13], [numPosX + 13, numPosY + 13], color = color);
            addLine([numPosX + 9, numPosY + 14], [numPosX + 13, numPosY + 14], color = color);
            addLine([numPosX + 9, numPosY + 15], [numPosX + 13, numPosY + 15], color = color);
            addLine([numPosX + 9, numPosY + 16], [numPosX + 13, numPosY + 16], color = color);
            break;
        case 5:
            addLine([numPosX + 0, numPosY + 0], [numPosX + 13, numPosY + 0], color = color);
            addLine([numPosX + 0, numPosY + 1], [numPosX + 13, numPosY + 1], color = color);
            addLine([numPosX + 0, numPosY + 2], [numPosX + 13, numPosY + 2], color = color);
            addLine([numPosX + 0, numPosY + 3], [numPosX + 5, numPosY + 3], color = color);
            addLine([numPosX + 0, numPosY + 4], [numPosX + 5, numPosY + 4], color = color);
            addLine([numPosX + 0, numPosY + 5], [numPosX + 13, numPosY + 5], color = color);
            addLine([numPosX + 0, numPosY + 6], [numPosX + 13, numPosY + 6], color = color);
            addLine([numPosX + 10, numPosY + 7], [numPosX + 15, numPosY + 7], color = color);
            addLine([numPosX + 10, numPosY + 8], [numPosX + 15, numPosY + 8], color = color);
            addLine([numPosX + 10, numPosY + 9], [numPosX + 15, numPosY + 9], color = color);
            addLine([numPosX + 10, numPosY + 10], [numPosX + 15, numPosY + 10], color = color);
            addLine([numPosX + 10, numPosY + 11], [numPosX + 15, numPosY + 11], color = color);
            addLine([numPosX + 0, numPosY + 12], [numPosX + 5, numPosY + 12], color = color);
            addLine([numPosX + 10, numPosY + 12], [numPosX + 15, numPosY + 12], color = color);
            addLine([numPosX + 0, numPosY + 13], [numPosX + 5, numPosY + 13], color = color);
            addLine([numPosX + 10, numPosY + 13], [numPosX + 15, numPosY + 13], color = color);
            addLine([numPosX + 0, numPosY + 14], [numPosX + 5, numPosY + 14], color = color);
            addLine([numPosX + 10, numPosY + 14], [numPosX + 15, numPosY + 14], color = color);
            addLine([numPosX + 2, numPosY + 15], [numPosX + 13, numPosY + 15], color = color);
            addLine([numPosX + 2, numPosY + 16], [numPosX + 13, numPosY + 16], color = color);
            break;
        case 6:
            addLine([numPosX + 5, numPosY + 0], [numPosX + 13, numPosY + 0], color = color);
            addLine([numPosX + 5, numPosY + 1], [numPosX + 13, numPosY + 1], color = color);
            addLine([numPosX + 2, numPosY + 2], [numPosX + 7, numPosY + 2], color = color);
            addLine([numPosX + 2, numPosY + 3], [numPosX + 7, numPosY + 3], color = color);
            addLine([numPosX + 2, numPosY + 4], [numPosX + 7, numPosY + 4], color = color);
            addLine([numPosX + 0, numPosY + 5], [numPosX + 5, numPosY + 5], color = color);
            addLine([numPosX + 0, numPosY + 6], [numPosX + 5, numPosY + 6], color = color);
            addLine([numPosX + 0, numPosY + 7], [numPosX + 13, numPosY + 7], color = color);
            addLine([numPosX + 0, numPosY + 8], [numPosX + 13, numPosY + 8], color = color);
            addLine([numPosX + 0, numPosY + 9], [numPosX + 13, numPosY + 9], color = color);
            addLine([numPosX + 0, numPosY + 10], [numPosX + 5, numPosY + 10], color = color);
            addLine([numPosX + 10, numPosY + 10], [numPosX + 15, numPosY + 10], color = color);
            addLine([numPosX + 0, numPosY + 11], [numPosX + 5, numPosY + 11], color = color);
            addLine([numPosX + 10, numPosY + 11], [numPosX + 15, numPosY + 11], color = color);
            addLine([numPosX + 0, numPosY + 12], [numPosX + 5, numPosY + 12], color = color);
            addLine([numPosX + 10, numPosY + 12], [numPosX + 15, numPosY + 12], color = color);
            addLine([numPosX + 0, numPosY + 13], [numPosX + 5, numPosY + 13], color = color);
            addLine([numPosX + 10, numPosY + 13], [numPosX + 15, numPosY + 13], color = color);
            addLine([numPosX + 0, numPosY + 14], [numPosX + 5, numPosY + 14], color = color);
            addLine([numPosX + 10, numPosY + 14], [numPosX + 15, numPosY + 14], color = color);
            addLine([numPosX + 2, numPosY + 15], [numPosX + 13, numPosY + 15], color = color);
            addLine([numPosX + 2, numPosY + 16], [numPosX + 13, numPosY + 16], color = color);
            break;
        case 7:
            addLine([numPosX + 0, numPosY + 0], [numPosX + 15, numPosY + 0], color = color);
            addLine([numPosX + 0, numPosY + 1], [numPosX + 15, numPosY + 1], color = color);
            addLine([numPosX + 0, numPosY + 2], [numPosX + 4, numPosY + 2], color = color);
            addLine([numPosX + 10, numPosY + 2], [numPosX + 15, numPosY + 2], color = color);
            addLine([numPosX + 0, numPosY + 3], [numPosX + 4, numPosY + 3], color = color);
            addLine([numPosX + 10, numPosY + 3], [numPosX + 15, numPosY + 3], color = color);
            addLine([numPosX + 0, numPosY + 4], [numPosX + 4, numPosY + 4], color = color);
            addLine([numPosX + 10, numPosY + 4], [numPosX + 15, numPosY + 4], color = color);
            addLine([numPosX + 8, numPosY + 5], [numPosX + 13, numPosY + 5], color = color);
            addLine([numPosX + 8, numPosY + 6], [numPosX + 13, numPosY + 6], color = color);
            addLine([numPosX + 6, numPosY + 7], [numPosX + 11, numPosY + 7], color = color);
            addLine([numPosX + 6, numPosY + 8], [numPosX + 11, numPosY + 8], color = color);
            addLine([numPosX + 5, numPosY + 9], [numPosX + 10, numPosY + 9], color = color);
            addLine([numPosX + 4, numPosY + 10], [numPosX + 9, numPosY + 10], color = color);
            addLine([numPosX + 4, numPosY + 11], [numPosX + 9, numPosY + 11], color = color);
            addLine([numPosX + 4, numPosY + 12], [numPosX + 9, numPosY + 12], color = color);
            addLine([numPosX + 4, numPosY + 13], [numPosX + 9, numPosY + 13], color = color);
            addLine([numPosX + 4, numPosY + 14], [numPosX + 9, numPosY + 14], color = color);
            addLine([numPosX + 4, numPosY + 15], [numPosX + 9, numPosY + 15], color = color);
            addLine([numPosX + 4, numPosY + 16], [numPosX + 9, numPosY + 16], color = color);
            break;
        case 8:
            addLine([numPosX + 2, numPosY + 0], [numPosX + 11, numPosY + 0], color = color);
            addLine([numPosX + 2, numPosY + 1], [numPosX + 11, numPosY + 1], color = color);
            addLine([numPosX + 2, numPosY + 2], [numPosX + 11, numPosY + 2], color = color);
            addLine([numPosX + 0, numPosY + 3], [numPosX + 5, numPosY + 3], color = color);
            addLine([numPosX + 10, numPosY + 3], [numPosX + 13, numPosY + 3], color = color);
            addLine([numPosX + 0, numPosY + 4], [numPosX + 5, numPosY + 4], color = color);
            addLine([numPosX + 10, numPosY + 4], [numPosX + 13, numPosY + 4], color = color);
            addLine([numPosX + 0, numPosY + 5], [numPosX + 6, numPosY + 5], color = color);
            addLine([numPosX + 10, numPosY + 5], [numPosX + 13, numPosY + 5], color = color);
            addLine([numPosX + 0, numPosY + 6], [numPosX + 6, numPosY + 6], color = color);
            addLine([numPosX + 10, numPosY + 6], [numPosX + 13, numPosY + 6], color = color);
            addLine([numPosX + 0, numPosY + 7], [numPosX + 7, numPosY + 7], color = color);
            addLine([numPosX + 10, numPosY + 7], [numPosX + 13, numPosY + 7], color = color);
            addLine([numPosX + 2, numPosY + 8], [numPosX + 11, numPosY + 8], color = color);
            addLine([numPosX + 2, numPosY + 9], [numPosX + 11, numPosY + 9], color = color);
            addLine([numPosX + 0, numPosY + 10], [numPosX + 3, numPosY + 10], color = color);
            addLine([numPosX + 6, numPosY + 10], [numPosX + 15, numPosY + 10], color = color);
            addLine([numPosX + 0, numPosY + 11], [numPosX + 3, numPosY + 11], color = color);
            addLine([numPosX + 6, numPosY + 11], [numPosX + 15, numPosY + 11], color = color);
            addLine([numPosX + 0, numPosY + 12], [numPosX + 3, numPosY + 12], color = color);
            addLine([numPosX + 7, numPosY + 12], [numPosX + 15, numPosY + 12], color = color);
            addLine([numPosX + 0, numPosY + 13], [numPosX + 3, numPosY + 13], color = color);
            addLine([numPosX + 10, numPosY + 13], [numPosX + 15, numPosY + 13], color = color);
            addLine([numPosX + 0, numPosY + 14], [numPosX + 3, numPosY + 14], color = color);
            addLine([numPosX + 10, numPosY + 14], [numPosX + 15, numPosY + 14], color = color);
            addLine([numPosX + 2, numPosY + 15], [numPosX + 13, numPosY + 15], color = color);
            addLine([numPosX + 2, numPosY + 16], [numPosX + 13, numPosY + 16], color = color);
            break;
        case 9:
            addLine([numPosX + 2, numPosY + 0], [numPosX + 13, numPosY + 0], color = color);
            addLine([numPosX + 2, numPosY + 1], [numPosX + 13, numPosY + 1], color = color);
            addLine([numPosX + 0, numPosY + 2], [numPosX + 5, numPosY + 2], color = color);
            addLine([numPosX + 10, numPosY + 2], [numPosX + 15, numPosY + 2], color = color);
            addLine([numPosX + 0, numPosY + 3], [numPosX + 5, numPosY + 3], color = color);
            addLine([numPosX + 10, numPosY + 3], [numPosX + 15, numPosY + 3], color = color);
            addLine([numPosX + 0, numPosY + 4], [numPosX + 5, numPosY + 4], color = color);
            addLine([numPosX + 10, numPosY + 4], [numPosX + 15, numPosY + 4], color = color);
            addLine([numPosX + 0, numPosY + 5], [numPosX + 5, numPosY + 5], color = color);
            addLine([numPosX + 10, numPosY + 5], [numPosX + 15, numPosY + 5], color = color);
            addLine([numPosX + 0, numPosY + 6], [numPosX + 5, numPosY + 6], color = color);
            addLine([numPosX + 10, numPosY + 6], [numPosX + 15, numPosY + 6], color = color);
            addLine([numPosX + 2, numPosY + 7], [numPosX + 15, numPosY + 7], color = color);
            addLine([numPosX + 2, numPosY + 8], [numPosX + 15, numPosY + 8], color = color);
            addLine([numPosX + 2, numPosY + 9], [numPosX + 15, numPosY + 9], color = color);
            addLine([numPosX + 10, numPosY + 10], [numPosX + 15, numPosY + 10], color = color);
            addLine([numPosX + 10, numPosY + 11], [numPosX + 15, numPosY + 11], color = color);
            addLine([numPosX + 9, numPosY + 12], [numPosX + 14, numPosY + 12], color = color);
            addLine([numPosX + 9, numPosY + 13], [numPosX + 14, numPosY + 13], color = color);
            addLine([numPosX + 8, numPosY + 14], [numPosX + 13, numPosY + 14], color = color);
            addLine([numPosX + 2, numPosY + 15], [numPosX + 11, numPosY + 15], color = color);
            addLine([numPosX + 2, numPosY + 16], [numPosX + 11, numPosY + 16], color = color);
            break;
    }
}

function addGroundLine() {
    groundLines.push([[dinoObj.dinoX, -groundY], [svgWidth, -groundY]]);
}

function updateGround() {
    groundLines[0][0][0] = Math.max(groundLines[0][0][0] - dinoObj.dinoSpeed, 0);
    for (let i = 1; i < groundLines.length; i++) {
        groundLines[i][0][0] = groundLines[i][0][0] - dinoObj.dinoSpeed;
        groundLines[i][1][0] = groundLines[i][1][0] - dinoObj.dinoSpeed;
        if (groundLines[i][1][0] < 0) {
            groundDeleteList.push(i);
        }
    }
    groundLines = groundLines.filter((_, idx) => !groundDeleteList.includes(idx));
    groundDeleteList = [];
}

function addSand() {
    if (Math.random() < 0.04) {
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

function RectCollision(rect1, rect2) {
    return (
        rect1[0] + rect1[2] >= rect2[0] &&
        rect2[0] + rect2[2] >= rect1[0] &&
        rect1[1] + rect1[3] >= rect2[1] &&
        rect2[1] + rect2[3] >= rect1[1]
    );
}

function randomCacti(addPosX = [svgWidth + 100, 0], addHeight = 0, maxWidth = Infinity, maxHeight = Infinity, ableToBranch = true) {
    let resultCacti = {
        posX: null, // Number
        height: null, // Number
        stemWidth: null, // Number
        branches: null, // [[Number, Object, String]]
    }
    resultCacti.height = Math.min(20 + Math.ceil(Math.random() * 40), maxHeight);
    resultCacti.stemWidth = Math.min(1 + Math.floor(Math.random() * 3), maxWidth);
    resultCacti.posX = addPosX[0] + 3 * resultCacti.stemWidth * addPosX[1];
    hitboxArr.push([resultCacti.posX - resultCacti.stemWidth, -(groundY + resultCacti.height + addHeight + 2 * resultCacti.stemWidth * (!ableToBranch)), 2 * resultCacti.stemWidth + 1, resultCacti.height]);
    resultCacti.branches = [];
    if (ableToBranch) {
        if (Math.random() < 0.5) {
            let branchHeight = 10 + Math.floor(Math.random() * (resultCacti.height - 20));
            resultCacti.branches.push([branchHeight, randomCacti(addPosX = [resultCacti.posX + resultCacti.stemWidth + 1, 1], addHeight = branchHeight, maxWidth = Math.max(resultCacti.stemWidth - 1, 1), maxHeight = resultCacti.height - branchHeight - 2, ableToBranch = false), 'right']);
        }
        if (Math.random() < 0.5) {
            let branchHeight = 10 + Math.floor(Math.random() * (resultCacti.height - 20));
            resultCacti.branches.push([branchHeight, randomCacti(addPosX = [resultCacti.posX - resultCacti.stemWidth - 1, -1], addHeight = branchHeight, maxWidth = Math.max(resultCacti.stemWidth - 1, 1), maxHeight = resultCacti.height - branchHeight - 2, ableToBranch = false), 'left']);
        }
    }
    return resultCacti;
}

function genCacti() {
    if (cactiArr.length === 0) {
        if (time >= 75.0) {
            cactiArr.push(randomCacti());
        }
        return;
    }
    if (cactiArr[cactiArr.length - 1].posX < (svgWidth / 2 - (Math.random() * 50) - 100 * (dinoObj.dinoSpeed - 1))) {
        cactiArr.push(randomCacti());
        dinoObj.dinoSpeed += 0.025;
    }
}

function updateCacti() {
    for (let i = 0; i < cactiArr.length; i++) {
        cactiArr[i].posX = cactiArr[i].posX - dinoObj.dinoSpeed;
        if (cactiArr[i].posX < 0) {
            cactiDeleteList.push(i);
        }
    }
    cactiArr = cactiArr.filter((_, idx) => !cactiDeleteList.includes(idx));
    cactiDeleteList = [];
}

function updateHitboxes() {
    for (let i = 0; i < hitboxArr.length; i++) {
        hitboxArr[i][0] = hitboxArr[i][0] - dinoObj.dinoSpeed;
        if (hitboxArr[i][0] < 0) {
            hitboxDeleteList.push(i);
        }
    }
    hitboxArr = hitboxArr.filter((_, idx) => !hitboxDeleteList.includes(idx));
    hitboxDeleteList = [];
}

function drawOneCacti(cacti) {
    for (let y = -groundY; y > -(groundY + cacti.height); y--) {
        if (y + groundY === -cacti.height + 1) {
            addLine([cacti.posX - cacti.stemWidth + 1, y], [cacti.posX + cacti.stemWidth, y]);
        }
        else {
            addLine([cacti.posX - cacti.stemWidth, y], [cacti.posX + cacti.stemWidth + 1, y]);
        }
    }
    for (const [branchHeight, branchCacti, branchSide] of cacti.branches) {
        for (let branchI = 0; branchI < branchCacti.stemWidth * 2 + 1; branchI++) {
            addLine(
                [
                    cacti.posX, 
                    -groundY - (branchHeight + branchI)
                ], 
                [
                    cacti.posX + (cacti.stemWidth + 1 + 2 * branchCacti.stemWidth + branchI) * ((branchSide === 'right') ? 1 : -1), 
                    -groundY - (branchHeight + branchI)
                ]);
        }
        let BranchX = cacti.posX + (cacti.stemWidth + 1 + 3 * branchCacti.stemWidth) * ((branchSide === 'right') ? 1 : -1);
        let BranchStemY = branchHeight + branchCacti.stemWidth * 2 + 1;
        for (let branchY = -(groundY + BranchStemY); branchY > -(groundY + BranchStemY + branchCacti.height); branchY--) {
            if (branchY + (groundY + BranchStemY) === -branchCacti.height + 1) {
                addLine([BranchX - branchCacti.stemWidth + 1, branchY], [BranchX + branchCacti.stemWidth, branchY]);
            }
            else {
                addLine([BranchX - branchCacti.stemWidth, branchY], [BranchX + branchCacti.stemWidth + 1, branchY]);
            }
        }
    }
}

function drawAllCacti() {
    for (const cacti of cactiArr) {
        drawOneCacti(cacti);
    }
}

function timeGraph() {
    if (ΔtArr.length > 250) {
        ΔtArr = ΔtArr.slice(ΔtArr.length - 250);
    }
    let average = 0;
    let idealTime = 100 - runDelay;
    for (let i = 0; i < ΔtArr.length - 1; i++) {
        addLine([50 + i, 100 - ΔtArr[i]], [50 + i + 1, 100 - ΔtArr[i + 1]]);
        average += ΔtArr[i];
    }
    average += ΔtArr[ΔtArr.length - 1];
    addLine([40, idealTime], [50, idealTime], color = '#00AA00');
    addLine([30, 100 - average / ΔtArr.length], [40, 100 - average / ΔtArr.length], color = '#FF0000');
}

function drawScore() {
    let scoreStr = Math.floor(dinoObj.dinoScore).toString();
    for (let digitIdx = 0; digitIdx < scoreStr.length; digitIdx++) {
        let digit = parseInt(scoreStr.at(scoreStr.length - 1 - digitIdx));
        drawNum(610 - 18 * digitIdx, 10, digit);
    }
    if (highestScore > 0) {
        let highestScoreStr = highestScore.toString();
        for (let HSdigitIdx = 0; HSdigitIdx < highestScoreStr.length; HSdigitIdx++) {
            let HSdigit = parseInt(highestScoreStr.at(highestScoreStr.length - 1 - HSdigitIdx));
            drawNum(610 - 18 * (HSdigitIdx + scoreStr.length + 1), 10, HSdigit, color = numColor);
        }
    }
}

function gameLoop() {   
    clear(); 
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
                dinoObj.dinoVelocityY = Math.max(-5, dinoObj.dinoVelocityY - gravity);
            }
            dinoObj.dinoY = Math.max(groundY + dinoObj.dinoHeight, dinoObj.dinoY + dinoObj.dinoVelocityY);
            dinoObj.dinoRect[1] = -dinoObj.dinoY - 1
            dinoObj.dinoScore += dinoObj.dinoSpeed / ticksPerScore;
            time++;
            updateGround();
            addSand();
            genCacti();
            updateCacti();
            updateHitboxes();
        }
        drawGround();
        drawAllCacti();
        if (inDebug) {
            timeGraph();
        }
        drawScore();
        for (const rect of hitboxArr) {
            if (RectCollision(dinoObj.dinoRect, rect)) {
                highestScore = Math.floor(Math.max(dinoObj.dinoScore, highestScore));
                dinoObj.dinoState = 'dead';
                break;
            }
        }
    }
    ΔtArr.push(Date.now() - startT);
    startT = Date.now();
}

setup();

setInterval(gameLoop, runDelay);

dinoSvg.addEventListener('click', () => {
    if (dinoObj.dinoState === 'start') {
        dinoObj.dinoState = 'jump';
    }
    if (dinoObj.dinoState === 'dead') {
        setup();
        dinoObj.dinoState = 'jump';
    }
})

addEventListener('keydown', (ev) => {
    if (ev.key === ' ' && dinoObj.dinoState !== 'start' && dinoObj.dinoState !== 'dead') {
        ev.preventDefault();
        dinoObj.dinoState = (dinoObj.dinoState === 'running') ? 'jump' : 'fall';
    }
    if (ev.key === 'd') {
        inDebug = !inDebug;
    }
});