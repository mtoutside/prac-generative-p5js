'use strict';

let img;
let colors = [];
let sortMode = null;

function preload() {
	loadImage('data/pic1.jpg', setImage);
}

function setup() {
	createCanvas(600, 600);
	noCursor();
	noStroke();
}

function draw() {
	let tileCount = floor(width / max(mouseX, 5));
	let rectSize = width / tileCount;

	img.loadPixels();
	colors = [];

	for (let gridY = 0; gridY < tileCount; gridY++) {
		for (let gridX = 0; gridX < tileCount; gridX++) {
			let px = int(gridX * rectSize);
			let py = int(gridY * rectSize);
			let i = (py * img.width + px) * 4;
			let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
			colors.push(c);
		}
	}

	let i = 0;
	for (let gridY = 0; gridY < tileCount; gridY++) {
		for (let gridX = 0; gridX < tileCount; gridX++) {
			fill(colors[i]);
			rect(gridX * rectSize, gridY * rectSize, random(rectSize), random(rectSize));
			i++;
		}
	}
}

function setImage(loadImageFile) {
	img = loadImageFile;
}
