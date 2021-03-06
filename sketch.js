var trex, tImg;
var ground, groundImg;
var clouds, cloudImg;
var cactii, c1,c2,c3,c4,c5,c6;
var score;
var jumpSound,dieSound,scoreSound;
//Constant variable
var PLAY=1;
var END=0;
var gameState= PLAY;
var cloudsGroup;
var obstaclesGroup;
var gameOver;
var restart;
var gameOverImg, restartImg;

function preload(){
  
  
  //loading images
  tImg = loadAnimation('trex1.png','trex3.png','trex4.png');
  tImg2 = loadAnimation('trex_collided.png');
  groundImg= loadAnimation('ground2.png');
  cloudImg= loadAnimation('cloud.png');
  c1=loadAnimation('obstacle1.png');
  c2=loadAnimation('obstacle2.png');
  c3=loadAnimation('obstacle3.png');
  c4=loadAnimation('obstacle4.png');
  c5=loadAnimation('obstacle5.png');
  c6=loadAnimation('obstacle6.png');
  
  //loading the images
  gameOverImg=loadAnimation('gameOver.png');
  restartImg=loadAnimation('restart.png');
  
  //loading the sounds
  jumpSound=loadSound('jump.mp3');
  dieSound=loadSound('die.mp3');
  scoreSound=loadSound('checkPoint.mp3');
}

function setup(){
  createCanvas(600,400);
  
  //creating trex 
  trex = createSprite(50,300,30,30);
  //adding dino animation
  trex.addAnimation('run', tImg);
  trex.addAnimation('stop',tImg2);
  trex.scale = 0.6;
  
  ground=createSprite(300,330,600,5)
  ground.addAnimation('A', groundImg);
  
  //invisible ground 
  inviground= createSprite(300,340,600,5);
  inviground.visible=false;
  
  obstaclesGroup= new Group();
  cloudsGroup= new Group();
  
  score= 0;
  gameOver=createSprite(300,100);
  restart=createSprite(300,200);
  gameOver.addAnimation('ed',gameOverImg);
  restart.addAnimation('st',restartImg);
  gameOver.visible=false;
  restart.visible=false;
}

function draw(){
  background('lightblue');
  if (gameState==PLAY){
    //making t-rex jump
    if (keyDown("space") && trex.y>250){
      trex.velocityY=-15;
      jumpSound.play();
    } 
    
    
    //creating gravity
    trex.velocityY= trex.velocityY+1;
    //infinite screen
    ground.velocityX=-5
  
    //resetting ground
    if(ground.x<0) {
      ground.x=300;
    }
    //Increasing Sore
    score=score+1;
    //creating multiple cloud sprites
    createClouds();
    if(score%100==0){
      scoreSound.play();
    }
    //creating multiple obsticles 
    createObstacles();
    if(trex.isTouching(obstaclesGroup)){
      gameState=END;
      dieSound.play();
    }
    
  }
  
  else if(gameState==END){
    ground.velocityX=0;
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation('stop',tImg2);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    
    //resetting the game with restart icon
   if(mousePressedOver(restart)){
     reset();
   }
  }
  
  //console.log(ground.x)

  //displaying score
  text('score '+ score,450,50);
  
  trex.collide(inviground); 
    
  
  
  
  
  
 
  drawSprites();
}

//creating function clouds 
function createClouds() {
  if(frameCount%30 ==0){
    clouds= createSprite(600,50,20,20);
    clouds.addAnimation('run2',cloudImg);
    clouds.velocityX=-5
    //adding random heights to the clouds (y positions)
    var r= Math.round(random(20,150));
    //console.log(r);
    clouds.y=r;
    clouds.lifetime=130;
    //Adding objects to  particular groups
    cloudsGroup.add(clouds);
  }
 }

//creating cactii (obstacles)
function createObstacles ()   {
  if (frameCount%90 ==0){
    cactii= createSprite(600,320,40,40);
    cactii.velocityX=-4;
    cactii.scale=0.5;
    cactii.lifetime=160;
    obstaclesGroup.add(cactii);
    //random animations among 6 imgs for the cactii
    var m= Math.round(random(1,6));
    switch(m){
        case 1: cactii.addAnimation('xyz',c1);
                break;
        case 2:cactii.addAnimation('xyz',c6);
              break;
        case 3:cactii.addAnimation('xyz',c2);
              break;
        case 4:cactii.addAnimation('xyz',c5);
               break; 
        case 5:cactii.addAnimation('xyz',c3);
              break;
        case 6: cactii.addAnimation('xyz',c4);
                break;
         
           }
    
    /*
    if(m == 1){ 
      obstacle.addAnimation('xyz',c1) 
    }
      */
  }
}
      

//reseting the game through reset func.
function reset(){
  gameState= PLAY;
  score=0;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
}