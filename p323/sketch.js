let typedKey = "K";
let fontPath;

let spaceing = 20,
  spaceWidth = 80,
  fontSize = 200,
  lineSpacing = fontSize * 1.2,
  textW = 0,
  letterX = 50 + spaceing,
  letterY = lineSpacing,
  stepSize = 2,
  danceFactor = 1,
  font,
  pnts,
  freeze = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  opentype.load('data/FreeSans.otf', (err, f) => {
    if(err) {
      print(err);
    } else {
      font = f;
      pnts = getPoints(typedKey);
      loop();
    }
  });
}

function draw() {
  if(!font) return;

  noFill();
  push();

  translate(letterX, letterY);

  danceFactor = 1;
  if(mouseIsPressed && mouseButton == LEFT) danceFactor = map(mouseX, 0, width, 0, 3);

  if(pnts.length > 0) {
    for(let i = 0; i < pnts.length; i++) {
      pnts[i].x += random(-stepSize, stepSize) * danceFactor;
      pnts[i].y += random(-stepSize, stepSize) * danceFactor;
    }

    strokeWeight(0.1);
    stroke(0);
    beginShape();
    for(var i = 0; i < pnts.length; i++) {
      vertex(pnts[i].x, pnts[i].y);
      ellipse(pnts[i].x, pnts[i].y, 7, 7);
    }
    vertex(pnts[0].x, pnts[0].y);
    endShape();
  }

  pop();
}

function getPoints() {
  fontPath = font.getPath(typedKey, 0, 0, 200);
  let path = new g.Path(fontPath.commands);
  path = g.resampleByLength(path, 25);
  textW = path.bounds().width;
  for(let i = path.commands.length - 1; i >= 0; i--) {
    if(path.commands[i].x == undefined) {
      path.commands.splice(i, 1);
    }
  }
  return path.commands;
}

function keyReleased() {
  if(keyCode == CONTROL) saveCanvas(gd.timestamp(), "png");
  if(keyCode == ALT) {
    freeze = !freeze;
    if(freeze) {
      noLoop();
    } else {
      loop();
    }
  }
}

function keyPressed() {
  switch(keyCode) {
    case ENTER:
    case RETURN:
      typedKey = '';
      pnts = getPoints(typedKey);
      letterX += lineSpacing;
      letterY = 50;
      break;
    case BACKSPACE:
    case DELETE:
      background(255);
      typedKey = '';
      pnts = getPoints(typedKey);
      letterX = 50;
      letterY = lineSpacing;
      freeze = false;
      loop();
      break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    if(keyCode == 32) {
      typedKey = '';
      letterX += textW + spaceWidth;
      pnts = getPoints(typedKey);
    } else {
      typedKey = key;
      letterX += textW + spaceing;
      pnts = getPoints(typedKey);
    }
    freeze = false;
    loop();
  }
}
