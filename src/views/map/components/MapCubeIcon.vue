<template>
  <img
    @click="hideCube()"
    src="@/assets/img/back.png"
    alt=""
    class="cube-back"
  />
</template>

<script>
// 该组件暂时没用，显示的魔方选择按钮
import { mapMutations } from "vuex";
export default {
  name: "MapCubeIcon",
  methods: {
    ...mapMutations(["hideCube"])
  }
};
</script>

<style lang="stylus" scoped>
.cube-back
  position: absolute
  left: 4.4vw
  bottom: 18vh
  z-index: 1
  display: block
  width: 8vw
  height: 8vw
</style>
