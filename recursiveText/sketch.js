// https://www.openprocessing.org/sketch/761901
// original takawo

'use strict';

let data;
data = ['A', 'B', 'C', 'D'];
function setup() {
	createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(255);
  separateGrid(0, 0, width);
  frameRate(1);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;

  for(let i = x; i < x + d - 1; i += w) {
    for(let j = y; j < y + d - 1; j += w) {
      if(random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        textSize(w);
        textAlign(CENTER, CENTER);
        let str = data[int(random(Object.keys(data).length))];
        text(str, i + w / 2, j + w / 2 + w / 8);
      }
    }
  }
}

