const inputYear = document.querySelector('.leapYearInput');
const outputResult = document.querySelector('.leapYearText');
outputResult.textContent = 'Введіть рік народження';

const checkYear = () => {
    let year = Number(inputYear.value);
    console.log(year);
    if (year < 0) {
        outputResult.textContent = 'Рік має бути додатний';
        outputResult.style.color = '#D5A000';
        return;
    }
    if (year % 4 === 0) {
        outputResult.textContent = 'Ви народилися у високосний рік!';
        outputResult.style.color = '#039900';
    }
    else {
        outputResult.textContent = 'Ви не народилися у високосний рік';
        outputResult.style.color = '#990000';
    }
}

inputYear.addEventListener('keyup', checkYear);