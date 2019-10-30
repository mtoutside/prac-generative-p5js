'use strict';

let shape;

let joints = 5;
let lineLength = 100;
let speedRelation = 2;

let showPendulum = true;
let showPendulumPath = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);
  startDrawing();
}

function draw() {
  background(0, 0, 100);

  shape.draw();
}

function startDrawing() {
  shape = new Shape(width / 2, height / 2, joints, lineLength, speedRelation);
}

class Shape {
  constructor(x, y, joints, lineLength, speedRelation, speed) {
    this.center = createVector(x, y);
    this.pendulumPath = [];
    this.angle = 0;
    this.maxAngle = 360;
    this.joints = joints;
    this.lineLength = lineLength;
    this.speedRelation = speedRelation || 2;
    this.speed = speed || (8 / pow(1.75, this.joints - 1) / pow(2, speedRelation - 1));

    for(let i = 0; i < this.joints; i++) {
      this.pendulumPath.push([]);
    }
  }

  draw() {
    this.angle += this.speed;

    if(this.angle <= this.maxAngle + this.speed) {
      let pos = this.center.copy();

      for(let i = 0; i < this.joints; i++) {
        let a = this.angle * pow(speedRelation, i);
        if(i % 2 === 1) a = -a;

        let nextPos = p5.Vector.fromAngle(radians(a));

        nextPos.setMag((this.lineLength / this.joints) * (this.joints - i));
        nextPos.add(pos);

        if(showPendulum) {
          noStroke();
          fill(0, 10);
          ellipse(pos.x, pos.y, 4, 4);
          noFill();
          line(pos.x, pos.y, nextPos.x, nextPos.y);
        }

        pos = nextPos;

        this.pendulumPath[i].push(pos);
      }
    }

    if(showPendulumPath) {
      strokeWeight(1.6);
      for(let i = 0; i < this.pendulumPath.length; i++) {
        let path = this.pendulumPath[i];

        beginShape();
        let hue = map(i, 0, this.joints, 120, 360);
        stroke(hue, 80, 60, 50);
        for(let j = 0; j < path.length; j++) {
          vertex(path[j].x, path[j].y);
        }
        endShape();
      }
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if(keyCode == DELETE || keyCode == BACKSPACE) {
    startDrawing();
  }

  if(keyCode == UP_ARROW) {
    lineLength += 2;
    startDrawing();
  }
  if(keyCode == DOWN_ARROW) {
    lineLength -= 2;
    startDrawing();
  }
  if(keyCode == LEFT_ARROW) {
    joints--;
    if(joints < 1) joints = 1;
    startDrawing();
  }
  if(keyCode == RIGHT_ARROW) {
    joints++;
    if(joints > 10) joints = 10;
    startDrawing();
  }

  if (key == '+') {
    speedRelation += 0.5;
    if (speedRelation > 5) speedRelation = 5;
    startDrawing();
  }
  if (key == '-') {
    speedRelation -= 0.5;
    if (speedRelation < 2) speedRelation = 2;
    startDrawing();
  }

  if(key === '1') showPendulum = !showPendulum;
  if(key === '2') showPendulumPath = !showPendulumPath;
}
