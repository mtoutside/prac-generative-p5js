'use strict';

let shapes = [];

let newShape;

let joints = 5;
let lineLength = 32;
let resolution = 0.04;
let gravity = 0.099;
let damping = 0.995;
let maxArms = 3;
let armSizeDeviation = 0.2;

let showPath = true;
let showPendulum = true;
let showPendulumPath = true;
let fillMode = false;

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
  constructor(pendulumPathColor) {
    this.shapePath = [];
    this.pendulumPath = [];
    this.pendulumPathColor = pendulumPathColor;
    this.iterator = 0;
    this.lineLength = lineLength;
    this.resolution = resolution;
    this.pendulum = new Pendulum(this.lineLength, joints);
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

    if(showPendulumPath && this.pendulumPath.length) {
      strokeWeight(1);
      stroke(this.pendulumPathColor);

      if(fillMode) {
        let c = this.pendulumPathColor;
        fill(hue(c), saturation(c), brightness(c), 10);
        this.pendulumPath.forEach((group) => {
          beginShape();
          group.forEach((pox) => {
            vertex(pos.x, pos.y);
          });
          endShape();
        });
        noFill();
      } else {
        this.pendulumPath[0].forEach((undefined, column) => {
          beginShape();
          this.pendulumPath.forEach((pos) => {
            vertex(pos[column].x, pos[column].y);
          });
          endShape();
        });
      }
    }

    if(this.iterator < this.shapePath.length) {
      let currentIndex = floor(this.iterator);

      let currentPos = this.shapePath[currentIndex];
      let previousPos = this.shapePath[currentIndex - 1];
      if(previousPos) {
        let offsetPos = p5.Vector.lerp(previousPos, currentPos, this.iterator - currentIndex);
        let heading = atan2(currentPos.y - previousPos.y, currentPos.x - previousPos.x) - HALF_PI;

        push();
        translate(offsetPos.x, offsetPos.y);
        this.pendulum.update(heading);
        if(showPendulum) {
          this.pendulum.draw();
        }
        pop();

        this.pendulumPath.push(this.pendulum.getTrail(offsetPos));
      }
    }
  }

  update() {
    this.iterator += this.resolution;
    this.iterator = constrain(this.iterator, 0, this.shapePath.length);
  }
}

class Pendulum {
  constructor(size, hierarchy) {
    this.hierarchy = hierarchy - 1;
    this.armCount = floor(random(1, maxArms + 1));
    this.pendulumArms = [];
    this.size = size;
    this.angle = random(TAU);
    this.origin = createVector(0, 0);
    this.end = createVector(0, 0);
    this.gravity = gravity;
    this.damping = damping;
    this.angularAcceleration = 0;
    this.angularVelocity = 0;

    for(let i = 0; i < this.armCount && this.hierarchy > 0; i++) {
      this.pendulumArms.push(new Pendulum(this.size / randomGaussian(1.5, armSizeDeviation), this.hierarchy));
    }
  }

  update(heading) {
    this.end.set(this.origin.x + this.size * sin(this.angle), this.origin.y + this.size * cos(this.angle));

    this.angularAcceleration = (-this.gravity / this.size) * sin(this.angle + heading);
    this.angle += this.angularVelocity;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;

    this.pendulumArms.forEach((pendulumArm) => {
      pendulumArm.update(heading);
    });
  }

  getTrail(offset, pendulumTrailPaths) {
    pendulumTrailPaths = pendulumTrailPaths || [];

    offset = offset.copy().add(this.end);

    this.pendulumArms.forEach((pendulumArm) => {
      if(pendulumArm.pendulumArms.length) {
        pendulumArm.getTrail(offset, pendulumTrailPaths);
      } else {
        pendulumTrailPaths.push(offset.copy().add(pendulumArm.end));
      }
    });

    return pendulumTrailPaths;
  }

  draw() {
    stroke(0, 40);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.end.x, this.end.y);
    endShape();

    fill(0, 20);
    ellipse(this.end.x, this.end.y, 2, 2);
    noFill();

    this.pendulumArms.forEach((pendulumArm) => {
      push();
      translate(this.end.x, this.end.y);
      pendulumArm.draw();
      pop();
    });
  }
}
function mousePressed() {
  newShape = new Shape(color(random(360), 80, 60, 50));
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
    gravity -= 0.001;
  }
  if(keyCode == RIGHT_ARROW) {
    gravity += 0.001;
  }

  if(key === '1') showPath = !showPath;
  if(key === '2') showPendulum = !showPendulum;
  if(key === '3') showPendulumPath = !showPendulumPath;
  if(key === '4') fillMode = !fillMode;
}
