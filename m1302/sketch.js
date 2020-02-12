"use strict";

const sketch = (p) => {

  let actRandomSeed = 0;

  p.setup = () => {
    p.createCanvas(512, 512);
  };

  p.draw = ()  =>  {
    p.background(0);

    p.randomSeed(actRandomSeed);

    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        p.set(x, y, p.random(255));
      }
    }
    p.updatePixels();
  };

  p.mousePressed = () => {
    actRandomSeed = p.random(100000);
  };

  p.keyReleased = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
  };
};

const myp5 = new p5(sketch);
