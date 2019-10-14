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

let drawMode = 1;
let counter = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  fill(0, 40);

  posX = width / 2;
  posY = height / 2;
}

function draw() {
  for(let i = 0; i <= mouseX; i++) {
    counter++;

    if(drawMode == 2) {
      direction = int(random(3));
    } else {
      direction = int(random(7));
    }

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

    if(drawMode == 3) {
      if(counter >= 100) {
        counter = 0;
        fill(192, 100, 64, 80);
        ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter + 7, diameter + 7);
      }
    }

    fill(0, 40);
    ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter, diameter);
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();

  if (key == '1') {
    drawMode = 1;
    stepSize = 1;
    diameter = 1;
  }
  if (key == '2') {
    drawMode = 2;
    stepSize = 1;
    diameter = 1;
  }
  if (key == '3') {
    drawMode = 3;
    stepSize = 10;
    diameter = 5;
  }
}
