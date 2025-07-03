let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("highScore");
highScoreDisplay.innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame);

function startGame() {
  if (!started) {
    started = true;
    levelUp();
  }
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  btnFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) setTimeout(levelUp, 1000);
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${
      level - 1
    }</b><br>Tap anywhere or press any key to start`;
    gameOver();
    if (level - 1 > highScore) {
      highScore = level - 1;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
    reset();
  }
}

function btnPress() {
  btnFlash(this);
  let userColor = this.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
  btn.addEventListener("touchstart", btnPress);
});

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function gameOver() {
  document.body.classList.add("lose");
  setTimeout(() => document.body.classList.remove("lose"), 800);
}
