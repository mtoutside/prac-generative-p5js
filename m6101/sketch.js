"use strict";
import Node from './Node.js';

const sketch = (p) => {
  let nodes = [];
  let nodeCount = 200;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();

    createNodes();
  };

  p.draw = () => {
    p.fill(255, 20);
    p.rect(0, 0, p.width, p.height);

    p.fill(0);
    for(let i = 0; i < nodes.length; i++) {
      nodes[i].attractNodes(nodes);
      nodes[i].update();
      p.ellipse(nodes[i].x, nodes[i].y, 10, 10);
    }
  };


  p.keyPressed = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
    if (p.key === "r" || p.key === "R") {
      p.background(255);
      createNodes();
    }
  };

  const createNodes = () => {
    nodes = [];
    for(let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(
        p.width / 2 + p.random(-1, 1),
        p.height / 2 + p.random(-1, 1),
        5,
        p.width - 5,
        5,
        p.height - 5
      ));
    }
  };
};

const myp5 = new p5(sketch);

export default myp5;
