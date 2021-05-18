import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
// fastclick解决移动端click事件延迟300ms问题
import FastClick from "fastclick";
// rsa加密
import JSEncrypt from "jsencrypt";
// css，各css功能见对接文档
import "@/assets/css/common.css";
import "@/assets/css/transition.css";
// 三维用到的css
import "@/assets/test.css";
// import "default-passive-events";

FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

// 解决iOS移动端 input多次点击才能聚焦的问题,此问题是由fastclick引起的
let deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
let deviceIsIOS =
  /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
FastClick.prototype.focus = function(targetElement) {
  let length;
  if (
    deviceIsIOS &&
    targetElement.setSelectionRange &&
    targetElement.type.indexOf("date") !== 0 &&
    targetElement.type !== "time" &&
    targetElement.type !== "month"
  ) {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};
// rsa登录加密公钥及方法
const PUBLIC_KEY =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSUmOXyQmYYSnZacp0btvAZCOvCNPtzixAp7eJmzmAG4mgy/VgrY/s1BDLh9qTNHIRWXepUtwMrf1kYul/A45qE/2oxIbeeq4238YDWQ7ModOVXR9ytEHsT0jpCFvoYfYXYZnnoWRrLIBylQeXzqxbLDxxBxGCs4AjoRKh5S7nNQIDAQAB";
Vue.prototype.$getRsaCode = str => {
  let pubKey = `-----BEGIN PUBLIC KEY-----${PUBLIC_KEY}-----END PUBLIC KEY-----`;
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey);
  let data = encryptStr.encrypt(str.toString());
  return data;
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
