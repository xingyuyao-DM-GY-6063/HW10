let song;
let peaks;

// Array of cloud colours
const cloudColors = [
  [192, 236, 240], 
  [161, 226, 176], 
  [131, 219, 204], 
  [156, 201, 155], 
];

function preload() {
  song = loadSound("jasmine.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  peaks = song.getPeaks(); // 获取峰值数据
  noLoop();
}

function draw() {
  background(245, 242, 224); // 中国画风背景色，类似宣纸

  // Paint the clouds
  let step = floor(peaks.length / 10000); // 减少云雾的密度
  for (let i = 0; i < 800; i++) {
    let peakValue = peaks[i * step]; // 当前步长的峰值
    let x = random(width); // Random cloud location
    let y = random(height);
    drawCloud(x, y, peakValue); 

    // 每隔一定数量绘制花朵
    if (i % 50 === 0) {
      drawFlower(x, y, peakValue);
    }
  }
}

function drawCloud(x, y, intensity) {
  noStroke();
  // Choose a random colour
  const colorIndex = floor(random(cloudColors.length));
  const chosenColor = cloudColors[colorIndex];
  let alpha = map(intensity, -1, 1, 50, 150); // Transparency varies with peak

  // Random cloud size
  let baseSize = random(30, 80);
  fill(chosenColor[0], chosenColor[1], chosenColor[2], alpha);
  for (let i = 0; i < 5; i++) {
    let offsetX = random(-50, 50);
    let offsetY = random(-50, 50);
    ellipse(x + offsetX, y + offsetY, random(baseSize, baseSize * 1.5));
  }
}

function drawFlower(x, y, intensity) {
  push();
  translate(x, y);
  let petals = floor(map(intensity, -1, 1, 5, 10)); // 花瓣数
  let size = map(intensity, -1, 1, 10, 50); // 花朵大小
  fill(255, 255, 255, random(180, 200));
  noStroke();
  for (let i = 0; i < petals; i++) {
    ellipse(0, size / 2, size, size * 2);
    rotate(TWO_PI / petals);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
