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
let quoteText = document.querySelector("#quoteText");

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
const walkSpeed = 5;
const runSpeed = 7;

let isDead = false;

const positionPlayer = () => {
    for (i = 0; i < held_directions.length; i++) {
        const held_direction = held_directions[i];
        if (held_direction === 'KeyD') {
            xpos += speed;
        }
        if (held_direction === 'KeyA') {
            xpos -= speed;
        }
        if (held_direction === 'KeyW') {
            ypos -= speed;
        }
        if (held_direction === 'KeyS') {
            ypos += speed;
        }
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
    let key = evt.code;
    if (key === 'KeyQ' && !isDead) {
        onDeath();
    }
    if (key === 'ShiftLeft') {
        speed = runSpeed;
    }
    if (key && held_directions.indexOf(key) === -1) {
        held_directions.unshift(key);
    }
});

document.addEventListener("keyup", (evt) => {
    //delete the released key from the array
    let key = evt.code;
    if (evt.code === 'ShiftLeft') {
        speed = walkSpeed;
    }
    let index = held_directions.indexOf(key);
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

async function displayDeathScreen() {
    gameOverText.style.visibility = "visible";
    fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      quoteText.textContent += data.content;
      //authorEl.textContent = data.author;
    });
    quoteText.style.visibility = "visible";
}

async function onDeath() {
    isDead = true;
    displayDeathScreen();
    const score = {"name":playername.innerHTML, "time":{"seconds":seconds, "minutes":minutes}, "KOs": KOs.innerHTML};
    try {
        const response = await fetch('/api/score', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(score),
        });

        const scores = await response.json();
        localStorage.setItem('scores', JSON.stringify(scores));

    } catch {
        let scores = JSON.parse(localStorage.getItem('scores'));
        if (scores) {
            scores.push(score);
        } else {
            scores = [score];
        }
        localStorage.setItem("scores", JSON.stringify(scores));
    }
}