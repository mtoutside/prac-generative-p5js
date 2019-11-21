'use strict';

let textTyped = 'let type here';
let fontSizes = [textTyped.length];
let minFontSize = 15;
let maxFontSize = 800;
let newFontSize = 0;

let pMillis = 0;
let maxTimeDelta = 5000.0;

let spacing = 2;
let tracking = 0;
let font;

function setup() {
  createCanvas(windowWidth, windowHeight);

  font = 'Arial';

  noCursor();
  noStroke();

  for(let i = 0; i < textTyped.length; i++) {
    fontSizes[i] = minFontSize;
  }
}

function draw() {
  background(255);
  textAlign(LEFT);
  fill(0);

  spacing = map(mouseY, 0, height, 0, 120);
  translate(0, 200 + spacing);

  let x = 0;
  let y = 0;
  let fontSize = 20;

  for(let i = 0; i < textTyped.length; i++) {
    fontSize = fontSizes[i];
    textFont(font, fontSize);
    let letter = textTyped.charAt(i);
    let letterWidth = textWidth(letter) + tracking;

    if(x + letterWidth > width) {
      x = 0;
      y += spacing;
    }

    text(letter, x, y);
    x += letterWidth;
  }

  let timeDelta = millis() - pMillis;
  newFontSize = map(timeDelta, 0, maxTimeDelta, minFontSize, maxFontSize);
  newFontSize = min(newFontSize, maxFontSize);

  fill(200, 30, 40);
  if(int(frameCount / 10) % 2 === 0) fill(255);
  rect(x, y, newFontSize / 2, newFontSize / 20);
}

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
}
function keyTyped() {
  if(keyCode >= 32) {
    textTyped += key;
    fontSizes.push(newFontSize);
  } else if(keyCode === BACKSPACE || keyCode === DELETE) {
    if(textTyped.length > 0) {
      textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
      fontSizes.pop();
    }
  }

  pMillis = millis();
}
