"use strict";

let emojiNames;
let counter = 0;
let imgSize = 72;
let results = {};

let emojisPath = '../p4341/data/twemoji/';

function preload() {
  emojiNames = loadTable('data/emoji-names.csv', 'csv', 'header');
}

function setup() {
  createCanvas(imgSize, imgSize);
  print(emojiNames.getRowCount);
}

function draw() {
  if (counter >= emojiNames.getRowCount()) {
    saveJSON(results, 'emoji-average-colors.json');
    print('done');
    noLoop();
    return;
  }

  noLoop();
  let currentEmoji = emojiNames.getString(counter, 0);
  print(currentEmoji);
  loadImage(`${emojisPath}72x72/${currentEmoji}.png`, (img) => {
    clear();
    image(img, 0, 0);
    loadPixels();
    let rgb = { r: 0, g: 0, b: 0 };
    let pixCounter = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) continue;
      rgb.r += pixels[i];
      rgb.g += pixels[i + 1];
      rgb.b += pixels[i + 2];
      pixCounter++;
    }
    rgb.r = ~~(rgb.r / pixCounter);
    rgb.g = ~~(rgb.g / pixCounter);
    rgb.b = ~~(rgb.b / pixCounter);

    results[currentEmoji] = {};
    results[currentEmoji].averageColor = rgb;

    counter++;
    loop();
  });
}
