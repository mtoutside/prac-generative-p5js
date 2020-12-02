'use strict';

let circles = [];

let minRadius = 3;
let maxRadius = 50;

let mouseRect = 15;
let freeze = false;
let showCircle = true;
let showLine = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  cursor(CROSS);
  ellipseMode(RADIUS);
  rectMode(RADIUS);
}

function draw() {
  background(255);

  let newX = random(maxRadius, width - maxRadius);
  let newY = random(maxRadius, height - maxRadius);
  if(mouseIsPressed && mouseButton == LEFT) {
    newX = random(mouseX - mouseRect, mouseX + mouseRect);
    newY = random(mouseY - mouseRect, mouseY + mouseRect);
  }

  let intersection = false;
  for(let newR = maxRadius; newR >= minRadius; newR--) {
    for(let i = 0; i < circles.length; i++) {
      let d =dist(newX, newY, circles[i].x, circles[i].y);
      intersection = d < circles[i].r + newR;
      if(intersection) {
        break;
      }
    }
    if(!intersection) {
      circles.push(new Circle(newX, newY, newR));
      break;
    }
  }

  for(let i = 0; i < circles.length; i++) {
    if(showLine) {
      let closestCircle;
      for(let j = 0; j < circles.length; j++) {
        let d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
        if(d <= circles[i].r + circles[j].r + 1) {
          closestCircle = circles[j];
          break;
        }
      }
      if(closestCircle) {
        stroke(100, 230, 100);
        strokeWeight(0.75);
        line(circles[i].x, circles[i].y, closestCircle.x, closestCircle.y);
      }
    }

    if(showCircle) circles[i].draw();
  }

  if(mouseIsPressed && mouseButton == LEFT) {
    stroke(100, 230, 100);
    strokeWeight(2);
    rect(mouseX, mouseY, mouseRect, mouseRect);
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw() {
    stroke(0);
    strokeWeight(1.5);
    ellipse(this.x, this.y, this.r);
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if(keyCode == UP_ARROW) mouseRect += 4;
  if(keyCode == DOWN_ARROW) mouseRect -= 4;

  if(key === 'f' || key === 'F') {
    freeze = !freeze;
    if(freeze) {
      noLoop();
    } else {
      loop();
    }
  }

  if(key === '1') showCircle = !showCircle;
  if(key === '2') showLine = !showLine;
}
