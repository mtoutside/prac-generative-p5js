'use strict';

let img;

function preload() {
  img = loadImage('data/pic.png');
}
function setup() {
	createCanvas(1024, 780);
  image(img, 0, 0);
}

function draw() {
  let x1 = random(width);
  let y1 = random(height);

  let x2 = round(x1 + random(-10, 10));
  let y2 = round(y1 + random(-10, 10));

  let w = 150;
  let h = 50;

  set(x2, y2, get(x1, y1, w, h));
}

function keyReleased() {
  if (key === 's' || key === 'S') saveCanvas(gd.timestamp(), 'png');
  if(keyCode === DELETE || keyCode === BACKSPACE) {
    clear();
    image(img, 0, 0);
  }
}
