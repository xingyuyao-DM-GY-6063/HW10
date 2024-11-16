let song;
let amp;
let fft;
let particles = [];

function preload() {
  song = loadSound('counting stars.mp3'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.loop(); // 自动播放
  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(0, 50); // 黑色背景，带透明度

  let volume = amp.getLevel(); // 获取音量
  let spectrum = fft.analyze(); // 获取频谱数据

  let highFreq = spectrum.reduce((sum, val, idx) => idx > spectrum.length / 2 ? sum + val : sum, 0);

  // 根据音量和频率生成新粒子
  for (let i = 0; i < map(highFreq, 0, 1000, 1, 10); i++) {
    particles.push(new Particle(volume));
  }

  // 更新和绘制粒子
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isOffScreen()) {
      particles.splice(i, 1); // 移除屏幕外的粒子
    }
  }
}

// 粒子类
class Particle {
  constructor(volume) {
    this.pos = createVector(random(width), random(height));
    this.size = random(2, 5) + map(volume, 0, 0.5, 1, 30);
    this.alpha = map(volume, 0, 0.5, 50, 255); // 透明度随音量变化
    this.color = color(255, random(200, 255), 0, this.alpha); // 保持白到黄色渐变
    this.lifespan = 255;
  }

  update() {
    this.lifespan -= 2; // 粒子逐渐消失
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isOffScreen() {
    return this.lifespan <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 响应窗口大小变化
}
