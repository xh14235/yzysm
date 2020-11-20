<template>
  <div class="common-wrapper map-wrapper">
    <div class="common-page-title">地图</div>
    <div class="common-page-main" :class="{ isSafari: isSafari }">
      <MapTest></MapTest>
      <ParkInfo></ParkInfo>
      <MapLeft></MapLeft>
      <MapRight></MapRight>
    </div>
    <div class="common-page-bottom">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Map",
  components: {
    Tabbar: () => import("@/components/common/Tabbar"),
    MapTest: () => import("@/components/three/MapTest"),
    ParkInfo: () => import("./components/ParkInfo"),
    MapLeft: () => import("./components/MapLeft"),
    MapRight: () => import("./components/MapRight")
  },
  computed: {
    ...mapState({
      isSafari: state => state.isSafari
    })
  }
};
</script>

<style lang="stylus" scoped>
.common-page-main
  position: relative
</style>
