'use strict';

let tileCountX = 50;
let tileCountY = 10;

let hueValues = [];
let saturationValues = [];
let brightnessValues = [];

function setup() {
 createCanvas(windowWidth, windowHeight);
 noStroke();
 colorMode(HSB, 360, 100, 100, 100);

 for(let i = 0; i < tileCountX; i++) {
	hueValues[i] = random(360);
	saturationValues[i] = random(100);
	brightnessValues[i] = random(100);
 }
}

function draw() {
 background(0, 0, 100);
 let mX = constrain(mouseX, 0, width);
 let mY = constrain(mouseY, 0, height);
 let counter = 0;

 let currenttileCountX = int(map(mX, 0, width, 1, tileCountX));
 let currenttileCountY = int(map(mY, 0, height, 1, tileCountY));
 let tileWidth = width / currenttileCountX;
 let tileHeight = height / currenttileCountY;

 for(let gridY = 0; gridY < tileCountY; gridY++) {
	for(let gridX = 0; gridX < tileCountX; gridX++) {
	 let posX = tileWidth * gridX;
	 let posY = tileHeight * gridY;
	 let index = counter % currenttileCountX;

	 fill(hueValues[index], saturationValues[index], brightnessValues[index]);
	 rect(posX, posY, tileWidth, tileHeight);
	 counter++;
	}
 }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    // -- save an ase file (adobe swatch export) --
    var colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }

  if (key == '1') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(360);
      saturationValues[i] = random(100);
      brightnessValues[i] = random(100);
    }
  }

  if (key == '2') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(360);
      saturationValues[i] = random(100);
      brightnessValues[i] = 100;
    }
  }

  if (key == '3') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(360);
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    }
  }

  if (key == '4') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 0;
      saturationValues[i] = 0;
      brightnessValues[i] = random(100);
    }
  }

  if (key == '5') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 195;
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    }
  }

  if (key == '6') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 195;
      saturationValues[i] = random(100);
      brightnessValues[i] = 100;
    }
  }

  if (key == '7') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(180);
      saturationValues[i] = random(80, 100);
      brightnessValues[i] = random(50, 90);
    }
  }

  if (key == '8') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = random(180, 360);
      saturationValues[i] = random(80, 100);
      brightnessValues[i] = random(50, 90);
    }
  }

  if (key == '9') {
    for (var i = 0; i < tileCountX; i++) {
      if (i % 2 == 0) {
        hueValues[i] = random(360);
        saturationValues[i] = 100;
        brightnessValues[i] = random(100);
      } else {
        hueValues[i] = 195;
        saturationValues[i] = random(100);
        brightnessValues[i] = 100;
      }
    }
  }

  if (key == '0') {
    for (var i = 0; i < tileCountX; i++) {
      if (i % 2 == 0) {
        hueValues[i] = 140;
        saturationValues[i] = random(30, 100);
        brightnessValues[i] = random(40, 100);
      } else {
        hueValues[i] = 210;
        saturationValues[i] = random(40, 100);
        brightnessValues[i] = random(50, 100);
      }
    }
  }
}
