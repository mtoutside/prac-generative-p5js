"use strict";

let video;
let x;
let y;
let curvePointX = 0;
let curvePointY = 0;
let pointCount = 1;
let diffusion = 50;
let streamReady = false;

function setup() {
  createCanvas(640, 480);
  background(255);
  x = width / 2;
  y = height / 2;
  video = createCapture(VIDEO, () => {
     streamReady = true;
  });
  video.size(width * pixelDensity(), height * pixelDensity());
  video.hide();
  noFill();
}

function draw() {
  if (streamReady) {
    for (let j = 0; j <= mouseX / 50; j++) {
      let c = color(video.get(width - x, y));

      let cHSV = chroma(red(c), green(c), blue(c));
      strokeWeight(cHSV.get('hsv.h') / 50);
      stroke(c);

      diffusion = map(mouseY, 0, height, 5, 100);

      beginShape();
      curveVertex(x, y);
      curveVertex(x, y);

      for (let i = 0; i < pointCount; i++) {
        let rx = int(random(-diffusion, diffusion));
        curvePointX = constrain(x + rx, 0, width - 1);
        let ry = int(random(-diffusion, diffusion));
        curvePointY = constrain(y + ry, 0, height - 1);
        curveVertex(curvePointX, curvePointY);
      }

      curveVertex(curvePointX, curvePointY);
      endShape();

      x = curvePointX;
      y = curvePointY;
    }
  }
}

function keyReleased() {
  if (key === "s" || key === "S") saveCanvas(gd.timestamp(), "png");
  if (keyCode === DELETE || keyCode === BACKSPACE) clear();
  if (key === "q" || key === "Q") noLoop();
  if (key === "w" || key === "W") loop();
  if (keyCode === UP_ARROW) pointCount = min(pointCount + 1, 30);
  if (keyCode === DOWN_ARROW) pointCount = max(pointCount - 1, 1);
}
