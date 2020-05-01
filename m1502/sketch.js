"use strict";

const sketch = (p) => {
  const agents = [];
  let agentCount = 4000;
  let noiseScale = 300;
  let noiseStrength = 10;
  let overlayAlpha = 10;
  let agentAlpha = 90;
  let strokeWidth = 0.3;
  let drawMode = 1;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for(let i = 0; i < agentCount; i++) {
      agents[i] = new Agent();
    }
  };

  p.draw = () => {
    p.fill(255, overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    p.stroke(0, agentAlpha);
    for(let i = 0; i < agentCount; i++) {
      if(drawMode === 1) agents[i].update1(noiseScale, noiseStrength, strokeWidth);
      else agents[i].update2(noiseScale, noiseStrength, strokeWidth);
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
