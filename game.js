class Cat {
 constructor() {
     this.x = 30;
     this.y = 50;
     this.height = 10;
     this.width = 10;
     this.create = create;
     
     
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
           console.log ("right")
           break;   
       case "ArrowLeft":
           game.moveCat ("left");
           console.log ("left")
           break;
       case "ArrowDown":
           game.moveCat ("down");
           console.log ("down")
           break;
       case "ArrowUp":
           game.moveCat ("up");
           console.log ("up")
           break;       
   }

}); 






class Obstacle { //different kinds of obstacles if time
   constructor(){
    this.x = 30;
    this.y = 50;
    this.height = 10;
    this.width = 10;

   }
    




}




class Game {
    constructor (createEl){
        this.time = 0;
        this.obstacles = [];
        this.create = createEl;
      
        
        


    }
  
   startGame () {
        this.cat = new Cat(); 
        this.create ("cat");
        //create character

         //start countdown
   }






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
    
}
}



function create (className) {
    const mainBoard = document.getElementById("main-board");
    const newElm = document.createElement("div");
   
    newElm.className = className;
    mainBoard.appendChild(newElm);
    
 }

const game = new Game (create); 
game.startGame ();




