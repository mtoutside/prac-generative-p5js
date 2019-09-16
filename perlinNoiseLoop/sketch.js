'use strict';

let slider;
let phase = 0;
let zoff = 0;

function setup() {
  createCanvas(600, 600);
  slider = createSlider(0, 10, 0, 0.1);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  noFill();
  let noiseMax = slider.value();
  beginShape();
  for(let a= 0; a < TWO_PI; a+= 0.03) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0 , noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, 200);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  zoff += 0.1;
  phase+= 0.05;
}
