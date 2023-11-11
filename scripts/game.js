// Two arrays to compare results
let player_clicks = [];
let required_clicks = [];

// To keep track of button clicks and which level we're on
let click_count = 0;
let level_count = 1;

// Global Variables to select DOM elements
const document_body = document.getElementsByTagName("body")[0];
const level_title = document.getElementById("level-title");
const game_buttons = document.querySelectorAll(".btn");

const green_btn = document.getElementsByClassName("green")[0];
const red_btn = document.getElementsByClassName("red")[0];
const yellow_btn = document.getElementsByClassName("yellow")[0];
const blue_btn = document.getElementsByClassName("blue")[0];

// Reusable Helper Functions

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

// A function to end the game

const gameOver = () => {
  level_title.innerHTML = "Game Over, Press Any Key to Restart";

  document_body.classList.toggle("game-over");
  const background_audio = new Audio("../sounds/wrong.mp3");

  setTimeout(() => {
    document_body.classList.toggle("game-over");
    background_audio.play();
  }, 100);

  level_count = 1;
};

// Level functions

const level = () => {
  level_title.innerText = `Level ${level_count}`;
  const random_index = Math.floor(Math.random() * game_buttons.length);
  const selected_button = game_buttons[random_index];

  togglePress(selected_button);
  playAudio(selected_button).play();

  required_clicks.push(selected_button.id);

  const handleClick = (e) => {
    click_count++;

    const clicked_button = e.target;
    togglePress(clicked_button);
    playAudio(clicked_button).play();

    player_clicks.push(clicked_button.id);

    const results = compareResults();

    if (!results) {
      gameOver();
    }

    if (click_count >= level_count) {
      game_buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    }

    if (required_clicks.length === player_clicks.length) {
      click_count = 0;
      level_count++;
      player_clicks.length = 0;
      setTimeout(level, 1000);
    }
  };

  game_buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
};

const gameStart = () => {
  document_body.addEventListener("keypress", () => {
    level();
  });
};

gameStart();
