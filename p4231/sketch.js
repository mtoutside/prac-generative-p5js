'use strict';

let cam;
let intervalTime = 30;

let secondsSinceStart = 0;
let startTime = gd.timestamp();
let counter = 0;
let doSave = 0;
let streamReady = false;

function setup() {
	createCanvas(640, 480);
  cam = createCapture(VIDEO, () => {
    streamReady = true;
  });
  cam.hide();
  noStroke();
}

function draw() {
  if(streamReady) {
    image(cam ,0, 0, width, width * cam.heignt / cam.width);

    secondsSinceStart = millis() / 1000;
    let interval = int(secondsSinceStart % intervalTime);

    if(interval === 0 && doSave === true) {
      let saveFileName = startTime + '-' + nf(counter, 5, 0);
      saveCanvas(saveFileName, 'png');
      doSave = false;
      counter++;
    } else if(interval !== 0) {
      doSave = true;
    }

    fill(random(0, 255), random(0, 255), random(0, 255));
    rect(map(interval, 0, intervalTime, 0, width), 0, 5, 5);
  }
}
