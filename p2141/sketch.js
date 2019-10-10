'use strict';

let img, img1, img2, img3;
let slider;
let cols = 40;
let rows = 40;
let boxes;
let boxHolder;

function preload() {
  img1 = loadImage('data/shapes.png');
  img2 = loadImage('data/draw.png');
  img3 = loadImage('data/toner.png');
}
function setup() {
  noCanvas();
  pixelDensity(1);
  boxHolder = createDiv('');
  boxHolder.id('mirror');

  boxes = [];

  img = img1;
  img.resize(cols, rows);
  img.loadPixels();

  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      let box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    let linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }

  slider = createSlider(0, 255, 0);
  slider.style('margin', '20px');
}

function draw() {
	for(let y = 0; y < img.height; y++) {
		for(let x = 0; x < img.height; x++) {
      let c = color(img.get(x, y));
      let bright = (red(c) + green(c) + blue(c)) / 3;

      let threshold = slider.value();
      let checkIndex = x + y * cols;

      if(bright > threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
}

function keyReleased() {
  if (key == '1') img = img1;
  if (key == '2') img = img2;
  if (key == '3') img = img3;

  img.resize(cols, rows);
  img.loadPixels();
}
