// Global Variables to select DOM elements
const document_body = $("body");
const level_title = $("#level-title");
const game_buttons = $(".btn");
const green_btn = $(".green");
const red_btn = $(".red");
const yellow_btn = $(".yellow");
const blue_btn = $(".blue");

const levelOne = () => {
  level_title.text("Level 1");
  const random_index = Math.floor(Math.random() * game_buttons.length);
  game_buttons[random_index].toggleClass("pressed");
};

const gameStart = () => {
  document_body.on("keypress", () => {
    levelOne();
  });
};

gameStart();
