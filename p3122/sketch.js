'use strict';

let textTyped = 'Was hier folgt ist Tet! So asnt, und mag. Ich mag Tet sehr.';
let font;

let shapeSpace;
let shapeSpace2;
let shapePeriod;
let shapeComma;
let shapeExclamationmark;
let shapeQuestionmark;
let shapeReturn;
let icon1;
let icon2;
let icon3;
let icon4;
let icon5;

let centerX;
let centerY;
let offsetX;
let offsetY;
let zoom;

let actRandomSeed;

var palette = [
  [253, 195, 0],
  [0, 0, 0],
  [0, 158, 224],
  [99, 33, 129],
  [121, 156, 19],
  [226, 0, 26],
  [224, 134, 178]
];

let actColorIndex = 0;

function preload() {
  font = loadFont('data/miso-bold.ttf');
  shapeSpace = loadImage('data/space.svg');
  shapeSpace2 = loadImage('data/space2.svg');
  shapePeriod = loadImage('data/period.svg');
  shapeComma = loadImage('data/comma.svg');
  shapeExclamationmark = loadImage('data/exclamationmark.svg');
  shapeQuestionmark = loadImage('data/questionmark.svg');
  shapeReturn = loadImage('data/return.svg');

  icon1 = loadImage('data/icon1.svg');
  icon2 = loadImage('data/icon2.svg');
  icon3 = loadImage('data/icon3.svg');
  icon4 = loadImage('data/icon4.svg');
  icon5 = loadImage('data/icon5.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  centerX = width / 2;
  centerY = height / 2;
  offsetX = 0;
  offsetY = 0;
  zoom = 0.75;

  actRandomSeed = 6;

  cursor(HAND);
  textFont(font, 25);
  textAlign(LEFT, BASELINE);
  noStroke();
  fill(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  background(255);

  if(mouseIsPressed && mouseButton == LEFT) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  randomSeed(actRandomSeed);

  translate(centerX, centerY);
  scale(zoom);

  push();

  actColorIndex = 0;
  fill(palette[actColorIndex][0], palette[actColorIndex][1], palette[actColorIndex][2]);
  rect(0, -25, 10, 35);

  for(let i = 0; i < textTyped.length; i++) {
    let letter = textTyped.charAt(i);
    let letterWidth = textWidth(letter);

    switch(letter) {
      case ' ':
        let dir = floor(random(5));
        if(dir === 0) {
          image(shapeSpace, 0, -15);
          translate(2, 0);
          rotate(QUARTER_PI);
        }
        if(dir === 1) {
          image(shapeSpace2, 0, -15);
          translate(13, -5);
          rotate(-QUARTER_PI);
        }
        break;

    case ',':
        image(shapeComma, 0, -15);
        translate(35, 15);
        rotate(QUARTER_PI);
        break;

    case '.':
        image(shapePeriod, 0, -56);
        translate(56, -56);
        rotate(-HALF_PI);
        break;

    case '!':
        image(shapeExclamationmark, 0, -30);
        translate(43, -18);
        rotate(-QUARTER_PI);
        break;

    case '?':
        image(shapeQuestionmark, 1, -30);
        translate(43, -18);
        rotate(-QUARTER_PI);
        break;

    case '\n':
        rect(0, -25, 10, 35);
        pop();
        push();
        translate(random(-300, 300), random(-300, 300));
        rotate(floor(random(8)) * QUARTER_PI);
        actColorIndex = (actColorIndex + 1) % palette.length;
        fill(palette[actColorIndex][0], palette[actColorIndex][1], palette[actColorIndex][2]);
        rect(0, -25, 10, 35);
        break;

    case 'o':
        rect(0, -15, letterWidth + 1, 15);
        push();
        fill(0);
        let station = textTyped.substring(i - 10, i - 1);
        station = station.toLowerCase();
        station = station.replace(/\s+/g, '');
        station = station.substring(0, 1).toUpperCase() + station.substring(1, station.length - 1);
        text(station, -10, 40);
        ellipse(-5, -7, 33, 33);
        fill(255);
        ellipse(-5, -7, 25, 25);
        pop();
        translate(letterWidth, 0);
        break;

    case 'a':
        rect(0, 0 - 15, letterWidth + 1, 25);
        rect(0, 0 - 15, letterWidth + 1, 15);
        translate(letterWidth, 0);
        break;

    case 'u':
        rect(0, 0 - 25, letterWidth + 1, 25);
        rect(0, 0 - 15, letterWidth + 1, 15);
        translate(letterWidth, 0);
        break;

    case ':':
        image(icon1, 0, -60, 30, 30);
        break;

    case '+':
        image(icon2, 0, -60, 35, 30);
        break;

    case '-':
        image(icon3, 0, -60, 30, 30);
        break;

    case 'x':
        image(icon4, 0, -60, 30, 30);
        break;

    case 'z':
        image(icon5, 0, -60, 30, 30);
        break;

    default:
        rect(0, -15, letterWidth + 1, 15);
        translate(letterWidth, 0);
    }
  }

  fill(200, 30, 40);
  if(frameCount / 6 % 2 === 0) rect(0, 0, 15, 2);

  pop();
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}
function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode === ALT) actRandomSeed++;
}

function keyPressed() {
  switch(keyCode) {
    case DELETE:
    case BACKSPACE:
      textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
      print(textTyped);
      break;
    case ENTER:
    case RETURN:
      textTyped += '\n';
      break;
    case UP_ARROW:
      zoom += 0.05;
      break;
   case DOWN_ARROW:
      zoom -= 0.05;
      break;
  }
}

function keyTyped() {
  if(keyCode >= 32) {
    textTyped += key;
    print(textTyped);
  }
}
