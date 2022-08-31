var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score;

function preload(){
  player_running = loadAnimation("run.png", "stand.png");
  player_collided = loadAnimation("stand.png");
  
  groundImage = loadImage("ground.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("enemy1.png");
  obstacle2 = loadImage("enemy2.png");
  obstacle3 = loadImage("fire.png");

  gameOver = loadImage("gameOver.png");

  gameRestart = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  player = createSprite(50,180,20,50);
  player.addAnimation("running", player_running);
  player.addAnimation("collided" ,player_collided);
  player.scale = 0.2;
  
  ground = createSprite(200,180,800,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOverImg = createSprite(300,100);
  gameOverImg.addImage("Over",gameOver);
  gameOverImg.visible = false;
  
  gameRestartImg = createSprite(300,140);
  gameRestartImg.addImage("restart",gameRestart);
  gameRestartImg.visible = false;
  
  gameOverImg.scale = 0.5;
  gameRestartImg.scale = 0.5;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  
  score = 0;
}

function draw() {
  background("black");

  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState);
  
  if(gameState === PLAY){

    ground.velocityX = -4;

    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -13;
    }

    player.velocityY = player.velocityY + 0.8

    cloudy();

    obstical();
    
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      gameOverImg.visible = true;
      gameRestartImg.visible = true;

      ground.velocityX = 0;
      player.velocityY = 0;

      player.changeAnimation("collided", player_collided);

      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
     
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
   }

  player.collide(invisibleGround);
  
  
  
  drawSprites();
}

function obstical(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
    
   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }

    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function cloudy() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
     cloud.y = Math.round(random(10,60));
     cloud.addImage(cloudImage);
     cloud.scale = 0.5;
     cloud.velocityX = -3;
 
     cloud.lifetime = 134;

     cloud.depth = player.depth;
     player.depth = player.depth + 1;

     cloudsGroup.add(cloud);
    }
}