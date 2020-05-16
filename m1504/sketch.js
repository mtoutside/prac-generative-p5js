"use strict";

const sketch = (p) => {
  const agents = [];
  let agentCount = 2000;
  let noiseScale = 100;
  let noiseStrength = 10;
  let noiseStickingRange = 0.4;
  let zNoiseVelocity = 0.01;
  let overlayAlpha = 8;
  let agentAlpha = 90;
  let strokeWidth = 2;
  let agentWidthMin = 1.5;
  let agentWidthMax = 15;
  let drawMode = 1;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);

    for(let i = 0; i < agentCount; i++) {
      agents[i] = new Agent(noiseStickingRange, agentAlpha, noiseScale, noiseStrength, strokeWidth, agentWidthMin, agentWidthMax, zNoiseVelocity);
    }
  };

  p.draw = () => {
    p.fill(0, 0, 100, overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    p.stroke(0, agentAlpha);
    for(let i = 0; i < agentCount; i++) {
      if(drawMode === 1) {
        agents[i].update1();
      } else {
        agents[i].update2();
      }
    }
  };

  p.keyReleased = () => {
    if (p.key === "s" || p.key === "S") saveCanvas(gd.timestamp(), "png");
    if (p.key === "1") drawMode = 1;
    if (p.key === "2") drawMode = 2;
    if (p.key === " ") {
      let newNoiseSeed = p.floor(p.random(10000));
      p.noiseSeed(newNoiseSeed);
    }
    if(p.keyCode === p.DELETE || p.keyCode === p.BACKSPACE) p.background(255);
  };
};

const myp5 = new p5(sketch);
