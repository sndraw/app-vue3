<template>
  <div ref="container" class="webgl-container"></div>
</template>
<script>
import { onMounted, inject, ref } from "vue";
export default {
  name: "WebGL",
  setup() {
    const container = ref("WebGL-Panel");
    let renderer = null;
    let camera = null;
    let scene = null;
    let sphere = null;
    let cube = null;
    let step = 1;
    const THREE = inject("THREE");
    const addAxes = () => {
      //添加坐标轴
      let axes = new THREE.AxesHelper(20);
      scene.add(axes);
      //平面
      let planeGeometry = new THREE.PlaneGeometry(60, 20);
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
      plane.rotation.x = -0.5 * Math.PI;
      scene.add(plane);
    };
    const addLights = () => {
      // 添加点光源
      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(40, 80, -20);
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.height = 2048;
      spotLight.shadow.mapSize.width = 2048;
      scene.add(spotLight);
    };
    const addCutes = () => {
      //方体
      let cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffee6b });
      cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.position.x = -10;
      cube.position.y = 10;
      scene.add(cube);

      //球体
      let sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
      let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.position.x = 20;
      sphere.position.y = 5;
      sphere.position.z = 0;
      scene.add(sphere);
    };
    const animate = () => {
      const animateHandle = () => {
        requestAnimationFrame(animateHandle);
        //旋转方体
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;

        //弹跳球
        step += 0.03;
        sphere.position.x = 10 + 10 * Math.cos(step);
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
        renderer.render(scene, camera);
      };
      animateHandle();
    };
    const init = () => {
      const containerEl = container.value;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        45,
        containerEl.clientWidth / containerEl.clientHeight,
        0.1,
        1000
      );
      camera.position.x = 40;
      camera.position.y = 40;
      camera.position.z = 40;
      camera.lookAt(scene.position);

      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0xeeeeee); //背景色
      renderer.setSize(containerEl.clientWidth, containerEl.clientHeight); //场景大小
      renderer.shadowMap.enabled = true; //启用阴影
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      containerEl.appendChild(renderer.domElement);
      addAxes();
      addLights();
      addCutes();
      renderer.render(scene, camera);
      animate();
    };
    onMounted(() => {
      init();
    });
    return {
      container,
    };
  },
};
</script>
<style lang="scss" scroped>
.webgl-container {
  width: 800px;
  height: 600px;
}
</style>
