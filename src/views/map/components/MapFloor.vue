<template>
  <div class="floor-wrapper">
    <img
      @click="hideFloor()"
      src="@/assets/img/back.png"
      alt=""
      class="floor-back floor-item"
    />
    <img
      v-for="(item, index) of list"
      :key="index"
      :src="curIndex === index ? item.icon2 : item.icon1"
      alt=""
      class="floor-item"
      @click="changeActive(index)"
    />
  </div>
</template>

<script>
// 该组件暂时没用，显示的是楼层icon
import { mapMutations } from "vuex";
export default {
  name: "MapFloor",
  data() {
    return {
      curIndex: 0,
      list: [
        {
          active: true,
          icon1: require("@/assets/img/floor01.png"),
          icon2: require("@/assets/img/floor02.png")
        },
        {
          active: false,
          icon1: require("@/assets/img/floor11.png"),
          icon2: require("@/assets/img/floor12.png")
        },
        {
          active: false,
          icon1: require("@/assets/img/floor21.png"),
          icon2: require("@/assets/img/floor22.png")
        },
        {
          active: false,
          icon1: require("@/assets/img/floor31.png"),
          icon2: require("@/assets/img/floor32.png")
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["hideFloor"]),
    // backToMap() {
    //   console.log(111 + "back");
    // },
    changeActive(index) {
      this.curIndex = index;
    }
  }
};
</script>

<style lang="stylus" scoped>
.floor-wrapper
  position: absolute
  left: 4.4vw
  bottom: 18vh
  z-index: 1
  .floor-item
    display: block
    width: 8vw
    height: 8vw
    margin-bottom: 2vh
</style>
