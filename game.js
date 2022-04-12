class Cat {
 constructor() {
     this.x = 40;
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






class Asteroid { //different kinds of obstacles 
   constructor(){
    this.x = 90;
    this.y = Math.floor(Math.random() * 100);
    this.height = 50;
    this.width = 30;
    //this.create = create;

   }
    
    rightToLeft() {
    this.x--;
} 

 

}


class Fish {
   constructor() {
    this.x = 90;
    this.y = Math.floor(Math.random() * 100);
    this.height = 30;
    this.width = 40;
    this.FishArr = [];
    this.create = create;

   }


   rightToLeft() {
    this.x--;
    console.log
} 


}





class Game {
    constructor (createEl){
        this.time = 0;
        this.AstArr = [];
        this.FishArr = [];
        this.create = createEl;
        this.cat = null;
        
      
        

    }
  
   startGame () {
        this.cat = new Cat(); 
        this.cat.domCat = this.create ("cat"); //create cat in the DOM
        this.drawCat ();
       
         //set countdown before obstacles?
         

         
         

  
   }

   startObstacles (){
            
   console.log("start obstacles works")

        this.asteroid = new Asteroid ()
        this.asteroid.domObst = this.create ("asteroid");  // asteroid in the DOM
        

        this.fish = new Fish ()
        this.fish.domObst = this.create("fish");  // fish in the DOM
         
   
        this.myInterval = setInterval ( () => { 
        
        
            this.FishArr.forEach( (fish) => {
            
                this.drawFish();                  //move asteroids and fish
                this.drawAsteroid();
               fish.rightToLeft();
                
           
        });
    
        if (this.time % 30 === 0) {
           
          this.FishArr.push(this.asteroid);
          this.FishArr.push(this.fish);
    
        } else if (this.time % 20 === 0)
         {
            this.FishArr.push(this.asteroid);
         }
    
        this.time++;
    
     }, 1000) ;  


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

drawAsteroid () {
    this.asteroid.domObst.style.left = this.asteroid.x + "%";
    this.asteroid.domObst.style.bottom = this.asteroid.y + "%"; 
    console.log("drawasteroid")


} 

drawFish () {
    this.fish.domObst.style.left = this.fish.x + "%";
    this.fish.domObst.style.bottom = this.fish.y + "%";
    console.log ("drawfish")
}
 


  

}



//create elements


function create (className) { //reate obstacle and cat 
    const mainBoard = document.getElementById("main-board");
    const newElm = document.createElement("div");
   
    newElm.className = className;
    mainBoard.appendChild(newElm);
    return newElm;
    
 }

 //start game + obstacles

const game = new Game (create); 
game.startGame ();
game.startObstacles();








