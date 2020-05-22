"use strict";

const sketch = (p) => {
  let pointCount = 500;
  let freqX = 1;
  let freqY = 4;
  let phi = 60;

  let modFreqX = 2;
  let modFreqY = 1;
  let modulationPhi = 0;

  let angle;
  let x;
  let y;
  let w;
  let maxDist;
  let oldX;
  let oldY;

  let drawMode = 2;

  p.setup = () => {
    p.createCanvas(600, 600);
    maxDist = p.sqrt(p.sq(p.width / 2 - 50) + p.sq(p.height / 2 - 50));
  };

  p.draw = ()  =>  {
    p.background(255);

    p.translate(p.width / 2, p.height / 2);
    pointCount = p.mouseX * 2 + 200;

    if(drawMode === 1) {
      p.stroke(0);
      p.strokeWeight(1);

      p.beginShape();
      for (let i = 0; i <= pointCount; i ++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
        y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
        x *= p.width / 2 -50;
        y *= p.height / 2 -50;
        p.vertex(x, y);
      }
      p.endShape();
    } else if(drawMode === 2) {
      p.strokeWeight(8);

      for (let i = 0; i <= pointCount; i ++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
        y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
        x *= p.width / 2 -50;
        y *= p.height / 2 -50;

        if(i > 0) {
          w = p.dist(x, y, 0, 0);
          p.stroke(i % 2 * 2, p.map(w, 0, maxDist, 255, 0));
          p.line(oldX, oldY, x ,y);
        }

        oldX = x;
        oldY = y;
      }
    }
  };

  p.keyReleased = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");

    if (p.key === "d" || p.key === "D") {
      if(drawMode === 1) {
        drawMode = 2;
      } else {
        drawMode = 1;
      }
    }

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

    console.log(`freqX: ${freqX}, freqY: ${freqY}, phi: ${phi}, modFreqX: ${modFreqX}, modFreqY: ${modFreqY}`);
  };
};

const myp5 = new p5(sketch);
