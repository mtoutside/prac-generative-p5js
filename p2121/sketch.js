'use strict';

let tileCount = 10;
let actRandomSeed = 0;

let circleAlpha = 130;
let circleColor;


function setup() {
	createCanvas(600, 600);
  noFill();
  circleColor = color(0, 0, 0, circleAlpha);
}

function draw() {
  translate(width / tileCount / 2, height / tileCount / 2);

  background(255);

  randomSeed(actRandomSeed);

  stroke(circleColor);
  strokeWeight(mouseY / 60);

	for(let gridY = 0; gridY < tileCount; gridY++) {
		for(let gridX = 0; gridX < tileCount; gridX++) {
      let posX = width / tileCount * gridX;
      let posY = height / tileCount * gridY;

      let shiftX = random(-mouseX, mouseX) / 20;
      let shiftY = random(-mouseX, mouseX) / 20;

      ellipse(posX + shiftX, posY + shiftY, mouseY / 15, mouseY / 15);
		}
	}
}

function mousePressed() {
  actRandomSeed = random(100000);
}
