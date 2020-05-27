"use strict";
import Node from './Node.js';
import Spring from './Spring.js';

const sketch = (p) => {
  let nodeA, nodeB;
  let spring;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.fill(0);

    nodeA = new Node(p.width / 2 + p.random(-50, 50), p.height / 2 + p.random(-50, 50));
    nodeB = new Node(p.width / 2 + p.random(-50, 50), p.height / 2 + p.random(-50, 50));

    nodeA.damping = 0.1;
    nodeB.damping = 0.1;

    spring = new Spring(nodeA, nodeB);
    spring.length = 100;
    spring.stiffness = 0.6;
    spring.damping = 0.3;

  };

  p.draw = () => {
    p.background(255);

    if(p.mouseIsPressed === true) {
      nodeA.x = p.mouseX;
      nodeA.y = p.mouseY;
    }

    spring.update();

    nodeA.update();
    nodeB.update();

    p.stroke(0, 130, 164);
    p.strokeWeight(4);
    p.line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);

    p.noStroke();
    p.fill(0);
    p.ellipse(nodeA.x, nodeA.y, 20, 20);
    p.ellipse(nodeB.x, nodeB.y, 20, 20);
  };


  p.keyPressed = () => {
    if (p.key === "s" || p.key === "S") p.saveCanvas(gd.timestamp(), "png");
  };

};

const myp5 = new p5(sketch);

export default myp5;
