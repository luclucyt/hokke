console.log("start");
let kong = document.getElementById("kong");
let banana = document.getElementById("banana");
let scoreText = document.getElementsByTagName("h1")[0];
let position = 400;
let score = 0;
let speed = -10;
let heathPoints = 10;

let direction = "";
let mode = "manual";

let pauze = true;

function init(){
    document.addEventListener('keydown', controls);
    kong.style.left = position + "px";
    scoreText.innerText = "0";
    gameEngine(); //direct starten
    setInterval(gameEngine, 25); // herhaal 120 ms
    generateBanana();
}

function gameEngine(){
    if(pauze == false){
        //  bounding box
        let kongbox = getBoundingBox(kong);
        let bananbox = getBoundingBox(banana);
        
        // maak hier onder de fuctie om de hoogte te pakkes shit ja cool
        if(kongbox.left < bananbox.right && kongbox.right > bananbox.left && kongbox.top < bananbox.bottom && kongbox.bottom > bananbox.bottom){
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
            heathPoints--;
            banana.style.top = speed + "px";
            updateHeathPoints();
        }

        if(heathPoints == 0){
            for(let i = 1; i < 10; i++){
                let heathPointDiv = document.getElementById("bar" + i);
                heathPointDiv.style.backgroundColor = "#00ff08ee";
            }     
            alert("Game over");
            heathPoints = 10;
            score = 0;
            scoreText.innerText = score;
        }

        if(mode == "auto"){
            MoveControls();
        }

        //check if kong is out of bounds, if so teleport him to the other side
        if(position < -150){
            position = 1250;
            kong.style.left = position + "px";
        }
        if(position > 1250){
            position = -150;
            kong.style.left = position + "px";
        }
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
            heathPoints = 10;
        } else{
            mode = "auto";
            console.log("auto");

            score = 0;
            scoreText.innerText = score;
            heathPoints = 10;
        }
    }

    if(key == "p"){
        if(pauze == false){
            pauze = true;
            
        }else{
            pauze = false;
        }
    }
    else{
        if(pauze == true){
            pauze = false;
        }
    }
}

function moveLeft(){
    if(pauze == false){
        position -= 10;
        kong.style.left = position + "px";
        kong.style.transform = "scaleX(-1)";
        direction = "left";
    }
}


function moveRight(){
    if(pauze == false){
        position += 10;
        kong.style.left = position + "px";
        kong.style.transform = "scaleX(+1)";
        direction = "right";
    }
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
    let left = rect.left - 1;
    let right = rect.left + rect.width - 1;
    let top = rect.top;
    let bottom = rect.top + rect.height - 1;
    
    return {"left":left, "right":right, "top":top, "bottom":bottom};
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
        if(kongbox.left > bananbox.left && kongbox.right < bananbox.right){
            console.log("stop");
            stop();
        }else if(kongbox.left > bananbox.right ){
            console.log("links");
            moveLeft();
        }else if(kongbox.right < bananbox.left ){
            console.log("rechts");
            moveRight();
        }
    }
}

function updateHeathPoints(){
    let heathPointDiv = document.getElementById("bar" + (heathPoints + 1));
    heathPointDiv.style.backgroundColor = "red";
}
init();