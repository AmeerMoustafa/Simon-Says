// Two arrays to compare results
let playerClicks = [];
let requiredClicks = [];

// Global Variables to select DOM elements
const document_body = $("body");
const level_title = $("#level-title");
const game_buttons = $(".btn");
const green_btn = $(".green");
const red_btn = $(".red");
const yellow_btn = $(".yellow");
const blue_btn = $(".blue");

// Reusable Helper Functions

// A function to handle audio depending on the selected button
const playAudio = (selectedButton) => {
  let audio;

  if (selectedButton.hasClass("green")) {
    audio = new Audio("../sounds/green.mp3");
  } else if (selectedButton.hasClass("red")) {
    audio = new Audio("../sounds/red.mp3");
  } else if (selectedButton.hasClass("yellow")) {
    audio = new Audio("../sounds/yellow.mp3");
  } else if (selectedButton.hasClass("blue")) {
    audio = new Audio("../sounds/blue.mp3");
  }

  return audio;
};

// Handling pressed class toggles

const togglePress = (toToggle) => {
  const toggleButton = () => toToggle.toggleClass("pressed");
  toggleButton();
  setTimeout(toggleButton, 100);
};

// Level functions

const levelOne = () => {
  level_title.text("Level 1");
  const random_index = Math.floor(Math.random() * game_buttons.length);
  const selected_button = $(game_buttons[random_index]);

  playAudio(selected_button).play();

  togglePress(selected_button);

  $(`.green, .red, .yellow, .blue`).on("click", (e) => {
    const clicked_button = $(e.target);
    togglePress(clicked_button);
    playAudio(clicked_button).play();
    const isEqual = $(selected_button).is(e.target);
    if (isEqual) {
      console.log("It works!");
    }
  });
};

const gameStart = () => {
  document_body.on("keypress", () => {
    levelOne();
  });
};

gameStart();
