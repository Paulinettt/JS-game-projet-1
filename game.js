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

moveDown () {
    this.y--;
    if (this.y < 0) {
        this.y = 0;
    }
}

moveUp () {
    this.y++
    if (this.y > 80) {
        this.y = 80;
    }
}


}

document.addEventListener("keydown", function (event) {  //moving the cat around

    switch(event.key){
       case "ArrowRight":
           game.moveCat ("right");
           
           break;   
       case "ArrowLeft":
           game.moveCat ("left");
           
           break;
       case "ArrowDown":
           game.moveCat ("down");
           
           break;
       case "ArrowUp":
           game.moveCat ("up");
           
           break;       
   }

}); 






class Asteroid { //obstacle game over
   constructor(){
    this.x = 95;
    this.y = Math.floor(Math.random() * 80);
    this.height = 20;
    this.width = 20;
    

   }
    
    moveAsteroid() {
    this.x--;
    console.log("moveaster")
} 

 

}


class Fish { //obstacle +1 point
   constructor() {
    this.x = 95;
    this.y = Math.floor(Math.random() * 80);
    this.height = 20;
    this.width = 20;
    this.domObst = null;
   

   }


   moveFish() {
    this.x--;
    console.log("movefish")
    
} 


}


//timer + score


var timeLeft = 40 //seconds

    let counter = document.getElementById("timer")

    function updateTimer() {
        timeLeft = timeLeft - 1;
        if(timeLeft >= 0)
        counter.innerHTML = timeLeft
        else {
            //remove obstacles and game over?
            //delete all obstacles?
           
            console.log ("Out of time and out of fish!")
            alert("Time's Up!");

            document.location.reload();
            
        }
      }

      function startTimer() {
        // setInterval will call updateTimer
       
        timer = setInterval(updateTimer, 1000);
        
        updateTimer();
        
      }

      startTimer()
      updateTimer()

     //score count

      let totalScore = document.getElementById("total-points")
      var score = 0;

      function countPoints() {

        score++;

        totalScore.innerHTML = score;

        if (score === 10) {
            console.log("Niiiice!")
            //end game and take to another page 
          
             alert("YOU WON!");

            document.location.reload();

            //clearInterval?
            
            
        }
    }





class Game {
    constructor (createEl){
        this.time = 0;
        this.astArr = [];
        this.fishArr = [];
        this.create = createEl;
        this.cat = null;
    }
  
   startGame () {
        this.cat = new Cat(); 
        this.cat.domCat = this.create ("cat"); //create cat in the DOM
        this.drawCat ();
       
         //set countdown before obstacles?
         

    this.startObstacles()
  
   }

   startObstacles (){
            
   console.log("start obstacles works")

         // asteroid in the DOM
        

         // fish in the DOM
         
   
        this.myInterval = setInterval ( () => { 
        
    
        if (this.time % 20 === 0) {
            const fish = new Fish ()
            fish.domObst = this.create("fish");
            this.fishArr.push(fish);
        }

        if (this.time % 40 === 0) { 
            const asteroid = new Asteroid ()
            asteroid.domObst = this.create ("asteroid");
            this.astArr.push(asteroid); 
         }


         this.fishArr.forEach( (fish) => {  
            fish.moveFish(); 
            this.drawFish(fish);  
        });

        this.astArr.forEach( (asteroid) => {  
            asteroid.moveAsteroid();
            this.drawAsteroid(asteroid);          
        });


    
        this.time++;
    
     }, 100) ;  


} 



/* deleteAsteroidOffScreen () {   
    if (this.asteroid.x < 0 ){
        
        this.fishArr.shift() //remove from array
        this.asteroid.domObst.remove() //remove from the dom 
    }

} */

/* deleteFishOffScreen () {
    if (this.fish.x < 0 ){
        
        this.fishArr.shift() //remove from array
        this.fish.domObst.remove() //remove from the dom 
    }
} */




 moveCat(direction) {
    if(direction === "left"){
        this.cat.moveLeft();
        
    } else if (direction === "right"){
        this.cat.moveRight();
        
    } else if (direction === "up") {
        this.cat.moveUp();

    } else if (direction === "down") {
        this.cat.moveDown();
    }
        this.drawCat();
    
}


 drawCat () {
     this.cat.domCat.style.left = this.cat.x + "%";
     this.cat.domCat.style.bottom = this.cat.y + "%"; 
     
}

drawAsteroid (asteroid) {
    asteroid.domObst.style.left = asteroid.x + "%";
    asteroid.domObst.style.bottom = asteroid.y + "%"; 
    console.log("drawasteroid")


} 

drawFish (fish) {
    fish.domObst.style.left = fish.x + "%";
    fish.domObst.style.bottom = fish.y + "%";
    console.log ("drawfish")
}
 


  

}



//create elements


function create (className) { //create asteroid/fish and cat 
    const mainBoard = document.getElementById("main-board");
    const newElm = document.createElement("div");
   
    newElm.className = className;
    mainBoard.appendChild(newElm);
    return newElm;
    
 }


 //start game + obstacles

const game = new Game (create); 
game.startGame ();









