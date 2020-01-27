"use strict";

let shapes;
let img;

function preload() {
  img = loadImage("data/pic.png");

  shapes = [];
  shapes.push(loadImage('data/056.svg'));
  shapes.push(loadImage('data/076.svg'));
  shapes.push(loadImage('data/082.svg'));
  shapes.push(loadImage('data/096.svg'));
  shapes.push(loadImage('data/117.svg'));
  shapes.push(loadImage('data/148.svg'));
  shapes.push(loadImage('data/152.svg'));
  shapes.push(loadImage('data/157.svg'));
  shapes.push(loadImage('data/164.svg'));
  shapes.push(loadImage('data/166.svg'));
  shapes.push(loadImage('data/186.svg'));
  shapes.push(loadImage('data/198.svg'));
  shapes.push(loadImage('data/224.svg'));
}

function setup() {
  createCanvas(600, 900);
  image(img);
}

function draw() {
  background(255);

  for (let gridX = 0; gridX < img.width; gridX++) {
    for(let gridY = 0; gridY < img.height; gridY++) {
      let tileWidth = 603 / img.width;
      let tileHeight = 873 / img.height;
      let posX = tileWidth * gridX;
      let posY = tileHeight * gridY;

      img.loadPixels();
      let c = img.get(min(gridX, img.width - 1), gridY);
      let greyscale = round(red(c) * 0.222 + green(c) * 0.7070 + blue(c) * 0.071);
      let gradientToIndex = round(map(greyscale, 0, 255, 0, shapes.length - 1));
      image(shapes[gradientToIndex], posX, posY, tileWidth, tileHeight);
    }
  }
}

function keyReleased() {
  if (key === "s" || key === "S") saveCanvas(gd.timestamp(), "png");
}
