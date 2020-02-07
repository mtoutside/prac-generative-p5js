"use strict";

const sketch = (p) => {
  let actRandomSeed = 42;

  p.setup = () => {
    p.createCanvas(1024, 256);
  };
  p.draw = ()  =>  {
    p.background(255);

    p.stroke(0, 130, 164);
    p.strokeWeight(1);
    p.strokeJoin(p.ROUND);
    p.noFill();

    p.randomSeed(actRandomSeed);
    p.beginShape();
    for (let x = 0; x < p.width; x += 10) {
      let y = p.random(0, p.height);
      p.vertex(x, y);
    }
    p.endShape();

    p.noStroke();
    p.fill(0);

    p.randomSeed(actRandomSeed);
    for (let x = 0; x < p.width; x += 10) {
      let y = p.random(0, p.height);
      p.ellipse(x, y, 3, 3);
    }
  };

  p.mousePressed = () => {
    actRandomSeed = p.random(100000);
  };

  p.keyReleased = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
  };
};

const myp5 = new p5(sketch);
