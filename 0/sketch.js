let song;
let amp;
let fft;
let particles = [];

function preload() {
  song = loadSound("counting stars.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.loop();
  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(0, 50);

  let volume = amp.getLevel();
  let spectrum = fft.analyze();

  let highFreq = spectrum.reduce(
    (sum, val, idx) => (idx > spectrum.length / 2 ? sum + val : sum),
    0
  );

  // Generate new particles based on volume and frequency
  for (let i = 0; i < map(highFreq, 0, 1000, 1, 10); i++) {
    particles.push(new Particle(volume));
  }

  // Updating and drawing particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isOffScreen()) {
      particles.splice(i, 1); // Remove off-screen particles
    }
  }
}

class Particle {
  constructor(volume) {
    this.pos = createVector(random(width), random(height));
    this.size = random(2, 5) + map(volume, 0, 0.5, 1, 30);
    this.alpha = map(volume, 0, 0.5, 0, 255); // 透明度随音量变化
    this.color = color(255, 255, 255, this.alpha);
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
