const starAnim = (canvasEl) => {
  let canvas = canvasEl,
    context = canvas.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight),
    stars = [],
    pos = { x: w / 2, y: h / 2 };

  function intCanvas() {
    canvasEl.style.position = "absolute";
    canvasEl.style.left = "0";
    canvasEl.style.top = "0";
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    pos = { x: w / 2, y: h / 2 };
    spawn();
  }
  const config = {
    xNum: 10,
    yNum: 10,
    direction: "bottom",
  };
  function setConfig(confOps) {
    Object.assign(config, confOps);
  }
  // 粒子
  function Star(options) {
    this.options = options;
    this.init();
    // 初始位置
    const stepNum = random(0, h / 2 / Math.abs(this.vy));
    this.x += stepNum * this.vx;
    this.y += stepNum * this.vy;
    this.r += stepNum * this.vr;
  }
  Star.prototype.init = function () {
    const { size = 1 } = this.options;
    this.x = pos.x; // x轴
    this.y = pos.y; // y轴
    this.alpha = 0.0; // 透明度
    this.r = 0.01 * size; // 半径 * 倍数
    this.vr = 0.02; // 移动速度-半径
    this.vx = random(-10, 10); // 移动速度-x轴
    this.vy = 1; // 移动速度-y轴
  };

  Star.prototype.update = function () {
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

  Star.prototype.draw = function () {
    const { x, y, r, alpha } = this;
    context.globalAlpha = alpha;
    context.beginPath();
    const gradient = context.createRadialGradient(x, y, r / 4, x, y, r);
    gradient.addColorStop(0, "rgba(0,123,199, 0.6)");
    gradient.addColorStop(1, "rgba(0,113,187, 0)");
    context.fillStyle = gradient;
    context.fillRect(x - r, y - r, 2 * r, 2 * r);
    context.closePath();
    context.globalAlpha = 1.0;
  };

  // 构建
  function spawn() {
    if (stars && stars.length) {
      stars = [];
    }
    const { xNum, yNum } = config;
    for (let i = 0; i < xNum; i++) {
      for (let j = 0; j <= yNum; j++) {
        let size = 1;
        if (i === j) {
          size = 500;
        }
        const p = new Star({ size });
        stars.push(p);
      }
    }
  }
  // 渲染
  function render() {
    for (var i = 0; i < stars.length; i++) {
      var p = stars[i];
      p.draw();
      p.update();
      if (p.y < 0 || p.y > h || p.r > 100) {
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

export default starAnim;
