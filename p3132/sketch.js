'use strict';

let joinedText;
let alphabet;
let drawLetters = [];

let posX;
let posY;

let drawLines = false;
let drawText = true;

function preload() {
  joinedText = loadStrings('data/faust_kurz.txt');
}

function setup() {
  createCanvas(620, windowHeight);

  textFont('monospace', 18);
  fill(87, 35, 129);

  joinedText = joinedText.join(' ');
  alphabet = getUniqCharacters();
  for(let i = 0; i < alphabet.length; i++) {
    drawLetters[i] = true;
  }
}

function draw() {
  background(255);

  posX = 20;
  posY = 40;
  let oldX = 0;
  let oldY = 0;

  for(let i = 0; i < joinedText.length; i++) {
    let upperCaseChar = joinedText.charAt(i).toUpperCase();
    let index = alphabet.indexOf(upperCaseChar);
    if(index < 0) continue;

    let sortY = index * 20 + 40;
    let m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);
    let interY = lerp(posY, sortY, m);

    if(drawLetters[index]) {
      if(drawLines) {
        if(oldX !== 0 && oldY !== 0) {
          stroke(181, 157, 0, 100);
          line(oldX, oldY, posX, interY);
        }
        oldX = posX;
        oldY = interY;
      }

      if(drawText) {
        noStroke();
        text(joinedText.charAt(i), posX, interY);
      }
    } else {
      oldX = 0;
      oldY = 0;
    }

    posX += textWidth(joinedText.charAt(i));
    if(posX >= width - 200 && upperCaseChar === ' ') {
      posY += 30;
      posX = 20;
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

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key === '1') drawLines = !drawLines;
  if (key === '2') drawText = !drawText;
  if (key === '3') {
    for(let i = 0; i < alphabet.length; i++) {
      drawLetters[i] = false;
    }
  }
  if (key === '4') {
    drawText = true;
    for(let i = 0; i < alphabet.length; i++) {
      drawLetters[i] = true;
    }
  }

  let index = alphabet.indexOf(key.toUpperCase());
  if(index >= 0) {
    drawLetters[index] = !drawLetters[index];
  }
}
