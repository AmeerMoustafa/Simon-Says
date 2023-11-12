// Two arrays to compare results
let player_clicks = [];
let required_clicks = [];

// Boolean value to keep track of gamestate
let gameStarted = false;

// To keep track of button clicks and which level we're on
let click_count = 0;
let level_count = 1;

// Global Variables to select DOM elements
const document_body = document.getElementsByTagName("body")[0];
const level_title = document.getElementById("level-title");
const game_buttons = document.querySelectorAll(".btn");

/// Reusable Helper Functions ///

// A function to handle audio depending on the selected button

const playAudio = (selectedButton) => {
  let audio;

  if (selectedButton.classList.contains("green")) {
    audio = new Audio("../sounds/green.mp3");
  } else if (selectedButton.classList.contains("red")) {
    audio = new Audio("../sounds/red.mp3");
  } else if (selectedButton.classList.contains("yellow")) {
    audio = new Audio("../sounds/yellow.mp3");
  } else if (selectedButton.classList.contains("blue")) {
    audio = new Audio("../sounds/blue.mp3");
  }
  return audio;
};

// Handling pressed class toggles

const togglePress = (toToggle) => {
  const button_toggle = () => toToggle.classList.toggle("pressed");

  button_toggle();

  setTimeout(button_toggle, 100);
};

// A reusable function to compare what the player clicked vs the required click

const compareResults = () => {
  return (
    player_clicks[player_clicks.length - 1].toString() ===
    required_clicks[player_clicks.length - 1].toString()
  );
};

// get a random button to flash on screen for the user to click and push it to the required array

const generateSequence = () => {
  const random_index = Math.floor(Math.random() * game_buttons.length);
  const selected_button = game_buttons[random_index];

  togglePress(selected_button);
  playAudio(selected_button).play();

  required_clicks.push(selected_button.id);
};

// A function to reset the necessary variables and end the game

const gameOver = () => {
  level_title.innerHTML = "Game Over, Press Any Key to Restart";

  document_body.classList.toggle("game-over");
  const background_audio = new Audio("../sounds/wrong.mp3");

  setTimeout(() => {
    document_body.classList.toggle("game-over");
    background_audio.play();
  }, 100);

  // Resetting necessary variables before starting a new game.
  level_count = 1;
  player_clicks.length = 0;
  required_clicks.length = 0;
  click_count = 0;
  gameStarted = false;
  // starting a new game
  document_body.addEventListener("keypress", level, { once: true });
};

/// Main functions ///

// Handling button clicks

const handleClick = (e) => {
  if (gameStarted) {
    // Push the clicked button to the player array and run the necessary effects
    click_count++;

    const clicked_button = e.target;
    togglePress(clicked_button);
    playAudio(clicked_button).play();

    player_clicks.push(clicked_button.id);

    // Compare array results
    const results = compareResults();

    // cleaning up button event listeners when a level is cleared to avoid unexpected behavior
    if (click_count >= level_count) {
      game_buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    }

    // Check the comparison of both arrays, if they are not equal. End the game.
    if (!results) {
      gameOver();
    } else {
      if (required_clicks.length === player_clicks.length) {
        click_count = 0;
        level_count++;
        player_clicks.length = 0;
        setTimeout(level, 1000);
      }
    }
  }
};

// Main that handles the level loop
const level = () => {
  level_title.innerText = `Level ${level_count}`;

  generateSequence();

  game_buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
    gameStarted = true;
  });
};

// Initial function to start the game
const gameStart = () => {
  document_body.addEventListener("keypress", level, { once: true });
};

gameStart();
