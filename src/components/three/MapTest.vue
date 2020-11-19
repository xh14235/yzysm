<template>
  <div id="container"></div>
</template>

<script>
import * as Three from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ThreeTest",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null
    };
  },
  methods: {
    init() {
      let container = document.getElementById("container");
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 0.6;
      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();
      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
    loadObj() {
      new MTLLoader().setPath("/models/").load("test.mtl", materials => {
        console.log("materials", materials);
        materials.preload();
        new OBJLoader()
          .setMaterials(materials)
          .setPath("/models/")
          .load("test.obj", obj => {
            obj.scale.set(0.001, 0.001, 0.001);
            obj.position.set(0, 0, 0);
            this.scene.add(obj);
          });
      });
    }
  },
  mounted() {
    this.init();
    setTimeout(() => {
      this.loadObj();
    }, 1000);
    setTimeout(() => {
      this.animate();
    }, 2000);
  }
};
</script>
<style scoped>
#container {
  height: 100%;
}
</style>
