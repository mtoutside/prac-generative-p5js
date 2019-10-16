'use strict';
let num = 20;
let thr = 1;
let fibo = [];
const SGN = [1, 1, -1, -1];

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 1);
  background(0, 0, 1);
  generateFibo(num);
  divSquare(0, 0, 0, 0, 1, 1);
}

function draw() {}
function mouseClicked() {
  num = int(random(2, 10));
  thr = int(random(0, 9));
  background(0, 0, 1);
  generateFibo(num);
  divSquare(0, 0, 0, 0, 1, 1);
}

function generateFibo(index) {
  fibo = [0, 1];
  console.log(fibo);
  for(let i = 1; i < index; i++) {
    fibo = append(fibo, fibo[i - 1] + fibo[i]);
  }
  fibo = reverse(fibo);
}

/**
 * divSquare
 * 正方形の位置(xPos, yPos)，フィボナッチ数列の項数index，
 * 関数の繰り返し回数itr，正方形の描画に関する符号(sgnX,sgnY)を引数とする分割
 * 
 * @param xPos 正方形の位置x
 * @param yPos 正方形の位置y
 * @param index フィボナッチ数列の項数
 * @param itr 繰り返し回数
 * @param sgnX
 * @param sgnY
 * @returns void
 */
function divSquare(xPos, yPos, index, itr, sgnX, sgnY) {
  for(let i = 0; i < num - index; i++) {
    let lng0 = fibo[i + index + 1];
    let lng1 = fibo[i + index];
    let newSgnX = sgnX * SGN[i % 4];
    let newSgnY = sgnY * SGN[(i + 1) % 4];
    colRect(xPos, yPos, newSgnX * lng0, newSgnY * lng1, index + i + 1);

    xPos += newSgnX * lng0;
    yPos += newSgnY * lng1;
    if(itr < thr) {
      divRect(xPos, yPos, i + index + 1, itr + 1, -newSgnX, -newSgnY);
    }
  }
}

function divRect(xPos, yPos, index, itr, sgnX, sgnY) {
  for(let i = 0; i < num - index; i++) {
    let lng = fibo[i + index];
    let newSgnX = sgnX * SGN[(i + 1) % 4];
    let newSgnY = sgnY * SGN[i % 4];
    colRect(xPos, yPos, newSgnX * lng, newSgnY * lng, index + i);
    xPos += newSgnX * lng;
    yPos += newSgnY * lng;
    if(itr < thr) {
      divSquare(xPos, yPos, index + i, itr + 1, -newSgnX, -newSgnY);
    }
  }
}

/**
 * colRect
 *
 * @param xPos x位置
 * @param yPos y位置
 * @param wd 横幅
 * @param ht 高さ
 * @param index 項目に対する色
 * @returns void
 */
function colRect(xPos, yPos, wd, ht, index) {
  let scalar = width / fibo[0];
  fill((index * 1 / num) % 1, 1, 1);
  rect(scalar * xPos, scalar * yPos, scalar * wd, scalar * ht);
}
