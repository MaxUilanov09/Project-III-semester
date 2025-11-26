import { setStyles } from "./cards.js";

const themeDiv = document.querySelector('.themeToggle');
const toggleCircleDiv = document.querySelector('.toggleCircle');
const sunDiv = document.querySelector('.sun');
const moonDiv = document.querySelector('.moon');
const root = document.querySelector(':root');
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


const dropListContainer = document.querySelector('.dropListContainer');
const dropListHeader = document.querySelector('.headerDropListText');
const dropList = document.querySelector('.dropList');
const dropItemArr = document.querySelectorAll('.dropItem');
const dropTextArr = document.querySelectorAll('.dropText');

let rootMode = root.style.getPropertyValue('--mode');
let isOpenedMode = -1;
let dropListIntervalId = -1;
let dropListHeaderTopCover = 100;
let dropListY = 0;
let dropListT = 1;
let dropListdT = 0.025;

dropListContainer.style.width = '110px';
dropListContainer.style.height = '15px';
dropListContainer.style.textAlign = 'center';

dropListHeader.style.position = 'relative';
dropListHeader.style.top = `${-dropListHeaderTopCover}px`;
dropListHeader.style.paddingTop = `${dropListHeaderTopCover}px`;
dropListHeader.style.zIndex = '2';

dropList.style.position = 'relative';
dropList.style.margin = '0';
dropList.style.padding = '0';
dropList.style.top = `${-dropListHeaderTopCover + dropListY}px`;
dropList.style.listStyle = 'none';
dropList.style.borderRadius = '0px 0px 20px 20px';

for (const dropItem of dropItemArr) {
    dropItem.style.padding = '10px';
    dropItem.addEventListener('mouseover', () => {
        rootMode = root.style.getPropertyValue('--mode');
        dropItem.style.backgroundColor = (rootMode === '1') ? '#F1F1F1' : '#444444';
    })
    dropItem.addEventListener('mouseout', () => {
        rootMode = root.style.getPropertyValue('--mode');
        dropItem.style.backgroundColor = (rootMode === '1') ? '#FFFFFF' : '#222222';
    })
}
dropItemArr.item(dropItemArr.length - 1).style.borderRadius = '0px 0px 20px 20px';

for (const dropText of dropTextArr) {
    dropText.style.fontSize = '12px';
}


function updateDropListCSS() {
    rootMode = root.style.getPropertyValue('--mode');
    dropList.style.top = `${-dropListHeaderTopCover + dropListY}px`;
    dropListHeader.style.backgroundColor = (rootMode === '1') ? '#FFFFFF' : '#222222';
    dropList.style.backgroundColor = (rootMode === '1') ? '#FFFFFF' : '#222222';
    dropList.style.border = `1px solid ${(rootMode === '1') ? '#000000' : '#FFFFFF'}`;
    dropList.style.borderTop = 'transparent';
    for (const dropItem of dropItemArr) {
        dropItem.style.backgroundColor = (rootMode === '1') ? '#FFFFFF' : '#222222';
    }
}

function updateDropList(t) {
    dropListY = -180 * t;
    updateDropListCSS();
}

function animateDropList() {
    dropListIntervalId = setInterval(() => {
        dropListT += dropListdT * isOpenedMode;
        if (0 > dropListT || dropListT > 1) {
            dropListT = Math.round(dropListT);
            isOpenedMode = (dropListT === 1) ? -1 : 1;
            clearInterval(dropListIntervalId);
            dropListIntervalId = -1;
        }
        updateDropList(dropListT * dropListT);
    }, 1);
}
updateDropList(dropListT);
dropListHeader.addEventListener('click', () => {
    animateDropList();
})

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
    return resultColor;
}

function updateCSS() {
    root.style.setProperty('--mode', Number((currentMode === 1)));
    root.style.setProperty('--bg-section-color', (currentMode === 1) ? 'rgba(255, 255, 255, 1)' : 'rgba(30, 30, 30, 1)');
    root.style.setProperty('--bg-button-color', (currentMode === 1) ? 'rgba(238, 238, 238, 1)' : 'rgba(30, 30, 30, 1)');
    root.style.setProperty('--bg-disabled-color', (currentMode === 1) ? 'rgba(200, 200, 200, 1)' : 'rgba(70, 70, 70, 1)');
    root.style.setProperty('--section-text-color', (currentMode === -1) ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)');
    root.style.setProperty('--RPS-h2-color', (currentMode === 1) ? '#333333' : '#EEEEEE');
    setStyles();
    updateDropListCSS();
    for (const btn of document.querySelectorAll('.buttonBlack')) {
        btn.style.display = 'inline-block';
        btn.style.maxWidth = '450px';
        btn.style.backgroundColor = (rootMode === '1') ? '#000000' : '#CCCCCC';
        btn.style.padding = '10px 20px';
        btn.style.borderRadius = '20px';
        btn.style.width = 'fit-content';
        btn.style.height = 'max-content';
        btn.style.marginRight = 'calc(width)';
        btn.style.alignSelf = 'bottom';
        btn.style.fontFamily = `Montserrat Alternates`;
        btn.style.color = (rootMode === '1') ? '#FFFFFF' : '#222222';
        btn.style.boxSizing = 'content-box';
    }
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
    toggleCircleColor = colorLerp('#FFFFFF', '#000000', t * t);
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
        updateCSS();
    }, 1);
}
updateCSS();
themeDiv.addEventListener('click', () => {
    if (toggleIntervalId !== -1) {
        return;
    }
    animateDivs();
    document.body.classList.toggle('dark');
    document.querySelectorAll('.logoImage').forEach(x => x.classList.toggle('logoImageDark'));
});


let modalIntervalId = -1;
document.querySelector('.modalWindow').style.setProperty('--opacity-val', 1);
document.body.classList.toggle('noShow');

document.querySelector('.modalClose').addEventListener('click', () => {
    if (modalIntervalId !== -1) {
        return;
    }
    document.body.classList.toggle('noShow');
    modalIntervalId = setInterval(() => {
        let OpVal = document.querySelector('.modalWindow').style.getPropertyValue('--opacity-val');
        OpVal -= 0.025;
        if (OpVal < 0) {
            OpVal = 1;
            clearInterval(modalIntervalId);
            modalIntervalId = -1;
            document.querySelector('.modalWindow').classList.toggle('noShow');
            if (document.querySelector('.modalText').classList.contains('noSaveShow')) {
                document.querySelector('.modalText').classList.toggle('noSaveShow');
                document.querySelector('.modalInputText').classList.toggle('noSaveShow');
                document.querySelector('.modalSaveButton').classList.toggle('noSaveShow');
                document.querySelector('.modalInput').classList.toggle('noSaveShow');
                document.querySelector('.modalDoneText').classList.toggle('noSaveShow');
            }
        }
        document.querySelector('.modalWindow').style.setProperty('--opacity-val', OpVal);
    }, 1);
});

document.querySelector('.subscribeButton').addEventListener('click', () => {
    if (modalIntervalId !== -1 || document.querySelector('.t-imput').value === '') {
        return;
    }
    document.querySelector('.modalWindow').classList.toggle('noShow');
    document.querySelector('.modalWindow').style.setProperty('--opacity-val', 0);
    modalIntervalId = setInterval(() => {
        let OpVal = Number(document.querySelector('.modalWindow').style.getPropertyValue('--opacity-val'));
        OpVal += 0.025;
        if (OpVal > 1) {
            OpVal = 1;
            clearInterval(modalIntervalId);
            modalIntervalId = -1;
            document.body.classList.toggle('noShow');
        }
        document.querySelector('.modalWindow').style.setProperty('--opacity-val', OpVal);
    }, 1);
});

document.querySelector('.modalSaveButton').addEventListener('click', () => {
    if (document.querySelector('.modalInput').value !== '') {
        document.querySelector('.modalInput').value = '';
        document.querySelector('.modalText').classList.toggle('noSaveShow');
        document.querySelector('.modalInputText').classList.toggle('noSaveShow');
        document.querySelector('.modalSaveButton').classList.toggle('noSaveShow');
        document.querySelector('.modalInput').classList.toggle('noSaveShow');
        document.querySelector('.modalDoneText').classList.toggle('noSaveShow');
    }
})