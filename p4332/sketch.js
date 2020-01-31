"use strict";

let video;
let c;
let x1, x2, x3, y1, y2, y3;
let curvePointX = 0;
let curvePointY = 0;
let counter;
let maxCounter = 100000;
let streamReady = false;

function setup() {
  createCanvas(640, 480);
  background(255);
  video = createCapture(VIDEO, () => {
     streamReady = true;
  });
  video.size(width * pixelDensity(), height * pixelDensity());
  video.hide();
  noFill();

  x1 = 0;
  y1 = height / 2;
  x2 = width / 2;
  y2 = 0;
  x3 = width;
  y3 = height / 2;
}

function draw() {
  if (streamReady) {

    c = color(video.get(x1, y1));

    let cHSVh = chroma(red(c), green(c), blue(c));
    let hueValue = cHSVh.get('hsv.h');
    strokeWeight(hueValue / 50);
    stroke(c);

    beginShape();
    curveVertex(x1, y1);
    curveVertex(x1, y1);
    for (let i = 0; i < 7; i++) {
      curvePointX = constrain(x1 + random(-50, 50), 0, width - 1);
      curvePointY = constrain(y1 + random(-50, 50), 0, height - 1);
      curveVertex(curvePointX, curvePointY);
    }
    curveVertex(curvePointX, curvePointY);
    endShape();
    x1 = curvePointX;
    y1 = curvePointY;

    c = color(video.get(x2, y2));

    let cHSVs = chroma(red(c), green(c), blue(c));
    let saturationValue = cHSVs.get('hsv.s');
    strokeWeight(saturationValue / 2);
    stroke(c);

    beginShape();
    curveVertex(x2, y2);
    curveVertex(x2, y2);
    for (let i = 0; i < 7; i++) {
      curvePointX = constrain(x2 + random(-50, 50), 0, width - 1);
      curvePointY = constrain(y2 + random(-50, 50), 0, height - 1);
      curveVertex(curvePointX, curvePointY);
    }
    curveVertex(curvePointX, curvePointY);
    endShape();
    x2 = curvePointX;
    y2 = curvePointY;

    c = color(video.get(x3, y3));

    let cHSVv = chroma(red(c), green(c), blue(c));
    let brightnessValue = cHSVv.get('hsv.v');
    strokeWeight(brightnessValue / 100);
    stroke(c);

    beginShape();
    curveVertex(x3, y3);
    curveVertex(x3, y3);
    for (let i = 0; i < 7; i++) {
      curvePointX = constrain(x3 + random(-50, 50), 0, width - 1);
      curvePointY = constrain(y3 + random(-50, 50), 0, height - 1);
      curveVertex(curvePointX, curvePointY);
    }
    curveVertex(curvePointX, curvePointY);
    endShape();
    x3 = curvePointX;
    y3 = curvePointY;

    counter++;
    if (counter >= maxCounter) noLoop();
  }
}

function keyReleased() {
  if (key === "s" || key === "S") saveCanvas(gd.timestamp(), "png");
  if (keyCode === DELETE || keyCode === BACKSPACE) clear();
  if (key === "q" || key === "Q") noLoop();
  if (key === "w" || key === "W") loop();
}
