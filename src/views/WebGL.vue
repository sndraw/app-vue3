<template>
  <div :ref="panelName" class="webgl-container"></div>
</template>
<script>
export default {
  data() {
    return {
      panelName: "WebGL-Panel",
      renderer: null,
      step: 1
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const THREE = this.$THREE;
      const container = this.$refs[this.panelName];
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.x = 40;
      camera.position.y = 40;
      camera.position.z = 40;
      camera.lookAt(scene.position);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor(0xeeeeee); //背景色
      this.renderer.setSize(container.clientWidth, container.clientHeight); //场景大小
      this.renderer.shadowMap.enabled = true; //启用阴影
      this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

      container.appendChild(this.renderer.domElement);
      this.addAxes(scene);
      this.addLights(scene);
      this.addCutes(scene);
      this.renderer.render(scene, camera);
      this.animate(scene, camera);
    },
    addAxes(scene) {
      const THREE = this.$THREE;

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
    },
    addLights(scene) {
      const THREE = this.$THREE;
      // 添加点光源
      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(40, 80, -20);
      spotLight.castShadow = true;
      spotLight.shadowMapHeight = 2048;
      spotLight.shadowMapWidth = 2048;
      scene.add(spotLight);
    },
    addCutes(scene) {
      const THREE = this.$THREE;

      //方体
      let cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffee6b });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.castShadow = true;
      this.cube.position.x = -10;
      this.cube.position.y = 10;
      scene.add(this.cube);

      //球体
      let sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
      let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
      this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      this.sphere.castShadow = true;
      this.sphere.position.x = 20;
      this.sphere.position.y = 5;
      this.sphere.position.z = 0;
      scene.add(this.sphere);
    },
    animate(scene, camera) {
      const animateHandle = () => {
        requestAnimationFrame(animateHandle);
        //旋转方体
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;

        //弹跳球
        this.step += 0.03;
        this.sphere.position.x = 10 + 10 * Math.cos(this.step);
        this.sphere.position.y = 2 + 10 * Math.abs(Math.sin(this.step));
        this.renderer.render(scene, camera);
      };
      animateHandle();
    }
  }
};
</script>
<style lang="scss" scroped>
.webgl-container {
  width: 800px;
  height: 600px;
}
</style>
