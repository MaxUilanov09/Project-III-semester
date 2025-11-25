const fieldDiv = document.querySelector('.football__field');
const ballDiv = document.querySelector('.football__ball');
const ballPath = './images/Football_Image.png';
const fieldWidth = 720;
const fieldHeight = Math.floor(fieldWidth * 0.3);
let intervalId = -1;

let ballTop = fieldDiv.offsetTop + 85;
let ballLeft = fieldDiv.offsetLeft - (fieldWidth / 2) + 92;

fieldDiv.style.width = `${fieldWidth}px`;
fieldDiv.style.height = `${fieldHeight}px`;
fieldDiv.style.backgroundColor = '#5ABB58';
fieldDiv.style.borderColor = '#000000';
fieldDiv.style.borderRadius = '20px';

ballDiv.style.position = 'absolute';
ballDiv.style.top = `${ballTop}px`;
ballDiv.style.left = `${ballLeft}px`;
ballDiv.style.width = '50px';
ballDiv.style.height = '50px';
ballDiv.style.backgroundImage = `url(${ballPath})`;
ballDiv.style.backgroundSize = 'contain';
ballDiv.style.transform = 'translate(-50%, -50%)';

function tugBall(targetX, targetY) {
    ballTop = ballTop + (targetY - ballTop) / 10
    ballLeft = ballLeft + (targetX - ballLeft) / 10
    ballDiv.style.top = `${ballTop}px`;
    ballDiv.style.left = `${ballLeft}px`;
}

function reverseTugBall(targetX, targetY) {
    console.log('b:', ballLeft, ballTop);
    ballTop = -(targetY - 10 * ballTop) / 9
    ballLeft = -(targetX - 10 * ballLeft) / 9
    console.log('a:', ballLeft, ballTop);
    ballDiv.style.top = `${ballTop}px`;
    ballDiv.style.left = `${ballLeft}px`;
}

function RectContain(rect1, rect2) {
    let result = (
        (rect1[0] + rect1[2] >= rect2[0] + rect2[2]) ||
        (rect2[0] >= rect1[0]) ||
        (rect1[1] + rect1[3] >= rect2[1]  + rect2[3]) ||
        (rect2[1] >= rect1[1])
    );
    console.log('r:', result);
    return result;
}

fieldDiv.addEventListener('click', (ev) => { // box distance check needed
    if (intervalId !== -1) {
        clearInterval(intervalId);
        intervalId = -1;
    }
    intervalId = setInterval(() => {
        let mouseX = ev.pageX;
        let mouseY = ev.pageY;
        if (RectContain([ballDiv.getBoundingClientRect().left, ballDiv.getBoundingClientRect().top, 50, 50], [fieldDiv.getBoundingClientRect().left + 1, fieldDiv.getBoundingClientRect().top + 1, fieldWidth - 2, fieldHeight - 2])) {
            reverseTugBall(mouseX, mouseY);
            clearInterval(intervalId);
            intervalId = -1;
        }
        else if ((Math.abs(ballTop - mouseY) < 3 && Math.abs(ballLeft - mouseX) < 3)) {
            clearInterval(intervalId);
            intervalId = -1;
        }
        else {
            tugBall(mouseX, mouseY);
        }
    }, 1);
})