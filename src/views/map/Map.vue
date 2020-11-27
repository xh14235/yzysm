<template>
  <div class="common-wrapper map-wrapper">
    <Loading v-if="!isLoaded"></Loading>
    <div class="common-page-title">地图</div>
    <div class="common-page-main" :class="{ isSafari: isSafari }">
      <MapTest></MapTest>
      <ParkInfo v-if="!mapCubeShow && !mapFloorShow"></ParkInfo>
      <MapLeft v-if="!mapCubeShow && !mapFloorShow"></MapLeft>
      <MapRight v-if="!mapCubeShow && !mapFloorShow"></MapRight>
      <MapFloor v-if="mapFloorShow"></MapFloor>
      <Map936 v-if="mapFloorShow"></Map936>
      <MapCube v-if="mapCubeShow"></MapCube>
      <MapCubeIcon v-if="mapCubeShow"></MapCubeIcon>
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
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
    Tabbar: () => import("@/components/common/Tabbar"),
    Loading: () => import("@/components/common/Loading"),
    MapTest: () => import("@/components/three/MapTest"),
    ParkInfo: () => import("./components/ParkInfo"),
    MapLeft: () => import("./components/MapLeft"),
    MapRight: () => import("./components/MapRight"),
    MapFloor: () => import("./components/MapFloor"),
    MapCube: () => import("./components/MapCube"),
    MapCubeIcon: () => import("./components/MapCubeIcon"),
    Map936: () => import("./components/Map936")
  },
  computed: {
    ...mapState({
      isSafari: state => state.isSafari,
      mapFloorShow: state => state.map.mapFloorShow,
      mapCubeShow: state => state.map.mapCubeShow
    })
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000);
  }
};
</script>

<style lang="stylus" scoped>
.common-page-main
  position: relative
</style>
