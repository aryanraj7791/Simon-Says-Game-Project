let gameSeq = [];
let userSeq = [];

let level = 0;
let previousHighScore = 0;
let finalHighScore = 0;
let started = false;
let h2 = document.querySelector('h2');
let btns = ["box1", "box2", "box3", "box4"];

document.addEventListener('keypress', function(){
    if(started == false){
        started = true;
        console.log("Game started!");

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add('gameFlash');
    setTimeout(function(){
        btn.classList.remove('gameFlash');
    },150);
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    },150);
}

function levelUp(){
    userSeq = []; 
    level++;
    h2.innerText = `Level ${level}`;
    
    let randomIdx = Math.floor(Math.random()*4);
    let randombtn = document.querySelector(`.${btns[randomIdx]}`);

    gameFlash(randombtn);
    gameSeq.push(btns[randomIdx]);
    console.log(gameSeq);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br><br>Press any key to restart`;
        let highScore = document.querySelector('#highScore');
        document.querySelector('body').append(highScore);
        previousHighScore = finalHighScore;
        finalHighScore = level;
        if(finalHighScore>previousHighScore){
            highScore.innerHTML = `High Score : <b>${finalHighScore}<b>`;
        }
        let body = document.querySelector('body');
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "white";
        },200);
        reset();
    }
    }

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userBtn = btn.getAttribute('id');
    userSeq.push(userBtn);
    
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.innerBox');
for (allBtn of allBtns) {
    allBtn.addEventListener('click', btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}