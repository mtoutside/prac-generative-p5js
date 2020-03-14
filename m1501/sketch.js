"use strict";

const sketch = (p) => {

  let octaves = 4;
  let falloff = 0.5;

  let tileSize = 40;
  let gridResolutionX;
  let gridResolutionY;
  let debugMode = true;
  let arrow;

  p.preload = () => {
    arrow = p.loadImage('data/arrow.svg');
  };

  p.setup = () => {
    p.createCanvas(800, 800);
    p.cursor(p.CROSS);
    gridResolutionX = p.round(p.width / tileSize);
    gridResolutionY = p.round(p.height / tileSize);
    p.strokeCap(p.SQUARE);
  };

  p.draw = () => {
    p.background(255);
    p.noiseDetail(octaves, falloff);

    let noiseXRange = p.mouseX / 100;
    let noiseYRange = p.mouseY / 100;

    for (let gY = 0; gY <= gridResolutionY; gY++) {
      for (let gX = 0; gX <= gridResolutionX; gX++) {
        let posX = tileSize * gX;
        let posY = tileSize * gY;

        let noiseX = p.map(gX, 0, gridResolutionX, 0, noiseXRange);
        let noiseY = p.map(gY, 0, gridResolutionY, 0, noiseYRange);
        let noiseValue = p.noise(noiseX, noiseY);
        let angle = noiseValue * p.TAU;

        p.push();
        p.translate(posX, posY);

        if (debugMode) {
          p.noStroke();
          p.fill(noiseValue * 255);
          p.ellipse(0, 0, tileSize * 0.25, tileSize * 0.25);
        }

        // arc
        p.noFill();
        p.strokeWeight(1);
        p.stroke(0, 130, 164, 100);
        p.arc(0, 0, tileSize * 0.75, tileSize * 0.75, 0, angle);

        // arrow
        p.stroke(0);
        p.strokeWeight(0.75);
        p.rotate(angle);
        p.image(arrow, 0, 0, tileSize * 0.75, tileSize * 0.75);
        p.scale(1, -1);
        p.image(arrow, 0, 0, tileSize * 0.75, tileSize * 0.75);

        p.pop();
      }
    }

    console.log(`octaves: ${octaves} falloff: ${falloff} noiseXRange: 0- ${noiseXRange} noiseYRange: 0- ${noiseYRange}`);
  };

  p.keyReleased = () => {
    if (p.key === "s" || p.key === "S") saveCanvas(gd.timestamp(), "png");
    if (p.key === "d" || p.key === "D") debugMode = !debugMode;
    if (p.key === " ") p.noiseSeed(p.random(100000));
  };

  p.keyPressed = () => {
    if (p.keyCode === p.UP_ARROW) falloff += 0.05;
    if (p.keyCode === p.DOWN_ARROW) falloff -= 0.05;
    if (falloff > 1.0) falloff = 1.0;
    if (falloff < 0.0) falloff = 0.0;

    if (p.keyCode === p.LEFT_ARROW) octaves--;
    if (p.keyCode === p.RIGHT_ARROW) octaves++;
    if (octaves < 0) octaves = 0;
  };
}

const myp5 = new p5(sketch);
