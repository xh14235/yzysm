import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import FastClick from "fastclick";
// rsa加密
import JSEncrypt from "jsencrypt";
import "@/assets/css/common.css";
import "@/assets/css/transition.css";
// import "default-passive-events";

FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

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
