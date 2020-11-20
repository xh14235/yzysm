<template>
  <div class="map-right-wrapper">
    <div
      class="map-right-item"
      v-for="(item, index) of list"
      :key="index"
      @click="changeActive(index)"
    >
      <img
        :src="item.active ? item.icon2 : item.icon1"
        alt=""
        class="map-right-icon"
      />
      <div class="map-right-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapRight",
  data() {
    return {
      list: [
        {
          title: "图标",
          active: false,
          icon1: require("@/assets/img/map-right-icon11.png"),
          icon2: require("@/assets/img/map-right-icon12.png")
        },
        {
          title: "报警",
          active: false,
          icon1: require("@/assets/img/map-right-icon21.png"),
          icon2: require("@/assets/img/map-right-icon22.png")
        },
        {
          title: "路线",
          active: false,
          icon1: require("@/assets/img/map-right-icon31.png"),
          icon2: require("@/assets/img/map-right-icon32.png")
        },
        {
          title: "行走",
          active: false,
          icon1: require("@/assets/img/map-right-icon41.png"),
          icon2: require("@/assets/img/map-right-icon42.png")
        }
      ]
    };
  },
  methods: {
    changeActive(index) {
      this.list[index].active = !this.list[index].active;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/assets/css/common.styl"
.map-right-wrapper
  position: absolute
  right: 4.4vw
  bottom: 2vh
  z-index: 1
  .map-right-item
    margin-bottom: 2vh
    text-align: center
    .map-right-icon
      width: 9vw
      height: 9vw
      margin-bottom: 1vh
    .map-right-title
      color: $white
</style>
