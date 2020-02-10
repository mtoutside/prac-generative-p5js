"use strict";

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(800, 800);
    p.strokeWeight(1);
    p.strokeJoin(p.ROUND);
  };

  p.draw = ()  =>  {
    p.background(255);

    p.stroke(0, 130, 164);
    p.noFill();

    let noiseXRange = p.mouseX / 10;
    console.log(`noiseXRange: 0 - ${noiseXRange}`);

    p.beginShape();
    for (let x = 0; x < p.width; x+= 10) {
      let noiseX = p.map(x, 0, p.width, 0, noiseXRange);
      let y = p.noise(noiseX) * p.height;
      p.vertex(x, y);
    }
    p.endShape();

    p.noStroke();
    p.fill(0);

    for (let x = 0; x < p.width; x += 10) {
      let noiseX = p.map(x, 0, p.width, 0, noiseXRange);
      let y = p.noise(noiseX) * p.height;
      p.ellipse(x, y, 3, 3);
    }
  };

  p.mousePressed = () => {
    p.noiseSeed(p.random(100000));
  };

  p.keyReleased = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
  };
};

const myp5 = new p5(sketch);
