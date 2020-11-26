<template>
  <div id="app">
    <keep-alive exclude="Map,Screen">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
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
