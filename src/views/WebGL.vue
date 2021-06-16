<template>
  <canvas ref="particle" class="webgl-container"></canvas>
  <canvas ref="container" class="webgl-container"></canvas>
</template>
<script>
import { onMounted, ref } from "vue";
// import particeAnim from "./../utils/particleAnim";

export default {
  name: "WebGL",
  setup() {
    const particle = ref("partice-Panel");
    const container = ref("WebGL-Panel");
    // 绘制背景
    function drawBg(options) {
      const canvas = container.value;
      const context = canvas.getContext("2d");
      const { bgColor } = options;
      context.save();
      context.globalAlpha = 1;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = bgColor;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.restore();
    }
    // 绘制网格
    function drawGrid(options) {
      const canvas = container.value;
      const context = canvas.getContext("2d");
      const {
        bgColor,
        lineWidth,
        color,
        xNum,
        yNum,
        position = {
          direction: "top",
          offsetX: 0,
          offsetY: 0,
        },
      } = options;
      const { direction } = position;
      context.save();
      const stepx = context.canvas.width / xNum;
      const stepy = context.canvas.height / yNum / 2;
      if (direction === "top") {
        context.lineWidth = lineWidth;
        const gradient = context.createLinearGradient(
          context.canvas.width / 2,
          context.canvas.height / 2,
          context.canvas.width / 2,
          0
        );
        gradient.addColorStop("0", bgColor);
        gradient.addColorStop("1.0", color);
        context.strokeStyle = gradient;
        for (let i = 0, num = 1; num <= xNum + 1; i += stepx, num++) {
          context.globalAlpha = 0.2;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.strokeStyle = gradient;
          context.beginPath();
          context.moveTo(context.canvas.width / 2, context.canvas.height / 2);
          context.lineTo(i, 0);
          context.closePath();
          context.stroke();
        }
        for (
          let j = 0, num = 0;
          num <= yNum;
          j = stepy * num * (num / yNum), num++
        ) {
          context.globalAlpha = 0.2;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.beginPath();
          const tan = context.canvas.width / context.canvas.height;
          context.moveTo(
            context.canvas.width - (context.canvas.width / 2 - tan * j),
            context.canvas.height / 2 - j
          );
          context.lineTo(
            context.canvas.width - (context.canvas.width / 2 + tan * j),
            context.canvas.height / 2 - j
          );
          context.closePath();
          context.stroke();
        }
      }

      if (direction === "bottom") {
        context.lineWidth = lineWidth;
        const gradient = context.createLinearGradient(
          context.canvas.width / 2,
          context.canvas.height / 2,
          context.canvas.width / 2,
          context.canvas.height
        );
        gradient.addColorStop("0", bgColor);
        gradient.addColorStop("1.0", color);
        context.strokeStyle = gradient;
        for (let i = 0, num = 1; num <= xNum + 1; i += stepx, num++) {
          context.globalAlpha = 0.2;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.strokeStyle = gradient;
          context.beginPath();
          context.moveTo(context.canvas.width / 2, context.canvas.height / 2);
          context.lineTo(i, context.canvas.height);
          context.closePath();
          context.stroke();
        }
        for (
          let j = 0, num = 1;
          num <= yNum;
          j = stepy * num * (num / yNum), num++
        ) {
          context.globalAlpha = 0.2;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.beginPath();
          const tan = context.canvas.width / context.canvas.height;
          context.moveTo(
            context.canvas.width / 2 - tan * j,
            j + context.canvas.height / 2
          );
          context.lineTo(
            context.canvas.width / 2 + tan * j,
            j + context.canvas.height / 2
          );
          context.closePath();
          context.stroke();
        }
      }

      context.restore();
    }
    // // 移动网格
    // function moveGrid() {}
    // 动画开启控制
    const animate = true;
    let step = 0;
    const maxStep = 100;
    //  背景配置
    const bgOps = {
      bgColor: "#000",
    };
    // 网格配置
    const gridOps1 = {
      bgColor: "#000",
      color: "#fff",
      lineWidth: 1,
      xNum: 12,
      yNum: 12,
      position: {
        direction: "top",
        offsetX: 0,
        offsetY: 0,
      },
    };
    const gridOps2 = {
      bgColor: "#000",
      color: "#fff",
      lineWidth: 1,
      xNum: 12,
      yNum: 12,
      position: {
        direction: "bottom",
        offsetX: 0,
        offsetY: 0,
      },
    };
    function onWindowResize() {
      const canvas = container.value;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBg(bgOps);
      drawGrid(gridOps1);
      drawGrid(gridOps2);
    }
    const init = () => {
      const canvas = container.value;
      const context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      function animation() {
        if (step > maxStep) {
          step = 0;
          gridOps1.position.offsetX = 0;
          gridOps1.position.offsetY = 0;
          gridOps2.position.offsetX = 0;
          gridOps2.position.offsetY = 0;
        } else {
          step++;
          const offsetX1 = 0;
          const offsetY1 = context.canvas.height / 2 / gridOps1.yNum / maxStep;
          const offsetX2 = 0;
          const offsetY2 = context.canvas.height / 2 / gridOps2.yNum / maxStep;
          gridOps1.position.offsetX += offsetX1;
          gridOps1.position.offsetY += offsetY1;
          gridOps2.position.offsetX += offsetX2;
          gridOps2.position.offsetY += offsetY2;
        }
        drawBg(bgOps);
        drawGrid(gridOps1);
        drawGrid(gridOps2);
        if (animate) {
          window.requestAnimationFrame(animation);
        }
      }
      animation();
      window.addEventListener("resize", onWindowResize, false);
    };

    onMounted(() => {
      init();
    });
    return {
      container,
      particle,
    };
  },
};
</script>
<style lang="scss" scroped>
.webgl-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
