'use strict';

let joinedText;
let alphabet = 'ABCDEFGHIJKLMNORSTUVWYZÄÖÜß,.;!? ';
let counters = [];

let posX;
let posY;

let drawAlpha = true;

function preload() {
  joinedText = loadStrings('data/faust_kurz.txt');
}

function setup() {
  createCanvas(620, windowHeight);

  noStroke();
  textFont('monospace', 18);

  joinedText = joinedText.join(' ');

  for(let i = 0; i < alphabet.length; i++) {
    counters[i] = 0;
  }

  countCharacters();
}

function draw() {
  background(255);

  posX = 20;
  posY = 40;

  for(let i = 0; i < joinedText.length; i++) {
    let upperCaseChar = joinedText.charAt(i).toUpperCase();
    let index = alphabet.indexOf(upperCaseChar);
    if(index < 0) continue;

    if(drawAlpha) {
      fill(87, 35, 129, counters[index] * 3);
    } else {
      fill(87, 35, 129);
    }

    let sortY = index * 20 + 40;
    let m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);
    let interY = lerp(posY, sortY, m);

    text(joinedText.charAt(i), posX, interY);

    posX += textWidth(joinedText.charAt(i));
    if(posX >= width - 200 && upperCaseChar == ' ') {
      posY += 30;
      posX = 20;
    }
  }
}

function countCharacters() {
  for(let i = 0; i < joinedText.length; i++) {
    let c = joinedText.charAt(i);
    let upperCaseChar = c.toUpperCase();
    let index = alphabet.indexOf(upperCaseChar);
    if(index >= 0) counters[index]++;
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
  if (key == 'a' || key == 'A') drawAlpha = !drawAlpha;
}
