"use strict";

let cam;
let icons;
let img;

let emojisPath = '../p4341/data/twemoji/';
let tree;

let recording = false;

function preload() {
  icons = {};
  for (let name in emojis) {
    icons[name] = loadImage(`${emojisPath}72x72/${name}.png`);
  }
}

function setup() {
  createCanvas(80 * 16, 60 * 16);
  let colors = [];
  for (let name in emojis) {
    let col = emojis[name].averageColor;
    col.emoji = name;
    colors.push(col);
  }
  let distance = (a, b) => {
    return Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2);
  }
  tree = new kdTree(colors, distance, ['r', 'g', 'b']);

  cam = createCapture(VIDEO);
  cam.size(80, 60);
  cam.hide();
}

function draw() {
  background(255);
  cam.loadPixels();

  let tileWidth = width / cam.width;
  let tileHeight = height / cam.height;

  for (let gridX = 0; gridX < cam.width; gridX++) {
    for (let gridY = 0; gridY < cam.height; gridY++) {
      let posX = tileWidth * gridX;
      let posY = tileHeight * gridY;

      let rgba = cam.get(min(gridX, cam.width - 1), gridY);

      let nearest = tree.nearest({ r: rgba[0], g: rgba[1], b: rgba[2] }, 1)[0][0];

      console.log(icons[nearest.emoji]);
      image(icons[nearest.emoji], posX, posY, tileWidth, tileHeight);
    }
  }
   if (recording) saveCanvas(gd.timestamp(), 'png');
}

function keyReleased() {
  if (key === "s" || key === "S") saveCanvas(gd.timestamp(), "png");
  if (key === "f" || key === "F") recording = !recording;
}
