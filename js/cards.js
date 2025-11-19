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

const listCollumGap = 39;
const listRowGap = 59;

const cardsWidth = itemWidth * 4 + listRowGap * 3 + itemBWidth * 2 * 4;
const sectionWidth = 860;

function addEventStyles(element, event, styleObj) {
    element.addEventListener(event, () => {
        for (const property in styleObj) {
            element.style[property] = styleObj[property];
        }
    });
}

function setStyles() {
    console.log(cardsSection.style);
    cardsSection.style.width = `${sectionWidth}px`;
    cardsSection.style.marginLeft = '50px';

    cardList.style.display = 'flex';
    cardList.style.width = `${cardsWidth}px`;
    cardList.style.listStyle = 'none';
    cardList.style.gap = `${listCollumGap}px ${listRowGap}px`;
    cardList.style.flexWrap = 'wrap';
    cardList.style.margin = '0 170px 36px 110px';
    cardList.style.padding = '0';

    for (const cardItem of cardItems) {
        cardItem.style.display = 'block';
        cardItem.style.width = `${itemWidth}px`;
        cardItem.style.height = `${itemHeight}px`;
        cardItem.style.backgroundColor = `${itemBGColor}`;
        cardItem.style.borderRadius = `${itemBRadius}px`;
    }

    let scientistId = 1;
    for (const cardText of cardTexts) {
        let textMarginTop = (itemHeight - textFontSize * textLineHeight * (2 + (scientists.find(x => x.id === scientistId).name.length + scientists.find(x => x.id === scientistId).surname.length >= 16))) / 2;
        cardText.style.fontFamily = `Montserrat Alternates`;
        cardText.style.fontSize = `${textFontSize}px`;
        cardText.style.lineHeight = `${textLineHeight}`;
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
        task.style.backgroundColor = '#000000';
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
        taskText.style.color = '#FFFFFF';
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

function swap(arr, el1, el2) {
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
    })
}

function getTarget(ev) {
    return ev.target.children.item(0);
}

function addCardListener() {
    cardList.addEventListener('click', (ev) => {
        let taskObj = taskAnswers[taskNum];
        let target;
        if (taskObj == undefined) {
            return;
        }
        switch (taskObj.type) {
            case 'find':
                target = getTarget(ev);
                if (target.tagName === 'P') {
                    let cardId = scientists.find((x) => {return x.dead === parseInt(target.textContent.slice(-4))}).id;
                    if (userAnswers.includes(cardId)) {
                        userAnswers = userAnswers.filter((x) => x !== cardId);
                    }
                    else {
                        userAnswers.push(cardId);
                    }
                    userAnswers.sort((a, b) => a - b);
                    if (userAnswers.length === taskObj.answerIds.length && userAnswers.every((x, idx) => x === taskObj.answerIds[idx])) {
                        completedTasks.push(taskNum);
                        taskNum = -1;
                        userAnswers = [];
                    }
                }
                break;
            
            case 'find-year':
                target = getTarget(ev);
                if (target.tagName === 'P') {
                    let cardId = scientists.find((x) => {return x.dead === parseInt(target.textContent.slice(-4))}).id;
                    if (userAnswers.includes(cardId)) {
                        userAnswers = userAnswers.filter((x) => x !== cardId);
                    }
                    else {
                        userAnswers.push(cardId);
                    }
                    userAnswers.sort((a, b) => a - b);
                    if (userAnswers.length === taskObj.answerIds.length && userAnswers.every((x, idx) => x === taskObj.answerIds[idx])) {
                        completedTasks.push(taskNum);
                        taskNum = -1;
                        userAnswers = [];
                    }
                }
                break;
            
            case 'sort':
                target = getTarget(ev);
                if (target.tagName === 'P') {
                    let cardId = scientists.find(x => {return x.dead === parseInt(target.textContent.slice(-4))}).id;
                    if (currentCard === cardId) {
                        currentCard = -1;
                    }
                    else {
                        currentCard = cardId;
                        addEventListener('keydown', (ev) => {
                            ev.preventDefault();
                            let cardStartIdx = scientistList.indexOf(cardId);
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
                            console.log('a:', g(scientistList), '\n', cardStartIdx, '=>', cardEndIdx, '\n', cardId, '=>', endCardId); 
                            scientistList = swap(scientistList, cardId, endCardId);
                            console.log('b:', g(scientistList)); 
                            userAnswers = [cardId];
                            fillCards();
                            update();
                        });
                    }
                    
                }
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
    for (let itemIdx = 0; itemIdx < scientistList.length; itemIdx++) {
        const item = cardList.children.item(itemIdx).children.item(0);
        let itemObj = scientists.find(x => x.id === scientistList[itemIdx]);
        if (noName) {
            item.innerHTML = `<br>${itemObj.born}-${itemObj.dead}`; 
        }
        else {
            item.innerHTML = `${itemObj.name} ${itemObj.surname}<br>${itemObj.born}-${itemObj.dead}`; 
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
            taskItem.style.backgroundColor = '#777700';
        }
        else if (completedTasks.includes(i)) {
            taskItem.style.backgroundColor = '#007700';
        }
        else {
            taskItem.style.backgroundColor = '#000000';
        }
    }
    for (let i = 0; i < cardList.children.length; i++) {
        const card = cardList.children.item(i);
        if ([1, 2].includes(taskNum)) {
            if (scientistList.findIndex((x) => x === userAnswers[0]) === i) {
                card.style.backgroundColor = '#CCCC00';
            }
            else {
                card.style.backgroundColor = `${itemBGColor}`;
            }
        }
        else if (userAnswers.includes(i + 1)) {
            card.style.backgroundColor = '#CCCC00';
        }
        else {
            card.style.backgroundColor = `${itemBGColor}`;
        }
    }
}

setStyles();
fillCards();
fillTasks();
addListeners();
addCardListener();

cardsSection.addEventListener('click', update);
