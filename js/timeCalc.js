const inputTime = document.querySelector('.timeCalcInput');
const outputFormat = document.querySelector('.timeCalcText');
outputFormat.textContent = `${0}h : ${0}m`;

inputTime.addEventListener('focusout', () => {
    let time = parseInt(inputTime.value);
    if (time < 0) {
        alert('Invalid Time format');
        return;
    }
    outputFormat.textContent = `${Math.floor(time / 60)}h : ${time % 60}m`;
})