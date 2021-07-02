const particleAnim = (canvasEl) => {
  let canvas = canvasEl,
    context = canvas.getContext("2d"),
    w = window.innerWidth,
    h = window.innerHeight,
    particles = [],
    pos = { x: w / 2, y: h / 2 };

  function intCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;
    pos = { x: w / 2, y: h / 2 };
    spawn();
  }
  const config = {
    xNum: 5,
    yNum: 5,
    tailLength: 100, // 流星尾迹长短
    direction: "bottom",
  };
  function setConfig(confOps) {
    Object.assign(config, confOps);
  }
  // 粒子
  function Particle() {
    this.init();
    // 初始位置
    const stepNum = random(0, h / 2 / Math.abs(this.vy));
    this.x += stepNum * this.vx;
    this.y += stepNum * this.vy;
    this.r += stepNum * this.vr;
  }
  Particle.prototype.init = function () {
    this.x = pos.x; // x轴
    this.y = pos.y; // y轴
    this.alpha = 0.0; // 透明度
    this.r = 1.0; // 半径
    this.vr = 0.05; // 移动速度-半径
    this.vx = random(-20, 20); // 移动速度-x轴
    this.vy = -6; // 移动速度-y轴
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.r += this.vr;
    // 相对中心点路径
    const path = Math.sqrt(
      Math.pow(this.x - pos.x, 2) + Math.pow(this.y - pos.y, 2)
    );
    // 相对中心点-最远路径
    const maxPath = Math.sqrt(Math.pow(w - pos.x, 2) + Math.pow(0 - pos.y, 2));
    this.alpha = path / maxPath;
  };

  Particle.prototype.draw = function () {
    const { tailLength } = config;
    const { x, y, r, alpha } = this;
    context.globalAlpha = alpha;
    // 流星头部
    context.beginPath();
    const gradient = context.createRadialGradient(x, y, (r / 3) * 2, x, y, r);
    gradient.addColorStop(0, "rgba(16, 78, 196, 1)");
    gradient.addColorStop(1, "rgba(16, 78, 196, 0)");
    context.fillStyle = gradient;
    context.fillRect(x - r, y - r, 2 * r, 2 * r);
    context.closePath();
    // 流星尾巴
    context.beginPath();
    const gradient2 = context.createRadialGradient(x, y, 0, x, y, tailLength);
    gradient2.addColorStop(0, "rgba(16, 78, 196, 1)");
    gradient2.addColorStop(0.5, "rgba(16, 78, 196, 0.2)");
    gradient2.addColorStop(1, "rgba(16, 78, 196, 0)");
    context.fillStyle = gradient2;
    context.moveTo(pos.x, pos.y);
    context.lineTo(x - r, y);
    context.lineTo(x + r, y);
    context.lineTo(x - r, y);
    context.lineTo(x + r, y);
    context.closePath();
    context.fill();
    context.globalAlpha = 1.0;
  };

  // 构建
  function spawn() {
    if (particles && particles.length) {
      particles = [];
    }
    const { xNum, yNum } = config;
    for (let i = 0; i < xNum; i++) {
      for (let j = 0; j <= yNum; j++) {
        const p = new Particle();
        particles.push(p);
      }
    }
  }
  // 渲染
  function render() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.draw();
      p.update();
      if (p.y < 0 || p.y > h || p.r > 5) {
        p.init();
      }
    }
  }

  // 随机数
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  return {
    setConfig,
    intCanvas,
    spawn,
    render,
  };
};

export default particleAnim;
