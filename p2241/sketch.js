'use strict';

let maxCount = 5000;
let currentCount = 1;
let x = [];
let y = [];
let r = [];

function setup() {
  createCanvas(800, 800);
  strokeWeight(0.5);

  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 10;
}

function draw() {
  clear();

  let newR = random(1, 7);
  let newX = random(newR, width - newR);
  let newY = random(newR, height - newR);

  let closestDist = Number.MAX_VALUE;
  let closestIndex = 0;

  for(let i = 0; i < currentCount; i++) {
    let newDist = dist(newX, newY, x[i], y[i]);
    if(newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  let angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;

  for(let i = 0; i < currentCount; i++) {
    fill(50);
    ellipse(x[i], y[i], r[i] * 2, r[i] * 2);
  }

  if(currentCount >= maxCount) noLoop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
