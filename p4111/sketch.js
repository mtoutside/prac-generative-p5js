'use strict';

let img;

let tileCountX = 4;
let tileCountY = 4;
let tileCount = tileCountX * tileCountY;
let imgTiles = [];
let tileWidth;
let tileHeight;
let cropX;
let cropY;

let selectMode = true;
let randomMode = false;

function preload() {
  img = loadImage('data/image.jpg');
}
function setup() {
	createCanvas(800, 600);

  image(img);
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;

  noCursor();
  noFill();
  stroke(255);
}

function draw() {
  if(selectMode) {

    cropX = constrain(mouseX, 0, width - tileWidth);
    cropY = constrain(mouseY, 0, height - tileHeight);
    image(img, 0, 0);
    rect(cropX, cropY, tileWidth, tileHeight);
  } else {
    let imgIndex = 0;
    for(let gridY = 0; gridY < tileCountY; gridY++) {
      for(let gridX = 0; gridX < tileCountX; gridX++) {
        image(imgTiles[imgIndex], gridX * tileWidth, gridY * tileHeight);
        imgIndex++;
      }
    }
  }
}

function cropTiles() {
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;
  imgTiles = [];

  for(let gridY = 0; gridY < tileCountY; gridY++) {
    for(let gridX = 0; gridX < tileCountX; gridX++) {
      if(randomMode) {
        cropX = int(random(mouseX - tileWidth / 2, mouseX + tileWidth / 2));
        cropY = int(random(mouseY - tileHeight / 2, mouseY + tileHeight / 2));
      }
      cropX = constrain(cropX, 0, width - tileWidth);
      cropY = constrain(cropY, 0, height - tileHeight);
      imgTiles.push(img.get(cropX, cropY, tileWidth, tileHeight));
    }
  }
}

function mouseMoved() {
  selectMode = true;
}

function mouseReleased() {
  selectMode = false;
  cropTiles();
}
function keyReleased() {
  if (key === 's' || key === 'S') saveCanvas(gd.timestamp(), 'png');
  if(key === 'r' || key === 'R') {
    randomMode = !randomMode;
    cropTiles();
  }

  if (key === '1') {
    tileCountX = 4;
    tileCountY = 4;
    cropTiles();
  }
  if (key === '2') {
    tileCountX = 10;
    tileCountY = 10;
    cropTiles();
  }
  if (key === '3') {
    tileCountX = 20;
    tileCountY = 20;
    cropTiles();
  }
}
