<template>
  <div class="screen-wrapper">
    <Loading v-if="!isLoaded"></Loading>
    <img class="back" src="../../assets/img/back.png" alt="" @click="back()" />
    <MapTest></MapTest>
    <MapRight></MapRight>
  </div>
</template>

<script>
export default {
  name: "Screen",
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
    MapTest: () => import("@/components/three/MapTest"),
    Loading: () => import("@/components/common/Loading"),
    MapRight: () => import("../map/components/MapRight")
  },
  methods: {
    back() {
      this.$router.push("/map");
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000);
  }
};
</script>

<style lang="stylus" scoped>
.screen-wrapper
  position: absolute
  top: -100vw
  left: 0
  width: 100vh
  height: 100vw
  background: #ddd
  transform-origin: bottom left
  transform: rotate(90deg)
  .back
    width: 9vw
    height: 9vw
    position: absolute
    top: 4vw
    left: 4vw
    z-index: 1
</style>
