<template>
  <div class="map-wrapper">
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

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
    init: function() {
      let container = document.getElementById("container");
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 0.6;
      this.scene = new Three.Scene();

      this.scene.background = new Three.CubeTextureLoader()
        .setPath("/models/skyBox/")
        .load([
          "right.jpg",
          "left.jpg",
          "top.jpg",
          "bottom.jpg",
          "front.jpg",
          "back.jpg"
        ]);

      let point = new Three.PointLight(0xffffff);
      point.position.set(20, 20, 20);
      this.scene.add(point);

      /*var groundGeom = new Three.PlaneGeometry(10, 10, 1, 1)
      var lightMap = new  Three.TextureLoader().load('/models/dimian01LightingMap.jpg')
      var map = new  Three.TextureLoader().load('/models/wood.jpg', function (texture) {
        texture.wrapS = texture.wrapT = Three.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(100, 100);
      })
      var testmaterial = new Three.MeshLambertMaterial(
              {
                color: 0x777777,
                lightMap: lightMap,
                map: map
              });

      groundGeom.faceVertexUvs[1] = groundGeom.faceVertexUvs[0];
      var groundMesh = new Three.Mesh(groundGeom, testmaterial);
      groundMesh.rotation.x = -Math.PI / 2;
      this.scene.add(groundMesh);*/

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
    loadObj: function() {
      /* new MTLLoader().setPath('/models/').load('dimian02.mtl', materials => {

         materials.preload()
         new OBJLoader().setMaterials(materials).setPath('/models/').load('dimian02.obj', obj2 => {
           obj2.scale.set(0.001, 0.001, 0.001)
           obj2.position.set(0, 0, 0)
           this.scene.add(obj2)
         })
       }),*/

      new FBXLoader().setPath("/models/").load("dimian01.FBX", object => {
        object.traverse(function(child) {
          var lightMap = new Three.TextureLoader().load(
            "/models/dimian01LightingMap.jpg"
          );
          var map = new Three.TextureLoader().load("/models/27.png", function(
            texture
          ) {
            texture.wrapS = texture.wrapT = Three.RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(2, 1);
          });
          var mater = new Three.MeshBasicMaterial({
            color: 0xffffff,
            lightMap: lightMap,
            map: map
          });
          child.material = mater;
        });
        object.scale.set(0.001, 0.001, 0.001);
        this.scene.add(object);
      }),
        new FBXLoader().setPath("/models/").load("dimian02.FBX", object2 => {
          object2.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian02LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load(
              "/models/grass.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object2.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object2);
        }),
        new FBXLoader().setPath("/models/").load("dimian03.FBX", object3 => {
          object3.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian03LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load("/models/27.png", function(
              texture
            ) {
              texture.wrapS = texture.wrapT = Three.RepeatWrapping;
              texture.offset.set(0, 0);
              texture.repeat.set(2, 3);
            });
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object3.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object3);
        }),
        new FBXLoader().setPath("/models/").load("dimian04.FBX", object4 => {
          object4.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian04LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object4.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object4);
        }),
        new FBXLoader().setPath("/models/").load("dimian05.FBX", object5 => {
          object5.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian05LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object5.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object5);
        }),
        new FBXLoader().setPath("/models/").load("dimian06.FBX", object6 => {
          object6.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian06LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object6.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object6);
        }),
        new FBXLoader().setPath("/models/").load("dimian07.FBX", object7 => {
          object7.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian07LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load("/models/17.png", function(
              texture
            ) {
              texture.wrapS = texture.wrapT = Three.RepeatWrapping;
              texture.offset.set(0, 0);
              texture.repeat.set(2, 3);
            });
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object7.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object7);
        }),
        new FBXLoader().setPath("/models/").load("dimian08.FBX", object8 => {
          object8.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian08LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load(
              "/models/grass.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object8.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object8);
        }),
        new FBXLoader().setPath("/models/").load("dimian09.FBX", object9 => {
          object9.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian09LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load("/models/27.png", function(
              texture
            ) {
              texture.wrapS = texture.wrapT = Three.RepeatWrapping;
              texture.offset.set(0, 0);
              texture.repeat.set(2, 3);
            });
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object9.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object9);
        }),
        new FBXLoader().setPath("/models/").load("dimian10.FBX", object10 => {
          object10.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian10LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(2, 3);
              }
            );
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object10.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object10);
        }),
        new FBXLoader().setPath("/models/").load("dimian11.FBX", object11 => {
          object11.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian11LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load(
              "/models/STON04M.JPG",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(0.5, 0.7);
              }
            );
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          object11.scale.set(0.001, 0.001, 0.001);
          this.scene.add(object11);
        }),
        new FBXLoader().setPath("/models/").load("dimian12.FBX", dimian12 => {
          dimian12.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/dimian12LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load("/models/27.png", function(
              texture
            ) {
              texture.wrapS = texture.wrapT = Three.RepeatWrapping;
              texture.offset.set(0, 0);
              texture.repeat.set(0.5, 0.7);
            });
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map
            });
            child.material = mater;
          });
          dimian12.scale.set(0.001, 0.001, 0.001);
          this.scene.add(dimian12);
        }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan01.FBX", zhanguan01 => {
            zhanguan01.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan01LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/27.png",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(0.5, 0.7);
                }
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zhanguan01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan02.FBX", zhanguan02 => {
            zhanguan02.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan02LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/27.png",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(0.5, 0.7);
                }
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zhanguan02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan03.FBX", zhanguan03 => {
            zhanguan03.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan03LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan04.FBX", zhanguan04 => {
            zhanguan04.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan04LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan04.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan04);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan05.FBX", zhanguan05 => {
            zhanguan05.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan05LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan05.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan05);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan06.FBX", zhanguan06 => {
            zhanguan06.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan06LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan06.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan06);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan07.FBX", zhanguan07 => {
            zhanguan07.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan07LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan07.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan07);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan08.FBX", zhanguan08 => {
            zhanguan08.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan08LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zhanguan08.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan08);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan09.FBX", zhanguan09 => {
            zhanguan09.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan09LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan09.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan09);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan10.FBX", zhanguan10 => {
            zhanguan10.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan10LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zhanguan10.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan10);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan11.FBX", zhanguan11 => {
            zhanguan11.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan11LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/wood.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zhanguan11.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan11);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan12.FBX", zhanguan12 => {
            zhanguan12.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan12LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan12.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan12);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan13.FBX", zhanguan13 => {
            zhanguan13.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan13LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan13.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan13);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan14.FBX", zhanguan14 => {
            zhanguan14.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan14LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                side: Three.DoubleSide
              });
              child.material = mater;
            });
            zhanguan14.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan14);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan15.FBX", zhanguan15 => {
            zhanguan15.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan15LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/pv.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zhanguan15.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan15);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan16.FBX", zhanguan16 => {
            zhanguan16.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan16LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                map: map
              });
              child.material = mater;
            });
            zhanguan16.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan16);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan17.FBX", zhanguan17 => {
            zhanguan17.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan17LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan17.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan17);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("zhanguan18.FBX", zhanguan18 => {
            zhanguan18.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zhanguan18LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zhanguan18.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zhanguan18);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang01.FBX", jizhuangxiang01 => {
            jizhuangxiang01.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang01LightingMap.jpg"
              );
              var sky = new Three.CubeTextureLoader()
                .setPath("/models/skyBox/")
                .load([
                  "right.jpg",
                  "left.jpg",
                  "top.jpg",
                  "bottom.jpg",
                  "front.jpg",
                  "back.jpg"
                ]);
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap,
                envMap: sky
              });
              child.material = mater;
            });
            jizhuangxiang01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang02.FBX", jizhuangxiang02 => {
            jizhuangxiang02.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang02LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            jizhuangxiang02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang02);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("jizhuangxiang03.FBX", jizhuangxiang03 => {
            jizhuangxiang03.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/jizhuangxiang03LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            jizhuangxiang03.scale.set(0.001, 0.001, 0.001);
            this.scene.add(jizhuangxiang03);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("qiutizhizhu.FBX", qiutizhizhu => {
            qiutizhizhu.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/qiutizhizhuLightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
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
            qiutigangjia.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/qiutigangjiaLightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            qiutigangjia.scale.set(0.001, 0.001, 0.001);
            this.scene.add(qiutigangjia);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("qiutidaping.FBX", qiutidaping => {
            qiutidaping.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/qiutidapingLightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang01.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang01LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/31.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang02.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang02LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/31.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang03.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang03LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/31.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang04.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang04LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/31.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang05.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang05LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang06.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang06LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang07.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang07LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang08.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang08LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang09.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang09LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            weiqiang09.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang09);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("weiqiang10.FBX", weiqiang10 => {
            weiqiang10.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang10LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
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
            weiqiang11.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/weiqiang11LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            weiqiang11.scale.set(0.001, 0.001, 0.001);
            this.scene.add(weiqiang11);
          }),
        new FBXLoader().setPath("/models/").load("shanlan01.FBX", shanlan01 => {
          shanlan01.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/shanlan01LightingMap.jpg"
            );
            var map = new Three.TextureLoader().load(
              "/models/wood.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var mater = new Three.MeshBasicMaterial({
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
          shanlan02.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/shanlan02LightingMap.jpg"
            );
            var alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var mater = new Three.MeshBasicMaterial({
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
          shanlan03.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/shanlan03LightingMap.jpg"
            );
            var alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var mater = new Three.MeshBasicMaterial({
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
          shanlan04.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/shanlan04LightingMap.jpg"
            );
            var alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var mater = new Three.MeshBasicMaterial({
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
          shanlan05.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/shanlan05LightingMap.jpg"
            );
            var alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var mater = new Three.MeshBasicMaterial({
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
          shanlan06.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/shanlan06LightingMap.jpg"
            );
            var alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var mater = new Three.MeshBasicMaterial({
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
          shanlan07.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/shanlan07LightingMap.jpg"
            );
            var alphaMap = new Three.TextureLoader().load(
              "/models/shanlan_alpha.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var map = new Three.TextureLoader().load(
              "/models/shanlan.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var mater = new Three.MeshBasicMaterial({
              color: 0xffffff,
              lightMap: lightMap,
              map: map,
              transparent: true,
              side: Three.DoubleSide,
              alphaMap: alphaMap
            });
            child.material = mater;
          });
          shanlan07.scale.set(0.001, 0.001, 0.001);
          this.scene.add(shanlan07);
        }),
        new FBXLoader().setPath("/models/").load("shanlan08.FBX", shanlan08 => {
          shanlan08.traverse(function(child) {
            var lightMap = new Three.TextureLoader().load(
              "/models/shanlan08LightingMap.jpg"
            );
            var mater = new Three.MeshBasicMaterial({
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
          .load("youyongchi01.FBX", youyongchi01 => {
            youyongchi01.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/youyongchi01LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/28.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
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
            youyongchi02.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/youyongchi02LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/29.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
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
            guangfuban01.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/guangfuban01LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0x050885,
                lightMap: lightMap
              });
              child.material = mater;
            });
            guangfuban01.scale.set(0.001, 0.001, 0.001);
            this.scene.add(guangfuban01);
          }),
        new FBXLoader()
          .setPath("/models/")
          .load("guangfubanjiazi01.FBX", guangfubanjiazi01 => {
            guangfubanjiazi01.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/guangfubanjiazi01LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
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
            guangfubanjiazi02.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/guangfubanjiazi02LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
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
            zixingchepeng01.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zixingchepeng01LightingMap.jpg"
              );
              var map = new Three.TextureLoader().load(
                "/models/wood02.jpg",
                function(texture) {
                  texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                  texture.offset.set(0, 0);
                  texture.repeat.set(1, 1);
                }
              );
              var mater = new Three.MeshBasicMaterial({
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
            zixingchepeng02.traverse(function(child) {
              var lightMap = new Three.TextureLoader().load(
                "/models/zixingchepeng02LightingMap.jpg"
              );
              var mater = new Three.MeshBasicMaterial({
                color: 0xffffff,
                lightMap: lightMap
              });
              child.material = mater;
            });
            zixingchepeng02.scale.set(0.001, 0.001, 0.001);
            this.scene.add(zixingchepeng02);
          }),
        new FBXLoader().setPath("/models/").load("tree01.FBX", tree01 => {
          tree01.traverse(function(child) {
            var alphaMap = new Three.TextureLoader().load(
              "/models/tree01_alpha.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var map = new Three.TextureLoader().load(
              "/models/tree01.jpg",
              function(texture) {
                texture.wrapS = texture.wrapT = Three.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1);
              }
            );
            var mater = new Three.MeshBasicMaterial({
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
      /*new MTLLoader().setPath('/models/tree/').load('shugan01.mtl', materials => {
        console.log('materials', materials)
        materials.preload()
        new OBJLoader().setMaterials(materials).setPath('/models/tree/').load('shugan01.obj', obj => {
          obj.scale.set(0.001, 0.001, 0.001)
          obj.position.set(0, 0, 0)
          this.scene.add(obj)
        })
      })
      new MTLLoader().setPath('/models/tree/').load('shuye01.mtl', materials => {
        console.log('materials', materials)
        materials.preload()
        new OBJLoader().setMaterials(materials).setPath('/models/tree/').load('shuye01.obj', obj => {
          obj.traverse(function (child)
          {
            if(child instanceof Three.Mesh)
            {
              child.material.transparent = true;
              child.material.depthTest = true;
              child.material.depthWrite = false;
            }
          });
          obj.scale.set(0.001, 0.001, 0.001)
          obj.position.set(0, 0, 0)
          this.scene.add(obj)
        })
      })*/
    }
  },
  mounted() {
    this.init();
    this.loadObj();
    this.animate();
  }
};
</script>
<style lang="stylus" scoped>
.map-wrapper
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100vh

  #container
    width: 100%
    height: 100%
</style>
