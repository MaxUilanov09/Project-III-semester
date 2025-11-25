const themeDiv = document.querySelector('.themeToggle');
const toggleCircleDiv = document.querySelector('.toggleCircle');
const sunDiv = document.querySelector('.sun');
const moonDiv = document.querySelector('.moon');
const sunPath = './images/toggleSun.png';
const moonPath = './images/toggleMoon.png';

let currentMode = 1;
let toggleIntervalId = -1;
let Tdt = 0.025;
let t = 0;
let toggleCircleX = 0;
let toggleCircleColor = '#FFFFFF';
let sunY = 2;
let moonY = 2 - 20 - 15;

themeDiv.style.width = '40px';
themeDiv.style.height = '20px';
themeDiv.style.margin = '20px';
themeDiv.style.borderRadius = '10px';
themeDiv.style.backgroundColor = '#7A7A7A';

toggleCircleDiv.style.position = 'relative';
toggleCircleDiv.style.width = '19px';
toggleCircleDiv.style.height = '19px';
toggleCircleDiv.style.left = `${toggleCircleX}px`;
toggleCircleDiv.style.top = '0px';
toggleCircleDiv.style.borderRadius = '50%';
toggleCircleDiv.style.border = '0.5px solid #000000';
toggleCircleDiv.style.backgroundColor = toggleCircleColor;
toggleCircleDiv.style.overflow = 'hidden';

sunDiv.style.position = 'relative';
sunDiv.style.width = '15px';
sunDiv.style.height = '15px';
sunDiv.style.left = '2px';
sunDiv.style.top = `${sunY}px`;
sunDiv.style.backgroundImage = `url(${sunPath})`;
sunDiv.style.backgroundSize = '15px';
sunDiv.style.backgroundPosition = 'center';
sunDiv.style.backgroundRepeat = 'no-repeat';

moonDiv.style.position = 'relative';
moonDiv.style.width = '15px';
moonDiv.style.height = '15px';
moonDiv.style.left = '2px';
moonDiv.style.top = `${moonY}px`;
moonDiv.style.backgroundImage = `url(${moonPath})`;
moonDiv.style.backgroundSize = '15px';
moonDiv.style.backgroundPosition = 'center';
moonDiv.style.backgroundRepeat = 'no-repeat';

function toDec(str) {
    return Number('0x' + str);
}

function colorLerp(color1, color2, t) {
    let resultColor = '#';
    for (let i = 0; i < 3; i++) {
        let colorA = toDec(color1.slice(1 + i * 2, 1 + (i + 1) * 2));
        let colorB = toDec(color2.slice(1 + i * 2, 1 + (i + 1) * 2));
        resultColor += parseInt(colorA + (colorB - colorA) * t).toString(16).padStart(2, '0');
    }
    console.log(resultColor, t);
    return resultColor;
}

function updateDiv() {
    toggleCircleDiv.style.left = `${toggleCircleX}px`;
    toggleCircleDiv.style.backgroundColor = toggleCircleColor;
    sunDiv.style.top = `${sunY}px`;
    moonDiv.style.top = `${moonY}px`;
}

function updatePos(t) {
    toggleCircleX = 20 * t;
    sunY = 2 + 20 * t;
    moonY = 2 - 20 - 15 + 20 * t;
    toggleCircleColor = colorLerp('#FFFFFF', '#000000', t * t)
}

function animateDivs() {
    toggleIntervalId = setInterval(() => {
        t += Tdt * currentMode;
        if (0 > t || t > 1) {
            t = Math.round(t);
            currentMode = (t === 1) ? -1 : 1;
            clearInterval(toggleIntervalId);
            toggleIntervalId = -1;
        }
        updatePos(t);
        updateDiv();
    }, 1);
}

updatePos(0);
updatePos(1);

themeDiv.addEventListener('click', () => {
    if (toggleIntervalId !== -1) {
        return;
    }
    animateDivs();
    // document.body.classList.toggle('dark');
})