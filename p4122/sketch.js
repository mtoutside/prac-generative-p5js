'use strict';

let img;

function preload() {
  img = loadImage('data/pic.png');
}
function setup() {
	createCanvas(1024, 780);
  image(img, 0, 100);
}

function draw() {
  let x1 = floor(random(width));
  let y1 = 50;
  let x2 = round(x1 + random(-7, 7));
  let y2 = round(y1 + random(-5, 5));

  let w = floor(random(10, 40));
  let h = height - 100;

  set(x2, y2, get(x1, y1, w, h));
}

function keyReleased() {
  if (key === 's' || key === 'S') saveCanvas(gd.timestamp(), 'png');
  if(keyCode === DELETE || keyCode === BACKSPACE) {
    clear();
    image(img, 0, 100);
  }
}
