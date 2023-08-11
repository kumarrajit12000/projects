let gameseq = [];
let userseq = [];

let btns = ["pink","green","blue","orange"];

let level = 0;
let started = false;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if(started == false) {
        console.log("game is started");
        started = true;
        levelup();
    }
})
function levelup() {
    userseq = [];
    level++;

    h3.innerText = `level ${level}`;

    let randidx = Math.floor(Math.random() * 3);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    fleshbtn(randbtn);
}

function fleshbtn(randbtn) {
    randbtn.classList.add("flesh");

    setTimeout(function () {
        randbtn.classList.remove("flesh");
    },1000);
}

function checkAns(idx) {
    if(userseq[idx] === gameseq[idx]) {
        if(userseq.length === gameseq.length){
            setTimeout(levelup,1000);
        }
    }
    else {
        h3.innerHTML = `Game Over! your score is <b>${level}</b><br> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor= "white";
        },200);
        reset();
    }
}

function btnpress() {
    let btn = this;
    fleshbtn(btn); 

  let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length-1);
}
let allbtn = document.querySelectorAll(".btn");
for(btn of allbtn) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    level = 0;
    started = false;
    gameseq=[];
    userseq = [];
}