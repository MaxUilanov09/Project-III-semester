const teamInfo = [
    {
        name: 'Сева',
        workInfo: ['усю верстку', 'вгадай число', 'камінь - ножиці - папір', 'калькулятор', 'нашу команду', 'перемикання на темний режим'],
        imagePath: '../images/photoSeva.jpg'
    },
    {
        name: 'Макс',
        workInfo: ['високосні роки', 'калькулятор часу', 'Google динозавр', 'футбол', 'введіть 3 числа', 'вчені', 'очі', 'кінцеві доробки'],
        imagePath: '../images/photoMax.jpg'
    }
]

const teamWrap = document.querySelector('.teamWrap');
const scrollLeftButton = document.querySelector('.scrollLeft');
const scrollRightButton = document.querySelector('.scrollRight');

const imgWidth = 150;
const imgHeight = 150;

let teamIntervalIdArr = [-1, -1];
let teamTimeArr = [0, 0];
let tempItemIdxArr = [0, 1];
let dTeamTime = 0.015;

function createInfoItem(parent, infoObj, offset = 0) {
    const infoItem = document.createElement('div');
    const infoItemImage = document.createElement('img');
    const infoItemName = document.createElement('h3');
    const infoItemWorkText = document.createElement('p');
    
    infoItem.style.setProperty('--idx', offset.toString());
    infoItem.style.display = 'flex';
    infoItem.style.position = 'absolute';
    infoItem.style.padding = '20px';
    infoItem.style.borderRadius = '20px';
    infoItem.style.backgroundColor = '#CCCCCC';
    infoItem.style.flexDirection = 'column';
    infoItem.style.gap = '20px';
    infoItem.style.justifyContent = 'center';
    infoItem.style.textAlign = 'center';
    infoItem.style.transform = 'translateX(calc(var(--idx) * 100vw)) translateX(-45px)';

    infoItemImage.style.width = `${imgWidth}px`;
    infoItemImage.style.height = `${imgHeight}px`;
    infoItemImage.style.margin = '0 auto';
    infoItemImage.style.borderRadius = '20px';
    infoItemImage.style.backgroundImage = `url(${infoObj.imagePath})`;
    infoItemImage.style.backgroundSize = 'cover';
    infoItemImage.style.backgroundRepeat = 'no-repeat';

    infoItemName.textContent = infoObj.name;
    infoItemName.style.color = '#000000';

    infoItemWorkText.textContent = `Зробив ${infoObj.workInfo.slice(0, -1).join(', ')} та ${infoObj.workInfo[infoObj.workInfo.length - 1]}`
    infoItemWorkText.style.width = '250px'
    infoItemWorkText.style.color = '#000000';

    infoItem.appendChild(infoItemImage);
    infoItem.appendChild(infoItemName);
    infoItem.appendChild(infoItemWorkText);
    parent.appendChild(infoItem);
}

function createTeam(parent, infoArr) {
    for (let i = 0; i < infoArr.length; i++) {
        createInfoItem(parent, infoArr[i], offset = i);
    }
}

function f(t) {
    return Math.pow(t, 0.5) * t;
}

function move(parent, direction) {
    for (let i = 0; i < parent.children.length; i++) {
        let itemI = parent.children.item(i);
        tempItemIdxArr[i] = Number(itemI.style.getPropertyValue('--idx'));
        teamIntervalIdArr[i] = setInterval(() => {
            teamTimeArr[i] += dTeamTime;
            itemI.style.setProperty('--idx', (tempItemIdxArr[i] + direction * f(teamTimeArr[i])).toString());
            if (teamIntervalIdArr[i] !== -1 && teamTimeArr[i] > 1) {
                teamTimeArr[i] = 0;
                itemI.style.setProperty('--idx', (tempItemIdxArr[i] + direction).toString());
                clearInterval(teamIntervalIdArr[i]);
                teamIntervalIdArr[i] = -1;
            }
        }, 1);
    }
}

createTeam(teamWrap, teamInfo);
scrollLeftButton.style.filter = 'brightness(0.8)';
let firstIdx = 0;
scrollLeftButton.addEventListener('click', () => {
    firstIdx = teamWrap.children.item(0).style.getPropertyValue('--idx');
    if (firstIdx < 0 && teamIntervalIdArr.every(x => x === -1)) {
        move(teamWrap, 1);
        scrollLeftButton.style.filter = 'brightness(0.8)';
        scrollRightButton.style.filter = 'none';
    }
});

scrollRightButton.addEventListener('click', () => {
    firstIdx = teamWrap.children.item(0).style.getPropertyValue('--idx');
    if (firstIdx >= 0 && teamIntervalIdArr.every(x => x === -1)) {
        move(teamWrap, -1);
        scrollLeftButton.style.filter = 'none';
        scrollRightButton.style.filter = 'brightness(0.8)';
    }
})