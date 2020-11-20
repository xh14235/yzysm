<template>
  <div id="app" :style="style">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      style: {}
    };
  },
  mounted() {
    if (
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent)
    ) {
      localStorage.setItem("isSafari", 1);
    } else {
      localStorage.setItem("isSafari", 0);
    }
    // window.onorientationchange = () => {
    //   if (window.orientation == 90 || window.orientation == -90) {
    //     this.style = {
    //       transform: "rotate(90deg)",
    //       width: "100vh",
    //       height: "100vw"
    //     };
    //   } else {
    //     this.style = {};
    //   }
    // };
  }
};
</script>

<style lang="stylus" scoped>
#app
  width: 100%
  height: 100%
</style>
