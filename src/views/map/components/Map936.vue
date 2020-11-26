<template>
  <div class="energy936-wrapper">
    <div class="common-echarts-box">
      <Epie :pieData="echarts" v-if="echarts.id"></Epie>
    </div>
  </div>
</template>

<script>
import { getConsumerAllEnergyNum } from "@/http/api";
import { mapState } from "vuex";
export default {
  name: "Map936",
  components: {
    Epie: () => import("@/components/echarts/Epie")
  },
  data() {
    return {
      echarts: {}
    };
  },
  computed: {
    ...mapState({
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      red: state => state.color.red,
      white: state => state.color.white,
      purple: state => state.color.purple,
      isSafari: state => state.isSafari
    })
  },
  methods: {
    getEchartsData() {
      getConsumerAllEnergyNum().then(res => {
        console.log(res);
        this.echarts = {
          id: "ccccc",
          name: "用能分析",
          title: "用能分析",
          titleTop: "43%",
          titleLeft: "18%",
          legendShow: true,
          borderWidth: false,
          labelShow: false,
          radius: ["60%", "70%"],
          center: ["20%", "50%"],
          color: [this.green, this.blue, this.purple, this.yellow],
          fontColor: "#fff",
          data: [
            { value: Math.floor(res.data.ELECTRICITY) || 0, name: "电" },
            { value: Math.floor(res.data.HOT_WATER) || 0, name: "热水" },
            { value: Math.floor(res.data.COLD) || 0, name: "冷" },
            { value: Math.floor(res.data.HOT) || 0, name: "热" }
          ]
        };
      });
    }
  },
  mounted() {
    this.getEchartsData();
  }
};
</script>

<style lang="stylus" scoped>
.energy936-wrapper
  width: 91.2vw
  height: 18vh
  background: rgba(0,0,0,.3)
  border-radius: 1rem
  position: absolute
  top: 1vh
  left: 4.4vw
  z-index: 1
  padding: 3vw
  display: flex
  justify-content: space-between
  align-items: center
  .common-echarts-box
    width: 100%
    height: 100%
</style>
