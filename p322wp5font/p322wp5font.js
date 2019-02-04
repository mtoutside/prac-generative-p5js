let textTyped = "日本語";
let font;
let filled = false;

function preload() {
  font = loadFont('data/NotoSansMonoCJKjp-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
}

function draw() {
  if(!font) return;

  background(255);
  if(filled) {
    noStroke();
    fill(0);
  } else {
    noFill();
    stroke(0);
    strokeWeight(2);
  }

  translate(20, 260);

  if(textTyped.length > 0) {
    const path = font.textToPoints(textTyped, 0, 0, 200);

    let addToAngle = map(mouseX, 0, width, -PI, PI);
    let curveHeight = map(mouseY, 0, height, 0.1, 2);

    for(let i = 0; i < path.length - 1; i++) {
      let pnt0 = path[i];
      let pnt1 = path[i + 1];
      let d = dist(pnt0.x, pnt0.y, pnt1.x, pnt1.y);

      if(d > 20) continue;

      let stepper = map(i % 2, 0,1, -1, 1);
      let angle = atan2(pnt1.y - pnt0.y, pnt1.x - pnt0.x);
      angle = angle + addToAngle;

      let cx = pnt0.x + cos(angle * stepper) * d * 4 * curveHeight;
      let cy = pnt0.y + sin(angle * stepper) * d * 3 * curveHeight;

      bezier(pnt0.x, pnt0.y, cx, cy, cx, cy, pnt1.x, pnt1.y);
    }
  }
}

function keyReleased() {
  if(keyCode == CONTROL) saveCanvas(gd.timestamp(), "png");
  if(keyCode == ALT) filled = !filled;
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
  }
}
