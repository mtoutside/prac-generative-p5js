'use strict';

let tileCountX = 9;
let tileCountY = 12;
let tileWidth;
let tileHeight;
let imageCount = tileCountX * tileCountY;
let currentImage = 0;
let gridX = 0;
let gridY = 0;

let movie;

function preload() {
  movie = createVideo(['data/video.mp4', 'data/video.ogg']);
  movie.hide();
}

function setup() {
	createCanvas(1024, 1024);
  background(0);

  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  print(movie.width + ' ・ ' + movie.height);
}

function draw() {
  if(movie.elt.readyState === 4) {
    let posX = tileWidth * gridX;
    let posY = tileHeight * gridY;

    image(movie, posX, posY, tileWidth, tileHeight);

    currentImage++;

    let nextTime = map(currentImage, 0, imageCount, 0, movie.duration());
    print('seek to: ' + movie.time());
    movie.time(nextTime);

    gridX++;
    if(gridX >= tileCountX) {
      gridX = 0;
      gridY++;
    }

    if(currentImage >= imageCount) noLoop();
  }
}

function keyReleased() {
  if (key === 's' || key === 'S') saveCanvas(gd.timestamp(), 'png');
}
