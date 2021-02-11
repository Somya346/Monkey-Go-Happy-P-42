var obstacle, obstacleImage, obstacleGroup;
var banana, bananaImage, bananaGroup;
var monkey, monkey_running;
var backgroundy, backgroundImage;
var score= 0;
var ground;
var gameState;
function preload(){
  //loading image for background
  backgroundImage = loadImage("jungle.jpg");

//loading animation for monkey
monkey_running= loadAnimation ("Monkey_01.png" , "Monkey_02.png" , "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

//loading images for banana and obstacles
bananaImage= loadImage("banana.png");
obstacleImage = loadImage("stone.png");

}
 function setup(){
   //creating canvas
   createCanvas(1800 , 1200);

   //creating background sprite
   backgroundy= createSprite(200 , 200);
   backgroundy.addImage("backgroundimage", backgroundImage);
   backgroundy.velocityX= -2;

   //creating monkey sprite
   monkey= createSprite(50,340,10,10);
   monkey.addAnimation("monkeyrunning",monkey_running);
   monkey.scale= 0.1;

   //creating ground sprite
   ground= createSprite(0,390,800,10);
   ground.visible= false;

   //creating groups for banana and obstacles
   bananaGroup= new Group();
   obstacleGroup = new Group ();
 }

function draw(){
  //assigning background color
  background("white");

  //to know the position of monkey to make more changes
  console.log(monkey.y);

  //reseting background
  if(backgroundy.x<150){
    backgroundy.x= 200
  }
 
  //making the monkey jump
  if(keyDown("space")&& monkey.y>=335){
    monkey.velocityY= -20;
  }
 //adding garvity to monkey
 monkey.velocityY = monkey.velocityY+0.8;

 //preventing the monkey from falling off the ground 
 monkey.collide(ground);

 //scoring system and changing size of the monkey
 if(bananaGroup.isTouching(monkey)){
   score = score +2;
   bananaGroup.destroyEach();
 }
 
 switch(score){
   case 10: monkey.scale = 0.15;
   break;

   case 20: monkey.scale = 0.20;
   break;

   case 30: monkey.scale = 0.25;
   break;

   case 40: monkey.scale = 0.30;
   break;

   case 50: monkey.scale = 0.35;
   break;
  default: break;
   
 }
  
   //calling user define functions
   spawnBananas();
   spawnObstacles();

   

   drawSprites();

  

   //displaying score
   stroke("white");
   textSize(15);
   text("Score:"+score,190 , 70);
  }


   if(obstacleGroup.isTouching(monkey)){
    gameState = END;
   }
   else if(gameState === END){
     backgroundy.velocityX =0;
     monkey.visible = false;

     bananaGroup.destroyEach();
     obstacleGroup.destroyEach();

     textSize(30);
     fill(255);
     text("Game Over!",300,220);

   }
  
  // function for bananas
  function spawnBananas(){
    if(frameCount%90 === 0){
      banana = createSprite(360 , 120 , 10 , 10);
      banana.addImage("bananaimage",bananaImage);
      banana.scale = 0.06;
      banana.velocityX = -3;
    
    
      // addimg lifetime to bananas
      banana.lifetime = 150;

      //adding banana to banana group
      bananaGroup.add(banana);

    }
  }

  //function for Obstacles
  function spawnObstacles(){
    if(frameCount%90 === 0){
      obstacle = createSprite(270,370,10,10);
      obstacle.addImage("obstacleimage",obstacleImage);
      obstacle.scale = 0.05;
      obstacle.velocityX = -4;
      //adding obstacle to obstacle
      obstacleGroup.add(obstacle);
    }
  }
  
