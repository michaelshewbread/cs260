let player = document.querySelector(".player");
let map = document.querySelector(".map");
let coconut = document.querySelector(".thrown-coconut");
let secondCounter = document.querySelector("#seconds");
let secondText = document.querySelector("#second-text");
let minuteCounter = document.querySelector("#minutes");
let minuteText = document.querySelector("#minute-text");
let rank = document.querySelector("#rank");
let KOs = document.querySelector("#KOs");
let gameOverText = document.querySelector("#gameOverText");

let playername = document.querySelector(".player-name");
playername.textContent = localStorage.getItem("username");

let xpos = 0;
let ypos = 0;

let rot = 0;

let seconds = 0;
let minutes = 0;

const screenWidth = window.screen.width;
const screenHeight = window.screen.height; 

const startXpos = -1200;
const startYpos = -800;

let held_directions = [];

let speed = 5;

let isDead = false;

const positionPlayer = () => {
    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === 'd') {xpos += speed;}
        if (held_direction === 'a') {xpos -= speed;}
        if (held_direction === 'w') {ypos -= speed;}
        if (held_direction === 's') {ypos += speed;}
    }

    map.style.transform = "translate("+ ((startXpos+innerWidth)/2-xpos) + "px," + (startYpos-ypos) + "px)";
    
    player.style.transform = "rotate(" + rot + "deg)";
}

const step = () => {
    if (!isDead) {
        positionPlayer();
        window.requestAnimationFrame(()=> {step();})
    }
}
step();

setInterval(incrementTime, 1000);

function incrementTime() {
    if (!isDead) {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            minuteCounter.innerHTML = minutes;
            minuteText.innerHTML = `m`;
            secondText.innerHTML = `s`;
        }
        secondCounter.innerHTML = seconds;
    }
}


document.addEventListener("keydown", (evt) => {
    let dir = evt.key;
    if (dir === 'q') {
        onDeath();
    }
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir);
    }
});

document.addEventListener("keyup", (evt) => {
    //delete the released key from the array
    let dir = evt.key;
    let index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1);
    }
});

document.addEventListener("mousemove", (evt) => {
    //this needs to be changed to be based on an offset from the origin(player), which means
    //that the map transform above needs to incorporate responsive design also
    let x = evt.screenX - screenWidth/2;
    //evt.pageX is relative to document, offsetX is relative to target, screenX relative to scree
    let y = screenHeight/2 - evt.screenY;
    //it takes a lot of math to orient the player right.
    rot = (-1*((Math.atan2(y,x) *(180 / Math.PI)) + 90))+180; 

});

document.addEventListener("click", (evt) =>{
    if (!isDead) {
        throwCoconut(10);
    }
})

function throwCoconut(velocity) {
    let rad = (rot-90) * (Math.PI/180);
    let range = (velocity * velocity)*6;
    let time = (2 * velocity * 1.4)*20; //divided by gravity, but multiplied by 1000 ms
    coconut.animate([
        // key frames
        { transform: 'translate(0px, 0px)' },
        { transform: 'translate(' + Math.cos(rad)*range + 'px, '+ Math.sin(rad)*range + 'px)' }
      ], {
        // sync options
        duration: time,
        iterations: 1
      });
}

document.addEventListener('beforeunload', (evt) => {
    onDeath();
});

function displayDeathScreen() {
    gameOverText.style.visibility = "visible";
}

function onDeath() {
    isDead = true;
    displayDeathScreen();
    scores = JSON.parse(localStorage.getItem('scores'));
    score = {"name":playername.innerHTML, "time":{"seconds":seconds, "minutes":minutes}, "KOs": KOs.innerHTML};
    if (scores) {
        scores.push(score);
    } else {
        scores = [score];
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}