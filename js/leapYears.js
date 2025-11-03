const inputYear = document.querySelector('---');
const outputResult = document.querySelector('---');

inputYear.addEventListener('unfocus', () => {
    if (inputYear.value < 0) {
        outputResult.textContent = 'Рік має бути додатний';
        outputResult.style.color = '#d56a00';
        return;
    }
    if (inputYear.value % 4 === 0) {
        outputResult.textContent = 'Ви народилися у високосний рік!';
        outputResult.style.color = '#039900';
    }
    else {
        outputResult.textContent = 'Ви не народилися у високосний рік';
        outputResult.style.color = '#990000';
    }
});