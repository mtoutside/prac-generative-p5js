import myp5 from './sketch.js';
import Node from './Node.js';

export default class Spring {
  constructor(fromNode, toNode, length, stiffness, damping) {
    this.fromNode = fromNode;
    this.toNode = toNode;

    this.length = length || 100;
    this.stiffness = stiffness || 0.6;
    this.damping = damping || 0.9;
  }

  update() {
    console.log(this.toNode);
    console.log(this.fromNode);
    let diff = p5.Vector.sub(this.toNode, this.fromNode);
    // diff.normalize();
    // diff.mult(this.length);
    // let target = p5.Vector.add(this.fromNode, diff);
    //
    // let force = p5.Vector.sub(target, this.toNode);
    // force.mult(0.5);
    // force.mult(this.stiffness);
    // force.mult(1 - this.damping);
    //
    // this.toNode.velocity.add(force);
    // this.fromNode.velocity.add(p5.Vector.mult(force, -1));
  }
}
