<template>
  <div class="common-wrapper">
    <div class="common-page-title">登录</div>
    <div class="common-page-main">
      <div class="login-wrapper">
        <Map></Map>
      </div>
    </div>
    <div class="common-page-bottom">
      <div class="company">上海昱章电气成套设备有限公司</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {
    Map: () => import("@/components/three/Map")
  }
};
</script>

<style lang="stylus" scoped>
.login-wrapper
  background: #aaa
.company
  text-align: center
</style>
