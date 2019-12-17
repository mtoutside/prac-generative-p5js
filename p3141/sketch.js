'use strict';

let joinedText;
let treemap;
let font;
let doSort = true;
let rowDirection = 'both';

function preload() {
  font = loadFont('data/miso-bold.ttf');
  joinedText = loadStrings('data/pride_and_prejudice.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  joinedText = joinedText.join(' ');

  let words = joinedText.match(/\w+/g);

  treemap = new gd.Treemap(1, 1, width - 3, height - 3, {sort: doSort, direction: rowDirection});

  for(let i = 0; i < words.length; i++) {
    let w = words[i].toLowerCase();
    treemap.addData(w);
  }

  treemap.calculate();
}

function draw() {
  background(255);
  textAlign(CENTER, BASELINE);

  for(let i = 0; i < treemap.items.length; i++) {
    let item = treemap.items[i];

    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(item.x, item.y, item.w, item.h);

    let word = item.data;
    textFont(font, 100);
    let textW = textWidth(word);
    let fontSize = 100 * (item.w * 0.9) / textW;
    fontSize = min(fontSize, (item.h * 0.9));
    textFont(font, fontSize);

    fill(0);
    noStroke();
    text(word, item.x + item.w / 2, item.y + item.h * 0.8);
  }

  noLoop();
}

function keyTyped() {
  if (key === 's' || key === 'S') saveCanvas(gd.timestamp(), 'png');

  if (key === 'r' || key === 'R') {
    doSort = !doSort;
    treemap.options.sort = doSort;
    treemap.calculate();
    loop();
  }

  if (key === 'h' || key === 'H') {
    rowDirection = 'horizontal';
    treemap.options.direction = rowDirection;
    treemap.calculate();
    loop();
  }

  if (key === 'v' || key === 'V') {
    rowDirection = 'vertical';
    treemap.options.direction = rowDirection;
    treemap.calculate();
    loop();
  }

  if (key === 'b' || key === 'B') {
    rowDirection = 'both';
    treemap.options.direction = rowDirection;
    treemap.calculate();
    loop();
  }
}
