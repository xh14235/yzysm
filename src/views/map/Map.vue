<template>
  <div class="common-wrapper map-wrapper">
    <div class="common-page-title">地图</div>
    <div class="common-page-main">
      <MapTest></MapTest>
    </div>
    <div class="common-page-bottom">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Map",
  components: {
    Tabbar: () => import("@/components/common/Tabbar"),
    MapTest: () => import("@/components/three/MapTest")
  }
};
</script>

<style lang="stylus" scoped>
.map-wrapper
  width: 100%
  height: 100vh
</style>
