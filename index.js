class Game{
  constructor(ctx,gameWidth,gameHeight,paddle,ball,brick){
    this.width = gameWidth;
    this.height = gameHeight;
    this.paddle = paddle;
    this.ball = ball;
    this.brick = brick;
    this.life = 5;
    this.context=ctx;
    this.gameState="menu";
    this.level = "Level One";
  }
  draw(){

    this.brick.draw();
    this.ball.draw();
    this.paddle.draw();
    if(this.gameState=="paused"){
    this.context.rect(0,0,this.width,this.height);
    this.context.fillStyle="rgba(0,0,0,0.5)";
    this.context.fill();
    this.context.font="30px Arial";
    this.context.fillStyle ="white";
    this.context.textAlign ="center";
    this.context.fillText("Paused",this.width/2,this.height/2);
    }
    else if(this.gameState=="menu"){
    this.context.rect(0,0,this.width,this.height);
    this.context.fillStyle="rgba(0,0,0.0.75)";
    this.context.fill();
    this.context.font="30px Arial";
    this.context.fillStyle ="white";
    this.context.textAlign ="center";
    this.context.fillText("Press Enter to Start",this.width/2,this.height/2);
    }
    else if(this.gameState=="gameover"){
    this.context.rect(0,0,this.width,this.height);
    this.context.fillStyle="rgba(0,0,0,0.75)";
    this.context.fill();
    this.context.font="30px Arial";
    this.context.fillStyle ="white";
    this.context.textAlign ="center";
    this.context.fillText("GAME OVER",this.width/2,this.height/2);
    }
    else if(this.gameState=="levelCompleted"){
    this.context.rect(0,0,this.width,this.height);
    this.context.fillStyle="rgba(0,0,0,0.75)";
    this.context.fill();
    document.querySelector("#level-complete").textContent="Level Completed, Press Enter To Go To Next Level";
    }
    if(this.gameState!="levelCompleted")
    document.querySelector("#level-complete").textContent="";
    document.querySelector("#life").textContent="LIFE: "+this.life;
    document.querySelector("#level").textContent="LEVEL: "+this.level;

  }
  update(){
    if(this.gameState=="paused" || this.gameState=="menu" || this.gameState=="levelCompleted") return;
      this.brick.update();
      this.ball.update();
      this.paddle.update();
      if(this.ball.position.y+this.ball.height==this.height){
        this.life--;
        if(this.life==0) this.gameState="gameover";
      }
      for(var i=0;i<this.brick.position.length;i++){
        for(var j=0;j<this.brick.position[i].length;j++){
          if(this.brick.position[i][j]==1) return;
        }
      }
      this.gameState="levelCompleted";

  }
}

class Brick{
  constructor(ctx,brickImg,gameWidth,gameHeight,ball){
    this.gamewidth = gameWidth;
    this.gameheight = gameHeight;
    this.width = gameWidth/15;
    this.height = gameHeight/20;
    this.ball = ball;
    this.context = ctx;
    this.brickImg = brickImg;
    this.level = {"positionOne":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                [1,1,0,1,1,1,0,1,1,1,0,1,1,1,1],
                                [1,0,1,1,1,1,1,0,1,1,1,1,0,1,1]],

                      "positionTwo":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                 [1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
                                 [1,1,0,1,1,1,0,1,1,1,0,1,1,1,1],
                                 [1,0,1,1,1,1,1,0,1,1,1,1,0,1,1],
                                 [1,1,0,1,1,1,0,1,1,1,0,1,1,1,1]],

                      "positionThree":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                                   [1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
                                   [1,1,0,1,1,1,0,1,1,1,0,1,1,1,1],
                                   [1,0,1,1,1,1,1,0,1,1,1,1,0,1,1],
                                   [1,1,0,1,1,1,0,1,1,1,0,1,1,1,1]],

                       "positionFour":[[0,0,1,0,0,1,0,0,1,0,0,1,0,0,0],
                                   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                                   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                                   [1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
                                   [1,1,0,1,1,1,0,1,1,1,0,1,1,1,1],
                                   [1,0,1,1,1,1,1,0,1,1,1,1,0,1,1],
                                   [1,1,0,1,1,1,0,1,1,1,0,1,1,1,1]]
                             }
           this.position=this.level.positionOne;
  }

  draw(){
      for(var i=0;i<this.position.length;i++){
        for(var j=0;j<this.position[i].length;j++){
          if(this.position[i][j]==1){
            this.context.drawImage(this.brickImg,this.width*j,this.height*i,this.width,this.height);
          }
        }
      }
  }
  update(){
    for(var i=0;i<this.position.length;i++){
      for(var j=0;j<this.position[i].length;j++){
        if(this.position[i][j]==1 && this.ball.position.x+this.ball.width>=j*this.width && this.ball.position.x<=(j+1)*this.width
          && this.ball.position.y<=(i+1)*this.height && this.ball.position.y+this.ball.height>=i*this.height){
          this.position[i][j] = 0;
          if(this.ball.position.x+this.ball.width==j*this.width && this.ball.position.y+this.ball.height>=i*this.height &&
          this.ball.position.y<=(i+1)*this.height) this.ball.dirx="left";
          if(this.ball.position.x==(j+1)*this.width && this.ball.position.y+this.ball.height>=i*this.height &&
          this.ball.position.y<=(i+1)*this.height) this.ball.dirx="right";
          if(this.ball.position.y==(i+1)*this.height && this.ball.position.x+this.ball.width>=j*this.width && this.ball.position.x<=
          (j+1)*this.width) this.ball.diry = "down";
          if(this.ball.position.y+this.ball.height==i*this.height && this.ball.position.x+this.ball.width>=j*this.width && this.ball.position.x<=
          (j+1)*this.width) this.ball.diry = "up";

        }
      }
    }



  }
}

class Paddle{
  constructor(gameWidth,gameHeight,ctx){
    this.gamewidth = gameWidth;
    this.speed = gameWidth/150;
    this.width = gameWidth/4;
    this.height = gameHeight/20;
    this.dir = "right";
    this.ctx = ctx;

    this.position = {
      x: gameWidth/2-this.width/2,
      y: gameHeight-this.height-gameHeight/60
    }
  }

  draw(){
    this.ctx.fillStyle="#222930";
    this.ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
  }

  update(){

    if(this.position.x > this.gamewidth-this.width) this.dir="left";
    if(this.position.x < 0) this.dir="right";
    if(this.dir=="right") this.position.x += this.speed;
    else this.position.x -= this.speed;
  }
}

class inputHandler{
  constructor(paddle,game,brick,ball){
    document.addEventListener("keydown",event=>{
      switch(event.keyCode){
        case 37:
            paddle.dir = "left";
            paddle.speed=8;
            break;
          case 39:
            paddle.dir = "right";
            paddle.speed=8;
            break;
          case 32:
            if(game.gameState=="paused") game.gameState="running";
            else game.gameState="paused";
            break;
          case 13:
            if(game.gameState=="menu") game.gameState="running";
            else if(game.gameState=="levelCompleted"){
               ball.position.x=0; ball.position.y=ball.gameheight-ball.height; ball.diry="up";ball.dirx="right";
               game.gameState="running";
               game.life=5;
               if(brick.position==brick.level.positionOne){brick.position=brick.level.positionTwo;game.level="Level Two";}
               else if(brick.position==brick.level.positionTwo){brick.position=brick.level.positionThree;game.level="Level Three";}
               else if(brick.position==brick.level.positionThree){brick.position=brick.level.positionFour;game.level="Level Four";}

            }
      }
    })
    document.addEventListener("keyup",event=>{
      switch(event.keyCode){
        case 37:
            paddle.speed=4;
            break;
          case 39:
            paddle.speed=4;
            break;
      }
    })
  }
}

class Ball{
  constructor(ctx,ball,gameWidth,gameHeight,paddle){
    this.width = gameWidth/20;
    this.height = gameHeight/20;
    this.context = ctx;
    this.Ball = ball;
    this.dirx = "right";
    this.diry="up";
    this.speedx = this.width/3;
    this.speedy = this.height/6;
    this.gamewidth = gameWidth;
    this.gameheight = gameHeight;
    this.paddle = paddle;
    this.position = {
      x:0, y:gameHeight-this.height
    }
  }
  draw(){
    this.context.drawImage(this.Ball,this.position.x,this.position.y,this.width,this.height);
  }
  update(){
    if(this.position.x+this.width>=this.gamewidth) this.dirx = "left";
    if(this.position.x<=0) this.dirx="right";
    if(this.position.y+this.height>=this.gameheight) this.diry="up";
    if(this.position.y<=0) this.diry="down";
    if(this.position.x+this.width>this.paddle.position.x && this.position.x < this.paddle.position.x+this.paddle.width
    && this.position.y+this.height==this.paddle.position.y) this.diry="up";
    if(this.position.x+this.width>=this.paddle.position.x && this.position.x+this.width<this.paddle.position.x+this.paddle.width/2
    && this.position.y+this.height>this.paddle.position.y)this.dirx="left";

    if(this.position.x<=this.paddle.position.x+this.paddle.width && this.position.y+this.height>this.paddle.position.y &&
    this.position.x>this.paddle.position.x+this.paddle.width/2)this.dirx="right";


    if(this.dirx=="right" && this.diry=="down"){ this.position.x+=this.speedx; this.position.y+=this.speedy;}
    else if(this.dirx=="left" && this.diry=="down"){this.position.x-=this.speedx; this.position.y+=this.speedy;}
    else if(this.dirx=="right" && this.diry=="up"){this.position.x+=this.speedx; this.position.y-=this.speedy;}
    else if(this.dirx=="left" && this.diry=="up"){this.position.x-=this.speedx; this.position.y-=this.speedy;}
  }
}

var score=0;
var ballImg = document.querySelector("#ball");
var brickImg = document.querySelector("#brick");
var canvas = document.querySelector("#canvas");

var ctx = canvas.getContext("2d");
var gameWidth=document.querySelector("#canvas").width,gameHeight=document.querySelector("#canvas").height;


var paddle = new Paddle(gameWidth,gameHeight,ctx);

var ball = new Ball(ctx,ballImg,gameWidth,gameHeight,paddle);
var brick = new Brick(ctx,brickImg,gameWidth,gameHeight,ball);
var game = new Game(ctx,gameWidth,gameHeight,paddle,ball,brick);
new inputHandler(paddle,game,brick,ball);

document.querySelector("#left").addEventListener("click",function(){
  paddle.dir="left";
  paddle.speed=gameWidth/75;
})
document.querySelector("#right").addEventListener("click",function(){
  paddle.dir="right";
  paddle.speed=gameWidth/75;
})
document.querySelector("#play").addEventListener("click",function(){
 if(game.gameState=="menu" || game.gameState=="paused") game.gameState="running";
 else if(game.gameState=="levelCompleted"){
    ball.position.x=0; ball.position.y=ball.gameheight-ball.height; ball.diry="up";ball.dirx="right";
    game.gameState="running";
    game.life=5;
    if(brick.position==brick.level.positionOne){brick.position=brick.level.positionTwo;game.level="Level Two";}
    else if(brick.position==brick.level.positionTwo){brick.position=brick.level.positionThree;game.level="Level Three";}
    else if(brick.position==brick.level.positionThree){brick.position=brick.level.positionFour;game.level="Level Four";}
  }
   else game.gameState="paused";
})
document.querySelector("#left").addEventListener("mouseover",function(){
  document.querySelector("#left").style.backgroundColor="#96cee0";
})
document.querySelector("#left").addEventListener("mouseout",function(){
  document.querySelector("#left").style.backgroundColor="";
})
document.querySelector("#right").addEventListener("mouseover",function(){
  document.querySelector("#right").style.backgroundColor="#96cee0";
})
document.querySelector("#right").addEventListener("mouseout",function(){
  document.querySelector("#right").style.backgroundColor="";
})
document.querySelector("#play").addEventListener("mouseover",function(){
  document.querySelector("#play").style.backgroundColor="#96cee0";
})
document.querySelector("#play").addEventListener("mouseout",function(){
  document.querySelector("#play").style.backgroundColor="";
})
// let lastTime = 0;

function gameLoop(){
   // let deltaTime = timestamp-lastTime;
   // lastTime = timestamp;
   ctx.clearRect(0,0,gameWidth,gameHeight);
   game.update();
   game.draw();
   if(game.gameState!="gameover")requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
