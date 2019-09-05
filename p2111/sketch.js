'use strict';

let noff = 0.0;
function setup() {
 createCanvas(550, 550);
 strokeCap(SQUARE);
 colorMode(HSB);
}

function draw() {
 noff += 0.01
 let noiseValue = noise(noff);
 background(255);
 translate(width / 2, height / 2);

 let circleResolution = int(map(mouseY, 0, height, 2, 80));
 let radius = mouseX - width / 2;
 let angle = TAU / circleResolution;

 strokeWeight((mouseY + noiseValue * 50) / 20);

 if(noiseValue > 0 && noiseValue < 0.3) {
	stroke(100 * noiseValue, 80, 80);
 } else if(noiseValue > 0.31 && noiseValue < 0.6) {
	stroke(200 * sin(noiseValue), 80, 80);
 } else {
	stroke(300 * noiseValue, 80, 80);
 }


 beginShape();
 for(let i = 0; i <= circleResolution; i++) {
	let x = cos(angle * i) * radius;
	let y = sin(angle * i) * radius;
	line(0, 0, x, y);
	vertex(x + noiseValue, y);
 }
 endShape(CLOSE);
}
