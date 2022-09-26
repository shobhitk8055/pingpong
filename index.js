const keys = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};

//Returns bar position in percentage
const getBarPosition = (bar) => {
  const screenWidth = window.outerWidth;
  let left = Number(bar.css("left").replace("px", ""));
  return (left * 100) / screenWidth;
};

(function () {
  var goToRight = false;
  setInterval(() => {
    const bar = $("#computerBar");
    let barPosition = getBarPosition(bar);
    if (barPosition == 0) goToRight = true;
    if (barPosition == 80) goToRight = false;
    if (goToRight) barPosition += 0.2;
    else barPosition -= 0.2;

    barPosition = barPosition + "vw";
    bar.css("left", barPosition);
  }, 10);
})();

$("body").on("keydown", (event) => {
  // if
  const key = event.originalEvent.key;
  if (key === keys.LEFT || key === keys.RIGHT) {
    const bar = $("#playerBar");
    let barPosition = getBarPosition(bar);
    if (key === keys.LEFT && barPosition >= 4) {
        barPosition = barPosition - 4;
    }
    if (key === keys.RIGHT && barPosition <= 77) {
        barPosition = barPosition + 4;
    }
    barPosition = barPosition + "vw";
    bar.css("left", barPosition);
  }
});
