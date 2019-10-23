'use strict';

let formResolution = 15;
let stepSize = 2;
let distortionFactor = 1;
let initRadius = 150;
let centerX;
let centerY;
let x = [];
let y = [];

let filled = false;
let freeze = false;
let drawMode = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  centerX = width / 2;
  centerY = height / 2;
  let angle = radians(360 / formResolution);
  for(let i = 0; i < formResolution; i++) {
    x.push(cos(angle * i) * initRadius);
    y.push(sin(angle * i) * initRadius);
  }

  stroke(0, 50);
  strokeWeight(0.75);
  background(255);
}

function draw() {
  centerX += (mouseX - centerX) * 0.01;
  centerY += (mouseY - centerY) * 0.01;

  for(let i = 0; i < formResolution; i++) {
    x[i] += random(-stepSize, stepSize);
    y[i] += random(-stepSize, stepSize);
  }

  if(filled) {
    fill(random(255));
  } else {
    noFill();
  }

  switch(drawMode) {
  case 1:
    beginShape();
    curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);

    for(let i = 0; i < formResolution; i++) {
      curveVertex(x[i] + centerX, y[i] + centerY);
    }
    curveVertex(x[0] + centerX, y[0] + centerY);
    curveVertex(x[1] + centerX, y[1] + centerY);
    endShape();
    break;
  case 2:
    beginShape();
    curveVertex(x[0] + centerX, y[0] + centerY);
    for(let i = 0; i < formResolution; i++) {
      curveVertex(x[i] + centerX, y[i] + centerY);
    }
    curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);
    endShape();
    break;
  }
}


function mousePressed() {
  centerX = mouseX;
  centerY = mouseY;

  let angle;
  let radius;
  switch(drawMode) {
  case 1:
    angle = radians(360 / formResolution);
    radius = initRadius * random(0.5, 1);
    for(let i = 0; i < formResolution; i++) {
      x[i] = cos(angle * i) * radius;
      y[i] = sin(angle * i) * radius;
    }
    break;
  case 2:
    radius = initRadius * random(0.5, 5);
    angle = random(PI);

    let x1 = cos(angle) * radius;
    let y1 = sin(angle) * radius;
    let x2 = cos(angle - PI) * radius;
    let y2 = sin(angle - PI) * radius;
    for(let i = 0; i < formResolution; i++) {
      x[i] = lerp(x1, x2, i / formResolution);
      y[i] = lerp(y1, y2, i / formResolution);
    }
    break;
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode === BACKSPACE) background(360);
  if(key == '1') filled = false;
  if(key == '2') filled = true;
  if(key == '3') drawMode = 1;
  if(key == '4') drawMode = 2;

  if(keyCode == UP_ARROW) stepSize++;
  if(keyCode == DOWN_ARROW) stepSize--;
  stepSize = max(stepSize, 1);
  if(key == 'f' || key == 'F') freeze = !freeze;
  if(freeze) {
    noLoop();
  } else {
    loop();
  }
}
