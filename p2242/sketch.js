'use strict';

let shapes = [];
let maxCount = 5000;
let x = [];
let y = [];
let r = [];
let x2 = [];
let y2 = [];

let drawGhosts = false;

function setup() {
  createCanvas(800, 800);

  shapes.push(new Shape(width / 2, height / 2, 360));
}

function draw() {
  clear();

  strokeWeight(0.5);
  noFill();

  let newR = random(1, 7);
  let newX = random(newR, width - newR);
  let newY = random(newR, height - newR);

  let closestDist = Number.MAX_VALUE;
  let closestIndex = 0;
  let closestShape;
  shapes.forEach((shape) => {
    let newDist = dist(newX, newY, shape.x, shape.y);
    if(newDist < closestDist) {
      closestDist = newDist;
      closestShape = shape;
    }
  });

  let angle = atan2(newY - closestShape.y, newX - closestShape.x);

  shapes.push(new Shape(
    closestShape.x + cos(angle) * (closestShape.r + newR),
    closestShape.y + sin(angle) * (closestShape.r + newR),
    newR,
    newX,
    newY
  ));

  shapes.forEach((shape, index) => {
    if(drawGhosts) {
      fill(230);
      ellipse(shape.newX, shape.newY, shape.r * 2);
      line(shape.newX, shape.newY, shape.x, shape.y);
    }
    if(index === 0) {
      noFill();
    } else {
      fill(50);
    }
      ellipse(shape.x, shape.y, shape.r * 2);
  });

  if(shapes.length >= maxCount) noLoop();
}

class Shape {
  constructor(x, y, r, newX, newY) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.newX = newX;
    this.newY = newY;
  }
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if(key === '1') drawGhosts = !drawGhosts;
}
