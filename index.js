const keys = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};

const direction = {
  BOTTOM_RIGHT: "bottomRight",
  BOTTOM_LEFT: "bottomLeft",
  TOP_LEFT: "topLeft",
  TOP_RIGHT: "topRight",
};

const players = {
  COMPUTER: 1,
  PLAYER: 2,
};

const BALL_STEP = 1;
const PLAYTER_STEP = 5;
const COMPUTER_BAR = 0.5;

var computerScore = 0;
var playerScore = 0;

const params = new URLSearchParams(location.search);
const pName = params.get("pname");

var nameModal = new bootstrap.Modal(document.getElementById('playerNameModal'))
var winModal = new bootstrap.Modal(document.getElementById('winModal'))
var looseModal = new bootstrap.Modal(document.getElementById('looseModal'))

if(!pName){
  nameModal.show()
}else{
    $("#player_name_heading").text(pName);
    startGame();
}

$('#playerNameModal').on('shown.bs.modal', function () {
    $('#nameInput').focus();
})  


$('#winModal').on('shown.bs.modal', function () {
  $('#play_again_button').focus();
})

$('#looseModal').on('shown.bs.modal', function () {
  $('#play_again_button_fail').focus();
})  

document.getElementById("nameForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    const val = $("#nameInput").val();
    if(!val){
        $("#error_message").text("Please enter name to continue");
        return;
    }
    if(val.length > 10){
        $("#error_message").text("Name should be less than 10 characters");
        return;
    }
    $("#error_message").text("");
    location.href = location.origin+location.pathname+"?pname="+val;
})


function increaseScore(player) {
  if (player === players.COMPUTER) {
    computerScore++;
    $("#comp_score").text(computerScore);
  } else {
    playerScore++;
    $("#player_score").text(playerScore);
  }
}

function playerWon(player){
  if (player === players.COMPUTER) {
    looseModal.show();
  }else{
    winModal.show();
  }
}

function retryGame(){
  location.href = location.origin+location.pathname+"?pname="+pName;
}

//Returns bar position in percentage
const getBarPositionX = (bar) => {
  const screenWidth = window.outerWidth;
  let left = Number(bar.css("left").replace("px", ""));
  return (left * 100) / screenWidth;
};
const computerBar = $("#computerBar");
const compBarWidth = computerBar.width();
const playerBar = $("#playerBar");

var goToRight = false;


function startGame() {
  setInterval(() => {
    let barPosition = getBarPositionX(computerBar);
    if (barPosition == 0) goToRight = true;
    if (barPosition == 69) goToRight = false;
    if (goToRight) barPosition += COMPUTER_BAR;
    else barPosition -= COMPUTER_BAR;
  
    barPosition = barPosition + "vw";
    computerBar.css("left", barPosition);
  }, 10);


  var goToDirection = direction.BOTTOM_RIGHT;
  const ballAreaHeight = parseInt($("#ballArea").height()) - 19;
  const ballAreaWidth = parseInt($("#ballArea").width()) - 30;
  const ball = $("#ball");
  setInterval(() => {
    let left = parseInt(Number(ball.css("left").replace("px", "")));
    let top = parseInt(Number(ball.css("top").replace("px", "")));

    if (top === 0) {
      const barStartPosition = Number(
        computerBar.css("left").replace("px", "")
      );
      const barEndPosition = barStartPosition + compBarWidth;
      if (left <= barStartPosition || left >= barEndPosition) {
        increaseScore(players.PLAYER);
        if(playerScore === 5){
          playerWon(players.PLAYER);          
        }
      }

      if (goToDirection === direction.TOP_RIGHT) {
        goToDirection = direction.BOTTOM_RIGHT;
      } else {
        goToDirection = direction.BOTTOM_LEFT;
      }
    }

    if (top === ballAreaHeight) {
      const barStartPosition = Number(playerBar.css("left").replace("px", ""));
      const barEndPosition = barStartPosition + compBarWidth;
      if (left <= barStartPosition || left >= barEndPosition) {
        increaseScore(players.COMPUTER);
        if(computerScore === 5){
          playerWon(players.COMPUTER);          
        }
      }

      if (goToDirection === direction.BOTTOM_RIGHT) {
        goToDirection = direction.TOP_RIGHT;
      } else {
        goToDirection = direction.TOP_LEFT;
      }
    }

    if (left === ballAreaWidth) {
      if (goToDirection === direction.TOP_RIGHT) {
        goToDirection = direction.TOP_LEFT;
      } else {
        goToDirection = direction.BOTTOM_LEFT;
      }
    }

    if (left === 0) {
      if (goToDirection === direction.TOP_LEFT) {
        goToDirection = direction.TOP_RIGHT;
      } else {
        goToDirection = direction.BOTTOM_RIGHT;
      }
    }

    if (goToDirection === direction.BOTTOM_RIGHT) {
      left += BALL_STEP;
      left += "px";
      top += BALL_STEP;
      top += "px";
    }
    if (goToDirection === direction.BOTTOM_LEFT) {
      left -= BALL_STEP;
      left += "px";
      top += BALL_STEP;
      top += "px";
    }
    if (goToDirection === direction.TOP_LEFT) {
      left -= BALL_STEP;
      left += "px";
      top -= BALL_STEP;
      top += "px";
    }
    if (goToDirection === direction.TOP_RIGHT) {
      left += BALL_STEP;
      left += "px";
      top -= BALL_STEP;
      top += "px";
    }
    ball.css("left", left);
    ball.css("top", top);
  }, 1);
}

$("body").on("keydown", (event) => {
  const key = event.originalEvent.key;
  if (key === keys.LEFT || key === keys.RIGHT) {
    let barPosition = getBarPositionX(playerBar);
    if (key === keys.LEFT && barPosition >= 4) {
      barPosition = barPosition - PLAYTER_STEP;
    }
    if (key === keys.RIGHT && barPosition <= 77) {
      barPosition = barPosition + PLAYTER_STEP;
    }
    barPosition = barPosition + "vw";
    playerBar.css("left", barPosition);
  }
});
