"use strict";

const sketch = (p) => {
  let recursionLevel = 6;
  let startRadius = 200;

  let width = 800;
  let height = 800;

  p.setup = () => {
    p.createCanvas(width, height);
  };

  p.draw = () => {
    p.background(255);
    p.smooth();
    p.noFill();
    p.strokeCap('PROJECT');

    p.translate(width / 2, height / 2);
    drawBranch(0, 0, startRadius, recursionLevel);
  };


  p.keyPressed = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
    if (p.key === "p" || p.key === "P") savePDF = true;

    if (p.key === "1") recursionLevel = 1;
    if (p.key === "2") recursionLevel = 2;
    if (p.key === "3") recursionLevel = 3;
    if (p.key === "4") recursionLevel = 4;
    if (p.key === "5") recursionLevel = 5;
    if (p.key === "6") recursionLevel = 6;
    if (p.key === "7") recursionLevel = 7;
    if (p.key === "8") recursionLevel = 8;
    if (p.key === "9") recursionLevel = 9;
    if (p.key === "0") recursionLevel = 0;
  };

  const drawBranch = (x, y, radius, level) => {
    p.strokeWeight(level * 2);
    p.stroke(0, 130, 164, 100);
    p.noFill();
    p.arc(x, y, radius * 2, radius * 2, -(Math.PI), 0);

    p.fill(0);
    p.noStroke();
    p.ellipse(x, y, level * 1.5, level * 1.5);

    if(level > 0) {
      drawBranch(x - radius, y + radius / 2, radius / 2, level - 1);
      drawBranch(x + radius, y + radius / 2, radius / 2, level - 1);
    }
  };
};

const myp5 = new p5(sketch);
