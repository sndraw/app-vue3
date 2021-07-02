<template>
  <canvas ref="container" class="canvas-container"></canvas>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import particleAnim from "@/utils/anim/particleAnim";
import gridAnim from "@/utils/anim/gridAnim";
import starAnim from "@/utils/anim/starAnim";

export default {
  name: "WebGL",
  setup() {
    // 动画进行标识
    let animFlag = true;
    const container = ref("container-Panel");
    let particleAnimAction = null;
    let gridAnimAction = null;
    let starAnimAction = null;
    const initAnim = () => {
      const canvas = container.value;
      particleAnimAction = particleAnim(canvas);
      gridAnimAction = gridAnim(canvas);
      starAnimAction = starAnim(canvas);
    };
    const initCanvas = () => {
      const canvas = container.value;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particleAnimAction.intCanvas();
      gridAnimAction.intCanvas();
      starAnimAction.intCanvas();
    };
    const render = () => {
      const canvas = container.value;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      // context.fillStyle = "rgba(0,0,0,0.2)";
      // context.fillRect(0, 0, canvas.width, canvas.height);
      gridAnimAction.render();
      particleAnimAction.render();
      starAnimAction.render();
      context.beginPath();
    };
    // 动画
    const animation = () => {
      if (!animFlag) {
        return;
      }
      render();
      requestAnimationFrame(animation);
    };
    const onWindowResize = () => {
      initCanvas();
    };

    onMounted(() => {
      initAnim();
      initCanvas();
      animation();
      window.addEventListener("resize", onWindowResize, false);
    });
    onBeforeUnmount(() => {
      // 动画停止
      animFlag = false;
      // 卸载resize事件
      window.removeEventListener("resize", onWindowResize, false);
    });
    return {
      container,
    };
  },
};
</script>
<style lang="scss" scroped>
.canvas-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #131313 0%, #02101c 100%);
  position: absolute;
  top: 0;
  left: 0;
}
</style>
