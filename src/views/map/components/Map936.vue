<template>
  <div class="energy936-wrapper">
    <div class="common-echarts-box">
      <Epie :pieData="echarts" v-if="echarts.id"></Epie>
    </div>
    <div class="energy936-info">
      <div class="energy936-title">能源馆</div>
      <div class="energy936-line"></div>
      <div class="energy936-list">
        <div class="energy936-item" v-for="(item, index) of list" :key="index">
          <span
            class="energy936-icon"
            :style="{ background: item.color }"
          ></span>
          <span class="energy936-name">{{ item.name }}</span>
          <span class="energy936-num">{{ item.num }}</span>
          <span class="energy936-unit">kWh</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 该组件是点击地图936能源馆时显示
import {
  getConsumerAllEnergyNum,
  getSingleConsumerEnergyNum
} from "@/http/api";
import { mapState } from "vuex";
export default {
  name: "Map936",
  components: {
    Epie: () => import("@/components/echarts/Epie")
  },
  data() {
    return {
      echarts: {},
      list: []
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
      isSafari: state => state.isSafari,
      floor: state => state.map.floor
    })
  },
  methods: {
    // 获取936能源馆总的用能分析echarts饼图数据
    getEchartsData() {
      getConsumerAllEnergyNum().then(res => {
        this.echarts = {
          id: "echarts936",
          name: "用能分析",
          title: "用能分析",
          titleTop: "40%",
          titleLeft: "47%",
          legendShow: false,
          borderWidth: false,
          labelShow: false,
          radius: ["60%", "70%"],
          center: ["50%", "50%"],
          color: [this.green, this.blue, this.purple, this.yellow],
          fontColor: "#fff",
          data: [
            { value: Math.floor(res.data.ELECTRICITY) || 0, name: "电" },
            { value: Math.floor(res.data.HOT_WATER) || 0, name: "热水" },
            { value: Math.floor(res.data.COLD) || 0, name: "冷" },
            { value: Math.floor(res.data.HOT) || 0, name: "热" }
          ]
        };
        this.list = [
          {
            color: this.green,
            name: "电",
            num: res.data.ELECTRICITY
          },
          {
            color: this.blue,
            name: "热水",
            num: res.data.HOT_WATER
          },
          {
            color: this.purple,
            name: "冷",
            num: res.data.COLD
          },
          {
            color: this.yellow,
            name: "热",
            num: res.data.HOT
          }
        ];
      });
    },
    // 获取936能源馆各楼层用能分析echarts饼图数据
    getEchartsFloor() {
      let promise1 = new Promise((resolve, reject) => {
        getSingleConsumerEnergyNum({
          type: "ELECTRICITY",
          floorNum: this.floor
        }).then(res => {
          if (res.success) {
            resolve(res.data[res.data.length - 1].value);
          } else {
            reject();
          }
        });
      });
      let promise2 = new Promise((resolve, reject) => {
        getSingleConsumerEnergyNum({
          type: "HOT_WATER",
          floorNum: this.floor
        }).then(res => {
          if (res.success) {
            resolve(res.data[res.data.length - 1].value);
          } else {
            reject();
          }
        });
      });
      let promise3 = new Promise((resolve, reject) => {
        getSingleConsumerEnergyNum({
          type: "COLD",
          floorNum: this.floor
        }).then(res => {
          if (res.success) {
            resolve(res.data[res.data.length - 1].value);
          } else {
            reject();
          }
        });
      });
      let promise4 = new Promise((resolve, reject) => {
        getSingleConsumerEnergyNum({
          type: "HOT",
          floorNum: this.floor
        }).then(res => {
          if (res.success) {
            resolve(res.data[res.data.length - 1].value);
          } else {
            reject();
          }
        });
      });
      Promise.all([promise1, promise2, promise3, promise4]).then(res => {
        this.echarts = {
          id: "echarts936",
          name: "用能分析",
          title: "用能分析",
          titleTop: "40%",
          titleLeft: "47%",
          legendShow: false,
          borderWidth: false,
          labelShow: false,
          radius: ["60%", "70%"],
          center: ["50%", "50%"],
          color: [this.green, this.blue, this.purple, this.yellow],
          fontColor: "#fff",
          data: [
            { value: Math.floor(res[0]) || 0, name: "电" },
            { value: Math.floor(res[1]) || 0, name: "热水" },
            { value: Math.floor(res[2]) || 0, name: "冷" },
            { value: Math.floor(res[3]) || 0, name: "热" }
          ]
        };
        this.list = [
          {
            color: this.green,
            name: "电",
            num: res[0]
          },
          {
            color: this.blue,
            name: "热水",
            num: res[1]
          },
          {
            color: this.purple,
            name: "冷",
            num: res[2]
          },
          {
            color: this.yellow,
            name: "热",
            num: res[3]
          }
        ];
      });
    }
  },
  watch: {
    floor() {
      if (this.floor === 0) {
        this.getEchartsData();
      } else {
        this.getEchartsFloor();
      }
    }
  },
  mounted() {
    if (this.floor === 0) {
      this.getEchartsData();
    } else {
      this.getEchartsFloor();
    }
  }
};
</script>

<style lang="stylus" scoped>
.energy936-wrapper
  width: 91.2vw
  height: 18vh
  background: rgba(0, 0, 0, 0.15)
  border-radius: 1rem
  position: absolute
  top: 1vh
  left: 4.4vw
  z-index: 1
  padding: 3vw 5vw
  display: flex
  justify-content: space-between
  align-items: center
  .common-echarts-box
    flex: 0 0 50%
    width: 50%
    height: 100%
  .energy936-info
    flex: 0 0 50%
    width: 50%
    height: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
    color: #fff
    .energy936-title
      color: #fff
      font-size: 1.5rem
    .energy936-line
      width: 45%
      height: 1px
      background: rgba(255, 255, 255, 0.5)
    .energy936-list
      font-size: 1rem
      .energy936-item
        display: flex
        justify-content: space-between
        align-items: center
        .energy936-icon
          display: inline-block
          width: 1.33333vw
          height: 1.33333vw
          border-radius: 50%
        .energy936-name
          flex: 0 0 20%
          width: 20%
        .energy936-num
          flex: 0 0 45%
          width: 45%
          font-size: 1.4rem
        .energy936-unit
          flex: 0 0 20%
          width: 20%
</style>
