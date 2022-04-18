//GAME SOUNDS

const mainTune = new Audio("./ressources/main-tune.mp3");
mainTune.loop = true;
mainTune.play();

const grabFishSoung = new Audio("./ressources/success-fish.wav");
const laugh = new Audio("./ressources/laugh.wav");
const meow = new Audio("./ressources/meow.wav");
const noNono = new Audio("./ressources/no-no-no.wav");
const oups = new Audio("./ressources/oups.wav");
const gameOverSong = new Audio("./ressources/game-over song.mp3");
const applause = new Audio("./ressources/applause.wav");

//GAME IMAGES

class Cat {
  constructor() {
    this.x = 40;
    this.y = 50;
    this.height = 10;
    this.width = 10;
  }

  moveLeft() {
    this.x--;
    if (this.x < 0) {
      this.x = 0;
    }
  }

  moveRight() {
    this.x++;
    if (this.x > 90) {
      this.x = 90;
    }
  }

  moveDown() {
    this.y--;
    if (this.y < 0) {
      this.y = 0;
    }
  }

  moveUp() {
    this.y++;
    if (this.y > 80) {
      this.y = 80;
    }
  }
}

//MOVING THE CAT

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowRight":
      game.moveCat("right");
      break;
    case "ArrowLeft":
      game.moveCat("left");
      break;
    case "ArrowDown":
      game.moveCat("down");
      break;
    case "ArrowUp":
      game.moveCat("up");
      break;
  }
});

class Asteroid {
  constructor() {
    this.x = 90;
    this.y = Math.floor(Math.random() * 80);
    this.height = 10;
    this.width = 10;
    this.astArr = [];
  }

  moveAsteroid() {
    this.x--;
  }

  deleteAsteroidOffScreen() {
    if (this.x < 0) {
      this.astArr.shift();
      this.domObst.remove(); 
    }
  }
}

class Fish {
  constructor() {
    this.x = 90;
    this.y = Math.floor(Math.random() * 80);
    this.height = 10;
    this.width = 10;
    this.fishArr = [];
  }

  moveFish() {
    this.x--;
    console.log("movefish");
  }

  deleteFishOffScreen() {
    if (this.x < 0) {
      this.fishArr.shift();
      this.domObst.remove(); //remove from the dom
    }
  }
}

// SET TIMER

var timeLeft = 20; //seconds

let counter = document.getElementById("timer");

function updateTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft >= 0) counter.innerHTML = timeLeft;
  else {
  endGamePage();
  }
}

function startTimer() {
  // setInterval will call updateTimer
  timer = setInterval(updateTimer, 1000);
  updateTimer();
}
startTimer();
updateTimer();

// SET SCORE

let totalScore = document.getElementById("total-points");
var score = 0;

function countPoints() {
  score++;

  totalScore.innerHTML = score;

  if (score === 3) {
    meow.play();
    winPage();   
  }
}

function endGamePage() {
  location.replace("./game-over.html");
}

function winPage() {
  location.replace("./win-page.html");
}

class Game {
  constructor(createEl) {
    this.time = 0;
    this.astArr = [];
    this.fishArr = [];
    this.create = createEl;
  }

  startGame() {
    this.cat = new Cat();
    this.cat.domCat = this.create("cat"); 
    this.cat.domCat.src = "./ressources/sophie.logo.png"
    
    this.drawCat();
    this.startObstacles();
  }

  startObstacles() {


    this.obstLoop = setInterval(() => {
      if (this.time % 50 === 0) {
        const fish = new Fish();
        fish.domObst = this.create("fish");
        fish.domObst.src = "./ressources/fish-icons.png"
        this.fishArr.push(fish);
      }

      if (this.time % 20 === 0) {
        const asteroid = new Asteroid();
        asteroid.domObst = this.create("asteroid");
        asteroid.domObst.src = "./ressources/asteroid-icon.png"
        this.astArr.push(asteroid);
      }

      this.fishArr.forEach((fish) => {
        fish.moveFish();
        this.drawFish(fish);
        fish.deleteFishOffScreen();
        this.detectCollisionWithCat(fish);
      });

      this.astArr.forEach((asteroid) => {
        this.drawAsteroid(asteroid);
        asteroid.moveAsteroid();

        asteroid.deleteAsteroidOffScreen();

        this.gameOverCollision(asteroid);
      });

      this.time++;
    }, 80);
  }

  moveCat(direction) {
    if (direction === "left") {
      this.cat.moveLeft();
    } else if (direction === "right") {
      this.cat.moveRight();
    } else if (direction === "up") {
      this.cat.moveUp();
    } else if (direction === "down") {
      this.cat.moveDown();
    }
    this.drawCat();
  }

  detectCollisionWithCat(fish) {

    if (
      this.cat.x < fish.x + fish.width &&
      this.cat.x + this.cat.width > fish.x &&
      this.cat.y < fish.y + fish.height &&
      this.cat.height + this.cat.y > fish.y
    ) {
      console.log("postcollision");
      this.fishArr.shift();
      fish.domObst.remove();
      grabFishSoung.play();
      countPoints();
    }
  }

  gameOverCollision(asteroid) {
    if (
      this.cat.x < asteroid.x + asteroid.width &&
      this.cat.x + this.cat.width > asteroid.x &&
      this.cat.y < asteroid.y + asteroid.height &&
      this.cat.height + this.cat.y > asteroid.y
    ) {
      noNono.play();
      this.astArr.shift();
      asteroid.domObst.remove();
     
      endGamePage();
      
    }

    // DRAW ELEMENTS
  }
  
  drawCat() {
    this.cat.domCat.style.left = this.cat.x + "%";
    this.cat.domCat.style.bottom = this.cat.y + "%";

  }

  drawAsteroid(asteroid) {
    asteroid.domObst.style.left = asteroid.x + "%";
    asteroid.domObst.style.bottom = asteroid.y + "%";
    console.log("drawasteroid");
  }

  drawFish(fish) {
    fish.domObst.style.left = fish.x + "%";
    fish.domObst.style.bottom = fish.y + "%";
    console.log("drawfish");
  }
}

// CREATE ELEMENTS

function create(className) {
  //asteroid/fish/cat
  const mainBoard = document.getElementById("main-board");
  const newElm = document.createElement("img");
  newElm.className = className;
  mainBoard.appendChild(newElm);
  return newElm;
}


// START GAME
const game = new Game(create);
game.startGame();
