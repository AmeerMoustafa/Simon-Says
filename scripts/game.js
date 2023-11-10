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

const levelOne = () => {
  level_title.text("Level 1");
  const random_index = Math.floor(Math.random() * game_buttons.length);
  const selected_button = $(game_buttons[random_index]);

  playAudio(selected_button).play();

  const toggle_press = () => {
    selected_button.toggleClass("pressed");
  };

  toggle_press();
  setTimeout(toggle_press, 100);
};

const gameStart = () => {
  document_body.on("keypress", () => {
    levelOne();
  });
};

gameStart();
