'use strict';

let joinedText;
let charSet;
let counters = [];

let posX;
let posY;
let tracking = 29;

let actRandomSeed = 0;

let drawAlpha = true;
let drawLines = true;
let drawEllipses = true;
let drawText = false;

function preload() {
  joinedText = loadStrings('data/faust_short.txt');
}

function setup() {
  createCanvas(1400, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  textFont('monospace', 20);
  noStroke();

  joinedText = joinedText.join(joinedText, ' ');
  charSet = getUniqCharacters();
  for(let i = 0; i < charSet.length; i++) {
    counters[i] = 0;
  }

  countCharacters();
}

function draw() {
  background(360);

  posX = 80;
  posY = 300;
  randomSeed(actRandomSeed);

  for(let i = 0; i < joinedText.length; i++) {
    let upperCaseChar = joinedText.charAt(i).toUpperCase();
    let index = charSet.indexOf(upperCaseChar);
    if(index < 0) continue;

    let charAlpha = 100;
    if(drawAlpha) {
      charAlpha = counters[index];
    }

    let my = map(mouseY, 50, height - 50, 0 ,1);
    my = constrain(my, 0, 1);
    let charSize = counters[index] * my * 3;

    let mx = map(mouseX, 50, width - 50, 0, 1);
    mx = constrain(mx, 0, 1);
    let lineLength = charSize;
    let lineAngle = random(-PI, PI) * mx - HALF_PI;
    let newPosX = lineLength * cos(lineAngle);
    let newPosY = lineLength * sin(lineAngle);

    push();
    translate(posX, posY);
    stroke(273, 73, 51, charAlpha);
    if(drawLines) {
      line(0, 0, newPosX, newPosY);
    }
    noStroke();
    fill(52, 100, 71, charAlpha);
    if(drawLines) {
      line(0, 0, newPosX, newPosY);
    }
    noStroke();
    fill(52, 100, 71, charAlpha);
    if(drawEllipses) {
      ellipse(0, 0, charSize / 10, charSize / 10);
    }
    if(drawText) {
      fill(0, charAlpha);
      text(joinedText.charAt(i), newPosX, newPosY);
    }
    pop();

    posX += textWidth(joinedText.charAt(i));
    if(posX >= width - 200 && upperCaseChar === ' ') {
      posY += int(tracking * my + 30);
      posX = 80;
    }
  }
}

function getUniqCharacters() {
  let charsArray = joinedText.toUpperCase().split('');
  let uniqCharsArray = charsArray.filter((char, index) => {
    return charsArray.indexOf(char) == index;
  }).sort();
  return uniqCharsArray.join('');
}

function countCharacters() {
  for(let i = 0; i < joinedText.length; i++) {
    let index = charSet.indexOf(joinedText.charAt(i).toUpperCase());
    if(index >= 0) counters[index]++;
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key === '1') drawAlpha = !drawAlpha;
  if (key === '2') drawLines = !drawLines;
  if (key === '3') drawEllipses = !drawEllipses;
  if (key === '4') drawText = !drawText;
}
