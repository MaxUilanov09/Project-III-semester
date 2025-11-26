const scientists = [ 
    { 
        name: "Albert", 
        surname: "Einstein", 
        born: 1879, 
        dead: 1955, 
        id: 1 
    }, 
    { 
        name: "Isaac", 
        surname: "Newton", 
        born: 1643, 
        dead: 1727, 
        id: 2 
    }, 
    { 
        name: "Galileo", 
        surname: "Galilei", 
        born: 1564, 
        dead: 1642, 
        id: 3 
    }, 
    { 
        name: "Marie", 
        surname: "Curie", 
        born: 1867, 
        dead: 1934, 
        id: 4 
    }, 
    { 
        name: "Johannes", 
        surname: "Kepler", 
        born: 1571, 
        dead: 1630, 
        id: 5 
    }, 
    { 
        name: "Nicolaus", 
        surname: "Copernicus", 
        born: 1473, 
        dead: 1543, 
        id: 6 
    }, 
    { 
        name: "Max", 
        surname: "Planck", 
        born: 1858, 
        dead: 1947, 
        id: 7 
    }, 
    { 
        name: "Katherine", 
        surname: "Blodgett", 
        born: 1898, 
        dead: 1979, 
        id: 8 
    }, 
    { 
        name: "Ada", 
        surname: "Lovelace", 
        born: 1815, 
        dead: 1852, 
        id: 9 
    }, 
    { 
        name: "Sarah E.", 
        surname: "Goode", 
        born: 1855, 
        dead: 1905, 
        id: 10 
    }, 
    { 
        name: "Lise", 
        surname: "Meitner", 
        born: 1878, 
        dead: 1968, 
        id: 11 
    }, 
    { 
        name: "Hanna", 
        surname: "Hammarström", 
        born: 1829, 
        dead: 1909, 
        id: 12 
    } 
];
const taskNames = [
    'Знайти вчених, які народилися в 19 ст', 
    'Відсортувати вчених за алфавітом', 
    'Відсортувати вчених за кількістю прожитих років', 
    'Знайти вченого, який народився найпізніше', 
    'Знайти рік народження Albert Einshtein', 
    'Знайти вчених, прізвища яких починаються на на літеру “С”', 
    'Видалити всіх вчених, ім’я яких починається на “А”', 
    'Знайти вченого, який прожив найдовше і вченого,<br> який прожив найменше', 
    'Знайти вчених, в яких співпадають перші літери імені і прізвища'
];

const taskAnswers = [
    {id: 0, type: 'find', answerIds: [1, 4, 7, 8, 9, 10, 11, 12]},
    {id: 1, type: 'sort', answerIds: [9, 1, 3, 12, 2, 5, 8, 11, 4, 7, 6, 10]},
    {id: 2, type: 'sort', answerIds: [9, 10, 5, 4, 6, 1, 3, 12, 8, 2, 7, 11]},
    {id: 3, type: 'find', answerIds: [8]},
    {id: 4, type: 'find-year', answerIds: [1]},
    {id: 5, type: 'find', answerIds: [4, 6]},
    {id: 6, type: 'delete', answerIds: [1, 9]},
    {id: 7, type: 'find', answerIds: [9, 11]},
    {id: 8, type: 'find', answerIds: [3, 12]},
];

let scientistList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let taskNum = -1;
let userAnswers = [];
let wrongAnswers = [];
let currentCard = -1;
let completedTasks = [];

const cardsSection = document.querySelector('.cards');
const cardList = document.querySelector('.cardList');
const cardItems = document.querySelectorAll('.cardItem');
const cardTexts = document.querySelectorAll('.cardItemText');
const categoriesList = document.querySelector('.categoriesList');
const taskFixDivs = document.querySelectorAll('.taskFixDiv');
const categoriesItems = document.querySelectorAll('.categoriesItem');
const categoriesTexts = document.querySelectorAll('.categoriesText');
let modeCard = document.querySelector(':root').style.getPropertyValue('--mode');

const itemWidth = 100;
const itemHeight = 100;
const itemBGColor = '#D9D9D9';
const itemBRadius = 20;
const itemBWidth = 1;

const textFontSize = 8;
const textLineHeight = 1.7;
const textMarginLeft = 16;

const taskTextFontSize = 12;
const taskTextLineHeight = 1.25;

const listCollumGap = 59;
const listRowGap = 39;

const totalLeft = itemWidth + listCollumGap;
const convergenceFactor = 10;

const cardsWidth = itemWidth * 4 + listCollumGap * 3;
const sectionWidth = 860;

const taskColorNormal = '#000000';
const taskColorAccent = '#777700';
const taskColorDone = '#007700';
const cardColorAccent = '#CCCC00';
const cardColorWrong = '#CC0000';
const cardColorDone = '#00CC00';

const Vdt = 0.03;

let ableToPressFlag = true;
let ableToExitVictory = true;

function addEventStyles(element, event, styleObj) {
    element.addEventListener(event, () => {
        for (const property in styleObj) {
            element.style[property] = styleObj[property];
        }
    });
}

function setStyles() {
    modeCard = document.querySelector(':root').style.getPropertyValue('--mode');
    cardsSection.style.width = `${sectionWidth}px`;
    cardsSection.style.marginLeft = '50px';

    cardList.style.display = 'flex';
    cardList.style.width = `${cardsWidth}px`;
    cardList.style.listStyle = 'none';
    cardList.style.gap = `${listRowGap}px ${listCollumGap}px`;
    cardList.style.flexWrap = 'wrap';
    cardList.style.margin = '0 170px 36px 110px';
    cardList.style.padding = '0';
    cardList.style.overflow = 'hidden';

    for (const cardItem of cardItems) {
        cardItem.style.display = 'block';
        cardItem.style.width = `${itemWidth}px`;
        cardItem.style.height = `${itemHeight}px`;
        cardItem.style.backgroundColor = `${itemBGColor}`;
        cardItem.style.borderRadius = `${itemBRadius}px`;
    }

    let scientistId = 0;
    for (const cardText of cardTexts) {
        let textMarginTop = (itemHeight - textFontSize * textLineHeight * (2 + (scientists.find(x => x.id === scientistList[scientistId]).name.length + scientists.find(x => x.id === scientistList[scientistId]).surname.length >= 16))) / 2;
        cardText.style.fontFamily = `Montserrat Alternates`;
        cardText.style.fontSize = `${textFontSize}px`;
        cardText.style.lineHeight = `${textLineHeight}`;
        cardText.style.color = '#222222';
        cardText.style.margin = `${textMarginTop}px ${textMarginLeft}px`;
        cardText.style.padding = '0';
        cardText.style.textAlign = 'center';
        scientistId++;
    }

    categoriesList.style.display = 'flex';
    categoriesList.style.width = '860px';
    categoriesList.style.listStyle = 'none';
    categoriesList.style.gap = '20px 36px';
    categoriesList.style.flexWrap = 'wrap';
    categoriesList.style.justifyContent = 'center';
    categoriesList.style.margin = '0';
    categoriesList.style.padding = '0';

    let sideNum = 0;
    for (const taskFixDiv of taskFixDivs) {
        taskFixDiv.style.display = 'flex';
        taskFixDiv.style.flexDirection = 'column';
        taskFixDiv.style.gap = '20px';
        taskFixDiv.style.alignItems = (sideNum % 2 === 0) ? 'flex-end' : 'flex-start';
        sideNum++;
    }

    for (const task of categoriesItems) {
        task.style.display = 'inline-block';
        task.style.maxWidth = '450px';
        task.style.backgroundColor = (modeCard === '1') ? '#000000' : '#CCCCCC';
        task.style.padding = '10px 20px';
        task.style.borderRadius = '20px';
        task.style.width = 'fit-content';
        task.style.height = 'max-content';
        task.style.marginRight = 'calc(width)';
        task.style.alignSelf = 'bottom';
    }

    for (const taskText of categoriesTexts) {
        taskText.style.fontFamily = `Montserrat Alternates`;
        taskText.style.fontSize = `${taskTextFontSize}px`;
        taskText.style.lineHeight = `${taskTextLineHeight}`;
        taskText.style.color = (modeCard === '1') ? '#FFFFFF' : '#222222';
        taskText.style.margin = '0';
        taskText.style.padding = '0';
        taskText.style.boxSizing = 'content-box';
    }
}

function g(arr) {
    let res = [];
    for (let i = 0; i < Math.floor(arr.length / 4); i++) {
        res.push(arr.slice(4 * i, 4 * (i + 1)));
    }
    return res;
}

function intervalSwapAnimation(idx1, idx2, leftPos) {
    let card1 = cardList.children.item(idx1);
    let card2 = cardList.children.item(idx2);
    let direction = Math.sign(idx2 - idx1);
    let onBoundary = [7, 15].includes(Math.abs(idx1) + Math.abs(idx2));
    if (onBoundary) {
        leftPos = leftPos + (2 * itemWidth - leftPos) / convergenceFactor;
        if (itemWidth < leftPos) {
            card1.style.top = `${(itemHeight + listRowGap) * direction}px`
            card1.style.left = `${(-cardsWidth - (itemWidth - leftPos)) * direction}px`
            card2.style.top = `${-(itemHeight + listRowGap) * direction}px`
            card2.style.left = `${(cardsWidth + (itemWidth - leftPos)) * direction}px`
        }
        else {
            card1.style.left = `${leftPos * direction}px`;
            card2.style.left = `${-leftPos * direction}px`;
        }
        return [leftPos, Math.abs(2 * itemWidth - leftPos) < 0.5];
    }
    else {
        leftPos = leftPos + (totalLeft - leftPos) / convergenceFactor;
        card1.style.left = `${leftPos * direction}px`;
        card2.style.left = `${-leftPos * direction}px`;
        return [leftPos, Math.abs(totalLeft - leftPos) < 0.5];
    }
}

function delay(start, duration) {
    let x = 0;
    while (Date.now() - start < duration) {
        x++;
    }
    return;
}

function swap(arr, idx1, idx2) {
    if (idx1 === idx2) {
        return arr.map(x => x);
    }
    let intervalId = -1;
    let leftPos = 0;
    ableToPressFlag = false;
    intervalId = setInterval(() => {
        [leftPos, result] = intervalSwapAnimation(idx1, idx2, leftPos);
        if (intervalId !== -1 && result) {
            clearInterval(intervalId);
            cardList.children.item(idx1).style.left = `${0}px`;
            cardList.children.item(idx1).style.top = `${0}px`;
            cardList.children.item(idx2).style.left = `${0}px`; 
            cardList.children.item(idx2).style.top = `${0}px`; 
            setStyles();
            fillCards();
            update();
            ableToPressFlag = true;
        }
    }, 10);
    let el1 = scientistList[idx1];
    let el2 = scientistList[idx2];
    return arr.map(x => {
        if (x === el1) {
            return el2;
        }
        else if (x === el2) {
            return el1;
        }
        else {
            return x;
        }
    });
}

function getTarget(ev) {
    return ev.target.children.item(0);
}

function keyMoveCard(ev, currentCard) {
    ev.preventDefault();
    let cardStartIdx = scientistList.indexOf(currentCard);
    let cardEndIdx;
    switch (ev.key) {
        case 'ArrowLeft':
            cardEndIdx = Math.max(cardStartIdx - 1, 0);
            break;
        
        case 'ArrowRight':
            cardEndIdx = Math.min(cardStartIdx + 1, 11);
            break;
    }
    let endCardId = scientistList[cardEndIdx];
    console.log('sb:', scientistList, '\n', 'idx:', cardStartIdx, '=>', cardEndIdx, '\n', 'cardIds:', currentCard, '=>', endCardId);
    scientistList = swap(scientistList, cardStartIdx, cardEndIdx);
    console.log('sa:', scientistList);
}

function getCardId(target) {
    return scientists.find(x => {return x.dead === parseInt(target.textContent.slice(-4))}).id;
}

function removeEl(arr, el) {
    return arr.filter((x) => x !== el);
}

function equateArrs(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((x, idx) => x === arr2[idx]);
}

function VTopFunc(t) {
    return -(listRowGap / 2) * Math.sin(t * Math.PI);
}

function toDec(str) {
    return Number('0x' + str);
}

function VColorFunc(t) {
    let resultColor = '#';
    for (let i = 0; i < 3; i++) {
        let colorA = toDec(itemBGColor.slice(1 + i * 2, 1 + (i + 1) * 2));
        let colorB = toDec(cardColorDone.slice(1 + i * 2, 1 + (i + 1) * 2));
        resultColor += parseInt(colorA + (colorB - colorA) * t).toString(16).padStart(2, '0');
    }
    console.log(resultColor, t);
    return resultColor;
}

function VTimeCheck(t) {
    t += Vdt;
    if (t > 1) {
        return [0, true];
    }
    return [t, false];
}

function victoryAnimation(idxArr) {
    let intervalIdArr = Array(idxArr.length).fill(-1);
    let intervalTimeArr = Array(idxArr.length).fill(0);
    let result = false;
    ableToExitVictory = false;
    for (let i = 0; i < idxArr.length; i++) {
        setTimeout(() => {intervalIdArr[i] = setInterval(() => {
            [intervalTimeArr[i], result] = VTimeCheck(intervalTimeArr[i]);
            if (intervalIdArr[i] !== -1 && result) {
                clearInterval(intervalIdArr[i]);
                intervalIdArr[i] = -1;
                intervalTimeArr[i] = 1;
                if (intervalTimeArr.every(x => x === 1)) {
                    ableToExitVictory = true;
                }
            }
            cardList.children.item(idxArr[i]).style.backgroundColor = VColorFunc(intervalTimeArr[i]);
            cardList.children.item(idxArr[i]).style.top = `${VTopFunc(intervalTimeArr[i])}px`;
            if (ableToExitVictory) {
                toDefaultState();
            }
        }, 10)}, 200 * i);
    }
}

function toDefaultState() {
    completedTasks.push(taskNum);
    scientistList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    taskNum = -1;
    currentCard = -1;
    userAnswers = [];
    wrongAnswers = [];
    fillCards();
    update();
}

function findTaskWrap(ev, taskObj, deleteFlag = false) {
    let target = getTarget(ev);
    if (target.tagName === 'P') {
        let cardId = getCardId(target);
        if (taskObj.answerIds.includes(cardId)) {
            if (deleteFlag) {
                scientistList = removeEl(scientistList, cardId);
            }
            userAnswers.push(cardId);
            fillCards();
        }
        else {
            wrongAnswers.push(cardId);
        }
        update();
        userAnswers.sort((a, b) => a - b);
        if (equateArrs(userAnswers, taskObj.answerIds)) {
            victoryAnimation(userAnswers.map(x => x - 1));
            update();
        }
    }
}

function addCardListener() {
    cardsSection.addEventListener('keydown', (ev) => {
        ev.preventDefault();
        if (ableToPressFlag && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
            keyMoveCard(ev, currentCard);
        }
    });
    cardList.addEventListener('click', (ev) => {
        let taskObj = taskAnswers[taskNum];
        console.log(getTarget(ev));
        if (taskObj == undefined) {
            return;
        }
        switch (taskObj.type) {
            case 'find':
                findTaskWrap(ev, taskObj);
                break;
            
            case 'find-year':
                findTaskWrap(ev, taskObj);
                break;
            
            case 'sort':
                let target = getTarget(ev);
                if (target.tagName === 'P') {
                    let cardId = getCardId(target);
                    currentCard = (currentCard === cardId) ? -1 : cardId;
                }
                break;
            
            case 'delete':
                findTaskWrap(ev, taskObj, deleteFlag = true);
                break;
        }
    });
}

function addListeners() {
    let itemId = 0;
    for (const taskItem of categoriesItems) {
        let taskObj = taskAnswers[itemId];
        taskItem.addEventListener('click', () => {
            taskNum = (taskNum === taskObj.id) ? -1 : taskObj.id;
            if (taskNum === 4) {
                fillCards(noName = true);
            }
            else {
                fillCards();
            }
        });
        itemId++;
    }
}

function fillCards(noName = false) {
    for (let itemIdx = 0; itemIdx < 12; itemIdx++) {
        const card = cardList.children.item(itemIdx);
        card.style.position = 'relative';
        if (itemIdx > scientistList.length - 1) {
            card.style.display = 'none';
        }
        else {
            card.style.display = 'block';
            const item = card.children.item(0);
            let itemObj = scientists.find(x => x.id === scientistList[itemIdx]);
            if (noName) {
                item.innerHTML = `<br>${itemObj.born}-${itemObj.dead}`; 
            }
            else {
                item.innerHTML = `${itemObj.name} ${itemObj.surname}<br>${itemObj.born}-${itemObj.dead}`; 
            }
        }
    }
}

function fillTasks() {
    for (let taskIdx = 0; taskIdx < categoriesTexts.length; taskIdx++) {
        const category = categoriesTexts.item(taskIdx);
        let task = taskNames[taskIdx];
        category.innerHTML = `${task}`;
    }
}

function update() {
    for (let i = 0; i < categoriesItems.length; i++) {
        let taskItem = categoriesItems.item(i);
        if (i === taskNum) {
            taskItem.style.backgroundColor = taskColorAccent;
        }
        else if (completedTasks.includes(i)) {
            taskItem.style.backgroundColor = taskColorDone;
        }
        else {
            taskItem.style.backgroundColor = taskColorNormal;
        }
    }

    for (let i = 0; i < cardList.children.length; i++) {
        const card = cardList.children.item(i);
        if (taskNum === 1 || taskNum === 2) {
            if (equateArrs(scientistList, taskAnswers[taskNum].answerIds)) {
                toDefaultState();
            }
            if (scientistList.findIndex((x) => x === currentCard) === i) {
                card.style.backgroundColor = cardColorAccent;
            }
            else {
                card.style.backgroundColor = itemBGColor;
            }
        }
        else if (userAnswers.includes(i + 1) && taskNum !== 6) {
            card.style.backgroundColor = cardColorAccent;
        }
        else if (wrongAnswers.includes(i + 1 + userAnswers.length * (taskNum === 6))) {
            card.style.backgroundColor = cardColorWrong;
        }
        else {
            card.style.backgroundColor = itemBGColor;
        }
    }
}

setStyles();
fillCards();
fillTasks();
addListeners();
addCardListener();

cardsSection.addEventListener('click', update);


export {setStyles};