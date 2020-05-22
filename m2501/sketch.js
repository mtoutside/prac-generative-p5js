"use strict";

const sketch = (p) => {
  let pointCount =1000;
  let lissajousPoints = [];
  let freqX = 4;
  let freqY = 7;
  let phi = 15;

  let modFreqX = 3;
  let modFreqY = 2;

  let lineWeight = 0.1;
  let lineColor;
  let lineAlpha = 50;

  let connectionRadius = 100;
  let connectionRamp = 6;

  p.setup = () => {
    p.createCanvas(800, 800);
    p.colorMode(p.RGB, 255, 255, 255, 100);
    p.noFill();

    lineColor = p.color(0, 50);

    calculateLissajousPoints();
    drawLissajous();
  };

  function calculateLissajousPoints() {
    for(let i = 0; i <= pointCount; i++) {
      let angle = p.map(i, 0, pointCount, 0, p.TAU);
      let x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
      let y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
      x *= p.width / 2 -30;
      y *= p.height / 2 -30;
      
      lissajousPoints[i] = p.createVector(x, y);
    }
  }

  function drawLissajous() {
    p.background(255);
    p.strokeWeight(lineWeight);
    p.push();
    p.translate(p.width / 2, p.height / 2);

    for(let i1 = 0; i1 < pointCount; i1++) {
      for(let i2 = 0; i2 < pointCount; i2++) {
        let d = lissajousPoints[i1].dist(lissajousPoints[i2]);
        let a = p.pow(1 / (d / connectionRadius + 1), 6);
        if(d <= connectionRadius) {
          p.stroke(lineColor, a * lineAlpha);
          p.line(
            lissajousPoints[i1].x,
            lissajousPoints[i1].y,
            lissajousPoints[i2].x,
            lissajousPoints[i2].y
          );
        }
      }
    }
    p.pop();
  }

  p.keyPressed = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");

    if (p.key === "1") freqX--;
    if (p.key === "2") freqX++;
    freqX = p.max(freqX, 1);

    if (p.key === "3") freqY--;
    if (p.key === "4") freqY++;
    freqY = p.max(freqY, 1);

    if(p.keyCode === p.LEFT_ARROW) phi -= 15;
    if(p.keyCode === p.RIGHT_ARROW) phi += 15;

    if (p.key === "7") modFreqX--;
    if (p.key === "8") modFreqX++;
    modFreqX = p.max(modFreqX, 1);

    if (p.key === "9") modFreqY--;
    if (p.key === "0") modFreqY++;
    modFreqY = p.max(modFreqY, 1);

    calculateLissajousPoints();
    drawLissajous();

    console.log(`freqX: ${freqX}, freqY: ${freqY}, phi: ${phi}, modFreqX: ${modFreqX}, modFreqY: ${modFreqY}`);
  };
};

const myp5 = new p5(sketch);
