<template>
  <div class="map-left-wrapper">
    <img
      src="@/assets/img/map-location.png"
      alt=""
      class="map-left-icon"
      @click="mapLocation()"
    />
    <!--    <img-->
    <!--      src="@/assets/img/map-full-screen.png"-->
    <!--      alt=""-->
    <!--      class="map-left-icon"-->
    <!--      @click="mapFullScreen()"-->
    <!--    />-->
  </div>
</template>

<script>
// 地图左下角的按钮icon，分别为定位到原点及全屏显示地图，但功能没实现
export default {
  name: "MapLeft",
  methods: {
    mapLocation() {
      console.log("定位到圆点");
    }
    // mapFullScreen() {
    //   console.log("全屏");
    //   this.$router.push("/screen");
    // }
  }
};
</script>

<style lang="stylus" scoped>
.map-left-wrapper
  position: absolute
  left: 4.4vw
  bottom: 2vh
  z-index: 1
  .map-left-icon
    display: block
    width: 8vw
    height: 8vw
    margin-bottom: 2vh
</style>
