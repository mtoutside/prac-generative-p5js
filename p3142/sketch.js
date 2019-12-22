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

  treemap = new gd.Treemap(1, 1, width - 3, height - 3, {sort: doSort, direction: rowDirection, paddong: 2, ignore: []});

  let subTreemaps = [];

  for(let i = 0; i < words.length; i++) {
    let w = words[i].toLowerCase();
    let index = w.length;
    if(index < 10) {
      let t = subTreemaps[index];
      if(t === undefined) {
        t = treemap.addTreemap(index);
        subTreemaps[index] = t;
      }
      t.addData(w);
    }
  }

  treemap.calculate();
}

function draw() {
  background(255);
  textAlign(CENTER, BASELINE);

  strokeWeight(1);

  for(let i = 0; i < treemap.items.length; i++) {
    let subTreemap = treemap.items[i];
    if(!subTreemap.ignored) {

      for(let j = 0; j < subTreemap.items.length; j++) {
        let item = subTreemap.items[j];

        noFill();
        stroke(0);
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
    }
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

  if (keyCode >= 49 && keyCode <= 57) {
    let num = keyCode - 48;
    let i = treemap.options.ignore.indexOf(num);
    if (i >= 0) {
      treemap.options.ignore.splice(i, 1);
    } else {
      treemap.options.ignore.push(num);
    }
    treemap.calculate();
    loop();
  }
  if (key == '0') {
    treemap.options.ignore = [];
    treemap.calculate();
    loop();
  }
}
