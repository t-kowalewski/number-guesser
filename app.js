/* GAME FUNCTIONALITY
- Player must guess a number between min and max;
- Player gets a certain amount of guesses;
- Notify player of guesses remaining;
- Notify player of the correct answer if loose;
- Let player choose to play again; */

// Game Values
let min = 1,
  max = 10,
  correctNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game_ui = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessInput = document.querySelector('#guess-input'),
  guessBtn = document.querySelector('#guess-btn'),
  gameMessage = document.querySelector('.message');

// Assign UI min & max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again - Event Listener
game_ui.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  };
});

// Submit - Event Listener
guessBtn.addEventListener('click', function () {
  let guess = guessInput.valueAsNumber;
  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  else {
    // Correct Guess - Game Over / Won
    if (guess === correctNum) {
      gameOver(true, `You've won! Correct number is: ${correctNum}`);
    }
    else {
      guessesLeft -= 1;

      // Wrong guess - Game Over
      if (guessesLeft === 0) {
        gameOver(false, `Wrong guess - Game Over. Correct number was: ${correctNum}`);
      }
      // Wrong guess - Game Continues
      else {
        guessInput.style.borderColor = 'red';
        guessInput.value = '';
        setMessage(`Sorry, ${guess} is not correct. Remaining guesses: ${guessesLeft}`, 'red');
      }
    }
  }
});

// ====================================================================

// Game Over - function
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'; /* if else - short */

  // Disable input
  guessInput.disabled = true;
  // Set border style
  guessInput.style.borderColor = color;
  // Message & color
  setMessage(msg, color);

  // Play Again?
  guessBtn.textContent = 'Play Again';
  guessBtn.className += 'play-again';
}

// Set message - function
function setMessage(msg, color) {
  gameMessage.style.color = color;
  gameMessage.textContent = msg;
}

// Generate random correct number - Function
function getRandomNum(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1) + min);
}