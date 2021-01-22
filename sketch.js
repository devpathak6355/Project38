var monkey , monkey_running, monkey_standing;
var banana,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
var score = 0;
var END= 0;
var PLAY= 1;
var gameState= PLAY;
var jungle, junlgeImage;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_standing= loadImage("sprite_8.png");
    
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jungleImage= loadImage("jungle.jpg");
}



function setup() {
  createCanvas(displayWidth,displayHeight);
  
  jungle= createSprite(0,-displayHeight*4,displayWidth,displayHeight*6);
  jungle.addImage(jungleImage);
  jungle.velocityX=-4;
  jungle.x= jungle.width /2;
  jungle.scale=1.5;
  
  monkey= createSprite(75,315,10,10);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  monkey.debug=false;
  
  ground= createSprite(300,335,15000,10);
  //ground.visible=false;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background("white");
  if(gameState===PLAY){
    camera.position.x=monkey.x+350;
     monkey.velocityX=6;
     spawnBanana();
     spawnObstacle();
    if(keyDown("space")&& monkey.y >= 290) {
        monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.isTouching(foodGroup)){
       foodGroup.destroyEach();
       score=score+2;
       }
      switch(score){
      case 10: player.scale=0.12;
           break;
         case 20: player.scale=0.14;
           break;
         case 30: player.scale=0.16;
           break;
         case 40: player.scale=0.18;
           break;
         default: break;
    }
    if(monkey.isTouching(obstacleGroup)){
       gameState=END;
    }
  }
  if (jungle.x < 30){
      jungle.x = jungle.width/2;
      
  }
  if (ground.x < 0){
    ground.x = ground.width/2;
    
}
  monkey.collide(ground);
  drawSprites();
  text("FoodEaten =",camera.position.x-70,50);
  text(score,camera.position.x,50);
  if(gameState===END){
    score=0;
    jungle.velocityX=0;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.visible=false;
    textSize(30);
    fill("red");
    text("GAME OVER",camera.position.x,200);
  }
  
}
function spawnBanana(){         
  if(frameCount%100===0){
    var banana= createSprite(camera.position.x,displayWidth/2+250,displayHeight-60,10,10);
    banana.y=Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale=0.09;
    //banana.velocityX=-4;
    foodGroup.add(banana);
  }
}

function spawnObstacle(){ 
  if(frameCount%150===0){
    var obstacle= createSprite(camera.position.x,displayWidth/2-380,displayHeight-60,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.13;
    //obstacle.velocityX=-5;
    obstacleGroup.add(obstacle);
  }
}
function restart(){
  gameState=PLAY;
  monkey.visible=true;
}