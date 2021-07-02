const gridAnim = (canvasEl) => {
  let canvas = canvasEl,
    context = canvas.getContext("2d"),
    w = window.innerWidth,
    h = window.innerHeight,
    // 网格集合
    gridsArrs = [],
    // 中心点
    pos = { x: w / 2, y: h / 2 };

  // 配置
  const config = {
    //网格配置
    gridsOps: [
      {
        xNum: 10,
        yNum: 10,
        lineColor: "rgba(255,255,255,0.3)",
        direction: "top",
      },
      {
        xNum: 10,
        yNum: 10,
        lineColor: "rgba(16,78,196,1.0)",
        direction: "bottom",
      },
    ],
    // 背景色
    bgColor: "rgba(0,0,0,0)",
    // 路径颜色
    pathColor: "rgba(16,78,196,1.0)",
  };
  // 设置配置
  function setConfig(confOps) {
    Object.assign(config, confOps);
  }
  // 初始化画布
  function intCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;
    pos = { x: w / 2, y: h / 2 };
    // 重新构建
    spawn();
  }
  // 网格
  function Grid(options) {
    this.initFlag = false;
    this.options = options;
  }
  //  初始化网格
  Grid.prototype.init = function () {
    const { bgColor } = config;
    const { xNum, yNum, direction, lineColor, gridsIndex } = this.options;
    const grids = gridsArrs[gridsIndex];
    const index = grids.indexOf(this);
    const xIndex = index % xNum;
    const yIndex = parseInt(index / xNum);
    const tan = context.canvas.width / context.canvas.height;
    const stepy = h / 2 / yNum;
    let y = 0;
    // 初始化
    if (!this.initFlag) {
      // 偏移-Y轴
      this.offsetY = (yIndex + 1) * stepy;
      this.initFlag = true;
    }
    let gradient = null;
    switch (direction) {
      case "top":
        y = pos.y - this.offsetY;
        gradient = context.createLinearGradient(
          context.canvas.width / 2,
          context.canvas.height / 2,
          context.canvas.width / 2,
          0
        );
        gradient.addColorStop("0", bgColor);
        gradient.addColorStop("1.0", lineColor);
        this.color = gradient;
        break;
      default:
        y = pos.y + this.offsetY;
        gradient = context.createLinearGradient(
          context.canvas.width / 2,
          context.canvas.height / 2,
          context.canvas.width / 2,
          context.canvas.height
        );
        gradient.addColorStop("0", bgColor);
        gradient.addColorStop("1.0", lineColor);
        this.color = gradient;
        break;
    }
    this.y = y;
    const stepx = ((this.offsetY * tan * 2) / xNum) * 1.5;
    if (xIndex < xNum / 2) {
      this.x = pos.x - (xNum / 2 - xIndex) * stepx;
    }
    if (xIndex === xNum / 2) {
      this.x = pos.x;
    }
    if (xIndex > xNum / 2) {
      this.x = pos.x + (xIndex - xNum / 2) * stepx;
    }
    this.w = stepx;
    this.h = stepy;
    this.r = 0;
  };
  // 更新网格-动画移动
  Grid.prototype.update = function () {
    this.offsetY += 1;
    this.r += 0.01;
  };
  // 绘制网格
  Grid.prototype.draw = function () {
    const { xNum, gridsIndex } = this.options;
    const grids = gridsArrs[gridsIndex];
    const index = grids.indexOf(this);
    const nextGrid = grids[index - xNum];
    if (nextGrid) {
      context.globalAlpha = 1;
      context.strokeStyle = this.color;
      context.beginPath();
      context.lineWidth = 0.3;
      context.moveTo(this.x, this.y);
      context.lineTo(this.x + this.w, this.y);
      context.lineTo(nextGrid.x + nextGrid.w, nextGrid.y);
      context.lineTo(nextGrid.x, nextGrid.y);
      context.closePath();
      context.stroke();
    }
  };
  // 描点
  Grid.prototype.drawPoint = function () {
    const { direction } = this.options;
    this.drawLightPoint(this.x, this.y, 0.02 * this.offsetY, direction);
  };
  // 描点-发光
  Grid.prototype.drawLightPoint = function (x, y, r, direction) {
    let gradient = "";
    switch (direction) {
      case "top":
        break;
      default:
        gradient = context.createRadialGradient(x, y, r / 3, x, y, r);
        gradient.addColorStop(0, "rgba(255,255,255,0.7)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = gradient;
        context.fillRect(x - r, y - r, x + r, y + r);
        break;
    }
  };

  // // 画线
  // function drawLine(ops = {}) {
  //   const { bgColor } = config;
  //   const { startX, startY, endX, endY, width = 400, color } = ops;
  //   const gradient = context.createLinearGradient(startX, startY, endX, endY);
  //   gradient.addColorStop("0", bgColor);
  //   gradient.addColorStop("1.0", color);
  //   context.strokeStyle = gradient;
  //   context.beginPath();
  //   context.moveTo(startX, startY);
  //   context.lineTo(endX + width, endY);
  //   context.closePath();
  //   context.stroke();
  // }
  // 画线-渐变
  function drawGradientLine(ops = {}) {
    const { bgColor } = config;
    const { startX, startY, endX, endY, width = 200, color } = ops;
    const gradient = context.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop("0", bgColor);
    gradient.addColorStop("1.0", color);
    // const distance = Math.sqrt(
    //   Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    // );
    // const r = distance / 2;
    const angleA = (60 * Math.PI) / 180;
    let sinA = Math.sin(angleA);
    let cosA = Math.cos(angleA);
    // AB的向量
    const vAB = { x: endX - startX, y: endY - startY };
    if (startX - endX > 0) {
      sinA = -sinA;
    }
    // 对向量AB旋转A的角度,即得到AC的向量
    const vAC = {};
    vAC.x = cosA * vAB.x + sinA * vAB.y;
    vAC.y = -sinA * vAB.x + cosA * vAB.y;
    const vC = { x: startX + vAC.x, y: startY + vAC.y };
    const gradient2 = context.createLinearGradient(
      vC.x,
      vC.y,
      (startX + endX) / 2,
      (startY + endY) / 2
    );
    gradient2.addColorStop("0", color);
    gradient2.addColorStop("0.92", color);
    gradient2.addColorStop("1.0", bgColor);
    context.strokeStyle = gradient;
    context.lineWidth = 1.0;
    context.beginPath();
    context.moveTo(startX, startY);
    // context.lineTo(startX + width, startY);
    context.lineTo(endX, endY);
    context.lineTo(endX + width, endY);
    context.closePath();
    context.fillStyle = gradient2;
    context.fill();
    // context.stroke();
  }
  // 构建
  function spawn() {
    // 重置网格集合
    if (gridsArrs && gridsArrs.length) {
      gridsArrs = [];
    }
    const { gridsOps } = config;
    gridsOps.forEach((ops, index) => {
      const { xNum, yNum } = ops;
      // 增加网格配置索引标记
      const options = Object.assign({}, ops, {
        gridsIndex: index,
      });
      const grids = [];
      for (let i = 0; i < xNum; i++) {
        for (let j = 0; j <= yNum; j++) {
          const g = new Grid(options);
          grids.push(g);
        }
      }
      gridsArrs.push(grids);
    });
  }
  // 渲染
  function render() {
    const { pathColor } = config;
    gridsArrs.forEach((grids, gsIndex) => {
      for (let i = 0; i < grids.length; i++) {
        const grid = grids[i];
        grid.init();
      }
      for (let i = 0; i < grids.length; i++) {
        const grid = grids[i];
        grid.draw();
      }
      for (let i = 0; i < grids.length; i++) {
        const grid = grids[i];
        // grid.drawPoint();
        grid.update();
      }
      const newGrids = [];
      // 尾部换到首部
      for (let i = 0; i < grids.length; i++) {
        const grid = grids[i];
        switch (grid.options.direction) {
          case "top":
            if (grid.y < 0 - grid.h) {
              grid.offsetY = 0;
              grid.r = 0;
              newGrids.unshift(grid);
            } else {
              newGrids.push(grid);
            }
            break;
          default:
            if (grid.y > h + grid.h) {
              grid.offsetY = 0;
              grid.r = 0;
              newGrids.unshift(grid);
            } else {
              newGrids.push(grid);
            }
            break;
        }
      }
      gridsArrs[gsIndex] = newGrids;
    });

    drawGradientLine({
      startX: context.canvas.width / 2,
      startY: context.canvas.height / 2,
      endX: (-context.canvas.width / 2) * 0.6,
      endY: context.canvas.height,
      width: -(context.canvas.width / 2) * 0.6,
      color: pathColor,
    });

    drawGradientLine({
      startX: context.canvas.width / 2,
      startY: context.canvas.height / 2,
      endX: (-context.canvas.width / 2) * 1.0,
      endY: context.canvas.height,
      width: -(context.canvas.width / 2) * 1.0,
      color: pathColor,
    });

    drawGradientLine({
      startX: context.canvas.width / 2,
      startY: context.canvas.height / 2,
      endX: context.canvas.width + (context.canvas.width / 2) * 0.6,
      endY: context.canvas.height,
      width: (context.canvas.width / 2) * 0.6,
      color: pathColor,
    });

    drawGradientLine({
      startX: context.canvas.width / 2,
      startY: context.canvas.height / 2,
      endX: context.canvas.width + (context.canvas.width / 2) * 1.0,
      endY: context.canvas.height,
      width: (context.canvas.width / 2) * 1.0,
      color: pathColor,
    });
  }

  return {
    setConfig,
    intCanvas,
    spawn,
    render,
  };
};

export default gridAnim;
