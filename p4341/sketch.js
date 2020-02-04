"use strict";

let tileWidth = 20;
let tileHeight = 20;

let icons;
let img;

let emojisPath = './data/twemoji/';

let tree;

function preload() {
  img = loadImage('./data/pic.png');
  icons = {};
  for (let name in emojis) {
    icons[name] = loadImage(`${emojisPath}72x72/${name}.png`);
  }
}

function setup() {
  createCanvas(img.width * tileWidth, img.height * tileHeight);
  let colors = [];
  for (let name in emojis) {
    let col = emojis[name].averageColor;
    col.name = name;
    colors.push(col);
  }
  let distance = (a, b) => {
    return Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2);
  }
  tree = new kdTree(colors, distance, ['r', 'g', 'b']);
}

function draw() {
  background(255);

  for (let gridX = 0; gridX < img.width; gridX++) {
    for (let gridY = 0; gridY < img.height; gridY++) {
      let posX = tileWidth * gridX;
      let posY = tileHeight * gridY;

      let c = color(img.get(gridX, gridY));

      let nearest = tree.nearest({ r: red(c), g: green(c), b: blue(c) }, 1);

      let name = nearest[0][0].name;
      image(icons[name], posX, posY, tileWidth, tileHeight);
    }
  }
  noLoop();
}

function keyReleased() {
  if (key === "s" || key === "S") saveCanvas(gd.timestamp(), "png");
}
