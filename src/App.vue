<template>
  <div id="app">
    <!-- map页面缓存,其他页面不缓存 -->
    <keep-alive includes="Map" excludes="Energy, Monitor, Environment">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // 判断是不是safari浏览器,因为safari浏览器有工具栏高度问题
    if (
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent)
    ) {
      localStorage.setItem("isSafari", 1);
    } else {
      localStorage.setItem("isSafari", 0);
    }
  }
};
</script>

<style lang="stylus" scoped>
#app
  width: 100%
  height: 100%
</style>
