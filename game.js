const buttonColors = ["red", "blue", "green", "yellow"];
const blue = new Audio(`sounds/blue.mp3`);
const green = new Audio(`sounds/green.mp3`);
const red = new Audio(`sounds/red.mp3`);
const yellow = new Audio(`sounds/yellow.mp3`);
const wrong = new Audio(`sounds/wrong.mp3`);
const gamePattern = [];
let started = false;
const userClickedPattern = [];
let level = 0;
function nextSequence() {
  userClickedPattern.length = 0;
  level++;
  $("#level-title").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  soundPlay(`#${randomChosenColor}`);
}
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function (event) {
  var clickedButton = event.target.id;

  userClickedPattern.push(clickedButton);
  soundPlay(`#${clickedButton}`);
  animatePress(`#${clickedButton}`);
  let lastIndexClicked = userClickedPattern.lastIndexOf(clickedButton);
  checkAnswer(lastIndexClicked);
});
const animatePress = (currentColour) => {
  $(currentColour).addClass("pressed");
  setTimeout(() => {
    $(currentColour).removeClass("pressed");
  }, 100);
};
function soundPlay(randomNumColorSound) {
  switch (randomNumColorSound) {
    case "#red":
      red.play();
      break;
    case "#blue":
      blue.play();
      break;
    case "#green":
      green.play();
      break;
    case "#yellow":
      yellow.play();
      break;
  }
}
function checkAnswer(curentLevel) {
  if (gamePattern[curentLevel] === userClickedPattern[curentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    wrong.play();
    $('body').addClass('game-over');
    setTimeout(()=>{
      $('body').removeClass('game-over');
    },200)
    $("#level-title").text('Game over, Press Any Key to Restart you Retard!');
    startOver();
  }
}
function startOver(){
  level = 0;
  gamePattern.length = 0;
  started = false
}
