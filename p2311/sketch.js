'use strict';

let c;
let lineLength = 0;
let angle = 0;
let angleSpeed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  cursor(CROSS);
  strokeWeight(1);

  c = color(181, 157, 0);
}

function draw() {
  if(mouseIsPressed && mouseButton === LEFT) {
    push();
    translate(mouseX, mouseY);
    rotate(radians(angle));
    stroke(c);
    line(0, 0, lineLength, 0);
    pop();

    angle += angleSpeed;
  }
}


function mousePressed() {
  lineLength = random(70, 200);
}

function keyPressed() {
  if(keyCode == UP_ARROW) lineLength += 5;
  if(keyCode == DOWN_ARROW) lineLength -= 2;
  if(keyCode == LEFT_ARROW) angleSpeed -= 0.5;
  if(keyCode == RIGHT_ARROW) angleSpeed += 0.5;
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if(keyCode == DELETE || keyCode == BACKSPACE) background(255);

  if(key === 'd' || key === 'D') {
    angle += 180;
    angleSpeed *= -1;
  }

  if(key === ' ') c =color(random(255), random(255), random(255), random(80, 100));
  if(key === '1') c = color(181, 157, 0);
  if(key === '2') c = color(0, 130, 164);
  if(key === '3') c = color(87, 35, 129);
  if(key === '4') c = color(197, 0, 123);
}
