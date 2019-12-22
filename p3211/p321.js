let textTyped = "Type...!";
let font;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  
  opentype.load('data/FreeSans.otf', (err, f) => {
    if(err) {
      console.log(err);
    } else {
      font = f;
      loop();
    }
  });
}

function draw() {
  if (!font) return;
  
  background(255);
  translate(20, 220);
  
  if(textTyped.length > 0) {
    let fontPath = font.getPath(textTyped, 0, 0, 200);
    let path = new g.Path(fontPath.commands);
    path = g.resampleByLength(path, 11);

    stroke(181, 157, 0);
    strokeWeight(1.0);
    let l = 5;
    for(let i = 0; i < path.commands.length; i++) {
      let pnt = path.commands[i];
      line(pnt.x - l, pnt.y - l, pnt.x + l, pnt.y + l);
    }

    fill(0);
    noStroke();
    let diameter = 7;
    for(let i = 0; i < path.commands.length; i++) {
      let pnt = path.commands[i];
      if(i % 3 === 0) {
        ellipse(pnt.x, pnt.y, diameter + random(1, 10), diameter);
      }
    }
  }

  noLoop();
}

function keyReleased(){
  if(keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed(){
  if(keyCode === DELETE || keyCode === BACKSPACE) {
    if(textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      loop();
    }
  }
}

function keyTyped() {
  if(keyCode >= 32) {
    textTyped += key;
    loop();
  }
}
