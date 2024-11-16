let song;
let peaks; // 用于存储峰值数据

// 云雾的颜色数组
const cloudColors = [
  [192, 236, 240], // 浅蓝色
  [161, 226, 176], // 浅绿色
  [131, 219, 204], // 青绿色
  [156, 201, 155], // 浅橄榄绿
];

function preload() {
  song = loadSound('jasmine.mp3'); // 替换为你的音频文件路径
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  peaks = song.getPeaks(); // 获取峰值数据
  noLoop(); // 静态生成，不需要连续绘制
}

function draw() {
  background(245, 242, 224); // 中国画风背景色，类似宣纸

  // 绘制云雾，铺满画布
  let step = floor(peaks.length / 800); // 减少云雾的密度
  for (let i = 0; i < 800; i++) {
    let peakValue = peaks[i * step]; // 当前步长的峰值
    let x = random(width); // 云雾位置随机
    let y = random(height);
    drawCloud(x, y, peakValue); // 绘制云雾

    // 每隔一定数量绘制花朵
    if (i % 50 === 0) {
      drawFlower(x, y, peakValue);
    }
  }
}

function drawCloud(x, y, intensity) {
  noStroke();
  // 随机选择一种颜色
  const colorIndex = floor(random(cloudColors.length));
  const chosenColor = cloudColors[colorIndex];
  let alpha = map(intensity, -1, 1, 50, 150); // 透明度随峰值变化

  // 云雾大小随机
  let baseSize = random(30, 80); // 基础大小随机
  fill(chosenColor[0], chosenColor[1], chosenColor[2], alpha); // 设置云雾颜色
  for (let i = 0; i < 5; i++) { // 叠加多个椭圆模拟云雾扩散效果
    let offsetX = random(-50, 50); // 增加云雾的分散范围
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
  resizeCanvas(windowWidth, windowHeight); // 响应窗口大小变化
}
