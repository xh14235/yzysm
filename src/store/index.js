import Vue from "vue";
import Vuex from "vuex";

import color from "./color";
import font from "./font";
import map from "./map";

let defaultToken = sessionStorage.token || "";
let defaultMapTab = parseInt(sessionStorage.getItem("mapTab")) || 0;

Vue.use(Vuex);
// 能源供给及能源消费页面 累计能量值及能源占比图数据请求
export default new Vuex.Store({
  state: {
    // isLoaded: true,
    token: defaultToken,
    weather: "",
    pm25: "",
    humidity: "",
    pressure: "",
    tem: "",
    // 底部导航
    mapTab: defaultMapTab,
    // 地图控制按钮高度
    mapIconHeight: 0,
    // 模块或者说组件配置
    dispose: {
      Manage: ["left01", "left02", "right01", "right02"],
      Supply: ["left01", "left02", "left03", "right01", "right02", "right03"],
      Consume: ["left01", "left02", "left03", "right01", "right02", "right03"],
      Analysis: ["left01", "left02", "right01"]
    },
    supplyData: {},
    consumeData: {},
    // 判断是否为safari
    isSafari: localStorage.getItem("isSafari")
  },
  mutations: {
    // 改变页面tab
    changeMapTab(state, index) {
      state.mapTab = index;
      sessionStorage.setItem("mapTab", index);
    },
    // changeMapIconHeight(state, height) {
    //   state.mapIconHeight = height;
    // },
    // 登录
    mutLogin(state, token) {
      state.token = token;
    },
    // 获取天气信息
    // mutWeather(state, weather) {
    //   state.pm25 = weather.pm25;
    //   state.humidity = weather.humidity;
    //   state.pressure = weather.pressure;
    //   state.tem = weather.tem;
    //   state.weather = weather.weather;
    // },
    // mutSupplyData(state, data) {
    //   state.supplyData = data;
    // },
    // mutConsumeData(state, data) {
    //   state.consumeData = data;
    // }
  },
  actions: {},
  modules: {
    color,
    font,
    map
  }
});
