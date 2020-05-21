"use strict";

const sketch = (p) => {
  let pointCount = 600;
  let freqX = 1;
  let freqY = 2;
  let phi = 90;

  let angle;
  let x;
  let y;
  let factorX;
  let factorY;

  let dodrawAnimation = true;

  let margin = 25;

  p.setup = () => {
    p.createCanvas(600, 600);
  };
  p.draw = ()  =>  {
    p.background(255);
    p.stroke(0);
    p.strokeWeight(2);

    if(dodrawAnimation) {
      p.translate(p.width * 3 / 4, p.height * 3 / 4);
      factorX = p.width / 4 - margin;
      factorY = p.height / 4 - margin;
    } else {
      p.translate(p.width / 2, p.height / 2);
      factorX = p.width / 2 - margin;
      factorY = p.height / 2 - margin;
    }

    p.beginShape();
    for (let i = 0; i <= pointCount; i ++) {
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      x = p.sin(angle * freqX + p.radians(phi));
      y = p.sin(angle * freqY);
      x *= factorX;
      y *= factorY;
      p.vertex(x, y);
    }
    p.endShape();

    if(dodrawAnimation) {
      drawAnimation();
    }
  };

  function drawAnimation() {
    p.push();
    p.noFill();
    p.stroke(0);

    // draw x
    p.beginShape();
    for(let i = 0; i <= pointCount; i++) {
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      x = p.sin(angle * freqX + p.radians(phi));
      x *= p.width / 4 - margin;
      y = -p.height * 2 / 3 - margin + i / pointCount * (p.height / 2 - 2 * margin);
      p.vertex(x, y);
    }
    p.endShape();

    // draw y
    p.beginShape();
    for(let i = 0; i <= pointCount; i++) {
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      y = p.sin(angle * freqY);
      y *= p.height / 4 - margin;
      x = -p.width * 2 / 3 - margin + i / pointCount * (p.width / 2 - 2 * margin);
      p.vertex(x, y);
    }
    p.endShape();

    angle = p.map(p.frameCount, 0, pointCount, 0, p.TAU);
    x = p.sin(angle * freqX + p.radians(phi));
    y = p.sin(angle * freqY);
    x *= p.width / 4 - margin;
    y *= p.height / 4 - margin;

    let oscYx = -p.width * 2 / 3 - margin + (angle / p.TAU) % 1 * (p.width / 2 - 2 * margin);
    let oscXy = -p.height * 2 / 3 - margin + (angle / p.TAU) % 1 * (p.height / 2 - 2 * margin);

    p.stroke(0, 80);
    p.line(x, oscXy, x, y);
    p.line(oscXy, y, x, y);

    p.fill(0);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(x, oscXy, 8, 8);
    p.ellipse(oscYx, y, 8, 8);

    p.ellipse(x, y, 10, 10);

    p.pop();
  }

  p.keyReleased = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
    if (p.key === "a" || p.key === "A") dodrawAnimation = !dodrawAnimation;

    if (p.key === "1") freqX--;
    if (p.key === "2") freqX++;
    freqX = p.max(freqX, 1);

    if (p.key === "3") freqY--;
    if (p.key === "4") freqY++;
    freqY = p.max(freqY, 1);

    if(p.keyCode === p.LEFT_ARROW) phi -= 15;
    if(p.keyCode === p.RIGHT_ARROW) phi += 15;

    console.log(`freqX: ${freqX}, freqY: ${freqY}, phi: ${phi}`);
  };
};

const myp5 = new p5(sketch);
