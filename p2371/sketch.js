'use strict';

let canvasElement;
let recording = false;

let lineWidth = 3;
let lineColor;

let mv = true;
let mh = true;
let md1 = true;
let md2 = true;
let penCount = 1;

let showAxes = true;

let img;

function setup() {
  canvasElement = createCanvas(800, 800);
  noCursor();
  noFill();
  lineColor = color(0);

  img = createGraphics(width, height);
  img.pixelDensity(1);

}

function draw() {
  background(255);
  image(img, 0, 0);

  img.strokeWeight(lineWidth);
  img.stroke(lineColor);

  if(mouseIsPressed && mouseButton === LEFT) {
    let w = width / penCount;
    let h = height / penCount;
    let x = mouseX % w;
    let y = mouseY % h;
    let px = x - (mouseX - pmouseX);
    let py = y - (mouseY - pmouseY);

    for(let i = 0; i < penCount; i++) {
      for(let j = 0; j < penCount; j++) {
        let ox = j * w;
        let oy = j * h;

        img.line(x + ox, y + oy, px + ox, py + oy);
        if(mh || md2 && md1 && mv) img.line(w - x + ox, y + oy, w - px + ox, py + oy);

        if(mv || md2 && md1 && mh) img.line(x + ox, h - y + oy, px + ox, h -py + oy);

        if(mv && mh || md2 && md1) img.line(w - x + ox, h - y + oy, w - px + ox, h - py + oy);

        if (md1 || md2 && mv && mh) img.line(y + ox, x + oy, py + ox, px + oy);
        if (md1 && mh || md2 && mv) img.line(y + ox, w - x + oy, py + ox, w - px + oy);
        if (md1 && mv || md2 && mh) img.line(h - y + ox, x + oy, h - py + ox, px + oy);
        if (md1 && mv && mh || md2) img.line(h - y + ox, w - x + oy, h - py + ox, w - px + oy);
      }
    }

  }

  if(showAxes) {
    let w = width / penCount;
    let h = height / penCount;

    for(let i = 0; i < penCount; i++) {
      for(let j = 0; j < penCount; j++) {
        let x = i * w;
        let y = j * h;

        stroke(0, 50);
        strokeWeight(1);
        if(mh) line(x + w / 2, y, x + w / 2, y + h);
        if(mv) line(x, y + h / 2, x + w, y + h / 2);
        if(md1) line(x, y, x + w, y + h);
        if(md2) line(x + w, y, x, y + h);

        stroke(15, 233, 118, 50);
        strokeWeight(1);
        rect(i * w, j * h, w - 1, h - 1);
      }
    }

    fill(lineColor);
    noStroke();
    ellipse(mouseX, mouseY, lineWidth + 2, lineWidth + 2);
    stroke(0, 50);
    noFill();
    ellipse(mouseX, mouseY, lineWidth + 1, lineWidth + 1);
  }
}


function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) img.clear();

  if (keyCode == RIGHT_ARROW) penCount++;
  if (keyCode == LEFT_ARROW) penCount = max(1, penCount - 1);

  if (keyCode == UP_ARROW) lineWidth++;
  if (keyCode == DOWN_ARROW) lineWidth = max(1, lineWidth - 1);

  if (key == '1') mv = !mv;
  if (key == '2') mh = !mh;
  if (key == '3') md1 = !md1;
  if (key == '4') md2 = !md2;

  if (key == '5') lineColor = color(0);
  if (key == '6') lineColor = color(15, 233, 118);
  if (key == '7') lineColor = color(245, 95, 80);
  if (key == '8') lineColor = color(65, 105, 185);
  if (key == '9') lineColor = color(255, 231, 108);
  if (key == '0') lineColor = color(255);

  if (key == 'd' || key == 'D') showAxes = !showAxes;
}
