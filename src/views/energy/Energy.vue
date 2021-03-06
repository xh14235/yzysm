<template>
  <div class="common-wrapper map-wrapper">
    <div class="common-page-title">能源</div>
    <div class="common-page-main" :class="{ isSafari: isSafari }">
      <div class="all-num">
        <div class="all-num-detail">
          <span class="num">{{
            parseInt(allSupplyEnergy).toLocaleString()
          }}</span>
          <span class="unit">kWh</span>
        </div>
        <div class="all-num-title">总累计供能量</div>
      </div>
      <div class="single-num">
        <div class="common-box date-box">
          <div class="date-type">
            <div
              class="date-item"
              :class="{ active: curDate === item.val }"
              v-for="(item, index) of dateList"
              :key="index"
              @click="changeTab(index)"
            >
              {{ item.title }}
            </div>
          </div>
          <div class="date-detail" @click="showDatePicker">
            <span>{{ getDateFormat(currentDate) }}</span>
            <img src="../../assets/img/san.png" alt="" />
          </div>
        </div>
        <div class="common-box supply-box">
          <CommonTitle
            :icon="require('../../assets/img/title-icon.png')"
            :main="'供能统计'"
            :sub="getDateFormat(currentDate)"
          ></CommonTitle>
          <div class="common-echarts-box">
            <Epie :pieData="echarts1" v-if="echarts1.id"></Epie>
          </div>
        </div>
        <div class="common-box consume-box">
          <CommonTitle
            :icon="require('../../assets/img/title-icon.png')"
            :main="'用能趋势'"
            :sub="getDateFormat(currentDate)"
          ></CommonTitle>
          <div class="common-echarts-box">
            <Eline :lineData="echarts2" v-if="echarts2.id"></Eline>
          </div>
        </div>
      </div>
    </div>
    <div class="common-page-bottom">
      <Tabbar></Tabbar>
    </div>
    <div class="datetime-picker-wrapper" v-show="datePickerShow">
      <div class="hide-picker" @click="hideDatePicker"></div>
      <van-datetime-picker
        v-model="currentDate"
        :type="dateType"
        :title="dateTitle"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="changeDate"
      />
    </div>
  </div>
</template>

<script>
import { getEnergySavingTrend, getAllEnergyNum } from "@/http/api";
import { DatetimePicker } from "vant";
import { mapState } from "vuex";
export default {
  name: "Energy",
  components: {
    [DatetimePicker.name]: DatetimePicker,
    Tabbar: () => import("@/components/common/Tabbar"),
    Epie: () => import("@/components/echarts/Epie"),
    Eline: () => import("@/components/echarts/Eline"),
    CommonTitle: () => import("@/components/common/CommonTitle")
  },
  data() {
    return {
      curDate: 1,
      dateList: [
        {
          title: "按月统计",
          val: 0
        },
        {
          title: "按天统计",
          val: 1
        }
      ],
      echarts1: {},
      echarts2: {},
      allSupplyEnergy: 0,
      dateType: "date",
      dateType2: "day",
      dateTitle: "选择年月",
      datePickerShow: false,
      minDate: new Date(2020, 10, 7),
      maxDate: new Date(2020, 11, 1),
      currentDate: new Date(),
      timer: null,
      interval: 60000
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
    // 切换日期类型
    changeTab(index) {
      this.curDate = index;
      if (index === 1) {
        this.dateType = "date";
        this.dateType2 = "day";
        this.dateTitle = "选择年月日";
        this.currentDate = new Date();
      } else {
        this.dateType = "year-month";
        this.dateType2 = "month";
        this.dateTitle = "选择年月";
      }
      clearInterval(this.timer);
      this.timer = null;
      this.getEchartsData(this.dateType2, this.currentDate);
      this.timer = setInterval(() => {
        this.getEchartsData(this.dateType2, this.currentDate);
      }, this.interval);
    },
    // 根据日期类型及日期获取用能(冷热水电)趋势图
    getEchartsData(dateType, date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      let day = date.getDate();
      day = day > 9 ? day : "0" + day;
      date = year + "-" + month + "-" + day;
      let promise1 = new Promise((resolve, reject) => {
        getEnergySavingTrend({
          date,
          dateType,
          type: "ELECTRICITY"
        }).then(res => {
          if (res.success) {
            let data = res.data.map(item => {
              return item.value;
            });
            let xData = res.data.map(item => {
              return item.commonValue;
            });
            resolve([data, xData]);
          } else {
            reject();
          }
        });
      });
      let promise2 = new Promise((resolve, reject) => {
        getEnergySavingTrend({
          date,
          dateType,
          type: "HOT_WATER"
        }).then(res => {
          if (res.success) {
            let data = res.data.map(item => {
              return item.value;
            });
            resolve(data);
          } else {
            reject();
          }
        });
      });
      let promise3 = new Promise((resolve, reject) => {
        getEnergySavingTrend({
          date,
          dateType,
          type: "COLD"
        }).then(res => {
          if (res.success) {
            let data = res.data.map(item => {
              return item.value;
            });
            resolve(data);
          } else {
            reject();
          }
        });
      });
      let promise4 = new Promise((resolve, reject) => {
        getEnergySavingTrend({
          date,
          dateType,
          type: "HOT"
        }).then(res => {
          if (res.success) {
            let data = res.data.map(item => {
              return item.value;
            });
            resolve(data);
          } else {
            reject();
          }
        });
      });
      Promise.all([promise1, promise2, promise3, promise4]).then(res => {
        this.echarts2 = {
          id: "echarts2",
          title: "",
          legendShow: true,
          legendData: ["电", "热水", "冷", "热"],
          color: [this.green, this.blue, this.purple, this.yellow],
          areaColor: false,
          smooth: true,
          xData: res[0][1],
          yName: "(kWh)",
          data: [res[0][0], res[1], res[2], res[3]]
        };
      });
    },
    // 获取供能统计饼图数据
    getEcharts1() {
      getAllEnergyNum().then(res => {
        let data = res.data;
        this.allSupplyEnergy =
          data.electricity + data.cold + data.hot + data.hotWater;
        this.echarts1 = {
          id: "dddd",
          name: "用能比例",
          title: "用能比例",
          titleTop: "43%",
          titleLeft: "28%",
          legendShow: true,
          borderWidth: false,
          labelShow: false,
          radius: ["60%", "70%"],
          center: ["30%", "50%"],
          color: [this.green, this.blue, this.purple, this.yellow],
          data: [
            {
              value: Math.floor(data.electricity) || 0,
              name: "电"
            },
            {
              value: Math.floor(data.hotWater) || 0,
              name: "热水"
            },
            {
              value: Math.floor(data.cold) || 0,
              name: "冷"
            },
            {
              value: Math.floor(data.hot) || 0,
              name: "热"
            }
          ]
        };
      });
    },
    // 显示日期选择器
    showDatePicker() {
      this.datePickerShow = true;
    },
    // 隐藏日期选择器
    hideDatePicker() {
      this.datePickerShow = false;
    },
    // 选择日期后,重新获取echarts图数据
    changeDate() {
      this.hideDatePicker();
      clearInterval(this.timer);
      this.timer = null;
      this.getEchartsData(this.dateType2, this.currentDate);
      this.timer = setInterval(() => {
        this.getEchartsData(this.dateType2, this.currentDate);
      }, this.interval);
    },
    // 获取需要的日期格式方法
    getDateFormat(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      if (this.dateType === "date") {
        return year + "年" + month + "月" + day + "日";
      } else {
        return year + "年" + month + "月";
      }
    }
  },
  mounted() {
    this.maxDate = new Date();
    this.getEchartsData(this.dateType2, this.currentDate);
    this.getEcharts1();
    this.timer = setInterval(() => {
      this.getEchartsData(this.dateType2, this.currentDate);
      this.getEcharts1();
    }, this.interval);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.common-page-main
  // position: relative
  .all-num
    width: 100%
    height: 25%
    background-image: linear-gradient(to right, $blue, $purple)
    text-align: center
    .all-num-detail
      color: $white
      .num
        font-size: 3.6rem
        font-weight: 500
      .unit
        font-size: 1.2rem
    .all-num-title
      color: $white
      font-size: 1.2rem
  .single-num
    // position: absolute
    // top: 13vh
    // left: 0
    flex: auto
    width: 100%
    height: 83%
    transform: translateY(-10%)
    overflow: hidden
    display: flex
    flex-direction: column
    .date-box
      height: 10vh
      text-align: center
      display: flex
      flex-direction: column
      justify-content: space-around
      .date-type
        display: flex
        justify-content: space-between
        padding-bottom: 1vh
        .date-item
          flex: 0 0 50%
          width: 50%
          color: $subfont
          font-size: 1.2rem
          &.active
            color: $mainfont
      .date-detail
        font-size: 1.2rem
        color: $mainfont
        border-top: 1px solid #E9EEF5
        padding-top: 1vh
        img
          width: 3.2vw
          vertical-align: top
          padding-top: 2px
          margin-left: 2vw
    .supply-box
      flex: auto
      display: flex
      flex-direction: column
      .common-echarts-box
        flex: auto
        height: 20vh
    .consume-box
      flex: auto
      display: flex
      flex-direction: column
      .common-echarts-box
        flex: auto
        height: 20vh
.datetime-picker-wrapper
  width: 100%
  height: 100vh
  position: fixed
  top: 0
  left: 0
  background: rgba(0, 0, 0, 0.5)
  display: flex
  flex-direction: column
  justify-content: space-between
  .hide-picker
    flex: auto
</style>
