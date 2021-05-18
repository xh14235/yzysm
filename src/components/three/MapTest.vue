<template>
  <div class="map-wrapper">
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Water } from "three/examples/jsm/objects/myWater";
import {
  CSS2DObject,
  CSS2DRenderer
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { MeshLine, MeshLineMaterial } from "three.meshline";

import TWEEN from "@tweenjs/tween.js";

import { mapMutations, mapState } from "vuex";

let mater = [];
let dimianMater = [];

let lineGeometry;
let lineMesh;
let lMesh;
let myLineMaterial;

let zhanguanMap;

//let compose;

let roadMap01, roadMap02, grassMap;
let shuye02Map, shuye02Mat, shuye02alphaMap;
let fangzi01Map, fangzi02Map, fangzi03Map;
let rxdMap01;

let shuye02Clone;
let shugan02Clone;
let shuye03Clone;
let shugan03Clone;
let shuye04Clone;
let shugan04Clone;

let fangzi01Clone,
  fangzi02Clone,
  fangzi03Clone,
  fangzi06Clone,
  fangzi11Clone,
  fangzi12Clone,
  fangzi13Clone;

let build08Clone;

let mySphere;
let mySphere2;
let labelRenderer;
let textureGuandao01,
  textureGuandao02,
  textureGuandao03,
  textureGuandao04,
  textureGuandao05,
  textureGuandao06,
  textureGuandao07,
  textureGuandao08,
  textureGuandao09;
let guandao01,
  guandao02,
  guandao03,
  guandao04,
  guandao05,
  guandao06,
  guandao07,
  guandao08,
  guandao09;

let zgClicked = -1;
let jzxClicked = -1;

let baojingVar = 0;
let baojingVar2 = 0;
let baojing2Start = false;
let skyCube = new Three.CubeTextureLoader()
  .setPath("/models/skyBox/")
  .load([
    "negz.jpg",
    "posz.jpg",
    "posy.jpg",
    "negy.jpg",
    "posx.jpg",
    "negx.jpg"
  ]);

function planeTree01() {
  let alphaMap = new Three.TextureLoader().load(
    "/models/planeTree01_alpha.jpg",
    texture => {
      texture.wrapS = texture.wrapT = Three.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 1);
    }
  );
  let map = new Three.TextureLoader().load(
    "/models/planeTree01.jpg",
    texture => {
      texture.wrapS = texture.wrapT = Three.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 1);
    }
  );
  let mater = new Three.MeshBasicMaterial({
    color: 0xffffff,
    map: map,
    transparent: true,
    side: Three.DoubleSide,
    alphaMap: alphaMap,
    depthTest: true,
    depthWrite: false
  });

  return mater;
}
function planeTree02() {
  let alphaMap = new Three.TextureLoader().load(
    "/models/planeTree02_alpha.jpg",
    texture => {
      texture.wrapS = texture.wrapT = Three.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 1);
    }
  );
  let map = new Three.TextureLoader().load(
    "/models/planeTree02.jpg",
    texture => {
      texture.wrapS = texture.wrapT = Three.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 1);
    }
  );
  let mater = new Three.MeshBasicMaterial({
    color: 0xffffff,
    map: map,
    transparent: true,
    side: Three.DoubleSide,
    alphaMap: alphaMap,
    depthTest: true,
    depthWrite: false
  });

  return mater;
}
let mater1,
  mater2,
  mater3,
  mater4,
  mater5,
  mater6,
  mater7,
  mater8,
  mater9,
  mater10,
  mater11,
  mater12,
  mater13,
  mater14,
  mater15,
  mater16,
  mater17,
  mater18,
  mater19;

let dimianMater1,
  dimianMater2,
  dimianMater3,
  dimianMater4,
  dimianMater5,
  dimianMater6,
  dimianMater7,
  dimianMater8,
  dimianMater9,
  dimianMater10,
  dimianMater11,
  dimianMater12,
  dimianMater13;
export default {
  name: "ThreeTest",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      lineArray: state => state.map.lineArray,
      taggingShow: state => state.map.taggingShow,
      alarmShow: state => state.map.alarmShow,
      pipingShow: state => state.map.pipingShow
    })
  },
  watch: {
    taggingShow() {
      this.biaoshiShow(this.taggingShow);
    },
    pipingShow() {
      this.guandaoShow(this.pipingShow);
    },
    alarmShow() {
      this.baojingShow(this.alarmShow);
    }
  },
  methods: {
    ...mapMutations([
      "changeFloor",
      "ChangeCubeShow",
      "toggleFloor",
      "changeMapTab"
    ]),
    init() {
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.mesh = null;
      this.mesh2 = null;
      this.mesh3 = null;
      this.mesh4 = null;
      this.mesh5 = null;
      this.controls = null;
      this.flyControls = null;
      this.delta = null;
      this.water1 = null;
      this.water2 = null;
      this.stats = null;
      this.tween = null;
      this.newPos = null;
      this.newTarget = null;
      this.zhanguanGroup = null;
      this.zhanguanlet = null;
      this.jzxGroup = null;
      this.jzxlet = null;
      this.zhanguanIforNo = null;
      this.floorGroup = null;
      this.labelGroup = null;
      this.guandaoGroup = null;
      this.shexiangtouGroup = null;
      this.textObj01 = null;
      this.textObj02 = null;
      this.textObj03 = null;
      this.textObj04 = null;
      this.textObj05 = null;
      this.labelZG01 = null;
      this.sky = null;
      let container = document.getElementById("container");
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        100
      );
      this.camera.position.set(-0.6, 0.5, 0.6);
      this.scene = new Three.Scene();

      this.jzxNewPos = new Three.Vector3(1.117718, 0.196214, 0.77074);
      this.jzxNewTarget = new Three.Vector3(1.1577938, -0.347188, -0.067774965);

      this.zgNewPos = new Three.Vector3(
        -0.1551230752320254,
        0.39430217437494747,
        0.44403209110839736
      );
      this.zgNewTarget = new Three.Vector3(0.683431172, 0.08528518, -0.0046719);

      this.zhanguanGroup = new Three.Group();
      this.jzxGroup = new Three.Group();
      this.floorGroup = new Three.Group();
      this.labelGroup = new Three.Group();
      this.guandaoGroup = new Three.Group();
      this.shexiangtouGroup = new Three.Group();

      this.floorGroup.visible = false;
      zhanguanMap = new Three.TextureLoader().load(
        "/models/31.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(0.5, 0.5);
        }
      );

      roadMap01 = new Three.TextureLoader().load(
        "/models/road01.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(1, 1.01);
          texture.generateMipmaps = false;
          texture.magFilter = Three.LinearFilter;
          texture.minFilter = Three.LinearFilter;
        }
      );

      roadMap02 = new Three.TextureLoader().load(
        "/models/road02.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(1, 1);
          texture.generateMipmaps = false;
          texture.magFilter = Three.LinearFilter;
          texture.minFilter = Three.LinearFilter;
        }
      );

      rxdMap01 = new Three.TextureLoader().load(
        "/models/rxd03.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(2, 3);
        }
      );

      grassMap = new Three.TextureLoader().load(
        "/models/grass04.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(1, 1);
        }
      );

      shuye02Map = new Three.TextureLoader().load(
        "/models/shuye02.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
        }
      );
      shuye02alphaMap = new Three.TextureLoader().load(
        "/models/shuye02_alpha.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
        }
      );
      fangzi01Map = new Three.TextureLoader().load(
        "/models/fangzi01UV.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(1, 1);
        }
      );
      fangzi02Map = new Three.TextureLoader().load(
        "/models/fangzi02UV02.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(1, 1);
        }
      );
      fangzi03Map = new Three.TextureLoader().load(
        "/models/fangzi06UV01.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(1, 1);
        }
      );

      shuye02Mat = new Three.MeshBasicMaterial({
        color: 0xffffff,
        map: shuye02Map,
        side: Three.DoubleSide,
        transparent: true,
        alphaMap: shuye02alphaMap,
        depthWrite: false
      });

      zhanguanMap = new Three.TextureLoader().load(
        "/models/31.jpg",
        texture => {
          texture.wrapS = texture.wrapT = Three.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(0.5, 0.5);
        }
      );

      this.zhanguanlet = 1;
      this.jzxlet = 1;

      mater.push(mater1);
      mater.push(mater2);
      mater.push(mater3);
      mater.push(mater4);
      mater.push(mater5);
      mater.push(mater6);
      mater.push(mater7);
      mater.push(mater8);
      mater.push(mater9);
      mater.push(mater10);
      mater.push(mater11);
      mater.push(mater12);
      mater.push(mater13);
      mater.push(mater14);
      mater.push(mater15);
      mater.push(mater16);
      mater.push(mater17);
      mater.push(mater18);
      mater.push(mater19);

      dimianMater.push(dimianMater1);
      dimianMater.push(dimianMater2);
      dimianMater.push(dimianMater3);
      dimianMater.push(dimianMater4);
      dimianMater.push(dimianMater5);
      dimianMater.push(dimianMater6);
      dimianMater.push(dimianMater7);
      dimianMater.push(dimianMater8);
      dimianMater.push(dimianMater9);
      dimianMater.push(dimianMater10);
      dimianMater.push(dimianMater11);
      dimianMater.push(dimianMater12);
      dimianMater.push(dimianMater13);

      let shaderSphere = new Three.SphereGeometry(0.1, 30, 20);
      let matSphere = new Three.ShaderMaterial({
        uniforms: {
          s: { type: "f", value: -0.8 },
          b: { type: "f", value: 0.5 },
          p: { type: "f", value: 1.0 },
          glowColor: { type: "c", value: new Three.Color("#DC143C") }
        },
        vertexShader:
          "" +
          "varying vec3 vNormal;" +
          "varying vec3 vPositionNormal;" +
          "void main(){" +
          "vNormal = normalize(normalMatrix * normal);" +
          "vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);" +
          "gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y * 0.1, position.z, 1.0 );" +
          "}",
        fragmentShader:
          "" +
          "uniform vec3 glowColor;" +
          "uniform float b;" +
          "uniform float p;" +
          "uniform float s;" +
          "varying vec3 vNormal;" +
          "varying vec3 vPositionNormal;" +
          "void main(){" +
          "float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );" +
          "gl_FragColor = vec4( glowColor, a );" +
          "}",
        side: Three.FrontSide,
        blending: Three.AdditiveBlending,
        transparent: true
      });
      mySphere = new Three.Mesh(shaderSphere, matSphere);
      mySphere2 = new Three.Mesh(shaderSphere, matSphere);
      mySphere.position.set(0.44, 0.23, 0.27);
      mySphere2.position.set(0.44, 0.235, 0.27);
      this.scene.add(mySphere);
      this.scene.add(mySphere2);

      shuye02Clone = new Three.Mesh();
      shugan02Clone = new Three.Mesh();
      shuye03Clone = new Three.Mesh();
      shugan03Clone = new Three.Mesh();
      shuye04Clone = new Three.Mesh();
      shugan04Clone = new Three.Mesh();

      fangzi02Clone = new Three.Mesh();

      // this.sky = new Three.CubeTextureLoader()
      //   .setPath("/models/skyBox/")
      //   .load([
      //     "negz.jpg",
      //     "posz.jpg",
      //     "posy.jpg",
      //     "negy.jpg",
      //     "posx.jpg",
      //     "negx.jpg"
      //   ]);

      this.scene.background = this.sky;
      let geometry = new Three.PlaneBufferGeometry(1, 1, 1);
      let geometry2 = new Three.PlaneBufferGeometry(3.59, 0.29, 1);

      let mesh1 = new Three.Mesh();
      let mesh2 = new Three.Mesh();
      let mesh3 = new Three.Mesh();
      let mesh4 = new Three.Mesh();
      let mesh5 = new Three.Mesh();
      let mesh6 = new Three.Mesh();
      let mesh7 = new Three.Mesh();
      let mesh8 = new Three.Mesh();
      let mesh9 = new Three.Mesh();
      let mesh10 = new Three.Mesh();
      let mesh11 = new Three.Mesh();
      let mesh12 = new Three.Mesh();
      let mesh13 = new Three.Mesh();

      this.meshGroup = [
        mesh1,
        mesh2,
        mesh3,
        mesh4,
        mesh5,
        mesh6,
        mesh7,
        mesh8,
        mesh9,
        mesh10,
        mesh11,
        mesh12,
        mesh13
      ];

      lineGeometry = new Three.Geometry();

      lineGeometry.vertices.push(
        new Three.Vector3(1.21, this.lineArray[0], 0.6),
        new Three.Vector3(1.191, this.lineArray[1], 0.6),
        new Three.Vector3(1.172, this.lineArray[2], 0.6),
        new Three.Vector3(1.153, this.lineArray[3], 0.6),
        new Three.Vector3(1.134, this.lineArray[4], 0.6),
        new Three.Vector3(1.115, this.lineArray[5], 0.6),
        new Three.Vector3(1.096, this.lineArray[6], 0.6),
        new Three.Vector3(1.077, this.lineArray[7], 0.6),
        new Three.Vector3(1.058, this.lineArray[8], 0.6),
        new Three.Vector3(1.039, this.lineArray[9], 0.6)
      );

      lineMesh = new MeshLine();
      lineMesh.setGeometry(lineGeometry);
      // console.log(lineMesh._points);
      let resolution = new Three.Vector2(window.innerWidth, window.innerHeight);
      myLineMaterial = new MeshLineMaterial({
        useMap: false,
        color: new Three.Color(0xed6a5a),
        opacity: 1,
        resolution: resolution,
        sizeAttenuation: false,
        lineWidth: 25,
        near: this.camera.near,
        far: this.camera.far
      });
      lMesh = new Three.Mesh(lineMesh.geometry, myLineMaterial);
      lMesh.visible = false;
      this.scene.add(lMesh);

      let curve01 = new Three.CatmullRomCurve3([
        new Three.Vector3(-0.1, 0.05, -0.77),
        new Three.Vector3(0.49, 0.05, -0.77),
        new Three.Vector3(0.5, 0.05, -0.77),
        new Three.Vector3(0.5, 0.05, 0.49),
        new Three.Vector3(0.5, 0.05, 0.5),
        new Three.Vector3(0.5, 0.05, 0.51),
        new Three.Vector3(0.654, 0.05, 0.51)
      ]);

      let curve02 = new Three.CatmullRomCurve3([
        new Three.Vector3(-0.29, 0.05, 0.43),
        new Three.Vector3(0.418, 0.05, 0.43),
        new Three.Vector3(0.419, 0.05, 0.43),
        new Three.Vector3(0.419, 0.05, 0.54),
        new Three.Vector3(0.42, 0.05, 0.54),
        new Three.Vector3(0.656, 0.05, 0.54)
      ]);

      let curve03 = new Three.CatmullRomCurve3([
        new Three.Vector3(0.1, 0.189, 0.781),
        new Three.Vector3(0.6, 0.189, 0.781),
        new Three.Vector3(0.601, 0.189, 0.781),
        new Three.Vector3(0.601, 0.049, 0.781),
        new Three.Vector3(0.601, 0.05, 0.781),
        new Three.Vector3(0.703, 0.05, 0.781)
      ]);

      let curve04 = new Three.CatmullRomCurve3([
        new Three.Vector3(0.899, 0.682, -0.1),
        new Three.Vector3(0.899, 0.682, 0.134),
        new Three.Vector3(0.899, 0.681, 0.134),
        new Three.Vector3(0.899, 0.034, 0.134),
        new Three.Vector3(0.899, 0.033, 0.134),
        new Three.Vector3(0.899, 0.033, 0.745),
        new Three.Vector3(0.899, 0.033, 0.746),
        new Three.Vector3(0.827, 0.033, 0.746)
      ]);

      let curve05 = new Three.CatmullRomCurve3([
        new Three.Vector3(-1.82, 0.05, 0.5),
        new Three.Vector3(-0.29, 0.05, 0.5),
        new Three.Vector3(-0.28, 0.05, 0.5),
        new Three.Vector3(-0.28, 0.05, 0.81),
        new Three.Vector3(-0.28, 0.05, 0.811),
        new Three.Vector3(0.703, 0.05, 0.811)
      ]);

      let curve06 = new Three.CatmullRomCurve3([
        new Three.Vector3(0.756, 0.05, 0.513),
        new Three.Vector3(0.756, 0.05, 0.099)
      ]);

      let curve07 = new Three.CatmullRomCurve3([
        new Three.Vector3(0.829, 0.05, 0.776),
        new Three.Vector3(0.928, 0.05, 0.776),
        new Three.Vector3(0.929, 0.05, 0.776),
        new Three.Vector3(0.929, 0.05, 0.055)
      ]);

      let curve08 = new Three.CatmullRomCurve3([
        new Three.Vector3(1.035, 0.05, 0.526),
        new Three.Vector3(0.959, 0.05, 0.526),
        new Three.Vector3(0.961, 0.05, 0.526),
        new Three.Vector3(0.961, 0.05, 0.055)
      ]);

      let curve09 = new Three.CatmullRomCurve3([
        new Three.Vector3(1.05, 0.05, 0.33),
        new Three.Vector3(0.992, 0.05, 0.33),
        new Three.Vector3(0.993, 0.05, 0.33),
        new Three.Vector3(0.993, 0.05, 0.055)
      ]);

      let tubeGeometry01 = new Three.TubeGeometry(curve01, 32, 0.01, 2, false);
      let tubeGeometry02 = new Three.TubeGeometry(curve02, 32, 0.01, 2, false);
      let tubeGeometry03 = new Three.TubeGeometry(curve03, 32, 0.01, 2, false);
      let tubeGeometry04 = new Three.TubeGeometry(curve04, 32, 0.01, 2, false);
      let tubeGeometry05 = new Three.TubeGeometry(curve05, 32, 0.01, 2, false);
      let tubeGeometry06 = new Three.TubeGeometry(curve06, 32, 0.01, 2, false);
      let tubeGeometry07 = new Three.TubeGeometry(curve07, 32, 0.01, 2, false);
      let tubeGeometry08 = new Three.TubeGeometry(curve08, 32, 0.01, 2, false);
      let tubeGeometry09 = new Three.TubeGeometry(curve09, 32, 0.01, 2, false);

      let textureLoader = new Three.TextureLoader();
      textureGuandao01 = textureLoader.load("/models/img/arrow-blue.png");

      textureGuandao01.wrapS = Three.RepeatWrapping;
      textureGuandao01.wrapT = Three.RepeatWrapping;

      textureGuandao01.repeat.x = 80;
      textureGuandao01.repeat.y = 2;

      textureGuandao02 = textureLoader.load("/models/img/arrow-blue.png");

      textureGuandao02.wrapS = Three.RepeatWrapping;
      textureGuandao02.wrapT = Three.RepeatWrapping;

      textureGuandao02.repeat.x = 40;
      textureGuandao02.repeat.y = 2;

      textureGuandao03 = textureLoader.load("/models/img/arrow-red.png");

      textureGuandao03.wrapS = Three.RepeatWrapping;
      textureGuandao03.wrapT = Three.RepeatWrapping;

      textureGuandao03.repeat.x = 20;
      textureGuandao03.repeat.y = 2;

      textureGuandao04 = textureLoader.load("/models/img/arrow-red.png");

      textureGuandao04.wrapS = Three.RepeatWrapping;
      textureGuandao04.wrapT = Three.RepeatWrapping;

      textureGuandao04.repeat.x = 40;
      textureGuandao04.repeat.y = 2;

      textureGuandao05 = textureLoader.load("/models/img/arrow-red.png");

      textureGuandao05.wrapS = Three.RepeatWrapping;
      textureGuandao05.wrapT = Three.RepeatWrapping;

      textureGuandao05.repeat.x = 40;
      textureGuandao05.repeat.y = 2;

      textureGuandao06 = textureLoader.load("/models/img/arrow-green.png");

      textureGuandao06.wrapS = Three.RepeatWrapping;
      textureGuandao06.wrapT = Three.RepeatWrapping;

      textureGuandao06.repeat.x = 20;
      textureGuandao06.repeat.y = 2;

      textureGuandao07 = textureLoader.load("/models/img/arrow-green.png");

      textureGuandao07.wrapS = Three.RepeatWrapping;
      textureGuandao07.wrapT = Three.RepeatWrapping;

      textureGuandao07.repeat.x = 20;
      textureGuandao07.repeat.y = 2;

      textureGuandao08 = textureLoader.load("/models/img/arrow-green.png");

      textureGuandao08.wrapS = Three.RepeatWrapping;
      textureGuandao08.wrapT = Three.RepeatWrapping;

      textureGuandao08.repeat.x = 20;
      textureGuandao08.repeat.y = 2;

      textureGuandao09 = textureLoader.load("/models/img/arrow-green.png");

      textureGuandao09.wrapS = Three.RepeatWrapping;
      textureGuandao09.wrapT = Three.RepeatWrapping;

      textureGuandao09.repeat.x = 20;
      textureGuandao09.repeat.y = 2;
      guandao01 = new Three.Mesh(
        tubeGeometry01,
        this.loadTexture(textureGuandao01, 0x04aec6)
      );
      this.guandaoGroup.add(guandao01);

      guandao02 = new Three.Mesh(
        tubeGeometry02,
        this.loadTexture(textureGuandao02, 0x04aec6)
      );
      this.guandaoGroup.add(guandao02);

      guandao03 = new Three.Mesh(
        tubeGeometry03,
        this.loadTexture(textureGuandao03, 0xe87a6f)
      );
      this.guandaoGroup.add(guandao03);

      guandao04 = new Three.Mesh(
        tubeGeometry04,
        this.loadTexture(textureGuandao04, 0xe87a6f)
      );
      this.guandaoGroup.add(guandao04);

      guandao05 = new Three.Mesh(
        tubeGeometry05,
        this.loadTexture(textureGuandao05, 0xe87a6f)
      );
      this.guandaoGroup.add(guandao05);

      guandao06 = new Three.Mesh(
        tubeGeometry06,
        this.loadTexture(textureGuandao06, 0x00e7a1)
      );
      this.guandaoGroup.add(guandao06);

      guandao07 = new Three.Mesh(
        tubeGeometry07,
        this.loadTexture(textureGuandao07, 0x00e7a1)
      );
      this.guandaoGroup.add(guandao07);

      guandao08 = new Three.Mesh(
        tubeGeometry08,
        this.loadTexture(textureGuandao08, 0x00e7a1)
      );
      this.guandaoGroup.add(guandao08);

      guandao09 = new Three.Mesh(
        tubeGeometry09,
        this.loadTexture(textureGuandao09, 0x00e7a1)
      );
      this.guandaoGroup.add(guandao09);

      this.scene.add(this.guandaoGroup);

      this.water1 = new Water(geometry, {
        color: "#c0e3ef",
        scale: 0.01,
        flowDirection: new Three.Vector2(1, 1),
        textureWidth: 1024,
        textureHeight: 1024
      });
      this.water1.rotation.x = -0.5 * Math.PI;
      this.water1.position.set(0, 0.02, 0);
      this.scene.add(this.water1);

      this.water2 = new Water(geometry2, {
        color: "#ecf9ea",
        scale: 0.01,
        flowDirection: new Three.Vector2(1, 1),
        textureWidth: 1024,
        textureHeight: 1024
      });
      this.water2.rotation.x = -0.5 * Math.PI;
      this.water2.position.set(-0.31, -0.045, -0.85);
      this.scene.add(this.water2);

      let label01 = this.create2DText(
        "label01",
        new Three.Vector3(0.7, 0.79, -0.3),
        "label01Style"
      );
      this.labelGroup.add(label01);

      let label02 = this.create2DText(
        "label02",
        new Three.Vector3(-1.85, 0.37, 0.46),
        "label02Style"
      );
      this.labelGroup.add(label02);

      let label03 = this.create2DText(
        "label03",
        new Three.Vector3(0.41, 0.29, 0.25),
        "label03Style"
      );
      this.labelGroup.add(label03);

      let label04 = this.create2DText(
        "label04",
        new Three.Vector3(0.75, 0.27, 0.43),
        "label04Style"
      );
      this.labelGroup.add(label04);

      let label05 = this.create2DText(
        "label05",
        new Three.Vector3(-0.39, 0.32, 0.47),
        "label05Style"
      );
      this.labelGroup.add(label05);

      let label06 = this.create2DText(
        "label06",
        new Three.Vector3(0.1, 0.31, 0.75),
        "label06Style"
      );
      this.labelGroup.add(label06);

      let label07 = this.create2DText(
        "label07",
        new Three.Vector3(-0.17, 0.29, -0.78),
        "label07Style"
      );
      this.labelGroup.add(label07);

      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.top = "0";
      labelRenderer.domElement.style.pointerEvents = "none";
      document
        .getElementById("container")
        .appendChild(labelRenderer.domElement);

      labelRenderer.render(this.scene, this.camera);

      setInterval(this.lineValue, 10000);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 0.8;
      this.controls.maxDistance = 2;
      this.controls.maxPolarAngle = Math.PI / 2.5;
      this.controls.enablePan = false;

      window.addEventListener("resize", this.onWindowResize, false);
      window.addEventListener("mousemove", this.onDocumentMouseMove, false);

      window.addEventListener("click", e => {
        if (e.button === 0) {
          let raycaster = new Three.Raycaster();
          let mouse = new Three.Vector2();
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          raycaster.setFromCamera(mouse, this.camera);
          let intersects = raycaster.intersectObjects(
            this.jzxGroup.children,
            true
          );
          let intersects2 = raycaster.intersectObjects(
            this.zhanguanGroup.children,
            true
          );
          let intersects3 = raycaster.intersectObjects(
            this.floorGroup.children,
            true
          );
          let intersects4 = raycaster.intersectObjects(
            this.shexiangtouGroup.children,
            true
          );

          if (intersects.length > 0 && intersects2.length === 0) {
            this.ChangeCubeShow();
            jzxClicked = jzxClicked * -1;

            let oldPos = new Three.Vector3(
              this.camera.position.x,
              this.camera.position.y,
              this.camera.position.z
            );
            let oldTarget = new Three.Vector3(
              this.controls.target.x,
              this.controls.target.y,
              this.controls.target.z
            );

            this.animateCamera(
              this.camera.position,
              this.controls.target,
              this.jzxNewPos,
              this.jzxNewTarget,
              jzxClicked,
              lMesh
            );

            this.jzxNewPos = oldPos;
            this.jzxNewTarget = oldTarget;
          }

          if (intersects2.length > 0 && intersects.length === 0) {
            // this.toCunsumePage();
            this.toggleFloor();
            zgClicked = zgClicked * -1;
            let oldPos = new Three.Vector3(
              this.camera.position.x,
              this.camera.position.y,
              this.camera.position.z
            );
            let oldTarget = new Three.Vector3(
              this.controls.target.x,
              this.controls.target.y,
              this.controls.target.z
            );

            this.animateCamera(
              this.camera.position,
              this.controls.target,
              this.zgNewPos,
              this.zgNewTarget,
              zgClicked,
              this.floorGroup
            );

            this.zgNewPos = oldPos;
            this.zgNewTarget = oldTarget;
          }
          if (intersects3.length > 0) {
            let res = intersects3.filter(res => {
              return res && res.object;
            })[0];
            if (res && res.object) {
              if (res.object.name === "floor05") {
                this.changeFloor(0);
              }
              if (res.object.name === "Plane015") {
                this.changeFloor(0);
              }
              if (res.object.name === "floor3") {
                this.changeFloor(3);
              }
              if (res.object.name === "floor2") {
                this.changeFloor(2);
              }
              if (res.object.name === "floor1") {
                this.changeFloor(1);
              }
            }
          }
          if (intersects4.length > 0) {
            this.changeMonitor();
          }
        }
      });
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.meshGroup[0].rotateY(0.01);
      this.meshGroup[1].rotateY(0.02);
      this.meshGroup[2].rotateY(0.03);
      this.meshGroup[3].rotateY(0.02);
      this.meshGroup[4].rotateY(0.03);

      this.controls.update();

      baojingVar += 0.02;
      if (baojingVar > 1) {
        baojing2Start = true;
      }
      if (baojingVar > 2) {
        baojingVar = 0;
      }
      mySphere.scale.x = baojingVar;
      mySphere.scale.z = baojingVar;

      if (baojing2Start === true) {
        baojingVar2 += 0.02;
        if (baojingVar2 > 2) {
          baojingVar2 = 0;
        }

        mySphere2.scale.x = baojingVar2;
        mySphere2.scale.z = baojingVar2;
      }

      labelRenderer.render(this.scene, this.camera);
      TWEEN.update();
      this.renderer.render(this.scene, this.camera);
      textureGuandao01.offset.x -= 0.06;
      textureGuandao02.offset.x -= 0.06;
      textureGuandao03.offset.x -= 0.06;
      textureGuandao04.offset.x -= 0.06;
      textureGuandao05.offset.x -= 0.06;
      textureGuandao06.offset.x -= 0.06;
      textureGuandao07.offset.x -= 0.06;
      textureGuandao08.offset.x -= 0.06;
      textureGuandao09.offset.x -= 0.06;
    },
    loadObj() {
      let childThis = this;
      new FBXLoader().setPath("/models/").load("dimian01.FBX", object => {
        object.traverse(child => {
          let lightMap = new Three.TextureLoader().load(
            "/models/dimian01LightingMap.jpg"
          );
          let map = new Three.TextureLoader().load(
            "/models/27.png",
            texture => {
              texture.wrapS = texture.wrapT = Three.RepeatWrapping;
              texture.offset.set(0, 0);
              texture.repeat.set(2, 1);
            }
          );
          dimianMater[0] = new Three.MeshBasicMaterial({
            color: 0xc0c0c0,
            lightMap: lightMap,
            map: map
          });
          child.material = dimianMater[0];
        });
        object.scale.set(0.001, 0.001, 0.001);
        this.scene.add(object);
      }),
        new FBXLoader().setPath("/models/").load("dimian02.FBX", object2 => {
          object2.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian02LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/grass04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            dimianMater[1] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[1];
          });
          object2.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object2);
        }),
        new FBXLoader().setPath("/models/").load("dimian03.FBX", object3 => {
          object3.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian03LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/27.png",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(0.6, 0.6);
              }
            );
            dimianMater[2] = new Three.MeshBasicMaterial({
              color: 0xc0c0c0,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[2];
          });
          object3.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object3);
        }),
        new FBXLoader().setPath("/models/").load("dimian04.FBX", object4 => {
          object4.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian04LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            dimianMater[3] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[3];
          });
          object4.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object4);
        }),
        new FBXLoader().setPath("/models/").load("dimian05.FBX", object5 => {
          object5.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian05LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            dimianMater[4] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[4];
          });
          object5.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object5);
        }),
        new FBXLoader().setPath("/models/").load("dimian06.FBX", object6 => {
          object6.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian06LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            dimianMater[5] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[5];
          });
          object6.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object6);
        }),
        new FBXLoader().setPath("/models/").load("dimian07.FBX", object7 => {
          object7.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian07LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/17.png",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            dimianMater[6] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[6];
          });
          object7.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object7);
        }),
        new FBXLoader().setPath("/models/").load("dimian08.FBX", object8 => {
          object8.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian08LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/grass04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            dimianMater[7] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[7];
          });
          object8.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object8);
        }),
        new FBXLoader().setPath("/models/").load("dimian09.FBX", object9 => {
          object9.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian09LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/27.png",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            dimianMater[8] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[8];
          });
          object9.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object9);
        }),
        new FBXLoader().setPath("/models/").load("dimian10.FBX", object10 => {
          object10.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian10LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            dimianMater[9] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[9];
          });
          object10.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object10);
        }),
        new FBXLoader().setPath("/models/").load("dimian11.FBX", object11 => {
          object11.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian11LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/STON04M.JPG",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(0.5, 0.7);
              }
            );
            dimianMater[10] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[10];
          });
          object11.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object11);
        }),
        new FBXLoader().setPath("/models/").load("dimian12.FBX", dimian12 => {
          dimian12.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian12LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/27.png",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(0.5, 0.7);
              }
            );
            dimianMater[11] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[11];
          });
          dimian12.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dimian12);
        }),
        new FBXLoader().setPath("/models/").load("dimian13.FBX", dimian13 => {
          dimian13.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dimian13LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/27.png",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(0.5, 0.7);
              }
            );
            dimianMater[12] = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = dimianMater[12];
          });
          dimian13.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dimian13);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("zheyangpeng01.FBX", zheyangpeng01 => {
            zheyangpeng01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zheyangpeng01LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(0.5, 0.7);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zheyangpeng01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zheyangpeng01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zheyangpeng02.FBX", zheyangpeng02 => {
            zheyangpeng02.traverse(child => {
              let mater = new Three.MeshBasicMaterial({
                color: 0x87cefa,
                side: Three.DoubleSide,
                transparent: true,
                opacity: 0.5,
                envMap: skyCube
              });
              child.material = mater;
            });
            zheyangpeng02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zheyangpeng02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zheyangpeng03.FBX", zheyangpeng03 => {
            zheyangpeng03.traverse(child => {
              let mater = new Three.MeshBasicMaterial({
                color: 0x808080,
                side: Three.DoubleSide,
                transparent: true,
                opacity: 1
              });
              child.material = mater;
            });
            zheyangpeng03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zheyangpeng03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zheyangpeng04.FBX", zheyangpeng04 => {
            zheyangpeng04.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zheyangpeng04LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(0.5, 0.7);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zheyangpeng04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zheyangpeng04);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zheyangpeng05.FBX", zheyangpeng05 => {
            zheyangpeng05.traverse(child => {
              let mater = new Three.MeshBasicMaterial({
                color: 0x87cefa,
                side: Three.DoubleSide,
                transparent: true,
                opacity: 0.5,
                envMap: skyCube
              });
              child.material = mater;
            });
            zheyangpeng05.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zheyangpeng05);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zheyangpeng06.FBX", zheyangpeng06 => {
            zheyangpeng06.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zheyangpeng06LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0x808080,
                side: Three.DoubleSide,
                lightmap: lightMap,
                transparent: true,
                opacity: 1
              });
              child.material = mater;
            });
            zheyangpeng06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zheyangpeng06);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("fenglifadian.FBX", fenglifadian => {
            fenglifadian.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/fenglifadianLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            fenglifadian.scale.set(0.001, 0.001, 0.001);
            this.scene.add(fenglifadian);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("fengjiye01.FBX", fengjiye01 => {
            fengjiye01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/fengjiye01LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });

            fengjiye01.scale.set(0.001, 0.001, 0.001);
            fengjiye01.position.set(-1.781, 0.225, 0.545);
            this.meshGroup[0] = fengjiye01;

            this.meshGroup[1] = this.meshGroup[0].clone();
            this.meshGroup[1].position.set(-1.7, 0.18, 0.49);
            this.meshGroup[1].scale.set(0.0008, 0.0008, 0.0008);

            this.meshGroup[2] = this.meshGroup[0].clone();
            this.meshGroup[2].position.set(-1.804, 0.188, 0.473);
            this.meshGroup[2].scale.set(0.00085, 0.00085, 0.00085);

            this.meshGroup[3] = this.meshGroup[0].clone();
            this.meshGroup[3].position.set(-1.703, 0.13, 0.592);
            this.meshGroup[3].scale.set(0.0006, 0.0006, 0.0006);

            this.meshGroup[4] = this.meshGroup[0].clone();
            this.meshGroup[4].position.set(-1.866, 0.145, 0.591);
            this.meshGroup[4].scale.set(0.0007, 0.0007, 0.0007);

            this.scene.add(this.meshGroup[0]);
            this.scene.add(this.meshGroup[1]);
            this.scene.add(this.meshGroup[2]);
            this.scene.add(this.meshGroup[3]);
            this.scene.add(this.meshGroup[4]);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan01.FBX", zhanguan01 => {
            zhanguan01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan01LightingMap.jpg"
              );
              mater[0] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: zhanguanMap
              });
              child.material = mater[0];
            });
            zhanguan01.scale.set(0.001, 0.001, 0.001);
            console.log(zhanguan01);
            childThis.zhanguanGroup.add(zhanguan01);
            console.log(childThis.zhanguanGroup);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan02.FBX", zhanguan02 => {
            zhanguan02.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan02LightingMap.jpg"
              );
              mater[1] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: zhanguanMap
              });
              child.material = mater[1];
            });
            zhanguan02.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan03.FBX", zhanguan03 => {
            zhanguan03.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan03LightingMap.jpg"
              );
              mater[2] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: zhanguanMap
              });
              child.material = mater[2];
            });
            zhanguan03.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan04.FBX", zhanguan04 => {
            zhanguan04.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan04LightingMap.jpg"
              );
              mater[3] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: zhanguanMap
              });
              child.material = mater[3];
            });
            zhanguan04.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan04);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan05.FBX", zhanguan05 => {
            zhanguan05.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan05LightingMap.jpg"
              );
              mater[4] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: zhanguanMap
              });
              child.material = mater[4];
            });
            zhanguan05.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan05);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan06.FBX", zhanguan06 => {
            zhanguan06.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan06LightingMap.jpg"
              );

              mater[5] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: zhanguanMap
              });
              child.material = mater[5];
            });
            zhanguan06.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan06);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan07.FBX", zhanguan07 => {
            zhanguan07.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan07LightingMap.jpg"
              );
              mater[6] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater[6];
            });
            zhanguan07.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan07);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan08.FBX", zhanguan08 => {
            zhanguan08.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan08LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              mater[7] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater[7];
            });
            zhanguan08.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan08);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan09.FBX", zhanguan09 => {
            zhanguan09.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan09LightingMap.jpg"
              );
              mater[8] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater[8];
            });
            zhanguan09.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan09);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan10.FBX", zhanguan10 => {
            zhanguan10.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan10LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              mater[9] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater[9];
            });
            zhanguan10.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan10);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan11.FBX", zhanguan11 => {
            zhanguan11.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan11LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              mater[10] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater[10];
            });
            zhanguan11.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan11);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan12.FBX", zhanguan12 => {
            zhanguan12.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan12LightingMap.jpg"
              );
              mater[11] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater[11];
            });
            zhanguan12.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan12);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan13.FBX", zhanguan13 => {
            zhanguan13.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan13LightingMap.jpg"
              );
              mater[12] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater[12];
            });
            zhanguan13.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan13);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan14.FBX", zhanguan14 => {
            zhanguan14.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan14LightingMap.jpg"
              );
              mater[13] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater[13];
            });
            zhanguan14.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan14);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan15.FBX", zhanguan15 => {
            zhanguan15.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan15LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/pv.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              mater[14] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater[14];
            });
            zhanguan15.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan15);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan16.FBX", zhanguan16 => {
            zhanguan16.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan16LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              mater[15] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater[15];
            });
            zhanguan16.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan16);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan17.FBX", zhanguan17 => {
            zhanguan17.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan17LightingMap.jpg"
              );
              mater[16] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater[16];
            });
            zhanguan17.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan17);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan18.FBX", zhanguan18 => {
            zhanguan18.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan18LightingMap.jpg"
              );
              mater[17] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater[17];
            });
            zhanguan18.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan18);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan19.FBX", zhanguan19 => {
            zhanguan19.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan19LightingMap.jpg"
              );
              mater[18] = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater[18];
            });
            zhanguan19.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan19);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan20.FBX", zhanguan20 => {
            zhanguan20.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguan20LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan20.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(zhanguan20);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("huabiankuang.FBX", huabiankuang => {
            huabiankuang.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/huabiankuangLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            huabiankuang.scale.set(0.001, 0.001, 0.001);
            childThis.zhanguanGroup.add(huabiankuang);
          }),
        new FBXLoader().setPath("/models/").load("hua.FBX", hua => {
          hua.traverse(child => {
            let map = new Three.TextureLoader().load("/models/hua.jpg");
            let mater = new Three.MeshBasicMaterial({
              color: 0xd3d3d3,
              map: map
            });
            child.material = mater;
          });
          hua.scale.set(0.001, 0.001, 0.001);
          childThis.zhanguanGroup.add(hua);
        }),
        this.scene.add(this.zhanguanGroup);

      new FBXLoader()
        .setPath("/models/")
        .load("zhanguanbiaogan.FBX", zhanguanbiaogan => {
          zhanguanbiaogan.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff
            });
            child.material = mater;
          });
          zhanguanbiaogan.scale.set(0.001, 0.001, 0.001);
          this.floorGroup.add(zhanguanbiaogan);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguanlouceng05.FBX", zhanguanlouceng05 => {
            zhanguanlouceng05.traverse(child => {
              let map = new Three.TextureLoader().load("/models/img/back.png");
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map,
                transparent: true,
                opacity: 1
              });
              child.material = mater;
            });
            zhanguanlouceng05.scale.set(0.001, 0.001, 0.001);
            this.floorGroup.add(zhanguanlouceng05);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguanlouceng04.FBX", zhanguanlouceng04 => {
            zhanguanlouceng04.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/img/All-Not selected.png"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map,
                transparent: true,
                opacity: 1
              });
              child.material = mater;
            });
            zhanguanlouceng04.scale.set(0.001, 0.001, 0.001);
            this.floorGroup.add(zhanguanlouceng04);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguanlouceng03.FBX", zhanguanlouceng03 => {
            zhanguanlouceng03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/img/3F-Not selected.png"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map,
                transparent: true,
                opacity: 1
              });
              child.material = mater;
            });
            zhanguanlouceng03.scale.set(0.001, 0.001, 0.001);
            this.floorGroup.add(zhanguanlouceng03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguanlouceng02.FBX", zhanguanlouceng02 => {
            zhanguanlouceng02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/img/2F-Not selected.png"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map,
                transparent: true,
                opacity: 1
              });
              child.material = mater;
            });
            zhanguanlouceng02.scale.set(0.001, 0.001, 0.001);
            this.floorGroup.add(zhanguanlouceng02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguanlouceng01.FBX", zhanguanlouceng01 => {
            zhanguanlouceng01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/img/1F-Not selected.png"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map,
                transparent: true,
                opacity: 1
              });
              child.material = mater;
            });
            zhanguanlouceng01.scale.set(0.001, 0.001, 0.001);
            this.floorGroup.add(zhanguanlouceng01);
          }),
        this.scene.add(this.floorGroup);
      new FBXLoader()
        .setPath("/models/")
        .load("jizhuangxiang01.FBX", jizhuangxiang01 => {
          jizhuangxiang01.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/jizhuangxiang01LightingMap.jpg"
            );
            let mater = new Three.MeshPhysicalMaterial({
              color: 0xffffff,
              metalness: 0.2,
              roughness: 0.1,
              lightMap: lightMap,
              envMap: skyCube
            });
            child.material = mater;
          });
          jizhuangxiang01.scale.set(0.001, 0.001, 0.001);
          childThis.jzxGroup.add(jizhuangxiang01);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang02.FBX", jizhuangxiang02 => {
            jizhuangxiang02.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang02LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang02.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang03.FBX", jizhuangxiang03 => {
            jizhuangxiang03.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang03LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: map
              });
              child.material = mater;
            });
            jizhuangxiang03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang04.FBX", jizhuangxiang04 => {
            jizhuangxiang04.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang04LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang04.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang04);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang05.FBX", jizhuangxiang05 => {
            jizhuangxiang05.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang05LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang05.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang05);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang06.FBX", jizhuangxiang06 => {
            jizhuangxiang06.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang06LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: map
              });
              child.material = mater;
            });
            jizhuangxiang06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang06);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang07.FBX", jizhuangxiang07 => {
            jizhuangxiang07.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang07LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang07.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang07);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang08.FBX", jizhuangxiang08 => {
            jizhuangxiang08.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang08LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang08.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang08);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang09.FBX", jizhuangxiang09 => {
            jizhuangxiang09.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang09LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: map
              });
              child.material = mater;
            });
            jizhuangxiang09.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang09);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang10.FBX", jizhuangxiang10 => {
            jizhuangxiang10.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang10LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang10.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang10);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang11.FBX", jizhuangxiang11 => {
            jizhuangxiang11.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang11LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang11.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang11);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang12.FBX", jizhuangxiang12 => {
            jizhuangxiang12.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang12LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: map
              });
              child.material = mater;
            });
            jizhuangxiang12.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang12);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang13.FBX", jizhuangxiang13 => {
            jizhuangxiang13.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang13LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang13.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang13);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang14.FBX", jizhuangxiang14 => {
            jizhuangxiang14.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang14LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang14.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang14);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang15.FBX", jizhuangxiang15 => {
            jizhuangxiang15.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang15LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: map
              });
              child.material = mater;
            });
            jizhuangxiang15.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang15);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang16.FBX", jizhuangxiang16 => {
            jizhuangxiang16.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang16LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang16.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang16);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang17.FBX", jizhuangxiang17 => {
            jizhuangxiang17.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang17LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: skyCube
              });
              child.material = mater;
            });
            jizhuangxiang17.scale.set(0.001, 0.001, 0.001);
            childThis.jzxGroup.add(jizhuangxiang17);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang18.FBX", jizhuangxiang18 => {
            jizhuangxiang18.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang18LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0.1,
                lightMap: lightMap,
                envMap: map
              });
              child.material = mater;
            });
            jizhuangxiang18.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang18);
          }),
        this.scene.add(childThis.jzxGroup);
      new FBXLoader()
        .setPath("/models/")
        .load("qiutizhizhu.FBX", qiutizhizhu => {
          qiutizhizhu.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/qiutizhizhuLightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap
            });
            child.material = mater;
          });
          qiutizhizhu.scale.set(0.001, 0.001, 0.001);
          this.scene.add(qiutizhizhu);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("qiutigangjia.FBX", qiutigangjia => {
            qiutigangjia.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/qiutigangjiaLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            qiutigangjia.scale.set(0.001, 0.001, 0.001);
            this.scene.add(qiutigangjia);
          }),
        new FBXLoader().setPath("/models/").load("qiutiboli.FBX", qiutiboli => {
          qiutiboli.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0x87cefa,
              side: Three.DoubleSide,
              transparent: true,
              opacity: 0.5,
              envMap: skyCube
            });
            child.material = mater;
          });
          qiutiboli.scale.set(0.001, 0.001, 0.001);
          this.scene.add(qiutiboli);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("qiutidaping.FBX", qiutidaping => {
            qiutidaping.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/qiutidapingLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            qiutidaping.scale.set(0.001, 0.001, 0.001);
            this.scene.add(qiutidaping);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang01.FBX", weiqiang01 => {
            weiqiang01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang01LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/31.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            weiqiang01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang02.FBX", weiqiang02 => {
            weiqiang02.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang02LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/31.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            weiqiang02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang03.FBX", weiqiang03 => {
            weiqiang03.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang03LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/31.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            weiqiang03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang04.FBX", weiqiang04 => {
            weiqiang04.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang04LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/31.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            weiqiang04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang04);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang05.FBX", weiqiang05 => {
            weiqiang05.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang05LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            weiqiang05.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang05);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang06.FBX", weiqiang06 => {
            weiqiang06.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang06LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            weiqiang06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang06);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang07.FBX", weiqiang07 => {
            weiqiang07.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang07LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            weiqiang07.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang07);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang08.FBX", weiqiang08 => {
            weiqiang08.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang08LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            weiqiang08.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang08);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang09.FBX", weiqiang09 => {
            weiqiang09.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang09LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/STON04M.JPG",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            weiqiang09.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang09);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang10.FBX", weiqiang10 => {
            weiqiang10.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang10LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            weiqiang10.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang10);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang11.FBX", weiqiang11 => {
            weiqiang11.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang11LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            weiqiang11.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang11);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang12.FBX", weiqiang12 => {
            weiqiang12.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/weiqiang12LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            weiqiang12.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang12);
          }),
        new FBXLoader().setPath("/models/").load("shanlan01.FBX", shanlan01 => {
          shanlan01.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shanlan01LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          shanlan01.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan01);
        }),
        new FBXLoader().setPath("/models/").load("shanlan02.FBX", shanlan02 => {
          shanlan02.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shanlan02LightingMap.jpg"
            );
            let alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap
            });
            child.material = mater;
          });
          shanlan02.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan02);
        }),
        new FBXLoader().setPath("/models/").load("shanlan03.FBX", shanlan03 => {
          shanlan03.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shanlan03LightingMap.jpg"
            );
            let alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap
            });
            child.material = mater;
          });
          shanlan03.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan03);
        }),
        new FBXLoader().setPath("/models/").load("shanlan04.FBX", shanlan04 => {
          shanlan04.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shanlan04LightingMap.jpg"
            );
            let alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap
            });
            child.material = mater;
          });
          shanlan04.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan04);
        }),
        new FBXLoader().setPath("/models/").load("shanlan05.FBX", shanlan05 => {
          shanlan05.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shanlan05LightingMap.jpg"
            );
            let alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap
            });
            child.material = mater;
          });
          shanlan05.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan05);
        }),
        new FBXLoader().setPath("/models/").load("shanlan06.FBX", shanlan06 => {
          shanlan06.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shanlan06LightingMap.jpg"
            );
            let alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap
            });
            child.material = mater;
          });
          shanlan06.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan06);
        }),
        new FBXLoader().setPath("/models/").load("shanlan07.FBX", shanlan07 => {
          shanlan07.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shanlan07LightingMap.jpg"
            );
            let alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map,

              side: Three.DoubleSide,
              alphaMap: alphaMap
            });
            child.material = mater;
          });
          shanlan07.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan07);
        }),
        new FBXLoader().setPath("/models/").load("shanlan08.FBX", shanlan08 => {
          shanlan08.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shanlan08LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap
            });
            child.material = mater;
          });
          shanlan08.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan08);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("shexiangtou01.FBX", shexiangtou01 => {
            shexiangtou01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/shexiangtou01LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            shexiangtou01.scale.set(0.001, 0.001, 0.001);
            this.shexiangtouGroup.add(shexiangtou01);
            this.scene.add(this.shexiangtouGroup);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("youyongchi01.FBX", youyongchi01 => {
            youyongchi01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/youyongchi01LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/28.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            youyongchi01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(youyongchi01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("youyongchi02.FBX", youyongchi02 => {
            youyongchi02.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/youyongchi02LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/29.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            youyongchi02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(youyongchi02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("guangfuban01.FBX", guangfuban01 => {
            guangfuban01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/guangfuban01LightingMap.jpg"
              );
              let mater = new Three.MeshPhysicalMaterial({
                color: 0x2d3959,
                lightMap: lightMap,
                metalness: 0.1,
                roughness: 0.2,
                envMap: skyCube
              });
              child.material = mater;
            });
            guangfuban01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(guangfuban01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("guangfuban03.FBX", guangfuban03 => {
            guangfuban03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/taiyangban.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0x050885,
                map: map
              });
              child.material = mater;
            });
            guangfuban03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(guangfuban03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("guangfubanjiazi01.FBX", guangfubanjiazi01 => {
            guangfubanjiazi01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/guangfubanjiazi01LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            guangfubanjiazi01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(guangfubanjiazi01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("guangfubanjiazi02.FBX", guangfubanjiazi02 => {
            guangfubanjiazi02.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/guangfubanjiazi02LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            guangfubanjiazi02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(guangfubanjiazi02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zixingchepeng01.FBX", zixingchepeng01 => {
            zixingchepeng01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zixingchepeng01LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zixingchepeng01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zixingchepeng01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zixingchepeng02.FBX", zixingchepeng02 => {
            zixingchepeng02.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zixingchepeng02LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zixingchepeng02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zixingchepeng02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("biaoshigan.FBX", biaoshigan => {
            biaoshigan.traverse(child => {
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff
              });
              child.material = mater;
            });
            biaoshigan.scale.set(0.001, 0.001, 0.001);
            this.labelGroup.add(biaoshigan);
            this.scene.add(this.labelGroup);
          }),
        new FBXLoader().setPath("/models/").load("boli01.FBX", boli01 => {
          boli01.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.7,
              envMap: skyCube
            });
            child.material = mater;
          });
          boli01.scale.set(0.001, 0.001, 0.001);
          this.scene.add(boli01);
        }),
        new FBXLoader().setPath("/models/").load("boli02.FBX", boli02 => {
          boli02.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.7,
              envMap: skyCube
            });
            child.material = mater;
          });
          boli02.scale.set(0.001, 0.001, 0.001);
          this.scene.add(boli02);
        }),
        new FBXLoader().setPath("/models/").load("boli03.FBX", boli03 => {
          boli03.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.7,
              envMap: skyCube
            });
            child.material = mater;
          });
          boli03.scale.set(0.001, 0.001, 0.001);
          this.scene.add(boli03);
        }),
        new FBXLoader().setPath("/models/").load("shuhuan01.FBX", shuhuan01 => {
          shuhuan01.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/shuhuan01LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap
            });
            child.material = mater;
          });
          shuhuan01.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shuhuan01);
        }),
        new FBXLoader().setPath("/models/").load("bujian01.FBX", bujian01 => {
          bujian01.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/bujian01LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/STON04M.JPG",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(0.5, 0.7);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          bujian01.scale.set(0.001, 0.001, 0.001);
          this.scene.add(bujian01);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("guangmuqiang01.FBX", guangmuqiang01 => {
            guangmuqiang01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/guangmuqiang01LightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            guangmuqiang01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(guangmuqiang01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("guangmuqiang02.FBX", guangmuqiang02 => {
            guangmuqiang02.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/guangmuqiang02LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/guangmuqiang02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xd3d3d3,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            guangmuqiang02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(guangmuqiang02);
          }),
        new FBXLoader().setPath("/models/").load("flower01.FBX", flower01 => {
          flower01.traverse(child => {
            let alphaMap = new Three.TextureLoader().load(
              "/models/tree02_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/tree02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap,
              depthTest: true,
              depthWrite: false
            });
            child.material = mater;
          });
          flower01.scale.set(0.001, 0.001, 0.001);
          let flower01Clone01 = flower01.clone();
          flower01Clone01.position.set(-0.066, 0, 0.015);
          let flower01Clone02 = flower01.clone();
          flower01Clone02.position.set(-0.131, 0, 0.0362);
          let flower01Clone03 = flower01.clone();
          flower01Clone03.position.set(-0.209, 0, 0.042);
          let flower01Clone04 = flower01.clone();
          flower01Clone04.position.set(-0.395, 0, 0.26);
          let flower01Clone05 = flower01.clone();
          flower01Clone05.position.set(-0.431, 0, 0.322);
          let flower01Clone06 = flower01.clone();
          flower01Clone06.position.set(-1.14, 0, 0.615);
          let flower01Clone07 = flower01.clone();
          flower01Clone07.position.set(-0.9, 0, 0.687);
          let flower01Clone08 = flower01.clone();
          flower01Clone08.position.set(-0.829, 0, 0.707);
          let flower01Clone09 = flower01.clone();
          flower01Clone09.position.set(-0.759, 0, 0.73);
          let flower01Clone10 = flower01.clone();
          flower01Clone10.position.set(-0.698, 0, 0.748);
          let flower01Clone11 = flower01.clone();
          flower01Clone11.position.set(-0.495, 0, 0.807);
          let flower01Clone12 = flower01.clone();
          flower01Clone12.position.set(-1.07, 0, 0.641);
          this.scene.add(flower01);
          this.scene.add(flower01Clone01);
          this.scene.add(flower01Clone02);
          this.scene.add(flower01Clone03);
          this.scene.add(flower01Clone04);
          this.scene.add(flower01Clone05);
          this.scene.add(flower01Clone06);
          this.scene.add(flower01Clone07);
          this.scene.add(flower01Clone08);
          this.scene.add(flower01Clone09);
          this.scene.add(flower01Clone10);
          this.scene.add(flower01Clone11);
          this.scene.add(flower01Clone12);
        }),
        new FBXLoader().setPath("/models/").load("flower02.FBX", flower02 => {
          flower02.traverse(child => {
            let alphaMap = new Three.TextureLoader().load(
              "/models/tree01_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/tree01.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap,
              depthTest: true,
              depthWrite: false
            });
            child.material = mater;
          });
          flower02.scale.set(0.001, 0.001, 0.001);
          let flower02Clone01 = flower02.clone();
          flower02Clone01.position.set(-0.065, 0, 0.0062);
          let flower02Clone02 = flower02.clone();
          flower02Clone02.position.set(-0.14, 0, 0.014);
          let flower02Clone03 = flower02.clone();
          flower02Clone03.position.set(-0.222, 0, 0.024);
          let flower02Clone04 = flower02.clone();
          flower02Clone04.position.set(-0.346, 0, 0.2);
          let flower02Clone05 = flower02.clone();
          flower02Clone05.position.set(-0.384, 0, 0.263);
          let flower02Clone06 = flower02.clone();
          flower02Clone06.position.set(-0.415, 0, 0.325);
          let flower02Clone07 = flower02.clone();
          flower02Clone07.position.set(-1.103, 0, 0.562);
          let flower02Clone08 = flower02.clone();
          flower02Clone08.position.set(-1.07, 0, 0.592);
          let flower02Clone09 = flower02.clone();
          flower02Clone09.position.set(-0.833, 0, 0.673);
          let flower02Clone10 = flower02.clone();
          flower02Clone10.position.set(-0.764, 0, 0.694);
          let flower02Clone11 = flower02.clone();
          flower02Clone11.position.set(-0.697, 0, 0.713);
          let flower02Clone12 = flower02.clone();
          flower02Clone12.position.set(-0.5, 0, 0.769);
          let flower02Clone13 = flower02.clone();
          flower02Clone13.position.set(-0.429, 0, 0.792);
          this.scene.add(flower02);
          this.scene.add(flower02Clone01);
          this.scene.add(flower02Clone02);
          this.scene.add(flower02Clone03);
          this.scene.add(flower02Clone04);
          this.scene.add(flower02Clone05);
          this.scene.add(flower02Clone06);
          this.scene.add(flower02Clone07);
          this.scene.add(flower02Clone08);
          this.scene.add(flower02Clone09);
          this.scene.add(flower02Clone10);
          this.scene.add(flower02Clone11);
          this.scene.add(flower02Clone12);
          this.scene.add(flower02Clone13);
        }),
        new FBXLoader().setPath("/models/").load("shuye01.FBX", shuye01 => {
          shuye01.traverse(child => {
            child.material = shuye02Mat;
          });
          shuye01.scale.set(0.001, 0.001, 0.001);
          let shuye01Colone01 = shuye01.clone();
          shuye01Colone01.rotateY(5);
          shuye01Colone01.position.set(0.23, 0, -1.75);

          let shuye01Colone02 = shuye01.clone();
          shuye01Colone02.rotateY(-10);
          shuye01Colone02.position.set(2.54, 0, -0.4);

          let shuye01Colone03 = shuye01.clone();
          shuye01Colone03.position.set(-0.43, 0, 0);

          let shuye01Colone04 = shuye01.clone();
          shuye01Colone04.rotateY(-20);
          shuye01Colone04.position.set(-0.34, 0, -1.6);

          let shuye01Colone05 = shuye01.clone();
          shuye01Colone05.position.set(-0.71, 0, 0);

          let shuye01Colone06 = shuye01.clone();
          shuye01Colone06.position.set(-3.4, 0, 0);

          let shuye01Colone07 = shuye01.clone();
          shuye01Colone07.position.set(-1.95, 0, 1.2);

          let shuye01Colone08 = shuye01.clone();
          shuye01Colone08.position.set(-2.28, 0, 1.2);

          let shuye01Colone09 = shuye01.clone();
          shuye01Colone09.position.set(-2.5, 0, 1.2);

          this.scene.add(shuye01);
          this.scene.add(shuye01Colone01);
          this.scene.add(shuye01Colone02);
          this.scene.add(shuye01Colone03);
          this.scene.add(shuye01Colone04);
          this.scene.add(shuye01Colone05);
          this.scene.add(shuye01Colone06);
          this.scene.add(shuye01Colone07);
          this.scene.add(shuye01Colone08);
          this.scene.add(shuye01Colone09);
        }),
        new FBXLoader().setPath("/models/").load("shugan01.FBX", shugan01 => {
          shugan01.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/shugan02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xdcdcdc,
              map: map
            });
            child.material = mater;
          });
          shugan01.scale.set(0.001, 0.001, 0.001);

          let shugan01Colone01 = shugan01.clone();
          shugan01Colone01.rotateY(5);
          shugan01Colone01.position.set(0.23, 0, -1.75);
          let shugan01Colone02 = shugan01.clone();
          shugan01Colone02.rotateY(-10);
          shugan01Colone02.position.set(2.54, 0, -0.4);

          let shugan01Colone03 = shugan01.clone();
          shugan01Colone03.position.set(-0.43, 0, 0);
          let shugan01Colone04 = shugan01.clone();
          shugan01Colone04.rotateY(-20);
          shugan01Colone04.position.set(-0.34, 0, -1.6);

          let shugan01Colone05 = shugan01.clone();
          shugan01Colone05.position.set(-0.71, 0, 0);

          let shugan01Colone06 = shugan01.clone();
          shugan01Colone06.position.set(-3.4, 0, 0);

          let shugan01Colone07 = shugan01.clone();
          shugan01Colone07.position.set(-1.95, 0, 1.2);

          let shugan01Colone08 = shugan01.clone();
          shugan01Colone08.position.set(-2.28, 0, 1.2);

          let shugan01Colone09 = shugan01.clone();
          shugan01Colone09.position.set(-2.5, 0, 1.2);

          this.scene.add(shugan01);
          this.scene.add(shugan01Colone01);
          this.scene.add(shugan01Colone02);
          this.scene.add(shugan01Colone03);
          this.scene.add(shugan01Colone04);
          this.scene.add(shugan01Colone05);
          this.scene.add(shugan01Colone06);
          this.scene.add(shugan01Colone07);
          this.scene.add(shugan01Colone08);
          this.scene.add(shugan01Colone09);
        }),
        new FBXLoader().setPath("/models/").load("shuye02.FBX", shuye02 => {
          shuye02.traverse(child => {
            child.material = shuye02Mat;
          });
          shuye02.scale.set(0.001, 0.001, 0.001);
          shuye02Clone = shuye02;

          this.scene.add(shuye02);

          this.cloneObj("shuye02Clone01", shuye02Clone, 0, 0, 0.322);
          this.cloneObj("shuye02Clone02", shuye02Clone, 0, 0, 0.322 * 2);
          this.cloneObj("shuye02Clone03", shuye02Clone, 0, 0, 0.322 * 3);
          this.cloneObj("shuye02Clone04", shuye02Clone, 0, 0, 0.322 * 4);
          this.cloneObj("shuye02Clone05", shuye02Clone, 0, 0, 0.322 * 5);
          this.cloneObj("shuye02Clone06", shuye02Clone, 0, 0, 0.322 * 6);
          this.cloneObj("shuye02Clone07", shuye02Clone, 0, 0, 0.322 * 7);
          this.cloneObj("shuye02Clone08", shuye02Clone, -0.384, 0, 0);
          this.cloneObj("shuye02Clone09", shuye02Clone, -4.522, 0, -0.237);
          this.cloneObj(
            "shuye02Clone10",
            shuye02Clone,
            -4.522 + 0.43 * 2,
            0,
            -0.237
          );
          this.cloneObj(
            "shuye02Clone11",
            shuye02Clone,
            -4.522 + 0.43 * 4,
            0,
            -0.237
          );
          this.cloneObj("shuye02Clone12", shuye02Clone, -4.522, 0, 2.47);
          this.cloneObj(
            "shuye02Clone13",
            shuye02Clone,
            -4.522 + 0.43 * 2,
            0,
            2.47
          );
          this.cloneObj(
            "shuye02Clone14",
            shuye02Clone,
            -4.522 + 0.43 * 4,
            0,
            2.47
          );

          this.cloneObj("shuye02Clone17", shuye02Clone, -0.384, 0, 0.322 * 4);

          this.cloneObj("shuye02Clone20", shuye02Clone, -0.384, 0, 0.322 * 7);
          this.cloneObj("shuye02Clone15", shuye02Clone, -4.764, 0, 0.322 * 7);
          this.cloneObj("shuye02Clone16", shuye02Clone, -4.764, 0, 0.322 * 4);
        }),
        new FBXLoader().setPath("/models/").load("shugan02.FBX", shugan02 => {
          shugan02.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/shugan02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xdcdcdc,
              map: map
            });
            child.material = mater;
          });
          shugan02.scale.set(0.001, 0.001, 0.001);
          shugan02Clone = shugan02;
          this.scene.add(shugan02);
          this.cloneObj("shugan02Clone01", shugan02Clone, 0, 0, 0.322);
          this.cloneObj("shugan02Clone02", shugan02Clone, 0, 0, 0.322 * 2);
          this.cloneObj("shugan02Clone03", shugan02Clone, 0, 0, 0.322 * 3);
          this.cloneObj("shugan02Clone04", shugan02Clone, 0, 0, 0.322 * 4);
          this.cloneObj("shugan02Clone05", shugan02Clone, 0, 0, 0.322 * 5);
          this.cloneObj("shugan02Clone06", shugan02Clone, 0, 0, 0.322 * 6);
          this.cloneObj("shugan02Clone07", shugan02Clone, 0, 0, 0.322 * 7);
          this.cloneObj("shugan02Clone08", shugan02Clone, -0.384, 0, 0);
          this.cloneObj("shugan02Clone09", shugan02Clone, -4.522, 0, -0.237);
          this.cloneObj(
            "shugan02Clone10",
            shugan02Clone,
            -4.522 + 0.43 * 2,
            0,
            -0.237
          );
          this.cloneObj(
            "shugan02Clone11",
            shugan02Clone,
            -4.522 + 0.43 * 4,
            0,
            -0.237
          );
          this.cloneObj("shugan02Clone12", shugan02Clone, -4.522, 0, 2.47);
          this.cloneObj(
            "shugan02Clone13",
            shugan02Clone,
            -4.522 + 0.43 * 2,
            0,
            2.47
          );
          this.cloneObj(
            "shugan02Clone14",
            shugan02Clone,
            -4.522 + 0.43 * 4,
            0,
            2.47
          );

          this.cloneObj("shugan02Clone17", shugan02Clone, -0.384, 0, 0.322 * 4);

          this.cloneObj("shugan02Clone20", shugan02Clone, -0.384, 0, 0.322 * 7);
          this.cloneObj("shugan02Clone15", shugan02Clone, -4.764, 0, 0.322 * 7);
          this.cloneObj("shugan02Clone16", shugan02Clone, -4.764, 0, 0.322 * 4);
        }),
        new FBXLoader().setPath("/models/").load("shuye03.FBX", shuye03 => {
          shuye03.traverse(child => {
            child.material = shuye02Mat;
          });
          shuye03.scale.set(0.001, 0.001, 0.001);
          shuye03Clone = shuye03;
          this.scene.add(shuye03);
          this.cloneObj("shuye03Clone01", shuye03Clone, 0.43 * 3, 0, 0);
          this.cloneObj("shuye03Clone02", shuye03Clone, 0.43 * -2, 0, 0);
          this.cloneObj("shuye03Clone03", shuye03Clone, 0.43 * 6, 0, 0);
          this.cloneObj("shuye03Clone04", shuye03Clone, 0.43 * 3, 0, 2.707);
          this.cloneObj("shuye03Clone05", shuye03Clone, 0.43 * -2, 0, 2.707);
          this.cloneObj("shuye03Clone06", shuye03Clone, 0.43 * 6, 0, 2.707);
          this.cloneObj("shuye03Clone07", shuye03Clone, 0, 0, 2.707);
          this.cloneObj("shuye03Clone08", shuye03Clone, 2.86, 0, 0.87);
          this.cloneObj(
            "shuye03Clone09",
            shuye03Clone,
            2.86,
            0,
            0.87 + 0.322 * 4
          );
          this.cloneObj("shuye03Clone10", shuye03Clone, -1.531, 0, 0.87);
          this.cloneObj(
            "shuye03Clone11",
            shuye03Clone,
            -1.531,
            0,
            0.87 + 0.322 * 4
          );
        }),
        new FBXLoader().setPath("/models/").load("shugan03.FBX", shugan03 => {
          shugan03.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/shugan02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xdcdcdc,
              map: map
            });
            child.material = mater;
          });
          shugan03.scale.set(0.001, 0.001, 0.001);
          shugan03Clone = shugan03;
          this.scene.add(shugan03);
          this.cloneObj("shugan03Clone01", shugan03Clone, 0.43 * 3, 0, 0);
          this.cloneObj("shugan03Clone02", shugan03Clone, 0.43 * -2, 0, 0);
          this.cloneObj("shugan03Clone03", shugan03Clone, 0.43 * 6, 0, 0);
          this.cloneObj("shugan03Clone04", shugan03Clone, 0.43 * 3, 0, 2.707);
          this.cloneObj("shugan03Clone05", shugan03Clone, 0.43 * -2, 0, 2.707);
          this.cloneObj("shugan03Clone06", shugan03Clone, 0.43 * 6, 0, 2.707);
          this.cloneObj("shugan03Clone07", shugan03Clone, 0, 0, 2.707);
          this.cloneObj("shugan03Clone08", shugan03Clone, 2.86, 0, 0.87);
          this.cloneObj(
            "shugan03Clone09",
            shugan03Clone,
            2.86,
            0,
            0.87 + 0.322 * 4
          );
          this.cloneObj("shugan03Clone10", shugan03Clone, -1.531, 0, 0.87);
          this.cloneObj(
            "shugan03Clone11",
            shugan03Clone,
            -1.531,
            0,
            0.87 + 0.322 * 4
          );
        }),
        new FBXLoader().setPath("/models/").load("shuye04.FBX", shuye04 => {
          shuye04.traverse(child => {
            child.material = shuye02Mat;
          });
          shuye04.scale.set(0.001, 0.001, 0.001);
          shuye04Clone = shuye04;
          this.scene.add(shuye04);
          this.cloneObj("shuye04Clone01", shuye04Clone, 0.43 * 2, 0, 0);
          this.cloneObj("shuye04Clone02", shuye04Clone, 0.43 * 3, 0, 0);
          this.cloneObj("shuye04Clone03", shuye04Clone, 0.43 * 2, 0, 2.707);
          this.cloneObj("shuye04Clone04", shuye04Clone, 0.43 * 3, 0, 2.707);
          this.cloneObj("shuye04Clone05", shuye04Clone, 0, 0, 2.707);
          this.cloneObj("shuye04Clone06", shuye04Clone, 2, 0, 0.547);
          this.cloneObj(
            "shuye04Clone07",
            shuye04Clone,
            2,
            0,
            0.547 + 0.322 * 2
          );
          this.cloneObj(
            "shuye04Clone07",
            shuye04Clone,
            2,
            0,
            0.547 + 0.322 * 4
          );
          this.cloneObj("shuye04Clone08", shuye04Clone, -2.401, 0, 0.547);
          this.cloneObj(
            "shuye04Clone09",
            shuye04Clone,
            -2.401,
            0,
            0.547 + 0.322 * 2
          );
          this.cloneObj(
            "shuye04Clone10",
            shuye04Clone,
            -2.401,
            0,
            0.547 + 0.322 * 4
          );
        }),
        new FBXLoader().setPath("/models/").load("shugan04.FBX", shugan04 => {
          shugan04.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/shugan02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xdcdcdc,
              map: map
            });
            child.material = mater;
          });
          shugan04.scale.set(0.001, 0.001, 0.001);
          shugan04Clone = shugan04;
          this.scene.add(shugan04);
          this.cloneObj("shugan04Clone01", shugan04Clone, 0.43 * 2, 0, 0);
          this.cloneObj("shugan04Clone02", shugan04Clone, 0.43 * 3, 0, 0);
          this.cloneObj("shugan04Clone03", shugan04Clone, 0.43 * 2, 0, 2.707);
          this.cloneObj("shugan04Clone04", shugan04Clone, 0.43 * 3, 0, 2.707);
          this.cloneObj("shugan04Clone05", shugan04Clone, 0, 0, 2.707);
          this.cloneObj("shugan04Clone06", shugan04Clone, 2, 0, 0.547);
          this.cloneObj(
            "shugan04Clone07",
            shugan04Clone,
            2,
            0,
            0.547 + 0.322 * 2
          );
          this.cloneObj(
            "shugan04Clone08",
            shugan04Clone,
            2,
            0,
            0.547 + 0.322 * 4
          );
          this.cloneObj("shugan04Clone09", shugan04Clone, -2.401, 0, 0.547);
          this.cloneObj(
            "shugan04Clone10",
            shugan04Clone,
            -2.401,
            0,
            0.547 + 0.322 * 2
          );
          this.cloneObj(
            "shugan04Clone11",
            shugan04Clone,
            -2.401,
            0,
            0.547 + 0.322 * 4
          );
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuaimainrxd.FBX", dikuaimainrxd => {
            dikuaimainrxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuaimainrxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuaimainrxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuaimainrxd);
          }),
        new FBXLoader().setPath("/models/").load("skySphere.FBX", skySphere => {
          skySphere.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/bg1.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map,
              side: Three.DoubleSide
            });
            child.material = mater;
          });
          skySphere.scale.set(0.01, 0.01, 0.01);
          skySphere.position.set(0, -2, 0);
          this.scene.add(skySphere);
        }),
        new FBXLoader().setPath("/models/").load("floor.FBX", floor => {
          floor.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/grass04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(0.5, 0.5);
              }
            );
            let lightMap = new Three.TextureLoader().load(
              "/models/floorLightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          floor.scale.set(0.001, 0.001, 0.001);
          this.scene.add(floor);
        }),
        new FBXLoader().setPath("/models/").load("road01.FBX", road01 => {
          road01.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road01LightingMap.jpg"
            );
            /*let map = new  Three.TextureLoader().load('/models/road02.jpg', texture => {
                            texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                            texture.offset.set(0, 0);
                            texture.repeat.set(1, 1);
                            texture.generateMipmaps = false;
                            texture.magFilter = Three.LinearFilter;
                            texture.minFilter = Three.LinearFilter;
                        })*/

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: roadMap02
            });
            child.material = mater;
          });
          road01.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road01);
        }),
        new FBXLoader().setPath("/models/").load("road02.FBX", road02 => {
          road02.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road02LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: roadMap01
            });
            child.material = mater;
          });
          road02.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road02);
        }),
        new FBXLoader().setPath("/models/").load("road03.FBX", road03 => {
          road03.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/road01.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0.03);
                texture.repeat.set(1, 0.97);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let lightMap = new Three.TextureLoader().load(
              "/models/road03LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road03.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road03);
        }),
        new FBXLoader().setPath("/models/").load("road04.FBX", road04 => {
          road04.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/road01.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let lightMap = new Three.TextureLoader().load(
              "/models/road04LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road04.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road04);
        }),
        new FBXLoader().setPath("/models/").load("road05.FBX", road05 => {
          road05.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road05LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: roadMap02
            });
            child.material = mater;
          });
          road05.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road05);
        }),
        new FBXLoader().setPath("/models/").load("road06.FBX", road06 => {
          road06.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road06LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: roadMap01
            });
            child.material = mater;
          });
          road06.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road06);
        }),
        new FBXLoader().setPath("/models/").load("road07.FBX", road07 => {
          road07.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road07LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: roadMap01
            });
            child.material = mater;
          });
          road07.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road07);
        }),
        new FBXLoader().setPath("/models/").load("road08.FBX", road08 => {
          road08.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road08LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: roadMap02
            });
            child.material = mater;
          });
          road08.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road08);
        }),
        new FBXLoader().setPath("/models/").load("road09.FBX", road09 => {
          road09.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road09LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: roadMap02
            });
            child.material = mater;
          });
          road09.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road09);
        }),
        new FBXLoader().setPath("/models/").load("road10.FBX", road10 => {
          road10.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road10LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road10.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road10);
        }),
        new FBXLoader().setPath("/models/").load("road11.FBX", road11 => {
          road11.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road11LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(3, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road11.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road11);
        }),
        new FBXLoader().setPath("/models/").load("road12.FBX", road12 => {
          road12.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road12LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, -0.04);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road12.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road12);
        }),
        new FBXLoader().setPath("/models/").load("road13.FBX", road13 => {
          road13.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road13LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, -0.04);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road13.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road13);
        }),
        new FBXLoader().setPath("/models/").load("road14.FBX", road14 => {
          road14.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road14LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, -0.04);
                texture.repeat.set(5, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road14.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road14);
        }),
        new FBXLoader().setPath("/models/").load("road15.FBX", road15 => {
          road15.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road15LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road15.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road15);
        }),
        new FBXLoader().setPath("/models/").load("road16.FBX", road16 => {
          road16.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road16LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road16.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road16);
        }),
        new FBXLoader().setPath("/models/").load("road17.FBX", road17 => {
          road17.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road17LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road17.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road17);
        }),
        new FBXLoader().setPath("/models/").load("road18.FBX", road18 => {
          road18.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road18LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road18.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road18);
        }),
        new FBXLoader().setPath("/models/").load("road19.FBX", road19 => {
          road19.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road19LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road19.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road19);
        }),
        new FBXLoader().setPath("/models/").load("road20.FBX", road20 => {
          road20.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road20LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road20.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road20);
        }),
        new FBXLoader().setPath("/models/").load("road21.FBX", road21 => {
          road21.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road21LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road21.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road21);
        }),
        new FBXLoader().setPath("/models/").load("road22.FBX", road22 => {
          road22.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road22LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road22.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road22);
        }),
        new FBXLoader().setPath("/models/").load("road23.FBX", road23 => {
          road23.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road23LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road23.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road23);
        }),
        new FBXLoader().setPath("/models/").load("road24.FBX", road24 => {
          road24.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road24LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road24.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road24);
        }),
        new FBXLoader().setPath("/models/").load("road25.FBX", road25 => {
          road25.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road25LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road25.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road25);
        }),
        new FBXLoader().setPath("/models/").load("road26.FBX", road26 => {
          road26.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road26LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road26.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road26);
        }),
        new FBXLoader().setPath("/models/").load("road27.FBX", road27 => {
          road27.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road27LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road27.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road27);
        }),
        new FBXLoader().setPath("/models/").load("road28.FBX", road28 => {
          road28.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road28LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road28.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road28);
        }),
        new FBXLoader().setPath("/models/").load("road29.FBX", road29 => {
          road29.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road29LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road29.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road29);
        }),
        new FBXLoader().setPath("/models/").load("road30.FBX", road30 => {
          road30.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road30LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road04.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road30.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road30);
        }),
        new FBXLoader().setPath("/models/").load("road31.FBX", road31 => {
          road31.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/road31LightingMap.jpg"
            );
            let map = new Three.TextureLoader().load(
              "/models/road03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          road31.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road31);
        }),
        new FBXLoader().setPath("/models/").load("road32.FBX", road32 => {
          road32.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/road01.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          road32.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road32);
        }),
        new FBXLoader().setPath("/models/").load("road33.FBX", road33 => {
          road33.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/road02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          road33.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road33);
        }),
        new FBXLoader().setPath("/models/").load("road34.FBX", road34 => {
          road34.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/roadbackground.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          road34.scale.set(0.001, 0.001, 0.001);
          this.scene.add(road34);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("roadbujian01.FBX", roadbujian01 => {
            roadbujian01.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/roadbujian01LightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/roadbackground.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                  texture.generateMipmaps = false;
                  texture.magFilter = Three.LinearFilter;
                  texture.minFilter = Three.LinearFilter;
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            roadbujian01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(roadbujian01);
          }),
        // ///////////////////////////////////////////////
        new FBXLoader().setPath("/models/").load("fangzi02.FBX", fangzi02 => {
          fangzi02.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/fangzi02UV02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          fangzi02.scale.set(0.001, 0.001, 0.001);
          fangzi02Clone = fangzi02;
          this.cloneObj("fangzi02Clone01", fangzi02Clone, -0.228, 0, 1.527);
          this.cloneObj("fangzi02Clone02", fangzi02Clone, -0.112, 0, -1.368);
          this.cloneObj("fangzi02Clone03", fangzi02Clone, -0.705, 0, 2.28);
          this.cloneObj("fangzi02Clone04", fangzi02Clone, -0.794, 0, -0.766);
          this.cloneObj("fangzi02Clone05", fangzi02Clone, -1.204, 0, 0.873);
          this.cloneObj("fangzi02Clone06", fangzi02Clone, -1.485, 0, -1.45);
          this.cloneObj("fangzi02Clone07", fangzi02Clone, -1.843, 0, -0.093);
          this.cloneObj("fangzi02Clone08", fangzi02Clone, -1.978, 0, 1.625);
          this.cloneObj("fangzi02Clone09", fangzi02Clone, -2.615, 0, -1.103);
          this.cloneObj("fangzi02Clone10", fangzi02Clone, -3.709, 0, -1.466);
          this.cloneObj("fangzi02Clone11", fangzi02Clone, -3.296, 0, -0.083);
          this.cloneObj("fangzi02Clone12", fangzi02Clone, -2.943, 0, 0.906);
          this.cloneObj("fangzi02Clone13", fangzi02Clone, -2.842, 0, 2.274);
          this.scene.add(fangzi02);
        }),
        new FBXLoader().setPath("/models/").load("fangzi03.FBX", fangzi03 => {
          fangzi03.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/111.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          fangzi03.scale.set(0.001, 0.001, 0.001);
          fangzi03Clone = fangzi03;

          /*this.cloneObj("fangzi03Clone07", fangzi03Clone, -5.848, 0, -5.674);
          this.cloneObj("fangzi03Clone08", fangzi03Clone, -4.43, 0, -5.674);
          this.cloneObj("fangzi03Clone09", fangzi03Clone, -3.012, 0, -5.674);
          this.cloneObj("fangzi03Clone10", fangzi03Clone, -1.594, 0, -5.674);*/
          this.cloneObj("fangzi03Clone11", fangzi03Clone, 7.231, 0, -5.674);
          this.cloneObj("fangzi03Clone12", fangzi03Clone, 8.633, 0, -5.674);
          this.cloneObj("fangzi03Clone12", fangzi03Clone, 10.035, 0, -5.674);
        }),
        new FBXLoader().setPath("/models/").load("fangzi04.FBX", fangzi04 => {
          fangzi04.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/fangzi02UV02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          fangzi04.scale.set(0.001, 0.001, 0.001);
          this.scene.add(fangzi04);
        }),
        new FBXLoader().setPath("/models/").load("fangzi05.FBX", fangzi05 => {
          fangzi05.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/fangzi01UV.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          fangzi05.scale.set(0.001, 0.001, 0.001);
          this.scene.add(fangzi05);
        }),
        new FBXLoader().setPath("/models/").load("fangzi06.FBX", fangzi06 => {
          fangzi06.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/fangzi06UV01.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map,
              side: Three.DoubleSide
            });
            child.material = mater;
          });
          fangzi06.scale.set(0.001, 0.001, 0.001);
          fangzi06Clone = fangzi06;
          this.cloneObj("fangzi06Clone01", fangzi06Clone, 3.601, 0, 0);
          this.cloneObj("fangzi06Clone02", fangzi06Clone, 7.202, 0, 0);
          this.cloneObj("fangzi06Clone03", fangzi06Clone, 10.803, 0, 0);
          this.cloneObj("fangzi06Clone04", fangzi06Clone, 2.648, 0, 0.961);
          this.cloneObj("fangzi06Clone05", fangzi06Clone, 6.249, 0, 0.961);
          this.cloneObj("fangzi06Clone06", fangzi06Clone, 9.85, 0, 0.961);
          this.scene.add(fangzi06);
        }),
        new FBXLoader().setPath("/models/").load("fangzi07.FBX", fangzi07 => {
          fangzi07.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/fangzi02UV02.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          fangzi07.scale.set(0.001, 0.001, 0.001);
          this.scene.add(fangzi07);
        }),
        new FBXLoader().setPath("/models/").load("fangzi08.FBX", fangzi08 => {
          fangzi08.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: fangzi01Map
            });
            child.material = mater;
          });
          fangzi08.scale.set(0.001, 0.001, 0.001);
          this.scene.add(fangzi08);
        }),
        new FBXLoader().setPath("/models/").load("fangzi09.FBX", fangzi09 => {
          fangzi09.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: fangzi03Map
            });
            child.material = mater;
          });
          fangzi09.scale.set(0.001, 0.001, 0.001);
          this.scene.add(fangzi09);
        }),
        new FBXLoader().setPath("/models/").load("fangzi10.FBX", fangzi10 => {
          fangzi10.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: fangzi02Map
            });
            child.material = mater;
          });
          fangzi10.scale.set(0.001, 0.001, 0.001);
          this.scene.add(fangzi10);
        }),
        new FBXLoader().setPath("/models/").load("fangzi11.FBX", fangzi11 => {
          fangzi11.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: fangzi01Map
            });
            child.material = mater;
          });
          fangzi11.scale.set(0.001, 0.001, 0.001);

          fangzi11Clone = fangzi11;
          this.cloneObj("fangzi11Clone01", fangzi11Clone, 0.033, 0, -2.588);
          this.cloneObj("fangzi11Clone02", fangzi11Clone, 7.828, 0, -3.025);
          this.cloneObj("fangzi11Clone03", fangzi11Clone, 5.389, 0, -4.225);
          this.cloneObj("fangzi11Clone04", fangzi11Clone, -5.186, 0, 2.975);
          this.cloneObj("fangzi11Clone05", fangzi11Clone, -3.717, 0, 6.88);
          this.cloneObj("fangzi11Clone06", fangzi11Clone, 15.469, 0, 7.503);
          this.cloneObj("fangzi11Clone07", fangzi11Clone, 16.352, 0, 9.461);

          this.scene.add(fangzi11);
        }),
        new FBXLoader().setPath("/models/").load("fangzi12.FBX", fangzi12 => {
          fangzi12.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: fangzi03Map
            });
            child.material = mater;
          });
          fangzi12.scale.set(0.001, 0.001, 0.001);
          fangzi12Clone = fangzi12;
          this.cloneObj("fangzi12Clone01", fangzi12Clone, 0.109, 0, -3.915);
          this.cloneObj("fangzi12Clone02", fangzi12Clone, 5.999, 0, -2.939);
          this.cloneObj("fangzi12Clone03", fangzi12Clone, -4.901, 0, 4.487);
          this.cloneObj("fangzi12Clone04", fangzi12Clone, -4.468, 0, 7.169);
          this.cloneObj("fangzi12Clone05", fangzi12Clone, 14.614, 0, 8.436);
          this.cloneObj("fangzi12Clone05", fangzi12Clone, 16.248, 0, 9.846);
          this.scene.add(fangzi12);
        }),
        new FBXLoader().setPath("/models/").load("fangzi13.FBX", fangzi13 => {
          fangzi13.traverse(child => {
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: fangzi02Map
            });
            child.material = mater;
          });
          fangzi13.scale.set(0.001, 0.001, 0.001);
          fangzi13Clone = fangzi13;
          this.cloneObj("fangzi13Clone01", fangzi13Clone, 0.094, 0, -1.55);
          this.cloneObj("fangzi13Clone02", fangzi13Clone, 7.04, 0, -1.638);
          this.cloneObj("fangzi13Clone03", fangzi13Clone, 4.569, 0, -2.809);
          this.cloneObj("fangzi13Clone04", fangzi13Clone, 5.417, 0, -3.392);
          this.cloneObj("fangzi13Clone05", fangzi13Clone, -5.306, 0, 4.336);
          this.cloneObj("fangzi13Clone06", fangzi13Clone, -5.542, 0, 6.32);
          this.cloneObj("fangzi13Clone07", fangzi13Clone, -4.313, 0, 9.942);
          this.cloneObj("fangzi13Clone08", fangzi13Clone, 14.147, 0, 8.636);
          this.cloneObj("fangzi13Clone09", fangzi13Clone, 14.644, 0, 10.452);
          this.scene.add(fangzi13);
        }),
        new FBXLoader().setPath("/models/").load("build01.FBX", build01 => {
          build01.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/build01.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          build01.scale.set(0.001, 0.001, 0.001);
          this.scene.add(build01);
        }),
        /*new FBXLoader().setPath("/models/").load("build03.FBX", build03 => {
          build03.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/build03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          build03.scale.set(0.001, 0.001, 0.001);
          this.scene.add(build03);
        }),*/
        new FBXLoader().setPath("/models/").load("build04.FBX", build04 => {
          build04.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/build03.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          build04.scale.set(0.001, 0.001, 0.001);
          this.scene.add(build04);
        }),
        /*new FBXLoader().setPath("/models/").load("build06.FBX", build06 => {
          build06.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/build06.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          build06.scale.set(0.001, 0.001, 0.001);
          this.scene.add(build06);
        }),*/
        new FBXLoader().setPath("/models/").load("build08.FBX", build08 => {
          build08.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/build08.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          build08.scale.set(0.001, 0.001, 0.001);
          build08.position.set(2, 0, 0);
          build08Clone = build08;
          this.scene.add(build08);
          this.cloneObj("build08Clone01", build08Clone, 2.917, 0, 0);
          this.cloneObj("build08Clone02", build08Clone, 1.115, 0, -1.069);
          this.cloneObj("build08Clone03", build08Clone, 2.032, 0, -1.069);
          this.cloneObj("build08Clone04", build08Clone, 1.115, 0, -2.068);
          this.cloneObj("build08Clone05", build08Clone, 2.032, 0, -2.068);
        }),
        new FBXLoader().setPath("/models/").load("dikuai01.FBX", dikuai01 => {
          dikuai01.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai01LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap,
              side: Three.DoubleSide
            });
            child.material = mater;
          });
          dikuai01.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai01);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai01rxd.FBX", dikuai01rxd => {
            dikuai01rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai01rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai01rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai01rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai01wq.FBX", dikuai01wq => {
            dikuai01wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai01wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai01wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai01wq);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai01wqzz.FBX", dikuai01wqzz => {
            dikuai01wqzz.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai01wqzzLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            dikuai01wqzz.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai01wqzz);
          }),
        new FBXLoader().setPath("/models/").load("dikuai02.FBX", dikuai02 => {
          dikuai02.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai02LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap,
              side: Three.DoubleSide
            });
            child.material = mater;
          });
          dikuai02.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai02);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai02rxd.FBX", dikuai02rxd => {
            dikuai02rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai02rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai02rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai02rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai02wq.FBX", dikuai02wq => {
            dikuai02wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai02wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai02wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai02wq);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai02wqzz.FBX", dikuai02wqzz => {
            dikuai02wqzz.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai02wqzzLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            dikuai02wqzz.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai02wqzz);
          }),
        new FBXLoader().setPath("/models/").load("dikuai03.FBX", dikuai03 => {
          dikuai03.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai03LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap,
              side: Three.DoubleSide
            });
            child.material = mater;
          });
          dikuai03.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai03);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai03rxd.FBX", dikuai03rxd => {
            dikuai03rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai03rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai03rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai03rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai03wq.FBX", dikuai03wq => {
            dikuai03wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai03wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai03wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai03wq);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai03wqzz.FBX", dikuai03wqzz => {
            dikuai03wqzz.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai03wqzzLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            dikuai03wqzz.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai03wqzz);
          }),
        new FBXLoader().setPath("/models/").load("dikuai04.FBX", dikuai04 => {
          dikuai04.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai04LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai04.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai04);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai04rxd.FBX", dikuai04rxd => {
            dikuai04rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai04rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai04rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai04rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai04wq.FBX", dikuai04wq => {
            dikuai04wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai04wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai04wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai04wq);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai04wqzz.FBX", dikuai04wqzz => {
            dikuai04wqzz.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai04wqzzLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            dikuai04wqzz.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai04wqzz);
          }),
        new FBXLoader().setPath("/models/").load("dikuai05.FBX", dikuai05 => {
          dikuai05.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai05LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai05.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai05);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai05rxd.FBX", dikuai05rxd => {
            dikuai05rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai05rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai05rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai05rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai05wq.FBX", dikuai05wq => {
            dikuai05wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai05wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai05wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai05wq);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai05wqzz.FBX", dikuai05wqzz => {
            dikuai05wqzz.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai05wqzzLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            dikuai05wqzz.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai05wqzz);
          }),
        new FBXLoader().setPath("/models/").load("dikuai06.FBX", dikuai06 => {
          dikuai06.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai06LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai06.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai06);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai06rxd.FBX", dikuai06rxd => {
            dikuai06rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai06rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai06rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai06rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai06wq.FBX", dikuai06wq => {
            dikuai06wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai06wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai06wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai06wq);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai06wqzz.FBX", dikuai06wqzz => {
            dikuai06wqzz.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai06wqzzLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            dikuai06wqzz.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai06wqzz);
          }),
        new FBXLoader().setPath("/models/").load("dikuai07.FBX", dikuai07 => {
          dikuai07.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai07LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai07.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai07);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai07rxd.FBX", dikuai07rxd => {
            dikuai07rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai07rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai07rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai07rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai07wq.FBX", dikuai07wq => {
            dikuai07wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai07wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai07wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai07wq);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai07wqzz.FBX", dikuai07wqzz => {
            dikuai07wqzz.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai07wqzzLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            dikuai07wqzz.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai07wqzz);
          }),
        new FBXLoader().setPath("/models/").load("dikuai08.FBX", dikuai08 => {
          dikuai08.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai08LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai08.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai08);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai08rxd.FBX", dikuai08rxd => {
            dikuai08rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai08rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai08rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai08rxd);
          }),
        new FBXLoader().setPath("/models/").load("dikuai09.FBX", dikuai09 => {
          dikuai09.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai09LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai09.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai09);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai09rxd.FBX", dikuai09rxd => {
            dikuai09rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai09rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai09rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai09rxd);
          }),
        new FBXLoader().setPath("/models/").load("dikuai10.FBX", dikuai10 => {
          dikuai10.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai10LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai10.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai10);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai10rxd.FBX", dikuai10rxd => {
            dikuai10rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai10rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai10rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai10rxd);
          }),
        new FBXLoader().setPath("/models/").load("dikuai11.FBX", dikuai11 => {
          dikuai11.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai11LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai11.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai11);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai11rxd.FBX", dikuai11rxd => {
            dikuai11rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai11rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai11rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai11rxd);
          }),
        new FBXLoader().setPath("/models/").load("dikuai12.FBX", dikuai12 => {
          dikuai12.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai12LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai12.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai12);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai12rxd.FBX", dikuai12rxd => {
            dikuai12rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai12rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai12rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai12rxd);
          }),
        new FBXLoader().setPath("/models/").load("dikuai13.FBX", dikuai13 => {
          dikuai13.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai13LightingMap.jpg"
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai13.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai13);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai13rxd.FBX", dikuai13rxd => {
            dikuai13rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai13rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai13rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai13rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai13wq.FBX", dikuai13wq => {
            dikuai13wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai13wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai13wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai13wq);
          }),
        new FBXLoader().setPath("/models/").load("dikuai14.FBX", dikuai14 => {
          dikuai14.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai14LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai14.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai14);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai14rxd.FBX", dikuai14rxd => {
            dikuai14rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai14rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai14rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai14rxd);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai14wq.FBX", dikuai14wq => {
            dikuai14wq.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai14wqLightingMap.jpg"
              );
              let map = new Three.TextureLoader().load(
                "/models/27.png",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide,
                map: map
              });
              child.material = mater;
            });
            dikuai14wq.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai14wq);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai14wqzz.FBX", dikuai14wqzz => {
            dikuai14wqzz.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai14wqzzLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            dikuai14wqzz.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai14wqzz);
          }),
        new FBXLoader().setPath("/models/").load("dikuai15.FBX", dikuai15 => {
          dikuai15.traverse(child => {
            let lightMap = new Three.TextureLoader().load(
              "/models/dikuai15LightingMap.jpg"
            );

            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: grassMap
            });
            child.material = mater;
          });
          dikuai15.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dikuai15);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("dikuai15rxd.FBX", dikuai15rxd => {
            dikuai15rxd.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/dikuai15rxdLightingMap.jpg"
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: rxdMap01
              });
              child.material = mater;
            });
            dikuai15rxd.scale.set(0.001, 0.001, 0.001);
            this.scene.add(dikuai15rxd);
          }),
        new FBXLoader().setPath("/models/").load("fangzi01.FBX", fangzi01 => {
          fangzi01.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/fangzi01UV.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
                texture.generateMipmaps = false;
                texture.magFilter = Three.LinearFilter;
                texture.minFilter = Three.LinearFilter;
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map,
              side: Three.DoubleSide
            });
            child.material = mater;
          });
          fangzi01.scale.set(0.001, 0.001, 0.001);
          fangzi01Clone = fangzi01;
          this.cloneObj("fangzi01Clone01", fangzi01Clone, -0.1, 0, -1.58);
          this.cloneObj("fangzi01Clone02", fangzi01Clone, 0.77, 0, -1.58);
          this.cloneObj("fangzi01Clone03", fangzi01Clone, 0.8, 0, -0.8);
          this.cloneObj("fangzi01Clone04", fangzi01Clone, 0.8, 0, 0);
          this.cloneObj("fangzi01Clone05", fangzi01Clone, 2.278, 0, -1.58);
          this.cloneObj("fangzi01Clone06", fangzi01Clone, 3.148, 0, -1.58);
          this.cloneObj("fangzi01Clone08", fangzi01Clone, 3.178, 0, -0.8);
          this.cloneObj("fangzi01Clone09", fangzi01Clone, 3.178, 0, 0);
          this.cloneObj("fangzi01Clone10", fangzi01Clone, 2.378, 0, 0);
          this.cloneObj("fangzi01Clone11", fangzi01Clone, -7.109, 0, 3.953);
          this.cloneObj("fangzi01Clone12", fangzi01Clone, -3.508, 0, 3.953);
          this.cloneObj("fangzi01Clone13", fangzi01Clone, -0.093, 0, 3.953);
          this.cloneObj("fangzi01Clone14", fangzi01Clone, -8.656, 0, 6.001);
          this.cloneObj("fangzi01Clone15", fangzi01Clone, -5.055, 0, 6.001);
          this.cloneObj("fangzi01Clone16", fangzi01Clone, -1.454, 0, 6.001);
          this.cloneObj("fangzi01Clone17", fangzi01Clone, 2.147, 0, 6.001);

          this.scene.add(fangzi01);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree01.FBX", planeTree01 => {
            planeTree01.traverse(child => {
              let alphaMap = new Three.TextureLoader().load(
                "/models/planeTree01_alpha.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let map = new Three.TextureLoader().load(
                "/models/planeTree01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map,
                transparent: true,
                side: Three.DoubleSide,
                alphaMap: alphaMap,
                depthTest: true,
                depthWrite: false
              });
              child.material = mater;
            });
            planeTree01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree02.FBX", planeTree02 => {
            planeTree02.traverse(child => {
              let alphaMap = new Three.TextureLoader().load(
                "/models/planeTree02_alpha.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let map = new Three.TextureLoader().load(
                "/models/planeTree02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map,
                transparent: true,
                side: Three.DoubleSide,
                alphaMap: alphaMap,
                depthTest: true,
                depthWrite: false
              });
              child.material = mater;
            });
            planeTree02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree03.FBX", planeTree03 => {
            planeTree03.traverse(child => {
              child.material = planeTree01();
            });
            planeTree03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree04.FBX", planeTree04 => {
            planeTree04.traverse(child => {
              child.material = planeTree02();
            });
            planeTree04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree04);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree05.FBX", planeTree05 => {
            planeTree05.traverse(child => {
              child.material = planeTree01();
            });
            planeTree05.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree05);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree06.FBX", planeTree06 => {
            planeTree06.traverse(child => {
              child.material = planeTree02();
            });
            planeTree06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree06);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree07.FBX", planeTree07 => {
            planeTree07.traverse(child => {
              child.material = planeTree01();
            });
            planeTree07.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree07);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree08.FBX", planeTree08 => {
            planeTree08.traverse(child => {
              child.material = planeTree02();
            });
            planeTree08.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree08);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree09.FBX", planeTree09 => {
            planeTree09.traverse(child => {
              child.material = planeTree01();
            });
            planeTree09.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree09);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree10.FBX", planeTree10 => {
            planeTree10.traverse(child => {
              child.material = planeTree02();
            });
            planeTree10.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree10);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree11.FBX", planeTree11 => {
            planeTree11.traverse(child => {
              child.material = planeTree01();
            });
            planeTree11.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree11);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree12.FBX", planeTree12 => {
            planeTree12.traverse(child => {
              child.material = planeTree02();
            });
            planeTree12.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree12);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree13.FBX", planeTree13 => {
            planeTree13.traverse(child => {
              child.material = planeTree01();
            });
            planeTree13.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree13);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree14.FBX", planeTree14 => {
            planeTree14.traverse(child => {
              child.material = planeTree02();
            });
            planeTree14.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree14);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree15.FBX", planeTree15 => {
            planeTree15.traverse(child => {
              child.material = planeTree01();
            });
            planeTree15.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree15);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree16.FBX", planeTree16 => {
            planeTree16.traverse(child => {
              child.material = planeTree02();
            });
            planeTree16.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree16);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree17.FBX", planeTree17 => {
            planeTree17.traverse(child => {
              child.material = planeTree01();
            });
            planeTree17.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree17);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree18.FBX", planeTree18 => {
            planeTree18.traverse(child => {
              child.material = planeTree02();
            });
            planeTree18.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree18);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree19.FBX", planeTree19 => {
            planeTree19.traverse(child => {
              child.material = planeTree01();
            });
            planeTree19.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree19);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree20.FBX", planeTree20 => {
            planeTree20.traverse(child => {
              child.material = planeTree02();
            });
            planeTree20.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree20);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree21.FBX", planeTree21 => {
            planeTree21.traverse(child => {
              child.material = planeTree01();
            });
            planeTree21.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree21);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree22.FBX", planeTree22 => {
            planeTree22.traverse(child => {
              child.material = planeTree02();
            });
            planeTree22.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree22);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree23.FBX", planeTree23 => {
            planeTree23.traverse(child => {
              child.material = planeTree01();
            });
            planeTree23.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree23);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree24.FBX", planeTree24 => {
            planeTree24.traverse(child => {
              child.material = planeTree02();
            });
            planeTree24.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree24);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree25.FBX", planeTree25 => {
            planeTree25.traverse(child => {
              child.material = planeTree01();
            });
            planeTree25.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree25);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree26.FBX", planeTree26 => {
            planeTree26.traverse(child => {
              child.material = planeTree02();
            });
            planeTree26.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree26);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree27.FBX", planeTree27 => {
            planeTree27.traverse(child => {
              child.material = planeTree01();
            });
            planeTree27.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree27);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("planeTree28.FBX", planeTree28 => {
            planeTree28.traverse(child => {
              child.material = planeTree02();
            });
            planeTree28.scale.set(0.001, 0.001, 0.001);
            this.scene.add(planeTree28);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguanshafa.FBX", zhanguanshafa => {
            zhanguanshafa.traverse(child => {
              let lightMap = new Three.TextureLoader().load(
                "/models/zhanguanshafaLightingMap.jpg"
              );

              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguanshafa.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguanshafa);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("honglvdeng01.FBX", honglvdeng01 => {
            honglvdeng01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/honglvdeng.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            honglvdeng01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(honglvdeng01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS01_01.FBX", GIS01_01 => {
            GIS01_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS01_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS01_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS01_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS01_02.FBX", GIS01_02 => {
            GIS01_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS01_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS01_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS01_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS01_03.FBX", GIS01_03 => {
            GIS01_03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS01_03.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS01_03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS01_03);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS01_04.FBX", GIS01_04 => {
            GIS01_04.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS01_04.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS01_04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS01_04);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS01_05.FBX", GIS01_05 => {
            GIS01_05.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS01_05.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS01_05.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS01_05);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS01_06.FBX", GIS01_06 => {
            GIS01_06.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS01_06.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS01_06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS01_06);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS01_07.FBX", GIS01_07 => {
            GIS01_07.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS01_07.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS01_07.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS01_07);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS02_01.FBX", GIS02_01 => {
            GIS02_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS02_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS02_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS02_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS02_02.FBX", GIS02_02 => {
            GIS02_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS02_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS02_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS02_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS02_03.FBX", GIS02_03 => {
            GIS02_03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS02_03.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS02_03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS02_03);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS02_04.FBX", GIS02_04 => {
            GIS02_04.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS02_04.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS02_04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS02_04);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS03_01.FBX", GIS03_01 => {
            GIS03_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS03_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS03_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS03_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS03_02.FBX", GIS03_02 => {
            GIS03_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS03_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS03_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS03_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS03_03.FBX", GIS03_03 => {
            GIS03_03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS03_03.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS03_03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS03_03);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS03_04.FBX", GIS03_04 => {
            GIS03_04.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS03_04.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS03_04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS03_04);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS04_01.FBX", GIS04_01 => {
            GIS04_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS04_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS04_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS04_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS04_02.FBX", GIS04_02 => {
            GIS04_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS04_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS04_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS04_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS04_03.FBX", GIS04_03 => {
            GIS04_03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS04_03.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS04_03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS04_03);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS04_05.FBX", GIS04_05 => {
            GIS04_05.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS04_05.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS04_05.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS04_05);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS04_06.FBX", GIS04_06 => {
            GIS04_06.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS04_06.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS04_06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS04_06);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS05_01.FBX", GIS05_01 => {
            GIS05_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS05_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS05_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS05_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS05_02.FBX", GIS05_02 => {
            GIS05_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS05_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS05_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS05_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS05_03.FBX", GIS05_03 => {
            GIS05_03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS05_03.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS05_03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS05_03);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS05_04.FBX", GIS05_04 => {
            GIS05_04.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS05_04.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS05_04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS05_04);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS06_01.FBX", GIS06_01 => {
            GIS06_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS06_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS06_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS06_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS06_02.FBX", GIS06_02 => {
            GIS06_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS06_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS06_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS06_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS07_01.FBX", GIS07_01 => {
            GIS07_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS07_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS07_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS07_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS07_02.FBX", GIS07_02 => {
            GIS07_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS07_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS07_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS07_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS08_01.FBX", GIS08_01 => {
            GIS08_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS08_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS08_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS08_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS08_02.FBX", GIS08_02 => {
            GIS08_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS08_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS08_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS08_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS09_01.FBX", GIS09_01 => {
            GIS09_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS09_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS09_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS09_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS09_02.FBX", GIS09_02 => {
            GIS09_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS09_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS09_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS09_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS10_01.FBX", GIS10_01 => {
            GIS10_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS10_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS10_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS10_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS10_02.FBX", GIS10_02 => {
            GIS10_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS10_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS10_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS10_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS10_03.FBX", GIS10_03 => {
            GIS10_03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS10_03.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS10_03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS10_03);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS10_04.FBX", GIS10_04 => {
            GIS10_04.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS10_04.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS10_04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS10_04);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS10_05.FBX", GIS10_05 => {
            GIS10_05.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS10_05.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS10_05.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS10_05);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS10_06.FBX", GIS10_06 => {
            GIS10_06.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS10_06.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS10_06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS10_06);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS10_07.FBX", GIS10_07 => {
            GIS10_07.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS10_07.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS10_07.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS10_07);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS10_08.FBX", GIS10_08 => {
            GIS10_08.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS10_08.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS10_08.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS10_08);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS11_01.FBX", GIS11_01 => {
            GIS11_01.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS11_01.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS11_01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS11_01);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS11_02.FBX", GIS11_02 => {
            GIS11_02.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS11_02.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS11_02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS11_02);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS11_03.FBX", GIS11_03 => {
            GIS11_03.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS11_03.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS11_03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS11_03);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS11_04.FBX", GIS11_04 => {
            GIS11_04.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS11_04.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS11_04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS11_04);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS11_05.FBX", GIS11_05 => {
            GIS11_05.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS11_05.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS11_05.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS11_05);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS11_06.FBX", GIS11_06 => {
            GIS11_06.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS11_06.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS11_06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS11_06);
          }),
        new FBXLoader()
          .setPath("/models/gis/")
          .load("GIS11_07.FBX", GIS11_07 => {
            GIS11_07.traverse(child => {
              let map = new Three.TextureLoader().load(
                "/models/gis/GIS11_07.jpg",
                texture => {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              let mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                map: map
              });
              child.material = mater;
            });
            GIS11_07.scale.set(0.001, 0.001, 0.001);
            this.scene.add(GIS11_07);
          }),
        new FBXLoader().setPath("/models/gis/").load("GIS12.FBX", GIS12 => {
          GIS12.traverse(child => {
            let map = new Three.TextureLoader().load(
              "/models/gis/GIS12.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map
            });
            child.material = mater;
          });
          GIS12.scale.set(0.001, 0.001, 0.001);
          this.scene.add(GIS12);
        }),
        new FBXLoader().setPath("/models/").load("tree01.FBX", tree01 => {
          tree01.traverse(child => {
            let alphaMap = new Three.TextureLoader().load(
              "/models/tree01_alpha.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let map = new Three.TextureLoader().load(
              "/models/tree01.jpg",
              texture => {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            let mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap,
              depthTest: true,
              depthWrite: false
            });
            child.material = mater;
          });
          tree01.scale.set(0.001, 0.001, 0.001);
          let tree01Clone01 = tree01.clone();
          tree01Clone01.position.set(-0.5, 0, 0.02);
          let tree01Clone02 = tree01.clone();
          tree01Clone02.position.set(-0.5, 0, 0.36);
          let tree01Clone03 = tree01.clone();
          tree01Clone03.position.set(-0.27, 0, 0.36);
          let tree01Clone04 = tree01.clone();
          tree01Clone04.position.set(-0, 0, 0.36);
          let tree01Clone05 = tree01.clone();
          tree01Clone05.position.set(-0.25, 0, 0.02);
          this.scene.add(tree01);
          this.scene.add(tree01Clone01);
          this.scene.add(tree01Clone02);
          this.scene.add(tree01Clone03);
          this.scene.add(tree01Clone04);
          this.scene.add(tree01Clone05);
        });
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    loadTexture: (textureGuandao, color) => {
      let tubeMaterial = new Three.MeshPhongMaterial({
        color: 0xffffff,
        map: textureGuandao,
        transparent: true,
        emissive: color,
        depthTest: true
      });
      return tubeMaterial;
    },
    objectHide() {
      setTimeout(() => {}, 1);
    },
    objectShow() {
      setTimeout(() => {}, 1);
    },
    guandaoShow(checked) {
      if (checked === true) {
        this.guandaoGroup.visible = true;
      } else {
        this.guandaoGroup.visible = false;
      }
    },
    biaoshiShow(checked) {
      if (checked === false) {
        labelRenderer.setSize(0, 0);
        this.labelGroup.visible = false;
      } else {
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelGroup.visible = true;
      }
    },
    baojingShow(checked) {
      if (checked === true) {
        mySphere.visible = true;
        mySphere2.visible = true;
      } else {
        mySphere.visible = false;
        mySphere2.visible = false;
      }
    },
    create2DText(divName, position, CSSname) {
      divName = document.createElement("div");
      divName.className = CSSname;
      divName.style.backgroundImage = "./models/img/test.png";
      let myLabel01 = new CSS2DObject(divName);
      myLabel01.position.set(position.x, position.y, position.z);
      return myLabel01;
    },
    createSpriteText(content, position) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.font = "Bold 40px Arial";
      ctx.lineWidth = 4;
      ctx.fillText(content, 4, 104);
      let texture = new Three.Texture(canvas);
      texture.needsUpdate = true;

      let material = new Three.SpriteMaterial({ map: texture });
      let textObj = new Three.Sprite(material);
      textObj.scale.set(0.25, 0.125, 0.375);
      textObj.position.set(position.x, position.y, position.z);
      return textObj;
    },
    lineValue() {
      for (let i = 0; i < 10; i++) {
        lineGeometry.vertices[i].setY(this.lineArray[i]);
      }

      lineMesh.setGeometry(lineGeometry);
    },
    setKeydown() {
      window.addEventListener("keydown", e => {
        // console.log(e);
        if (e.keyCode === 40) {
          this.guandaoGroup.visible = false;
          labelRenderer.setSize(0, 0);
          this.labelGroup.visible = false;
          mySphere.visible = false;
        }
        if (e.keyCode === 37) {
          this.guandaoGroup.visible = true;
          labelRenderer.setSize(window.innerWidth, window.innerHeight);
          this.labelGroup.visible = true;
          mySphere.visible = true;
        }
      });
    },
    onDocumentMouseMove() {},
    animateCamera(current1, target1, current2, target2, clicked, mesh) {
      let positionVar = {
        x1: current1.x,
        y1: current1.y,
        z1: current1.z,
        x2: target1.x,
        y2: target1.y,
        z2: target1.z
      };

      this.controls.enabled = false;
      this.tween = new TWEEN.Tween(positionVar);

      this.tween.to(
        {
          x1: current2.x,
          y1: current2.y,
          z1: current2.z,
          x2: target2.x,
          y2: target2.y,
          z2: target2.z
        },
        1000
      );
      this.tween.onUpdate(() => {
        this.camera.position.x = positionVar.x1;
        this.camera.position.y = positionVar.y1;
        this.camera.position.z = positionVar.z1;
        this.controls.target.x = positionVar.x2;
        this.controls.target.y = positionVar.y2;
        this.controls.target.z = positionVar.z2;
        this.controls.update();
      });
      this.tween.onComplete(() => {
        if (clicked > 0) {
          mesh.visible = true;
          this.controls.enabled = false;
        } else {
          mesh.visible = false;
          this.controls.enabled = true;
        }
      });
      this.tween.easing(TWEEN.Easing.Cubic.InOut);
      this.tween.start();
    },

    loadGis(fileName, picName) {
      new FBXLoader().setPath("/models/gis/").load(fileName, model => {
        model.traverse(child => {
          let map = new Three.TextureLoader().load(
            "/models/gis/" + picName,
            texture => {
              texture.wrapS = texture.wrapT = Three.RepeatWrapping;
              texture.offset.set(0, 0);
              texture.repeat.set(1, 1);
            }
          );
          let mater = new Three.MeshBasicMaterial({
            color: 0xffffff,
            map: map
          });
          child.material = mater;
        });
        model.scale.set(0.001, 0.001, 0.001);
        this.scene.add(model);
      });
    },

    cloneObj(objCloneName, objName, x, y, z) {
      objCloneName = objName.clone();
      objCloneName.position.set(x, y, z);
      this.scene.add(objCloneName);
    },

    initGui() {
      this.water1.material.uniforms["config"].value.w = 2;
      this.water1.material.uniforms["flowDirection"].value.x = 1;
      this.water1.material.uniforms["flowDirection"].value.normalize();
      this.water1.material.uniforms["flowDirection"].value.y = 1;
      this.water1.material.uniforms["flowDirection"].value.normalize();

      this.water2.material.uniforms["config"].value.w = 1;
      this.water2.material.uniforms["flowDirection"].value.x = -0.2;
      this.water2.material.uniforms["flowDirection"].value.normalize();
      this.water2.material.uniforms["flowDirection"].value.y = -1;
      this.water2.material.uniforms["flowDirection"].value.normalize();
    }
  },
  mounted() {
    this.init();
    this.loadObj();
    this.initGui();
    this.setKeydown();
    this.animate();
    this.biaoshiShow(false);
    this.guandaoShow(false);
    this.baojingShow(false);
  }
};
</script>
<style scoped>
.map-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

#container {
  width: 100%;
  height: 100%;
}
</style>
