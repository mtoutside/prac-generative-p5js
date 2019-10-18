'use strict';

let NORTH = 0;
let EAST = 1;
let SOUTH = 2;
let WEST = 3;
let direction = SOUTH;

let stepSize = 3;
let minLength = 10;
let diameter = 1;
let angleCount = 7;
let angle;
let reachedBorder = false;

let posX;
let posY;
let posXcross;
let posYcross;


function setup() {
	createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  background(360);

  angle = getRandomAngle(direction);
  posX = floor(random(width));
  posY = 5;
  posXcross = posX;
  posYcross = posY;
}

function draw() {
  let speed = int(map(mouseX, 0, width, 0, 20));
  for(let i = 0; i <= speed; i++) {
    strokeWeight(1);
    stroke(180, 0, 0);
    point(posX, posY);

    posX += cos(radians(angle)) * stepSize;
    posY += sin(radians(angle)) * stepSize;

    reachedBorder = false;

    if(posY <= 5) {
      direction = SOUTH;
      reachedBorder = true;
    } else if(posX >= width - 5) {
      direction = WEST;
      reachedBorder = true;
    } else if(posY >= height - 5) {
      direction = NORTH;
      reachedBorder = true;
    } else if(posX <= 5) {
      direction = EAST;
      reachedBorder = true;
    }

    loadPixels();
    let currentPixel = get(floor(posX), floor(posY));
    if(reachedBorder ||
      (currentPixel[0] !== 255 && currentPixel[1] !== 255 && currentPixel[2] !== 255)) {
      angle = getRandomAngle(direction);

      let distance = dist(posX, posY, posXcross, posYcross);
      if(distance >= minLength) {
        strokeWeight(3);
        stroke(0, 0, 0);
        line(posX, posY, posXcross, posYcross);
      }

      posXcross = posX;
      posYcross = posY;
    }
  }
}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode === BACKSPACE) background(360);
}

function getRandomAngle(currentDirection) {
  let a = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;

  if(currentDirection == NORTH) return a - 90;
  if(currentDirection == EAST) return a;
  if(currentDirection == SOUTH) return a + 90;
  if(currentDirection == WEST) return a + 180;
  return 0;
}
