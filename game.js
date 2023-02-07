// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// https://css-tricks.com/making-css-animations-feel-natural/

// todo: game over toevoegen bij 10 punten

console.log("start");
let kong = document.getElementById("kong");
let banana = document.getElementById("banana");
let scoreText = document.getElementsByTagName("h1")[0];
let position = 400;
let score = 0;

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
    
    if(kongbox.left > bananbox.right ){
        moveLeft();
    }

    if(kongbox.right < bananbox.left ){
        moveRight();
    }

   if(kongbox.left < bananbox.right && kongbox.right > bananbox.left ){
        console.log("hebbes");
        generateBanana();
        addScore()
    }
}

function controls(event) {
    let key = event.key;
    //todo op basis van keycode , links of rechts aanroepen
    if(key == "a" || key == "ArrowLeft"){  
      moveLeft();
    }

    if(key == "d" || key == "ArrowRight"){
      moveRight();
    }
  }

  function moveLeft(){
      position -= 10;
      kong.style.left = position + "px";
      kong.style.transform = "scaleX(-1)";
  }

  function moveRight(){
    position += 10;
    kong.style.left = position + "px";
    kong.style.transform = "scaleX(+1)";
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