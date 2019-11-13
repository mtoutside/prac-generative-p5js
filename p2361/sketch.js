'use strict';

let modules;

let tileSize = 30;
let gridResolutionX;
let gridResolutionY;
let tiles = [];

let doDrawGrid = true;
let isDebugMode = false;

function preload() {
  // load SVG modules
  modules = [];

  for (var i = 0; i < 16; i++) {
    modules[i] = loadImage('data/' + nf(i, 2) + '.svg');
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  cursor(CROSS);
  rectMode(CENTER);
  imageMode(CENTER);
  strokeWeight(0.15);
  textSize(8);
  textAlign(CENTER, CENTER);

  gridResolutionX = round(width / tileSize) + 2;
  gridResolutionY = round(width / tileSize) + 2;

  initTiles();
}

function draw() {
  background(255);

  if(mouseIsPressed) {
    if(mouseButton === LEFT) setTile();
    if(mouseButton === RIGHT) unsetTile();
  }

  if(doDrawGrid) drawGrid();
  drawModules();
}

function initTiles() {
  for(let gridX = 0; gridX < gridResolutionX; gridX++) {
    tiles[gridX] = [];
    for(let gridY = 0; gridY < gridResolutionY; gridY++) {
      tiles[gridX][gridY] = 0;
    }
  }
}

function setTile() {
  let gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  let gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 1;
}

function unsetTile() {
  let gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  let gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 0;
}

function drawGrid() {
  for(let gridX = 0; gridX < gridResolutionX; gridX++) {
    for(let gridY = 0; gridY < gridResolutionY; gridY++) {
      let posX = tileSize * gridX - tileSize / 2;
      let posY = tileSize * gridY - tileSize / 2;
      fill(255);
      if(isDebugMode) {
        if(tiles[gridX][gridY] === 1) fill(220);
      }
      rect(posX, posY, tileSize, tileSize);
    }
  }
}

function drawModules() {
  for(let gridX = 0; gridX < gridResolutionX; gridX++) {
    for(let gridY = 0; gridY < gridResolutionY; gridY++) {
      if(tiles[gridX][gridY] === 1) {
        let NORTH = str(tiles[gridX][gridY - 1]);
        let WEST = str(tiles[gridX - 1][gridY]);
        let SOUTH = str(tiles[gridX][gridY + 1]);
        let EAST = str(tiles[gridX + 1][gridY]);

        let binaryResult = NORTH + WEST + SOUTH + EAST;
        let decimalResult = parseInt(binaryResult, 2);

        let posX = tileSize * gridX - tileSize / 2;
        let posY = tileSize * gridY - tileSize / 2;

        image(modules[decimalResult], posX, posY, tileSize, tileSize);

        if(isDebugMode) {
          fill(150);
          text(decimalResult + '\n' + binaryResult, posX, posY);
        }
      }
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if(keyCode == DELETE || keyCode == BACKSPACE) {
    initTiles();
  }

  if(key === 'g' || key === 'G') doDrawGrid = !doDrawGrid;
  if(key === 'd' || key === 'D') isDebugMode = !isDebugMode;
}
