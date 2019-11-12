'use strict';

let x = 0;
let y = 0;
let stepSize = 5.0;
let moduleSize = 25;

let lineModule;
let elements;

function preload() {
  elements = [];
  elements[0] = loadImage('data/01.svg');
  elements[1] = loadImage('data/02.svg');
  elements[2] = loadImage('data/03.svg');
  elements[3] = loadImage('data/04.svg');
  elements[4] = loadImage('data/05.svg');
  elements[5] = loadImage('data/06.svg');
  elements[6] = loadImage('data/07.svg');
  elements[7] = loadImage('data/08.svg');
  elements[8] = loadImage('data/09.svg');
}

function setup() {
  window.addEventListener("touchstart", (event) => {
    event.preventDefault();
  }, { passive: false });
  window.addEventListener("touchmove", (event) => {
    event.preventDefault();
  }, { passive: false });

  createCanvas(displayWidth, displayHeight);
  background(255);
  cursor(CROSS);
  x = mouseX;
  y = mouseY;
  lineModule = elements[0];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if(mouseIsPressed && mouseButton === LEFT) {
    let d = dist(x, y, mouseX, mouseY);

    if(d > stepSize) {
      let angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(mouseX, mouseY);
      rotate(angle + PI);
      image(lineModule, 0, 0, d, moduleSize);
      pop();
      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyPressed() {
  if(keyCode == UP_ARROW) moduleSize += 5;
  if(keyCode == DOWN_ARROW) moduleSize -= 5;

  stepSize = max(stepSize, 0.5);
  if (keyCode == LEFT_ARROW) stepSize -= 0.5;
  if (keyCode == RIGHT_ARROW) stepSize += 0.5;
  print('moduleSize:', moduleSize, 'stepSize:', stepSize);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if(keyCode == DELETE || keyCode == BACKSPACE) background(255);

  if (key == '1') lineModule = elements[0];
  if (key == '2') lineModule = elements[1];
  if (key == '3') lineModule = elements[2];
  if (key == '4') lineModule = elements[3];
  if (key == '5') lineModule = elements[4];
  if (key == '6') lineModule = elements[5];
  if (key == '7') lineModule = elements[6];
  if (key == '8') lineModule = elements[7];
  if (key == '9') lineModule = elements[8];
}
