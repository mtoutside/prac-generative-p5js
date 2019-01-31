let doSave = false;
let textTyped = "KVLT...!";

let font;

let shapeSet = 0;
let module1, module2;

function preload() {
  module1 = loadImage("data/A_01.svg");
  module2 = loadImage("data/A_02.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  opentype.load('data/FreeSans.otf', (err, f) => {
    if(err) {
      console.log(err);
    } else {
      font = f;
    }
  });
}

function draw() {
  background(255);
  noStroke();
  imageMode(CENTER);

  translate(60, 300);

  if(textTyped.length > 0 && font != undefined) {
    let fontPath = font.getPath(textTyped, 0, 0, 200);
    let path = new g.Path(fontPath.commands);
    path = g.resampleByLength(path, 6);

    // module1
    let diameter = 30;

    for (let i = 0; i < path.commands.length - 1; i++) {
      const pnt = path.commands[i];
      const nextPnt = path.commands[1 + 1];

      if(!pnt.x || !nextPnt.x) continue;

      if(i % 3 == 0) {
        push();
        let angle = atan2(pnt.y - nextPnt.y, pnt.x - nextPnt.x);
        translate(pnt.x, pnt.y);
        rotate(angle);
        rotate(radians(-mouseX));
        image(module1, 0, 0, diameter + (mouseY / 2.5), diameter + (mouseY / 2.5));
        pop();
      }
    }
    
    // module2
    diameter = 18;
    for (let i = 0; i < path.commands.length - 1; i++) {
      const pnt = path.commands[i];
      const nextPnt = path.commands[1 + 1];

      if(!pnt.x || !nextPnt.x) continue;

      if(i % 3 == 0) {
        push();
        let angle = atan2(pnt.y - nextPnt.y, pnt.x - nextPnt.x);
        translate(pnt.x, pnt.y);
        rotate(angle);
        rotate(radians(mouseX));
        image(module2, 0, 0, diameter + (mouseY / 2.5), diameter + (mouseY / 2.5));
        pop();
      }
    }

  }
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }

  if (keyCode === ALT) {
    shapeSet = (shapeSet + 1) % 4;
    switch(shapeSet) {
      case 0:
        module1 = loadImage("data/A_01.svg");
        module2 = loadImage("data/A_02.svg");
        break;
      case 1:
        module1 = loadImage("data/B_01.svg");
        module2 = loadImage("data/B_02.svg");
        break;
      case 2:
        module1 = loadImage("data/C_01.svg");
        module2 = loadImage("data/C_02.svg");
        break;
      case 3:
        module1 = loadImage("data/D_01.svg");
        module2 = loadImage("data/D_02.svg");
        break;
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
  }
}