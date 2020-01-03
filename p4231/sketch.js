'use strict';

let videoSrc = '';
let video;
let subtitleSrc = '';
let subtitles;

let searchQuery = '\\b(comet)\\b';

let searchResults = [];
let currentResult;

let fragmentTimer;

let row = 0;
let col = 0;
let frameWidth;
let frameHeight;

let tileMode = true;

let gui;

function preload() {
  video = createVideo(videoSrc);
  loadStrings(subtitleSrc, parseSubtitles);
}

function parseSubtitles(lines) {
   subtitles = [];
  let timecodeRegEx = new RegExp(/((\d{2}:){2}\d{2}(,|\.)\d{3})\s-->\s((\d{2}:){2}\d{2}(,|\.)\d{3})/);
  let subtitleObject;
  let startTime;
  let endTime;
  let dialog;
  lines.forEach((line, i) => {
    if(timecodeRegEx.test(line) || i === lines.length) {
      if(dialog) {
         subtitles.push(new SubTitleObject(startTime, endTime, dialog));
      }

      if(i < lines.length) {
        startTime = line.replace(/\s.+$/, '');
        endTime = line.replace(/^.+\s/, '');
        dialog = '';
      }
    } else {
      if(startTime && endTime) {
        dialog += line + ' ';
      }
    }
  });
  print(subtitles);
}

function SubTitleObject(startTime, endTime, dialog) {
  this.startTimeStamp = startTime;
  this.endTimeStamp = endTime;
  this.startTime = getTimeInSeconds(startTime);
  this.endTime = getTimeInSeconds(endTime);
  this.dialog = dialog.replace(/\s\d+\s$|<(?:.)*?>/g, '').trim();
  this.duration = this.endTime - this.startTime;
}

function getTimeInSeconds(timeString) {
  let hours = parseInt(timeString.replace(/:.+$/, ''));
  let minutes = parseInt(timeString.replace(/^\d.+?:|:\d.+$/, ''));
  let seconds = parseInt(timeString.replace(/^\d.+:|(\,|\.).+$/, ''));
  let milSeconds = parseInt(timeString.replace(/^.+(\,|\.)/, ''));
  return (hours * 60 * 60) + (minutes * 60) + seconds + (milSeconds / 1000);
}

function findSubtiles(searchPattern) {
  searchPattern = new RegExp(searchPattern, 'i');
  let results = [];
  subtitles.forEach(function(subtitle) {
    if (searchPattern.test(subtitle.dialog)) {
      results.push(subtitle);
    };
  });
  return results;
}

function generateMontage() {
  clearTimeout(fragmentTimer);
  video.stop();
  selectAll('.subtitle').forEach((dialogElement) => {
    dialogElement.remove();
  });
  video.elt.style.width = tileMode ? '25%' : '100%';
  video.position(0, 0);
  video.show();
  clear();
  row = 0;
  col = 0;

  searchResults = findSubtiles(searchQuery);
  print(
    `Found ${searchResults.length} results for search query ${searchQuery}`, searchResults);

  if(searchResults.length) {
    resizeCanvas(windowWidth, searchResults.length * video.size().height);
    queryResultMontage(searchResults, 0);
  }
}

function queryResultMontage(searchResults, i) {
  currentResult = searchResults[i];
  let duration = currentResult.duration;

  video.play();
  video.time(currentResult.startTime);

  print(currentResult.startTimeStamp, currentResult.dialog);
  fragmentTimer = setTimeout(() => {

    video.pause();

    if(tileMode) {
      let framePos = getFramePos();
      let img = vidoe.get();
      image(img, framePos.x, framePos.y, frameWidth, frameHeight);

      let dialogElement = createSpan(currentResult.dialog);
      dialogElement.addClass('subtitle');
      dialogElement.size(frameWidth, frameHeight);
      dialogElement.position(framePos.x, framePos.y);

      text(currentResult.endTimeStamp, framePos.x, framePos.y);

      col++;
      framePos = getFramePos();
      video.position(framePos.x, framePos.y);
    }

    if(i < searchResults.length - 1) {
      queryResultMontage(searchResults, i + 1);
    } else {
      video.hide();
      clearTimeout(fragmentTimer);
    }
  }, duration * 1000);
}

function togglePlayback() {
  clearTimeout(fragmentTimer);
  if(video.elt.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function getFramePos() {
  frameWidth = video.size().width;
  frameHeight = video.size().height;
  let x = frameWidth * col;
  let y = frameHeight * row;
  if (x + frameWidth > width) {
    col = 0;
    row++;
    x = frameWidth * col;
    y = frameHeight * row;
  }
  return createVector(x, y);
}

function setup() {
	createCanvas(windowWidth, 1000);

  fill(255);
  stroke(0);
  textSize(10);
  textAlign(LEFT, TOP);

  createGUI();

  generateMontage(searchQuery);
}
