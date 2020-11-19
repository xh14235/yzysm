<template>
  <div class="tabbar-wrapper">
    <div
      class="tabbar-item"
      v-for="(item, index) of list"
      @click="changeTab(index)"
      :key="item.id"
    >
      <img
        :src="mapTab === index ? item.icon2 : item.icon1"
        alt=""
        class="tabbar-img"
      />
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Tabbar",
  data() {
    return {
      list: [
        {
          id: "01",
          icon1: require("@/assets/img/icon01.png"),
          icon2: require("@/assets/img/icon01-active.png")
        },
        {
          id: "02",
          icon1: require("@/assets/img/icon02.png"),
          icon2: require("@/assets/img/icon02-active.png")
        },
        {
          id: "03",
          icon1: require("@/assets/img/icon03.png"),
          icon2: require("@/assets/img/icon03-active.png")
        },
        {
          id: "04",
          icon1: require("@/assets/img/icon04.png"),
          icon2: require("@/assets/img/icon04-active.png")
        }
      ]
    };
  },
  computed: {
    ...mapState(["mapTab"])
  },
  methods: {
    ...mapMutations(["changeMapTab"]),
    changeTab(index) {
      this.changeMapTab(index);
      const rt = router.options.routes;
      if (this.$route.path !== rt[index + 1].path) {
        this.$router.push(rt[index + 1].path);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.tabbar-wrapper
  width: 100%
  height: 7.5vh
  display: flex
  align-items: center
  .tabbar-item
    flex: 0 0 25%
    width: 25%
    line-height: 7.5vh
    text-align center
    .tabbar-img
      width: 9.5vw
</style>
