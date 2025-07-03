let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let highScore = 0;

const h2 = document.querySelector("h2");
const highScoreDisplay = document.getElementById("highScore");
highScoreDisplay.innerText = `High Score: ${highScore}`;
const allBtns = document.querySelectorAll(".btn");

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  const randIdx = Math.floor(Math.random() * 4);
  const randColor = btns[randIdx];
  const randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  btnFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${
      level - 1
    }</b><br>Tap or press any key to restart`;
    gameOver();
    if (level - 1 > highScore) {
      highScore = level - 1;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
    disableButtons();
    setTimeout(reset, 1000);
  }
}

function btnPress() {
  if (!started) return;
  const btn = this;
  btnFlash(btn);
  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function gameOver() {
  document.body.classList.add("lose");
  setTimeout(() => {
    document.body.classList.remove("lose");
    enableButtons();
  }, 800);
}

function disableButtons() {
  allBtns.forEach((btn) => btn.classList.add("disabled"));
}

function enableButtons() {
  allBtns.forEach((btn) => btn.classList.remove("disabled"));
}

document.addEventListener("click", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

allBtns.forEach((btn) => btn.addEventListener("click", btnPress));
