'use strict';

let aniLetters;

function preload() {
  font = loadFont('data/FreeSans.otf');
}

function setup() {
  createCanvas(800, 800);
  strokeWeight(1);
  strokeCap(ROUND);

  aniLetters = new AniLetters(40, 100);

  aniLetters.textTyped.push(aniLetters.addText('TYPE'));
  aniLetters.textTyped.push(aniLetters.addText('CODE'));

}

function draw() {
  background(255, 255, 255, 30);

  aniLetters.getLineCount();
  aniLetters.getPaths();
  aniLetters.render();
}

class AniLetters {
  constructor(_lwidth, _lheight) {
    let that = this;
    that.textTyped = [];
    that.textTyped = [];
    that.paths = [];
    that.letterWidth = _lwidth;
    that.letterHeight = _lheight;
    that.lineCount = 0;
    that.aniSteps = 20;
    that.drawMode = 3;
    that.cursorLocation = { x: 50, y: 50 };
    that.letterPadding = 60;
    that.style = 1;
  }

  getLineCount() {
    if(that.textTyped.length > 0) {
      that.lineCount = that.textTyped.length - 1;
    } else {
      that.lineCount = 0;
    }
  }

  getPaths() {
     that.paths = [];

    that.textTyped.forEach((txt, idx) => {
      txt.text.split('').forEach((d, i) => {
        let pathData = {
          letter: d.toUpperCase(),
          x: that.cursorLocation.x + (that.letterWidth + that.letterPadding * i),
          y: that.cursorLocation.y + (that.letterHeight * idx)
        };

        that.paths.push(pathData);
      });
    });
  }

  addText(_text) {
    let textObject = { counter: 0, text: _text };
    return textObject;
  }

  removeLetters() {
    let textTypedCounter = that.lineCount;
    if(textTypedCounter >= 0 && that.textTyped[0].text.length > 0) {
      that.textTyped[textTypedCounter].text = that.textTyped[textTypedCounter].text.substring(0, max(0, that.textTyped[textTypedCounter].text.length - 1));
    }

    if(that.textTyped[textTypedCounter].text.length === 0) {
      textTypedCounter--;
      if(textTypedCounter < 0) {
        console.log('nothing left');
        textTypedCounter = 0;
      } else {
        that.textTyped.pop();
      }
    }
  }

  addLines() {
    that.textTyped.push(that.addText(''));
    that.lineCount++;
  }

  addCharacters(_key) {
    if(that[_key.toUpperCase()]) {
      that.textTyped[that.lineCount].text += _key;
    } else {
      console.log('not a letter');
    }
  }

  render() {
    if(that.paths.length > 0) {
      that.pathsforEach((d) => {
        that[d.letter](d.x, d.y);
      });
    }
  }

  [' '] = function() {};

  A(x, y) {
    push();
    translate(x, y);
    this.diagonalToMiddle(that.letterWidth / 2, 0, 1);
    this.diagonalToMiddle(-that.letterWidth / 2, 0, -1);
    this.halfCrossBar(that.letterWidth / 4, that.letterHeight / 2);
    pop();
  }

  B(x, y) {
    push();
    translate(x, y);
    this.fullStem(0, 0);
    this.halfBowl(0, 0, -1);
    this.halfBowl(0, that.letterHeight / 2, -1);
    pop();
  }

  C(x, y) {
    push();
    translate(x, y);
    this.fullBowl(0, 0, 1);
    pop();
  }

  D(x, y) {
    push();
    translate(x, y);
    this.fullStem(0, 0);
    this.fullBowl(0, 0, 1);
    pop();
  }

  E(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0,0);
    this.crossBar(0,that.letterHeight / 2);
    this.crossBar(0,that.letterHeight);
    pop();
  }
  F(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0,0);
    this.crossBar(0,that.letterHeight / 2);
    pop();
  }
  G(x, y) {
    push();
    translate(x, y);
    this.fullBowl(0, 0, 1);
    this.halfStem(that.letterWidth,that.letterHeight / 2);
    this.halfCrossBar(that.letterWidth / 2, that.letterHeight / 2);
    pop();
  }
  H(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0, that.letterHeight / 2);
    this.fullStem(that.letterWidth,0);
    pop();
  }
  I(x, y) {
    push();
    translate(x, y);
    this.fullStem(that.letterWidth / 2,0);
    pop();
  }
  J(x, y) {
    push();
    translate(x, y);
    this.jCurve(0, 0);
    pop();
  }
  K(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfDiagonalLeg(0, that.letterHeight / 2, 1);
    this.halfDiagonalLeg(0, that.letterHeight / 2, -1);
    pop();
  }
  L(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0, that.letterHeight);
    pop();
  }
  M(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullStem(that.letterWidth,0);
    this.diagonalToMiddle(0, 0, 1);
    this.diagonalToMiddle(0, 0, -1);
    pop();
  }
  N(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullStem(that.letterWidth,0);
    this.diagonalToEnd(0, 0, -1);
    pop();
  }
  O(x, y) {
    push();
    translate(x, y);
    this.letterO(0, 0);
    pop();
  }
  P(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    pop();
  }
  Q(x, y) {
    push();
    translate(x, y);
    this.letterO(0,0);
    this.halfDiagonalArm(that.letterWidth / 2,that.letterHeight / 2, -1);
    pop();
  }
  R(x, y) {
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    this.halfDiagonalLeg(0, that.letterHeight / 2, -1);
    pop();
  }
  S(x, y) {
    push();
    translate(x, y);
    // noFill();
    this.sCurve(0,0);
    pop();
  }
  T(x, y) {
    push();
    translate(x, y);
    this.fullStem(that.letterWidth / 2,0);
    this.crossBar(0,0);
    pop();
  }
  U(x, y) {
    push();
    translate(x, y);
    this.uCurve(0,0);
    pop();
  }
  V(x, y) {
    push();
    translate(x, y);
    this.diagonalToMiddle(0, 0, 1);
    this.diagonalToMiddle(0, 0, -1);
    pop();
  }
  W(x, y) {
    push();
    translate(x, y);
    this.diagonalToQuarter(0, 0, 1);
    this.diagonalToQuarter(0, 0, -1);

    this.diagonalToQuarter(that.letterWidth / 2, 0, 1);
    this.diagonalToQuarter(that.letterWidth / 2, 0, -1);
    pop();
  }
  X(x, y) {
    push();
    translate(x ,y);
    this.diagonalToEnd(0, 0, -1);
    this.diagonalToEnd(0, 0, 1);
    pop();
  }
  Y(x, y) {
    push();
    translate(x, y);
    this.halfStem(that.letterWidth / 2, that.letterHeight / 2);
    this.halfDiagonalArm(0,0, 1);
    this.halfDiagonalArm(0,0, -1);
    pop();
  }
  Z(x, y) {
    push();
    translate(x, y);
    this.diagonalToEnd(0,0,1);
    this.crossBar(0,0);
    this.crossBar(0,that.letterHeight);
    pop();
  }
}
function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    textTyped = textTyped.substring(0,max(0,textTyped.length-1));
    setupText();
  }
  if (keyCode === ENTER || keyCode === RETURN) {
    textTyped += "\n";
    setupText();
  }
  if (keyCode === LEFT_ARROW) {
    drawMode--;
    if (drawMode < 1) drawMode = 4;
  }
  if (keyCode === RIGHT_ARROW) {
    drawMode++;
    if (drawMode > 4) drawMode = 1;
  }
  if (keyCode === DOWN_ARROW) {
    pointDensity--;
    if (pointDensity < 4) pointDensity = 4;
  }
  if (keyCode === UP_ARROW) {
    pointDensity++;
  }

}

function keyTyped() {
  if (keyCode >= 32){
    textTyped += key;
    setupText();
  }
}
