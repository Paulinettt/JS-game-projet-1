class Cat {
 constructor() {
     this.x = 30;
     this.y = 50;
     this.height = 10;
     this.width = 10;
     this.create = create;
     this.domCat = null;
     
     
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
        this.cat = null;
      
        

    }
  
   startGame () {
        this.cat = new Cat(); 
        this.cat.domCat = this.create ("cat"); // dom elm created
        this.drawCat ();
        //create character
         //start countdown
         //start obstacles
  
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
        this.drawCat();
    
}


 drawCat () {
     this.cat.domCat.style.left = this.cat.x + "%";
     this.cat.domCat.style.bottom = this.cat.y + "%"; 

}



//logic move and create
}

 /* function moveElm (element){ //to modify css (html element)
    console.log(element);   
} 
 */

  


function create (className) { //to create obstacle and cat element
    const mainBoard = document.getElementById("main-board");
    const newElm = document.createElement("div");
   
    newElm.className = className;
    mainBoard.appendChild(newElm);
    return newElm;
    
 }

const game = new Game (create); //create cat and obstacle
game.startGame ();




