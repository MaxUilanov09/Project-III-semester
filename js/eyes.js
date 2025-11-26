const eyeDiv = document.querySelector('.eyes');
const eyeBody1 = document.querySelector('.eyeBody1');
const eyePupil1 = document.querySelector('.eyePupil1');
const eyeBody2 = document.querySelector('.eyeBody2');
const eyePupil2 = document.querySelector('.eyePupil2');

const eyeSize = 200;
const pupilSize = 25;
const eyeGap = 25;
const eyeDivWidth = eyeSize * 3 + eyeGap;
const eyeDivHeight = eyeSize * 2;
const maxPupilMove = eyeSize * (0.5 - 0.15);
const eyeOffsets = [[eyeSize / 2, eyeSize / 2], [eyeSize * (3 / 2) + eyeGap, eyeSize / 2]];
const pupilPoses = [[eyeSize / 2, eyeSize / 2], [eyeSize / 2, eyeSize / 2]];
let pupilPos1X = pupilPoses[0][0];
let pupilPos2X = pupilPoses[1][0];
let rotations = [0, 0];
let angles = [0, 0];
let eyeIntervalPosId = -1;
let eyeIntervalAngleId = -1;

eyeDiv.style.display = 'flex';
eyeDiv.style.gap = `${eyeGap}px`;
eyeDiv.style.alignItems = `center`;
eyeDiv.style.justifyContent = `center`;
eyeDiv.style.width = `${eyeDivWidth}px`;
eyeDiv.style.height = `${eyeDivHeight}px`;
eyeDiv.style.marginTop = '40px';
eyeDiv.style.backgroundColor = `#AAAAAA`;
eyeDiv.style.borderRadius = '25px';

eyeBody1.style.width = `${eyeSize}px`;
eyeBody1.style.height = `${eyeSize}px`;
eyeBody1.style.backgroundColor = '#EEEEEE';
eyeBody1.style.borderRadius = '50%';
eyeBody1.style.transform = `rotate(${rotations[0]}rad)`;

eyeBody2.style.width = `${eyeSize}px`;
eyeBody2.style.height = `${eyeSize}px`;
eyeBody2.style.backgroundColor = '#EEEEEE';
eyeBody2.style.borderRadius = '50%';
eyeBody2.style.transform = `rotate(${rotations[1]}rad)`;

eyePupil1.style.position = 'relative';
eyePupil1.style.width = `${pupilSize}px`;
eyePupil1.style.height = `${pupilSize}px`;
eyePupil1.style.left = `${pupilPoses[0][0]}px`;
eyePupil1.style.top = `${pupilPoses[0][1]}px`;
eyePupil1.style.backgroundColor = '#000000';
eyePupil1.style.borderRadius = '50%';
eyePupil1.style.transform = 'translate(-50%, -50%)';

eyePupil2.style.position = 'relative';
eyePupil2.style.width = `${pupilSize}px`;
eyePupil2.style.height = `${pupilSize}px`;
eyePupil2.style.left = `${pupilPoses[1][0]}px`;
eyePupil2.style.top = `${pupilPoses[1][1]}px`;
eyePupil2.style.backgroundColor = '#000000';
eyePupil2.style.borderRadius = '50%';
eyePupil2.style.transform = 'translate(-50%, -50%)';

function dist(pos1, pos2) {
    return Math.sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2)
}

function clamp(x) {
    return Math.max(-1, Math.min(1, x));
}

function minDiff(to, from) {
    let minRes = [Infinity, Infinity];
    for (let i = -3; i < 4; i++) {
        let dist_i = (to - from) + i * 2 * 3.14;
        if (Math.abs(dist_i) < Math.abs(minRes[1])) {
            minRes = [i, dist_i];
        }
        // console.log(i, dist_i);
    }
    return minRes;
}

function movePupils(mouseX, mouseY) {
    let mousePos = [mouseX - eyeDiv.getBoundingClientRect().left, mouseY - eyeDiv.getBoundingClientRect().top];
    let relMousePos1 = [mousePos[0] - (pupilPoses[0][0] + eyeOffsets[0][0]), mousePos[1] - (pupilPoses[0][1] + eyeOffsets[0][1])];
    let relMousePos2 = [mousePos[0] - (pupilPoses[1][0] + eyeOffsets[1][0]), mousePos[1] - (pupilPoses[1][1] + eyeOffsets[1][1])];
    let pupilDist1 = dist([pupilPoses[0][0] + eyeOffsets[0][0], pupilPoses[0][1] + eyeOffsets[0][1]], mousePos);
    let pupilDist2 = dist([pupilPoses[1][0] + eyeOffsets[1][0], pupilPoses[1][1] + eyeOffsets[1][1]], mousePos); 
    pupilPos1X = pupilPos1X + (((pupilDist1 < maxPupilMove) ? pupilPoses[0][0] - pupilDist1 :  pupilPoses[0][0] - maxPupilMove) - pupilPos1X) / 10;
    pupilPos2X = pupilPos2X + (((pupilDist2 < maxPupilMove) ? pupilPoses[1][0] - pupilDist2 :  pupilPoses[1][0] - maxPupilMove) - pupilPos2X) / 10;
    angles = [Math.acos(clamp(relMousePos1[0] / pupilDist1)), Math.acos(clamp(relMousePos2[0] / pupilDist2))].map(x => isNaN(x) ? 0 : x % (2 * Math.PI));
    rotations[0] = (rotations[0] + minDiff(angles[0] * Math.sign(-relMousePos1[1]), rotations[0])[1] / 4) % (2 * Math.PI);
    rotations[1] = (rotations[1] + minDiff(angles[1] * Math.sign(-relMousePos2[1]), rotations[1])[1] / 4) % (2 * Math.PI);
    if (relMousePos1[1] === 0) {
        rotations[0] = Math.PI * (1 - (Math.sign(relMousePos1[0]) === 1));
    }
    if (relMousePos2[1] === 0) {
        rotations[1] = Math.PI * (1 - (Math.sign(relMousePos2[0]) === 1));
    }
    eyeBody1.style.transform = `rotate(${Math.PI - rotations[0]}rad)`;
    eyePupil1.style.left = `${pupilPos1X}px`;
    eyeBody2.style.transform = `rotate(${Math.PI - rotations[1]}rad)`;
    eyePupil2.style.left = `${pupilPos2X}px`;
}

function defaultPupils() {
    pupilPos1X = pupilPos1X + (pupilPoses[0][0] - pupilPos1X) / 10;
    pupilPos2X = pupilPos2X + (pupilPoses[1][0] - pupilPos2X) / 10;
    eyeBody1.style.transform = `rotate(${Math.PI - rotations[0]}rad)`;
    eyePupil1.style.left = `${pupilPos1X}px`;
    eyeBody2.style.transform = `rotate(${Math.PI - rotations[1]}rad)`;
    eyePupil2.style.left = `${pupilPos2X}px`;
}


eyeDiv.addEventListener('mousemove', (ev) => {
    clearInterval(eyeIntervalAngleId);
    eyeIntervalAngleId = setInterval(() => {
        movePupils(ev.clientX, ev.clientY);
        if (Math.abs(angles[0] - rotations[0]) < 0.03 && Math.abs(angles[1] - rotations[1]) < 0.03) {
            clearInterval(eyeIntervalAngleId);
            eyeIntervalAngleId = -1;
        }
    }, 10);
});

eyeDiv.addEventListener('mouseout', (ev) => {
    clearInterval(eyeIntervalAngleId);
    eyeIntervalAngleId = -1;
    clearInterval(eyeIntervalPosId);
    eyeIntervalPosId = -1;
    let mousePos = [ev.clientX - eyeDiv.getBoundingClientRect().left, ev.clientY - eyeDiv.getBoundingClientRect().top];
    let outOfDiv = !(mousePos[0] > 0 && mousePos[0] < eyeDivWidth && mousePos[1] > 0 && mousePos[1] < eyeDivHeight);
    if (outOfDiv) {
        eyeIntervalPosId = setInterval(() => {
            defaultPupils()
            if (Math.abs(pupilPos1X - pupilPoses[0][0]) < 3 && Math.abs(pupilPos2X - pupilPoses[1][0]) < 3) {
                clearInterval(eyeIntervalPosId);
                eyeIntervalPosId = -1;
                rotations[0] = 0;
                rotations[1] = 0;
            }
        }, 10);
    }
});

eyeDiv.addEventListener('mousein', () => {
    clearInterval(eyeIntervalPosId);
    eyeIntervalPosId = -1;
});