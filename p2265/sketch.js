'use strict';

let shapes = [];

let newShape;

let joints = 4;
let lineLength = 128;
let resolution = 0.04;
let gravity = 0.094;
let damping = 0.998;
let maxArms = 3;
let armSizeDeviation = 0.2;

let showPath = true;
let showPendulum = true;
let showPendulumPath = true;

let font = 'Yu Gothic';
// let letters = 'Sie hören nicht die folgenden Gesänge, Die Seelen, denen ich die ersten sang, Zerstoben ist das freundliche Gedränge, Verklungen ach! der erste Wiederklang.';
let letters = '日本語も表示可能ですか？';
let fontSizeMin = 6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(1);
  textFont(font, fontSizeMin);
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
    this.letterIndex = 0;
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
      noStroke();
      fill(this.pendulumPathColor);
      this.letterIndex = 0;
        this.pendulumPath.forEach((pos, posIndex) => {
          let newLetter = letters.charAt(this.letterIndex);
          let nextPosIndex = this.pendulumPath.findIndex((nextPos, nextPosIndex) => {
            if(nextPosIndex > posIndex) {
              let d = p5.Vector.dist(nextPos, pos);
              textSize(max(fontSizeMin, d));
              return d > textWidth(newLetter);
            }
          });
          let nextPos = this.pendulumPath[nextPosIndex];

          if(nextPos) {
            let angle = atan2(nextPos.y - pos.y, nextPos.x - pos.x);
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            text(newLetter, 0, 0, textSize, textSize);
            pop();
            this.letterIndex++;
            if(this.letterIndex >= letters.length) {
              this.letterIndex = 0;
            }
          }
        });
        noFill();
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
    this.pendulumArm;
    this.size = size;
    this.angle = random(TAU);
    this.origin = createVector(0, 0);
    this.end = createVector(0, 0);
    this.gravity = gravity;
    this.damping = damping;
    this.angularAcceleration = 0;
    this.angularVelocity = 0;

    if(this.hierarchy > 0) {
      this.pendulumArm = new Pendulum(this.size / 1.5, this.hierarchy);
    }
  }

  update(heading) {
    this.end.set(this.origin.x + this.size * sin(this.angle), this.origin.y + this.size * cos(this.angle));

    this.angularAcceleration = (-this.gravity / this.size) * sin(this.angle + heading);
    this.angle += this.angularVelocity;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;

    if(this.pendulumArm) {
      this.pendulumArm.update(heading);
    };
  }

  getTrail(offset, end) {
    if(this.pendulumArm) {
      if(end) {
        end.add(this.end);
      } else {
        end = this.end.copy();
      }
      return this.pendulumArm.getTrail(offset, end);
    } else {
      return this.end.copy().add(end).add(offset);
    }
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

    if(this.pendulumArm) {
      push();
      translate(this.end.x, this.end.y);
      this.pendulumArm.draw();
      pop();
    }
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
    joints--;
    joints = max(1, joints);
  }
  if(keyCode == RIGHT_ARROW) {
    joints++;
    joints = max(1, joints);
  }

  if(key === '1') showPath = !showPath;
  if(key === '2') showPendulum = !showPendulum;
  if(key === '3') showPendulumPath = !showPendulumPath;
  if(key === '4') fillMode = !fillMode;

  if(key === '-') gravity -= 0.001;
  if(key === '+') gravity += 0.001;
}
