// Two arrays to compare results
let player_clicks = [];
let required_clicks = [];

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

// A reusable function to compare the values of two arrays

const compareResults = (player, required) => {
  return player.toString() === required.toString();
};

// Level functions

const levelOne = () => {
  level_title.innerText = "Level 1";
  const random_index = Math.floor(Math.random() * game_buttons.length);
  const selected_button = game_buttons[random_index];

  togglePress(selected_button);
  playAudio(selected_button).play();

  required_clicks.push(selected_button.id);
};

//Binding necessary logic to game buttons

game_buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const clicked_button = e.target;
    togglePress(clicked_button);
    playAudio(clicked_button).play();

    player_clicks.push(clicked_button.id);
  });
});

const gameStart = () => {
  document_body.addEventListener("keypress", levelOne);
};

gameStart();
