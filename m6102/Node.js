import myp5 from './sketch.js';

class VectorObj {
  constructor() {
    VectorObj.prototype = Object.create(p5.Vector.prototype);
  }
}

export default class Node extends VectorObj {
  constructor(x, y, minX, maxX, minY, maxY) {
    super();
    p5.Vector.call(this, x, y, 0);
    this.minX = Number.MIN_VALUE || minX;
    this.maxX = Number.MAX_VALUE || maxX;
    this.minY = Number.MIN_VALUE || minY;
    this.maxY = Number.MAX_VALUE || maxY;
    this.radius = 200;
    this.ramp = 1;
    this.strength = -1;
    this.damping = 0.5;
    this.velocity = myp5.createVector();
    this.pVelocity = myp5.createVector();
    this.maxVelocity = 10;

    // this.__proto__ = Object.create(p5.Vector.prototype);
  }


  attractNodes(nodeArray) {
    for(let i = 0; i < nodeArray.length; i++) {
      let otherNode = nodeArray[i]; 
      if(otherNode === undefined) break;
      if(otherNode === this) continue;

      this.attract(otherNode);
    }
  }

  attract(otherNode) {
    let thisNodeVector = myp5.createVector(this.x, this.y);
    let otherNodeVector = myp5.createVector(otherNode.x, otherNode.y);
    let d = thisNodeVector.dist(otherNodeVector);

    if(d > 0 && d < this.radius) {
      let s = myp5.pow(d / this.radius, 1 / this.ramp);
      let f = s * 9 * this.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
      let df = thisNodeVector.sub(otherNodeVector);
      df.mult(f);

      otherNode.velocity.x += df.x;
      otherNode.velocity.y += df.y;
    }
  }

  update() {
    this.velocity.limit(this.maxVelocity);

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(this.x < this.minX) {
      this.x = this.minX - (this.x - this.minX);
      this.velocity.x = -this.velocity.x;
    }
    if(this.x > this.maxX) {
      this.x = this.maxX - (this.x - this.maxX);
      this.velocity.x = -this.velocity.x;
    }

    if(this.y < this.minY) {
      this.y = this.minY - (this.y - this.minY);
      this.velocity.y = -this.velocity.y;
    }
    if(this.y > this.maxY) {
      this.y = this.maxY - (this.y - this.maxY);
      this.velocity.y = -this.velocity.y;
    }

    this.velocity.mult(1 - this.damping);
  }
}
