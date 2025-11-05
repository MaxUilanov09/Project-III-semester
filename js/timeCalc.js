const inputTime = document.querySelector('.timeCalcInput');
const outputFormat = document.querySelector('.timeCalcText');

inputTime.addEventListener('focusout', () => {
    let time = parseInt(inputTime.value);
    if (time < 0) {
        alert('Invalid Time format');
        return;
    }
    outputFormat.textContent = `${Math.floor(time / 60)} : ${time % 60}`;
})