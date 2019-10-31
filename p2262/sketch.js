'use strict';

let shapes = [];

let newShape;

let joints = 8;
let lineLength = 32;
let speed = 16;
let resolution = 0.2;

let showPath = true;
let showPendulum = true;
let showPendulumPath = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);
}

function draw() {
  background(0, 0, 100);

  shapes.forEach((shape) => {
    shape.draw();
    shape.update();
  });

  if(newShape) {
    newShape.addPos(mouseX, mouseY);
    newShape.draw();
    newShape.update();
  }
}

class Shape {
  constructor(lineLength, speed, resolution, joints) {
    this.shapePath = [];
    this.pendulumPath = [];
    this.iterator = 0;
    this.lineLength = lineLength;
    this.speed = speed;
    this.resolution = resolution;
    this.joints = joints;

    for(let i = 0; i < this.joints; i++) {
      this.pendulumPath.push([]);
    }
  }

  addPos(x, y) {
    let newPos = createVector(x, y);
    this.shapePath.push(newPos);
  }

  draw() {
    strokeWeight(0.8);
    stroke(0, 10);

    if(showPath) {
      beginShape();
      this.shapePath.forEach((pos) => {
        vertex(pos.x, pos.y);
      });
      endShape();
    }

    let currentIndex = floor(this.iterator);

    let currentPos = this.shapePath[currentIndex];
    let previousPos = this.shapePath[currentIndex - 1];
    if(previousPos) {
      let offsetPosA = p5.Vector.lerp(previousPos, currentPos, this.iterator - currentIndex);
      for(let i = 0; i < this.joints; i++) {
        let offsetPosB = p5.Vector.fromAngle(
          (PI / (i + 1)) +
          this.iterator /
          pow(-2, this.joints - i) * this.speed
        );
        offsetPosB.setMag((this.lineLength / this.joints) * (this.joints - i));
        offsetPosB.add(offsetPosA);

        if(showPendulum) {
          fill(0, 10);
          ellipse(offsetPosA.x, offsetPosA.y, 4, 4);
          noFill();
          line(offsetPosA.x, offsetPosA.y, offsetPosB.x, offsetPosB.y);
        }

        offsetPosA = offsetPosB;

        this.pendulumPath[i].push(offsetPosA);
      }

      if(showPendulumPath) {
        strokeWeight(1.6);
        this.pendulumPath.forEach((path, index) => {
          beginShape();
          stroke(360 / this.joints * index, 80, 60, 50);
          path.forEach((pos) => {
            curveVertex(pos.x, pos.y);
          });
          endShape();
        });
      }
    }
  }

  update() {
    this.iterator += this.resolution;
    this.iterator = constrain(this.iterator, 0, this.shapePath.length);
  }
}

function mousePressed() {
  newShape = new Shape(lineLength, speed, resolution, joints);
  newShape.addPos(mouseX, mouseY);
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
}
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if(keyCode == DELETE || keyCode == BACKSPACE) {
    shapes = [];
    newShape = undefined;
  }

  if(keyCode == UP_ARROW) {
    lineLength += 2;
  }
  if(keyCode == DOWN_ARROW) {
    lineLength -= 2;
  }
  if(keyCode == LEFT_ARROW) {
    joints--;
    joints = max(1, joints);
  }
  if(keyCode == RIGHT_ARROW) {
    joints++;
    joints = max(1, joints);
  }

  if (key == '+') {
    speed += 0.5;
  }
  if (key == '-') {
    speed -= 0.5;
  }

  if(key === '1') showPath = !showPath;
  if(key === '2') showPendulum = !showPendulum;
  if(key === '3') showPendulumPath = !showPendulumPath;
}
