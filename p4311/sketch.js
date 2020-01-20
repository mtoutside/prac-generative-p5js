"use strict";

let img;

function preload() {
  img = loadImage("data/pic.png");
}
function setup() {
  createCanvas(603, 873);
  print(`${img.width} ・ ${img.height}`);
}

function draw() {
  background(255);

  let mouseXFactor = map(mouseX, 0, width, 0.05, 1);
  let mouseYFactor = map(mouseY, 0, height, 0.05, 1);

  for (let gridX = 0; gridX < img.width; gridX++) {
    for(let gridY = 0; gridY < img.height; gridY++) {
      let tileWidth = width / img.width;
      let tileHeight = height / img.height;
      let posX = tileWidth * gridX;
      let posY = tileHeight * gridY;

      img.loadPixels();
      let c = color(img.get(gridX, gridY));
      let greyscale = round(red(c) * 0.222 + green(c) * 0.7070 + blue(c) * 0.071);

      switch (drawMode) {
        case 1:
          let w1 = map(greyscale, 0, 255, 15, 0.1);
          stroke(0);
          strokeWeight(w1 * mouseXFactor);
          line(posX, posY, posX + 5, posY + 5);
          break;
        case 2:
          fill(0);
          noStroke();
          let r2 = 1.1284 * sqrt(tileWidth + tileWidth * (1 - greyscale / 255));
          r2 += mouseXFactor * 3;
          ellipse(posX, posY, r2, r2);
          break;
        case 3:
          let l3 = map(greyscale, 0, 255, 30, 0.1);
          l3 *= mouseXFactor;
          stroke(0);
          strokeWeight(10 * mouseYFactor);
          line(posX, posY, posX + l3, posY + l3);
          break;
        case 4:
        stroke(0);
          let w4 = map(greyscale, 0, 255, 10, 0);
          strokeWeight(w4 * mouseXFactor + 0.1);
          let l4 = map(greyscale, 0, 255, 35, 0);
          l4 += mouseYFactor;
          push();
          translate(posX, posY);
          rotate(greyscale / 255 * PI);
          line(0, 0, 0 + l4, 0 + l4);
          pop();
          break;
        case 5:
          let w5 = map(greyscale, 0, 255, 5, 0.2);
          strokeWeight(w5 * mouseYFactor + 0.1);
          let c2 = color(img.get(min(gridX + 1, img.width - 1), gridY));
          stroke(c2);
          let greyscale2 = floor(red(c2) * 0.222 + green(c2) * 0.707 + blue(c2) * 0.071);
          let h5 = 50 * mouseXFactor;
          let d1 = map(greyscale, 0, 255, h5, 0);
          let d2 = map(greyscale2, 0, 255, h5, 0);
          line(posX - d1, posY + d1, posX + tileWidth - d2, posY + d2);
          break;
        case 6:
          let w6 = map(greyscale, 0, 255, 25, 0);
          noStroke();
          fill(c);
          ellipse(posX, posY, w6 * mouseXFactor, w6 * mouseXFactor);
          break;

      }
}

function keyReleased() {
  if (key === "s" || key === "S") saveCanvas(gd.timestamp(), "png");
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    clear();
    image(img, 0, 100);
  }
}
