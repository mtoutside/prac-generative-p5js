'use strict';

let textTyped = '';
let font;

let shapeSpace;
let shapeSpace2;
let shapePeriod;
let shapeComma;
let shapeExclamationmark;
let shapeQuestionmark;
let shapeReturn;

let centerX;
let centerY;
let offsetX;
let offsetY;
let zoom;

let actRandomSeed;

function preload() {
  font = loadFont('data/miso-bold.ttf');
  shapeSpace = loadImage('data/space.svg');
  shapeSpace2 = loadImage('data/space2.svg');
  shapePeriod = loadImage('data/period.svg');
  shapeComma = loadImage('data/comma.svg');
  shapeExclamationmark = loadImage('data/exclamationmark.svg');
  shapeQuestionmark = loadImage('data/questionmark.svg');
  shapeReturn = loadImage('data/return.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textTyped += 'Ich bin der Musikant mit Taschenrechner in der Hand!\n\n';
  textTyped += 'Ich addiere\n';
  textTyped += 'Und subtrahiere, \n\n';
  textTyped += 'Kontrolliere\nUnd komponiere\nUnd wenn ich diese Taste drück,\nSpielt er ein kleines Musikstück?\n\n';

  textTyped += 'Ich bin der Musikant mit Taschenrechner in der Hand!\n\n';
  textTyped += 'Ich addiere\n';
  textTyped += 'Und subtrahiere, \n\n';
  textTyped += 'Kontrolliere\nUnd komponiere\nUnd wenn ich diese Taste drück,\nSpielt er ein kleines Musikstück?\n\n';


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

  for(let i = 0; i < textTyped.length; i++) {
    let letter = textTyped.charAt(i);
    let letterWidth = textWidth(letter);

    switch(letter) {
      case ' ':
        let dir = floor(random(0, 2));
        if(dir === 0) {
          image(shapeSpace, 1, -15);
          translate(4, 1);
          rotate(QUARTER_PI);
        }
        if(dir === 1) {
          image(shapeSpace2, 1, -15);
          translate(14, -5);
          rotate(-QUARTER_PI);
        }
        break;

    case ',':
        image(shapeComma, 1, -15);
        translate(35, 15);
        rotate(QUARTER_PI);
        break;

    case '.':
        image(shapePeriod, 1, -55);
        translate(56, -56);
        rotate(-HALF_PI);
        break;

    case '!':
        image(shapeExclamationmark, 1, -27);
        translate(42.5, -17.5);
        rotate(-QUARTER_PI);
        break;

    case '?':
        image(shapeQuestionmark, 1, -27);
        translate(42.5, -17.5);
        rotate(-QUARTER_PI);
        break;

    case '\n':
        image(shapeReturn, 1, -15);
        translate(1, 10);
        rotate(PI);
        break;

    default:
        text(letter, 0, 0);
        translate(letterWidth, 0);
    }
  }

  if(frameCount / 6 % 2 === 0) rect(0, 0, 15, 2);
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
