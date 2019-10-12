'use strict';

let NORTH = 0;
let NORTHEAST = 1;
let EAST = 2;
let SOUTHEAST = 3;
let SOUTH = 4;
let SOUTHWEST = 5;
let WEST = 6;
let NORTHWEST = 7;
let direction;

let stepSize = 1;
let diameter = 1;

let posX;
let posY;

function setup() {
	createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(0, 40);

  posX = width / 2;
  posY = height / 2;
}

function draw() {
  for(let i = 0; i <= mouseX; i++) {
    direction = int(random(0, 8));

    if(direction == NORTH) {
      posY -= stepSize;
    } else if(direction == NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
    } else if(direction == EAST) {
      posX += stepSize;
    } else if(direction == SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    } else if(direction == SOUTH) {
      posY += stepSize;
    } else if(direction == SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    } else if(direction == WEST) {
      posX -= stepSize;
    } else if(direction == NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if(posX > width) posX = 0;
    if(posX < 0) posX = width;
    if(posY < 0) posY = height;
    if(posY > height) posY = 0;

   ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter, diameter);
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();
}
