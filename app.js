let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let highScore = 0;


let h2 = document.querySelector('h2');

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is started");
        started = true;
        levelUp();
    }
    
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

let highScoreDisplay = document.getElementById("highScore");
highScoreDisplay.innerText = `High Score: ${highScore}`;
 
function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b><br>Press any key to start`;
        gameOver();
        if (level - 1 > highScore) {
            highScore = level - 1;
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }
        
        
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function gameOver() {
    document.body.classList.add("lose"); // Change background to red
    setTimeout(() => {
        document.body.classList.remove("lose"); // Reset back to normal
    }, 800); // Reset after 0.8 seconds

}
