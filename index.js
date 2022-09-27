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

const BALL_STEP = 1;

//Returns bar position in percentage
const getBarPositionX = (bar) => {
  const screenWidth = window.outerWidth;
  let left = Number(bar.css("left").replace("px", ""));
  return (left * 100) / screenWidth;
};

//Returns bar position in percentage
const getBarPositionY = (bar) => {
  let screenHeigth = $("#ballArea").height();
  let top = Number(bar.css("top").replace("px", ""));
  return (top * 100) / screenHeigth;
};

(function () {
  var goToRight = false;
  const bar = $("#computerBar");
  setInterval(() => {
    let barPosition = getBarPositionX(bar);
    if (barPosition == 0) goToRight = true;
    if (barPosition == 80) goToRight = false;
    if (goToRight) barPosition += 0.2;
    else barPosition -= 0.2;

    barPosition = barPosition + "vw";
    bar.css("left", barPosition);
  }, 10);
})();

(function () {
  var goToDirection = direction.BOTTOM_RIGHT;
  const ballAreaHeight = parseInt($("#ballArea").height());
  const ballAreaWidth = parseInt($("#ballArea").width())-30;
  const ball = $("#ball");
  setInterval(() => {
    let left = parseInt(Number(ball.css("left").replace("px", "")));
    let top =  parseInt(Number(ball.css("top").replace("px", "")));
    if(top === ballAreaHeight){
      if(goToDirection === direction.BOTTOM_RIGHT){
        goToDirection = direction.TOP_RIGHT;
      }
      else{
        goToDirection = direction.TOP_LEFT;
      }
    }
    if(top === 0){
      if(goToDirection === direction.TOP_RIGHT){
        goToDirection = direction.BOTTOM_RIGHT;
      }else{
        goToDirection = direction.BOTTOM_LEFT;
      }
    }

    if(left === ballAreaWidth){
      if(goToDirection === direction.TOP_RIGHT){
        goToDirection = direction.TOP_LEFT;
      }else{
        goToDirection = direction.BOTTOM_LEFT;
      }
    }

    if(left === 0){
      if(goToDirection === direction.TOP_LEFT){
        goToDirection = direction.TOP_RIGHT;
      }else{
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
  }, 5);
})();

$("body").on("keydown", (event) => {
  const key = event.originalEvent.key;
  if (key === keys.LEFT || key === keys.RIGHT) {
    const bar = $("#playerBar");
    let barPosition = getBarPositionX(bar);
    if (key === keys.LEFT && barPosition >= 4) {
      barPosition = barPosition - 1;
    }
    if (key === keys.RIGHT && barPosition <= 77) {
      barPosition = barPosition + 1;
    }
    barPosition = barPosition + "vw";
    bar.css("left", barPosition);
  }
});
