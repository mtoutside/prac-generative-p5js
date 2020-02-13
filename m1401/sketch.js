"use strict";

let tileCount;
let zScale;

let noiseXRange;
let noiseYRange;
let octaves;
let falloff;

let midColor;
let topColor;
let bottomColor;
let strokeColor;
let threshold;

let offsetX;
let offsetY;
let clickX;
let clickY;
let zoom;
let rotateX;
let rotateZ;
let targetRotationX;
let targetRotationZ;
let clickRotationX;
let clickRotationZ;

function setup() {
  createCanvas(600, 600, WEBGL);
  colorMode(HSB, 360, 100, 100);
  cursor(CROSS);

  tileCount = 50;
  zScale = 150;

  noiseXRange = 10;
  noiseYRange = 10;
  octaves = 4;
  falloff = 0.5;

  topColor = color(0, 0, 100);
  midColor = color(191, 99, 63);
  bottomColor = color(0, 0, 0);
  strokeColor = color(180, 100, 100);
  threshold = 0.3;

  offsetX = 0;
  offsetY = 0;
  clickX = 0;
  clickY = 0;
  zoom = -300;
  rotationX = 0;
  rotationZ = 0;
  targetRotationX = PI / 3;
  targetRotationZ = 0;
}

function draw() {
  background(0, 0, 100);
  ambientLight(150);

  push();
  translate(width * 0.05, height * 0.05, zoom);

  if (mouseIsPressed && mouseButton === RIGHT) {
    offsetX = mouseX - clickX;
    offsetY = mouseY - clickY;
    targetRotationX = min(
      max(clickRotationX + offsetY / float(width) * TWO_PI, -HALF_PI),
      HALF_PI
    );
    targetRotationZ = clickRotationZ + (offsetX / float(height)) * TWO_PI;
  }
  rotationX += (targetRotationX - rotationX) * 0.25;
  rotationZ += (targetRotationZ - rotationZ) * 0.25;
  // ↓なぜか動かない
  // rotateX(-rotationX);
  // rotateZ(-rotationZ);

  if (mouseIsPressed && mouseButton === LEFT) {
    noiseXRange = mouseX / 10;
    noiseYRange = mouseY / 10;
  }

  noiseDetail(octaves, falloff);
  let noiseYMax = 0;

  let tileSizeY = height / tileCount;
  let noiseStepY = noiseYRange / tileCount;

  for (let meshY = 0; meshY <= tileCount; meshY++) {
    beginShape(TRIANGLE_STRIP);
    for (let meshX = 0; meshX <= tileCount; meshX++) {
      let x = map(meshX, 0, tileCount, -width / 2, width / 2);
      let y = map(meshY, 0, tileCount, -height / 2, height / 2);

      let noiseX = map(meshX, 0, tileCount, 0, noiseXRange);
      let noiseY = map(meshY, 0, tileCount, 0, noiseYRange);
      let z1 = noise(noiseX, noiseY);
      let z2 = noise(noiseX, noiseY + noiseStepY);

      noiseYMax = max(noiseYMax, z1);
      let interColor;
      colorMode(RGB);
      let amount;
      if (z1 <= threshold) {
        amount = map(z1, 0, threshold, 0.15, 1);
        interColor = lerpColor(midColor, topColor, amount);
      } else {
        amount = map(z1, threshold, noiseYMax, 0, 1);
        interColor = lerpColor(midColor, topColor, amount);
      }
      fill(interColor);
      stroke(strokeColor);
      strokeWeight(1);
      vertex(x, y, z1 * zScale);
      vertex(x, y + tileSizeY, z2 * zScale);
    }
    endShape();
  }
  pop();
}

function mousePressed() {
  clickX = mouseX;
  clickY = mouseY;
  clickRotationX = rotationX;
  clickRotationZ = rotationZ;
}

function keyReleased() {
  if (keyCode === UP_ARROW) falloff += 0.05;
  if (keyCode === DOWN_ARROW) falloff -= 0.05;
  if (falloff > 1.0) falloff = 1.0;
  if (falloff < 0.0) falloff = 0.0;

  if (keyCode === LEFT_ARROW) octaves--;
  if (keyCode === RIGHT_ARROW) octaves++;
  if (octaves < 0) octaves = 0;

  if (keyCode === 187) zoom += 20;
  if (keyCode === 189) zoom -= 20;

  if (key === "s" || key === "S") saveCanvas(gd.timestamp(), "png");
  if (key === " ") noiseSeed(floor(random(100000)));
}
