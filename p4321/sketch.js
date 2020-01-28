"use strict";

const inputText = 'All the world\'s a stage, And all the men and women merely players; They have their exits and their entrances; And one man in his time plays many parts, His acts being seven ages. At first the infant, Mewling and puking in the nurse\'s arms; Then the whining school-boy, with his satchel And shining morning face, creeping like snail Unwillingly to school. And then the lover, Sighing like furnace, with a woeful ballad Made to his mistress\' eyebrow. Then a soldier, Full of strange oaths, and bearded like the pard, Jealous in honour, sudden and quick in quarrel, Seeking the bubble reputation Even in the cannon\'s mouth. And then the justice, In fair round belly with good capon lin\'d, With eyes severe and beard of formal cut, Full of wise saws and modern instances; And so he plays his part. The sixth age shifts Into the lean and slipper\'d pantaloon, With spectacles on nose and pouch on side, His youthful hose, well sav\'d, a world too wide For his shrunk shank; and his big manly voice, Turning again toward childish treble, pipes And whistles in his sound. Last scene of all, That ends this strange eventful history, Is second childishness and mere oblivion; Sans teeth, sans eyes, sans taste, sans every thing.';

let fontSizeMax = 20;
let fontSizeMin = 10;
let spacing = 12;
let kerning = 0.5;

let fontSizeStatic = false;
let blackAndWhite = false;

let img;

function preload() {
  img = loadImage("data/pic.png");
}
function setup() {
  createCanvas(533, 796);
  textFont('Times');
  textSize(10);
  textAlign(LEFT, CENTER);
  print(`${img.width} ・ ${img.height}`);
}

function draw() {
  background(255);

  let x = 0;
  let y = 10;
  let counter = 0;

  while (y < height) {
    img.loadPixels();

    let imgX = round(map(x, 0, width, 0, img.width));
    let imgY = round(map(y, 0, height, 0, img.height));
    let c = color(img.get(imgX, imgY));
    let greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue + blue(c) * 0.071);

    push();
    translate(x, y);

    if (fontSizeStatic) {
       textSize(fontSizeMax);
      if (blackAndWhite) {
         fill(greyscale);
      } else {
        fill(c);
      }
    } else {
      let fontSize = map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
      fontSize = max(fontSize, 1);
      textSize(fontSize);
      if (blackAndWhite) {
         fill(0);
      } else {
        fill(c);
      }
    }

    let letter = inputText.charAt(counter);
    text(letter, 0, 0);
    let letterWidth = textWidth(letter) + kerning;
    x += letterWidth;

    pop();

    if (x + letterWidth >= width) {
      x = 0;
      y += spacing;
    }

    counter++;
    if (counter >= inputText.length) {
      counter = 0;
    }
  }
  noLoop();
}

function keyReleased() {
  if (key === "s" || key === "S") saveCanvas(gd.timestamp(), "png");

  // change draw mode
  if (key === '1') fontSizeStatic = !fontSizeStatic;
  if (key === '2') blackAndWhite = !blackAndWhite;
  print(`fontSizeMin: ${fontSizeMin}, fontSizeMax: ${fontSizeMax}, fontSizeStatic: ${fontSizeStatic}, blackAndWhite: ${blackAndWhite}`);
  loop();
}

function keyPressed() {
  // change fontSizeMax with arrow keys up/down
  if (keyCode === UP_ARROW) fontSizeMax += 2;
  if (keyCode === DOWN_ARROW) fontSizeMax -= 2;
  // change fontSizeMin with arrow keys left/right
  if (keyCode === RIGHT_ARROW) fontSizeMin += 2;
  if (keyCode === LEFT_ARROW) fontSizeMin -= 2;
  loop();
}
