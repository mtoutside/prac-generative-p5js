'use strict';

let img;
const fontSizeMax = 13;
const fontSizeMin = 1;
const spacing = 4; // line height
const kerning = 0.2; // between letters

function preload() {
	img = loadImage('data/winner.jpg');
}
function setup() {
	const cnv = createCanvas(img.width * 5, img.height * 5);
	const target = document.querySelector('.titlearea');
	cnv.parent('wrapper');
	target.style.height = cnv.height;
	textAlign(LEFT, CENTER);

}

function draw() {
  background(255);
  
			img.loadPixels();
  
	let x = 0;
	let y = 5;
  // let mouseXFactor = map(mouseX, 0, width, 0, img.width);
  // let mouseYFactor = map(mouseY, 0, height, 0, img.height);

  let mouseXFactor = map(mouseX, 0, width, 0.05, 1);
  let mouseYFactor = map(mouseY, 0, height, 0.05, 1);

	// for(let gridX = 0; gridX < img.width; gridX++) {
	// 	for(let gridY = 0; gridY < img.height; gridY++) {
  //
	// 		let tileWidth = width / img.width;
	// 		let tileHeight = height / img.height;
	// 		let posX = tileWidth * gridX;
	// 		let posY = tileHeight * gridY;
  //
	// 		let c = color(img.get(gridX, gridY));
	// 		// greyscale conversion
	// 		var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);
  //
	// 		/* =================================================== */
	// 		let w1 = map(greyscale, 0, 255, 15, 0.1);
	// 		// stroke(0);
	// 		// strokeWeight(w1 * mouseXFactor);
	// 		// line(posX, posY, posX + random(2,5), posY + random(2, 5));
  //
	// 		/* =================================================== */
	// 		// greyscale to line relief
	// 		let w5 = map(greyscale, 0, 255, 5, 0.2);
	// 		// strokeWeight(w5 * mouseYFactor + 0.1);
	// 		// get neighbour pixel, limit it to image width
	// 		let c2 = color(img.get(min(gridX + 1, img.width - 1), gridY));
	// 		stroke(c2);
	// 		let greyscale2 = floor(red(c2) * 0.222 + green(c2) * 0.707 + blue(c2) * 0.071);
	// 		let h5 = 50 * mouseXFactor;
	// 		let d1 = map(greyscale, 0, 255, h5, 0);
	// 		let d2 = map(greyscale2, 0, 255, h5, 0);
	// 		// line(posX - d1, posY + d1, posX + tileWidth - d2, posY + d2);
	// 		line(posX , posY + d1, posX + tileWidth , posY + d2);
	// 	}
	// }

	while(y < height) {

    var imgX = round(map(x, 0, width, 0, img.width));
    var imgY = round(map(y, 0, height, 0, img.height));
    var c = color(img.get(imgX, imgY));
    var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);

    push();
    translate(x, y);

      // greyscale to fontsize
      var fontSize = map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
      fontSize = max(fontSize, 1);
      textSize(fontSize);

    // var letter = inputText.charAt(counter);
		let letter = '￥';
    text(letter, 0, 0);
    var letterWidth = textWidth(letter) + kerning;
    // for the next letter ... x + letter width
    x += letterWidth;

    pop();

    // linebreaks
    if (x + letterWidth >= width) {
      x = 0;
      y += spacing;
    }

    // counter++;
    // if (counter >= inputText.length) {
    //   counter = 0;
    // }
  }
  // noLoop();
}
