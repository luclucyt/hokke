// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// https://css-tricks.com/making-css-animations-feel-natural/

// todo: game over toevoegen bij 10 punten

console.log("start");
let kong = document.getElementById("kong");
let banana = document.getElementById("banana");
let scoreText = document.getElementsByTagName("h1")[0];
let position = 400;
let score = 0;

let speed = -5;
let badscore = 0;



let direction = "";


function init(){
    document.addEventListener('keydown', controls);
    kong.style.left = position + "px";
    scoreText.innerText = "0";
    gameEngine(); //direct starten
    setInterval(gameEngine, 25); // herhaal 120 ms
    generateBanana();
}

function gameEngine(){
    
    //  bounding box
    let kongbox = getBoundingBox(kong);
    let bananbox = getBoundingBox(banana);

    if(kongbox.left < bananbox.right && kongbox.right > bananbox.left ){
        console.log("hebbes");
        generateBanana();
        addScore()
    }

    if(direction == "left"){
        moveLeft();
    }
    if(direction == "right"){
        moveRight();
    }

    if(speed < 650 ){
        speed += 5
        banana.style.top = speed + "px";
    }
    else{
        badscore++;
        speed = 0;
        generateBanana();
        console.log (badscore)
    }

    if (badscore == 10) {
        window.alert ("game over")
    }
}

function controls(event) {
    let key = event.key;
    //todo op basis van keycode , links of rechts aanroepen
    if(key == "a" || key == "ArrowLeft" || direction == "left"){  
        moveLeft();
    }

    if(key == "d" || key == "ArrowRight" || direction == "right"){
        moveRight();
    }

    if(key == " " || key ==""){
        stop();
    }
}

function moveLeft(){
    position -= 10;
    kong.style.left = position + "px";
    kong.style.transform = "scaleX(-1)";
    direction = "left";
}


function moveRight(){
    position += 10;
    kong.style.left = position + "px";
    kong.style.transform = "scaleX(+1)";
    direction = "right";
}

function stop(){
    position += 0;
    direction = "";
    kong.style.left = position + "px";
    kong.style.transform = "scaleX(1)";
}


function generateBanana(){
    banana.style.opacity = 1;
    
    // banaan mag niet buiten de stage staan 1000px
    // maak er tientallen van met *10 
    let bananaSpawn = Math.floor(Math.random() * 130)*10 + "px";
    banana.style.left = bananaSpawn;
};

function addScore(){
    score++;
    scoreText.innerText = score;
}

// offset van 1px?
function getBoundingBox(element){
    let rect = element.getBoundingClientRect();
    left = rect.left -1;
    right = rect.left + rect.width -1;
    return {"left":left, "right":right};
}

init();