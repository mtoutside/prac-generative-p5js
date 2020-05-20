"use strict";

const sketch = (p) => {
  let pointCount;
  let freq = 1;
  let phi = 0;

  let angle;
  let y;

  let dodrawAnimation = true;

  p.setup = () => {
    p.createCanvas(800, 400);
  };
  p.draw = ()  =>  {
    p.background(255);
    p.stroke(0);
    p.strokeWeight(2);
    p.noFill();

    if(dodrawAnimation) {
      pointCount = p.width - 250;
      p.translate(250, p.height / 2);
    } else {
      pointCount = p.width;
      p.translate(0, p.height / 2);
    }

    p.beginShape();
    for (let i = 0; i < pointCount; i ++) {
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      y = p.sin(angle * freq + p.radians(phi));
      y *= 100;
      p.vertex(i, y);
    }
    p.endShape();

    if(dodrawAnimation) {
      drawAnimation();
    }
  };

  function drawAnimation() {
    let t = (p.frameCount / pointCount) % 1;
    angle = p.map(t, 0, 1, 0, p.TAU);
    let x = p.cos(angle * freq + p.radians(phi));
    x *= 100 -125;
    y = p.sin(angle * freq + p.radians(phi));
    y = y * 100;

    // circle
    p.strokeWeight(1);
    p.ellipse(-125, 0, 200, 200);
    // lines
    p.stroke(0, 128);
    p.line(0, -100, 0, 100);
    p.line(0, 0, pointCount, 0);
    p.line(-225, 0, -25, 0);
    p.line(-125, -100, -125, 100);
    p.line(x, y, -125, 0);

    p.stroke(0, 130, 164);
    p.strokeWeight(2);
    p.line(t * pointCount, y, t * pointCount, 0);
    p.line(x, y, x, 0);

    let phiX = p.cos(p.radians(phi)) * 100 -125;
    let phiY = p.sin(p.radians(phi)) * 100;

    // phi line
    p.strokeWeight(1);
    p.stroke(0, 128);
    p.line(-125, 0, phiX, phiY);

    // phi dots
    p.fill(0);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(0, phiY, 8, 8);
    p.ellipse(phiX, phiY, 8, 8);

    // dot on curve
    p.ellipse(t * pointCount, y, 10, 10);
    // dot on circle
    p.ellipse(x, y, 10, 10);
  }

  p.keyReleased = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
    if (p.key === "a" || p.key === "A") dodrawAnimation = !dodrawAnimation;

    if (p.key === "1") freq--;
    if (p.key === "2") freq++;
    freq = p.max(freq, 1);

    if(p.keyCode === p.LEFT_ARROW) phi -= 15;
    if(p.keyCode === p.RIGHT_ARROW) phi += 15;

    console.log(`freq: ${freq}, phi: ${phi}`);
  };
};

const myp5 = new p5(sketch);
