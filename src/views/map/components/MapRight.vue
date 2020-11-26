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
import { mapState, mapMutations } from "vuex";
export default {
  name: "MapRight",
  data() {
    return {
      list: [
        {
          title: "图标",
          active: Number(sessionStorage.getItem("taggingShow")) || 0,
          icon1: require("@/assets/img/map-right-icon11.png"),
          icon2: require("@/assets/img/map-right-icon12.png")
        },
        {
          title: "报警",
          active: Number(sessionStorage.getItem("alarmShow")) || 0,
          icon1: require("@/assets/img/map-right-icon21.png"),
          icon2: require("@/assets/img/map-right-icon22.png")
        },
        {
          title: "路线",
          active: Number(sessionStorage.getItem("pipingShow")) || 0,
          icon1: require("@/assets/img/map-right-icon31.png"),
          icon2: require("@/assets/img/map-right-icon32.png")
        },
        {
          title: "行走",
          active: Number(sessionStorage.getItem("walkShow")) || 0,
          icon1: require("@/assets/img/map-right-icon41.png"),
          icon2: require("@/assets/img/map-right-icon42.png")
        }
      ]
    };
  },
  computed: {
    ...mapState({
      taggingShow: state => state.map.taggingShow,
      alarmShow: state => state.map.alarmShow,
      pipingShow: state => state.map.pipingShow,
      walkShow: state => state.map.walkShow
    })
  },
  methods: {
    changeActive(index) {
      switch (index) {
        case 0:
          this.changeTagging();
          this.list[index].active = this.taggingShow;
          break;
        case 1:
          this.changeAlarm();
          this.list[index].active = this.alarmShow;
          break;
        case 2:
          this.changePiping();
          this.list[index].active = this.pipingShow;
          break;
        case 3:
          this.changeWalk();
          this.list[index].active = this.walkShow;
          break;
        default:
          break;
      }
    },
    ...mapMutations([
      "changeTagging",
      "changeAlarm",
      "changePiping",
      "changeWalk"
    ])
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
