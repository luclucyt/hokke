//to:do: 1. zorg dat er een bar komt voor badscore (hp bar).

//       3. fix de vang functie voor de banaan/varken.
//       4. maak custom art van hokke en alles zodat het een nog betere game is.


console.log("start");
let kong = document.getElementById("kong");
let banana = document.getElementById("banana");
let scoreText = document.getElementsByTagName("h1")[0];
let position = 400;
let score = 0;
let speed = -10;
let badscore = 0;

let direction = "";
let mode = "manual";

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
     // maak hier onder de fuctie om de hoogte te pakkes shit ja cool
    if(kongbox.left < bananbox.right && kongbox.right > bananbox.left){
        console.log("hebbes");
        generateBanana();
        addScore()
        speed = -10;
    }

    if(direction == "left"){
        moveLeft();
    }
    if(direction == "right"){
        moveRight();
    }

    if(speed < 655){
        banana.style.top = speed + "px";
        speed += 5;
    }
    else{
        speed = -10;
        generateBanana();
        badscore++;
        banana.style.top = speed + "px";
    }

    if(badscore == 10){
        alert("Game over");
        badscore = 0;
        score = 0;
        scoreText.innerText = score;
    }

    if(mode == "auto"){
        MoveControls();
    }
}

function controls(event) {
    let key = event.key;
    if(mode == "manual"){
        
        //todo op basis van keycode , links of rechts aanroepen
        if(key == "a" || key == "ArrowLeft" || direction == "left"){  
            moveLeft();
        }

        if(key == "d" || key == "ArrowRight" || direction == "right"){
            moveRight();
        }

        if(key == "s" || key == "ArrowDown"){
            stop();
        }
    }

    if(key == " " || key ==""){
        if(mode == "auto"){
            mode = "manual";
            console.log("manual");
            stop();

            score = 0;
            scoreText.innerText = score;
            badscore = 0;
        } else{
            mode = "auto";
            console.log("auto");

            score = 0;
            scoreText.innerText = score;
            badscore = 0;
        }
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

//switch between modes (auto/manual) 
function MoveControls(){

    let kongbox = getBoundingBox(kong);
    let bananbox = getBoundingBox(banana);

    if(mode == "manual"){
        // manual mode
        if(direction == "left"){
            moveLeft();
        }
        if(direction == "right"){
            moveRight();
        }
        if(direction == ""){
            stop();
        }
    }else if(mode == "auto"){
        // auto mode
        if(kongbox.left > bananbox.right ){
            moveLeft();
        }

        if(kongbox.right < bananbox.left ){
            moveRight();
        }
    }
}


init();