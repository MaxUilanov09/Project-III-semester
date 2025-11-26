const secretNumber = Math.floor(Math.random() * 10) + 1;
let guesses = 0;

function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = parseInt(guessInput.value);
  
  if (isNaN(guess) || guess < 1 || guess > 10)
  {
    displayOutput("Помилка введення числа! Введіть число від 1 до 10!");
    return;
  }
  
  guesses++;
  
  if (guess == secretNumber)
  {
    displayOutput("Вітаємо! Ти вгадав число " + secretNumber);
    
  }
  else if (guess < secretNumber)
  {
    displayOutput("Загадане число більше!");
  }
  else
  {
    displayOutput("Загадане число менше!");
  }
  guessInput.value = "";
  guessInput.focus();
}

function displayOutput(message)
{
  const output = document.getElementById("output");
  output.textContent = message;
  output.classList.add("animated", "fadeIn");
  setTimeout(() =>
  {
    output.classList.remove("animated", "fadeIn");
  }, 500);
  }