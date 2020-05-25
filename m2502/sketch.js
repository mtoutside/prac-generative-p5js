"use strict";

const sketch = (p) => {
  let pointCount = 1500;
  let pointIndex = 0;
  let lissajousPoints = [];

  let freqX = 13;
  let freqY = 11;
  let phi = 97;

  let modFreqX = 0;
  let modFreqY = 0;

  let modFreq2X = 11;
  let modFreq2Y = 17;
  let modFreq2Strength = 0;

  let randomOffset = 2;

  let invertBackground = false;
  let lineWeight = 1;
  let lineAlpha = 20;

  let connectAllPoints = true;
  let connectionRadius = 110;
  let minHueValue = 0;
  let maxHueValue = 100;
  let saturationValue = 80;
  let brightnessValue = 0;
  let invertHue = false;

  p.setup = () => {
    p.createCanvas(800, 800);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.strokeWeight(lineWeight);
    p.noFill();

    let backgroundColor = invertBackground ? p.color(0) : p.color(0, 0, 100);
    p.background(backgroundColor);

    calculateLissajousPoints();
  };

  p.draw = () => {
    if(!connectAllPoints) {
      for(let i = 0; i < pointCount - 1; i++) {
        drawLine(lissajousPoints[i], lissajousPoints[i + 1]);
      }
    } else {
      let drawEndTime = window.performance.now() + 10;
      for(let i1 = pointIndex; i1 < pointCount && window.performance.now() < drawEndTime; i1++) {
        for(let i2 = 0; i2 < i1; i2++) {
          drawLine(lissajousPoints[i1], lissajousPoints[i2]);
        }
        pointIndex = i1;
      }
    }

    if(pointIndex >= pointCount - 1) {
      p.noLoop();
    }
  }

  function calculateLissajousPoints() {
    p.randomSeed(0);

    for(let i = 0; i <= pointCount; i++) {
      let angle = p.map(i, 0, pointCount, 0, p.TAU);

      let fmx = p.sin(angle * modFreq2X) * modFreq2Strength + 1;
      let fmy = p.sin(angle * modFreq2Y) * modFreq2Strength + 1;

      let x = p.sin(angle * freqX * fmx + p.radians(phi)) * p.cos(angle * modFreqX);
      let y = p.sin(angle * freqY * fmy) * p.cos(angle * modFreqY);

      let rx = p.random(-randomOffset, randomOffset);
      let ry = p.random(-randomOffset, randomOffset);

      x = (x * (p.width / 2 - 30 - randomOffset) + p.width / 2) + rx;
      y = (y * (p.height / 2 - 30 - randomOffset) + p.height / 2) + ry;
      
      lissajousPoints[i] = p.createVector(x, y);
    }
  }

  function drawLine(vector1, vector2) {
    let distance = p5.Vector.dist(vector1, vector2);
    let angle = p.pow(1 / (distance / connectionRadius + 1), 6);

    if(distance <= connectionRadius) {
      let hue = p.lerp(minHueValue, maxHueValue, (invertHue ? 1 - angle : angle)) % 360;
      p.stroke(
        hue,
        saturationValue,
        invertBackground ? 100 - brightnessValue : brightnessValue,
        angle * lineAlpha + (pointIndex % 2 * 2));
      p.line(vector1.x, vector1.y, vector2.x, vector2.y);
    }
  }

  p.keyPressed = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
  };
};

const myp5 = new p5(sketch);
