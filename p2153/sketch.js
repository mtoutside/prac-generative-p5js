'use strict';

let shapes = [];
let density = 2.5;
let shapeHeight = 64;
let shapeColor;

let newShape;

function setup() {
	createCanvas(800, 800);
  noFill();
  shapeColor = color(0);
}

function draw() {
  background(255);

  shapes.forEach((shape) => {
    shape.draw();
  });

  if(newShape) {
    newShape.x2 = mouseX;
    newShape.y2 = mouseY;
    newShape.h = shapeHeight;
    newShape.c = shapeColor;
    newShape.draw();
  }
}

class Shape {
  constructor(x1, y1, x2, y2, h, c) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.h = h;
    this.c = c;
  }

  draw() {
    let w = dist(this.x1, this.y1, this.x2, this.y2);
    let a = atan2(this.y2 - this.y1, this.x2 -  this.x1);
    stroke(this.c);
    push();
    translate(this.x1, this.y1);
    rotate(a);
    translate(0, -this.h / 2);
    for(let i = 0;i < this.h; i+= density) {
      line(0, i, w, i);
    }
    pop();
  }
}

function mousePressed() {
  newShape = new Shape(pmouseX, pmouseY, mouseX, mouseY, shapeHeight, shapeColor);
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') shapeColor = color(255, 0, 0);
  if (key == '2') shapeColor = color(0, 255, 0);
  if (key == '3') shapeColor = color(0, 0, 255);
  if (key == '4') shapeColor = color(0);

  if (keyCode == UP_ARROW) shapeHeight += density;
  if (keyCode == DOWN_ARROW) shapeHeight -= density;
}
