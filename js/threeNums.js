const threeNumsInput1 = document.querySelector('.threeNumsInput1');
const threeNumsInput2 = document.querySelector('.threeNumsInput2');
const threeNumsInput3 = document.querySelector('.threeNumsInput3');
const threeNumsOutput = document.querySelector('.threeNumsOutput');


function getMax() {
    let num1 = parseInt(threeNumsInput1.value);
    let num2 = parseInt(threeNumsInput2.value);
    let num3 = parseInt(threeNumsInput3.value);
    let maxNum = Math.max(num1, num2, num3);
    if (isNaN(maxNum)) {
        return 'Введіть числа';
    }
    return `Найбільше число, яке ви ввели - ${maxNum}`;
}

function update() {
    let outputStr = getMax();
    threeNumsOutput.textContent = outputStr;
}

threeNumsInput1.addEventListener('keyup', update);
threeNumsInput2.addEventListener('keyup', update);
threeNumsInput3.addEventListener('keyup', update);