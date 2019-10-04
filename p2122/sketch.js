'use strict';

let tileCount = 10;
let actRandomSeed = 0;

let moduleColorBackground;
let moduleColorForeground;

let moduleAlphaBackground = 100;
let moduleAlphaForeground = 100;

let moduleRadiusBackground = 30;
let moduleRadiusForeground = 15;

let backgroundColor;

function setup() {
	createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
  moduleColorForeground = color(0, 0, 100, moduleAlphaForeground);

  backgroundColor = color(0, 0, 100);
}

function draw() {
  translate(width / tileCount / 2, height / tileCount / 2);

  background(backgroundColor);

  randomSeed(actRandomSeed);

	for(let gridY = 0; gridY < tileCount; gridY++) {
		for(let gridX = 0; gridX < tileCount; gridX++) {
      let posX = width / tileCount * gridX;
      let posY = height / tileCount * gridY;

      let shiftX = random(-1, 1) * mouseX / 20;
      let shiftY = random(-1, 1) * mouseY / 20;

      fill(moduleColorBackground);
      ellipse(posX + shiftX, posY + shiftY, moduleRadiusBackground, moduleRadiusBackground);
		}
	}
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {
  if(key == '1') {
    if(colorsEqual(moduleColorBackground, color(0, 0, 0, moduleAlphaBackground))) {
      moduleColorBackground = color(273, 73, 51, moduleAlphaBackground);
    } else {
      moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
    }
  }
}
