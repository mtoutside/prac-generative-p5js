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

	for(let gridY = 0; gridY < tileCount; gridY++) {
		for(let gridX = 0; gridX < tileCount; gridX++) {
      let posX = width / tileCount * gridX;
      let posY = height / tileCount * gridY;


      fill(moduleColorForeground);
      ellipse(posX, posY, moduleRadiusForeground, moduleRadiusForeground);
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
  if(key == '2') {
    if(colorsEqual(moduleColorForeground, color(360, 100, 100, moduleAlphaForeground))) {
      moduleColorForeground = color(323, 100, 77, moduleAlphaForeground);
    } else {
      moduleColorForeground = color(360, 100, 100, moduleAlphaForeground);
    }
  }

  if(key == '3') {
    if(moduleAlphaBackground == 100) {
      moduleAlphaBackground = 50;
      moduleAlphaForeground = 50;
    } else {
      moduleAlphaBackground = 100;
      moduleAlphaForeground = 100;
    }

    moduleColorBackground = color(
      hue(moduleColorForeground),
      saturation(moduleColorForeground),
      brightness(moduleColorBackground),
      moduleAlphaBackground
    );
    moduleColorForeground = color(
      hue(moduleColorForeground),
      saturation(moduleColorForeground),
      brightness(moduleColorForeground),
      moduleAlphaForeground
    );
  }

  if(key == '0') {
    moduleRadiusBackground = 30;
    moduleRadiusForeground = 15;
    moduleAlphaBackground = 100;
    moduleAlphaForeground = 100;
    moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
    moduleColorForeground = color(0, 0, 100, moduleAlphaForeground);
  }

  if(keyCode == UP_ARROW) moduleRadiusBackground += 2;
  if(keyCode == DOWN_ARROW) moduleRadiusForeground = max(moduleRadiusBackground - 2, 10);
  if(keyCode == LEFT_ARROW) moduleRadiusForeground = max(moduleRadiusForeground - 2, 5);
  if(keyCode == RIGHT_ARROW) moduleRadiusForeground += 2;
}

function colorsEqual(col1, col2) {
  return col1.toString() == col2.toString();
}
