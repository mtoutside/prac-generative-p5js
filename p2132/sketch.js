'use strict';

let count = 10;
let colorStep = 20;
let lineWeight = 0;
let strokeColor = 0;
let backgroundColor = 0;

let actRandomSeed = 0;
let drawMode = 1;

let toggle;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(backgroundColor);
  randomSeed(actRandomSeed);

  let tileCountX = mouseX / 30 + 1;
  let tileCountY = mouseY / 30 + 1;
  let tileWidth = width / tileCountX;
  let tileHeight = height / tileCountY;


	for(let gridY = 0; gridY < tileCountY; gridY++) {
		for(let gridX = 0; gridX < tileCountX; gridX++) {
      let posX = tileWidth * gridX;
      let posY = tileHeight * gridY;

      let x1 = tileWidth / 2;
      let y1 = tileHeight / 2;
      let x2 = 0;
      let y2 = 0;

      push();
      translate(posX, posY);


      // random rotation
      toggle = int(random(0, 4));
      randomRotate(toggle);

      for(let side = 0; side < 4; side++) {
        for(let i = 0; i < count; i++) {
          switch(side) {
            case 0:
              x2 += tileWidth / count;
              y2 = 0;
              break;
            case 1:
              x2 = tileWidth;
              y2 += tileHeight / count;
              break;
            case 2:
              x2 -= tileWidth / count;
              y2 = tileHeight;
              break;
            case 3:
              x2 = 0;
              y2 -= tileHeight / count;
              break;
          }

          if(i < count / 2) {
            lineWeight += 1;
            strokeColor += 60;
          } else {
            lineWeight -= 1;
            strokeColor -= 60;
          }

          switch(drawMode) {
            case 1:
              backgroundColor = 255;
              stroke(0);
              break;
            case 2:
              backgroundColor = 255;
              stroke(0);
              strokeWeight(lineWeight);
              break;
            case 3:
              backgroundColor = 0;
              stroke(strokeColor);
              strokeWeight(mouseX / 100);
              break;
          }

          line(x1, y1, x2, y2);
        }
      }
      pop();
    }
	}
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function randomRotate(toggle) {
  if(toggle === 0) return rotate(-HALF_PI);
  if(toggle === 1) return rotate(0);
  if(toggle === 2) return rotate(HALF_PI);
  if(toggle === 3) return rotate(PI);
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
  if (key == '3') drawMode = 3;
}
