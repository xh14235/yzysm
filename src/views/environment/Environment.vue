<template>
  <div class="common-wrapper map-wrapper">
    <div class="common-page-title">环境</div>
    <div class="common-page-main" :class="{ isSafari: isSafari }">
      <div class="weather-wrapper">
        <div class="today-weather">
          <img :src="icon" alt="" class="today-icon" />
          <div class="today-tem">{{ tem }}</div>
          <div class="today-detail">
            <div class="wea">{{ wea }}</div>
            <div class="tem2">{{ `${tem2}/${tem1}` }}</div>
          </div>
        </div>
        <div class="weather-list">
          <div class="weather-item" v-for="item of wea3list" :key="item.date">
            <img
              :src="require('@/assets/img/' + item.wea_img + '.png')"
              alt=""
              class="weather-icon"
            />
            <div class="weather-info">
              <div class="weather-date">{{ item.date }}</div>
              <div class="weather-temperature">
                {{ `${item.tem1}/${item.tem2}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="other-wrapper">
        <div class="common-box air-box">
          <CommonTitle
            :icon="require('../../assets/img/air-icon.png')"
            :main="`空气检测`"
            :sub="`更新于今天${updateTime}`"
          ></CommonTitle>
          <div class="air-detail">
            <div class="air-detail-box pm25">
              <div class="pm25-left">
                <span class="pm25-num" :style="{ color: color }">{{
                  pm25
                }}</span>
                <div class="pm25-unit">PM2.5 Ug/m³</div>
              </div>
              <div class="pm25-right">
                <div class="pm25-right-item">优</div>
                <div class="pm25-right-item">量</div>
                <div class="pm25-right-item">差</div>
              </div>
            </div>
            <div class="air-detail-box gas">
              <div
                class="gas-item"
                v-for="(item, index) of airList"
                :key="index"
              >
                <div class="gas-item-title">{{ item.title }}</div>
                <div class="gas-item-num">{{ item.num }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="common-box water-box">
          <CommonTitle
            :icon="require('../../assets/img/water-icon.png')"
            :main="`水质COD分析`"
            :sub="`更新于今天${updateTime}`"
          ></CommonTitle>
          <div class="water-detail">
            <div class="common-echarts-box">
              <Eline :lineData="echarts" v-if="echarts.id"></Eline>
            </div>
            <div class="water-list">
              <div
                class="water-item"
                v-for="(item, index) of waterList"
                :key="index"
              >
                <img
                  src="../../assets/img/water-circle.png"
                  alt=""
                  class="water-icon"
                />
                <div class="water-info">
                  <div class="water-title">{{ item.title }}</div>
                  <div class="water-other">
                    <span class="water-num">{{ item.num }}</span>
                    <span class="water-unit">{{ item.unit }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="common-page-bottom">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Environment",
  data() {
    return {
      icon: "",
      tem: "",
      tem1: "",
      tem2: "",
      wea: "",
      wea3list: [],
      pm25: "",
      updateTime: "",
      airList: [],
      echarts: {},
      waterList: [],
      timer: null,
      interval: 60000
    };
  },
  computed: {
    ...mapState({
      green: state => state.color.green,
      yellow: state => state.color.yellow,
      red: state => state.color.red,
      mainfont: state => state.color.mainfont,
      isSafari: state => state.isSafari
    }),
    color() {
      if (this.pm25 < 50) {
        return this.green;
      } else if (this.pm25 >= 50 && this.pm25 < 100) {
        return this.yellow;
      } else {
        return this.red;
      }
    }
  },
  components: {
    Tabbar: () => import("@/components/common/Tabbar"),
    CommonTitle: () => import("@/components/common/CommonTitle"),
    Eline: () => import("@/components/echarts/Eline")
  },
  methods: {
    // 获取天气信息
    getWeather() {
      const jsonp = require("jsonp");
      jsonp(
        "https://tianqiapi.com/api?version=v1&appid=95555958&appsecret=Fjprg6Px",
        null,
        (err, data) => {
          if (err) {
            console.error(err.message);
          } else {
            this.icon = require("@/assets/img/" +
              data.data[0].wea_img +
              ".png");
            this.tem = data.data[0].tem;
            this.tem1 = data.data[0].tem1;
            this.tem2 = data.data[0].tem2;
            this.wea = data.data[0].wea;
            this.wea3list = data.data.slice(1, 4);
          }
        }
      );
    },
    // 获取空气检测信息
    getAirInfo() {
      const jsonp = require("jsonp");
      jsonp(
        "https://tianqiapi.com/api?version=v6&appid=95555958&appsecret=Fjprg6Px",
        null,
        (err, data) => {
          if (err) {
            console.error(err.message);
          } else {
            this.pm25 = data.air_pm25;
            this.airList = [
              {
                title: "PM2.5",
                num: this.pm25
              },
              {
                title: "PM10",
                num: 60
              },
              {
                title: "SO2",
                num: 55
              },
              {
                title: "NO2",
                num: 32
              },
              {
                title: "O3",
                num: 15
              },
              {
                title: "CO",
                num: 35
              }
            ];
            this.getUpdateTime();
          }
        }
      );
    },
    // 获取最新更新时间
    getUpdateTime() {
      let date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      this.updateTime = hour + ":" + minute;
    },
    // 获取水质信息
    getWaterInfo() {
      let date = new Date();
      let hour = date.getHours();
      let xData = [];
      let data = [];
      for (let i = 1; i <= hour; i++) {
        xData.push(i);
        data.push(Math.floor(Math.random() * 30));
      }
      setTimeout(() => {
        this.echarts = {
          id: "echarts2",
          title: "",
          legendShow: false,
          legendData: ["水质分析"],
          color: [this.mainfont],
          areaColor: true,
          smooth: true,
          xData,
          yName: "(mg/L)",
          data: [data]
        };
      }, 100);
      this.waterList = [
        {
          title: "水温",
          num: 22,
          unit: "℃"
        },
        {
          title: "水位",
          num: 5,
          unit: "m"
        },
        {
          title: "PH值",
          num: 7.1,
          unit: ""
        },
        {
          title: "溶解氧",
          num: 12,
          unit: "mg/L"
        },
        {
          title: "氨氮",
          num: 10,
          unit: "mg/L"
        }
      ];
    }
  },
  mounted() {
    this.getWeather();
    this.getAirInfo();
    this.getWaterInfo();
    this.timer = setInterval(() => {
      this.getWeather();
      this.getAirInfo();
      this.getWaterInfo();
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
  .weather-wrapper
    width: 100%
    height: 30%
    background-image: linear-gradient(to right, $blue, $purple)
    padding: 0 4.4vw
    .today-weather
      display: flex
      justify-content: flex-start
      align-items: center
      .today-icon
        width: 15.7vw
      .today-tem
        font-size: 5rem
        color: $white
        margin: 0 2vw
      .today-detail
        font-size: 1.5rem
        color: $white
    .weather-list
      display: flex
      justify-content: space-between
      align-items: center
      margin: 1vh 0
      .weather-item
        flex: 0 0 30%
        width: 30%
        display: flex
        justify-content: space-between
        align-items: center
        .weather-icon
          width: 8vw
        .weather-info
          font-size: 1.2rem
          color: $white
  .other-wrapper
    // position: absolute
    // top: 18vh
    // left: 0
    width: 100%
    height: 77.5%
    transform: translateY(-10%)
    overflow: hidden
    display: flex
    flex-direction: column
    overflow: hidden
    .air-box
      .air-detail
        min-height: 20vh
        display: flex
        justify-content: space-between
        align-items: center
        .air-detail-box
          flex: 0 0 45%
          width: 45%
          display: flex
        .pm25
          justify-content: space-around
          .pm25-left
            .pm25-num
              font-size: 5rem
              // color: $green
            .pm25-unit
              font-size: 1.2rem
          .pm25-right
            display: flex
            flex-direction: column
            justify-content: flex-end
            .pm25-right-item
              width: 5.333vw
              height: 1.35vh
              line-height: 1.35vh
              margin-top: 0.5vh
              font-size: 0.6rem
              text-align: center
              color: $white
              &:nth-child(1)
                background: $green
              &:nth-child(2)
                background: $yellow
              &:nth-child(3)
                background: $red
        .gas
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          .gas-item
            flex: 0 0 33%
            width: 33%
            height: 8vh
            display: flex
            flex-direction: column
            justify-content: center
            align-items: flex-start
            .gas-item-title
              font-size: 1rem
              color: $subfont
            .gas-item-num
              font-size: 1.5rem
              color: $subfont
              display: inline-block
              border-bottom: 2px solid $mainfont
    .water-box
      flex: auto
      display: flex
      flex-direction: column
      .water-detail
        flex: auto
        display: flex
        flex-direction: column
        .common-echarts-box
          height: 25vh
          max-height: 25vh
          flex: auto
        .water-list
          height: 8vh
          flex: 0 0 8vh
          display: flex
          justify-content: space-around
          align-items: center
          .water-item
            flex: 0 0 15%
            width: 15%
            display: flex
            align-items: flex-start
            .water-icon
              width: 4vw
            .water-info
              .water-title
                font-size: 1rem
                color: #949494
              .water-other
                .water-num
                  font-size: 1.5rem
                  color: $subfont
</style>
