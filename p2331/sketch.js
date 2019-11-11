'use strict';

let x = 0;
let y = 0;
let stepSize = 5.0;

let font = 'Yu Gothic';
let letters = '戦争に負けたから堕ちるのではないのだ。人間だから堕ちるのであり、生きているから堕ちるだけだ。だが人間は永遠に堕ちぬくことはできないだろう。なぜなら人間の心は苦難に対して鋼鉄の如くでは有り得ない。人間は可憐であり脆弱《ぜいじゃく》であり、それ故愚かなものであるが、堕ちぬくためには弱すぎる。人間は結局処女を刺殺せずにはいられず、武士道をあみださずにはいられず、天皇を担ぎださずにはいられなくなるであろう。だが他人の処女でなしに自分自身の処女を刺殺し、自分自身の武士道、自分自身の天皇をあみだすためには、人は正しく堕ちる道を堕ちきることが必要なのだ。そして人の如くに日本も亦堕ちることが必要であろう。堕ちる道を堕ちきることによって、自分自身を発見し、救わなければならない。政治による救いなどは上皮だけの愚にもつかない物である。';
let fontSizeMin = 3;
let angleDistortion = 0.0;

let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  cursor(CROSS);

  x = mouseX;
  y = mouseY;

  textFont(font);
  textAlign(LEFT);
  fill(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if(mouseIsPressed && mouseButton === LEFT) {
    let d = dist(x, y, mouseX, mouseY);
    textSize(fontSizeMin + d / 2);
    let newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);


    if(d > stepSize) {
      let angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
      if(counter >= letters.length) counter = 0;
      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyPressed() {
  if(keyCode == UP_ARROW) angleDistortion += 0.1;
  if(keyCode == DOWN_ARROW) angleDistortion -= 0.1;
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if(keyCode == DELETE || keyCode == BACKSPACE) background(255);
}
