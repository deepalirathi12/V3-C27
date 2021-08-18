const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint

var engine;
var world;
var ground, tower, cannon, cannonBall,boat;
var balls = []
var boats = []

var score = 0

var water_splashAnimation = []
var water_splashSpritedata, water_splashSpritesheet

var bgsound, wssound, cesound, csound, plsound
var isGameOver = false;
var isLaughing = false;

function preload() {
  bgimg = loadImage("./assets/background.gif")
  bgsound = loadSound("assets/background_music.mp3")
  wssound = loadSound("assets/cannon_water.mp3")
  cesound = loadSound("assets/cannon_explosion.mp3")
  plsound = loadSound("assets/pirate_laugh.mp3")
 // csound = loadSound("assets/cannon_base.mp3")



  water_splashSpritedata = loadJSON("assets/water_splash/water_splash.json")
  water_splashSpritesheet = loadImage("assets/water_splash/water_splash.png")
}



function setup() {
  createCanvas(1200, 600);
  engine = Engine.create()
  world = engine.world
  ground = new Ground(600, 598, 1200, 2)
  tower = new Tower(120, 390, 200, 400)
  cannon = new Cannon(140, 110, 100, 50, -PI / 3);



  var water_splashFrames = water_splashSpritedata.frames

  for(var i =0; i<water_splashFrames.length; i=i+1){
    var pos = water_splashFrames[i].position;
    var img = water_splashSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    water_splashAnimation.push(img)
  }
  


}

function draw() {
  Engine.update(engine)



  background("skyblue");

  image(bgimg, 0, 0, 2700, 1200)

  if(!bgsound.isPlaying()){
    bgsound.play()
    bgsound.setVolume(0.1)
  }

  fill("brown")
  ground.display()
  fill("white")
 
  fill("#6d4c41");
  textSize(40);
  text("Score:" + score, width - 200, 50);
  textAlign(CENTER, CENTER);


  for (var i = 0; i < balls.length; i = i+1) {
    showCannonBalls(balls[i], i)
  }
  tower.display()
  cannon.display()

  //Matter.Body.setVelocity(boat.body,{x:-0.9, y:0})
  showBoats()
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided) {
          score = score+5
          boats[j].remove(j);

          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;
          
        }
      } 
    }
  }

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CB(cannon.x, cannon.y)
    balls.push(cannonBall)
  }
}

function showCannonBalls(ball, index) {
  ball.display()
  ball.animate()
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
   // Matter.World.remove(world, ball.body);
    //balls.splice(index, 1);
    if(!ball.isSink){
      wssound.play()
      ball.remove(index)
    }
  }

}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cesound.play()
    balls[balls.length - 1].shoot()
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      var boat = new Boat(width,height - 100, 200, 200, position, boatAnimation );
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, { x: -0.9,y: 0});
      boats[i].display();
      boats[i].animate();
      var collision = Matter.SAT.collides(tower.body, boats[i].body);
      if (collision.collided && !boats[i].isBroken) {
         //Added isLaughing flag and setting isLaughing to true
         if(!isLaughing && !plsound.isPlaying()){
          plsound.play();
          isLaughing = true
        }
        isGameOver = true;
        gameOver();
    }
  }

  } else {
    var boat = new Boat(width, height - 100, 200, 200, -100,boatAnimation);
    boats.push(boat);
  }
}

function gameOver() {
 
}
