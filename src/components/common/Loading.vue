<template>
  <div class="loading-wrapper">
    <img src="@/assets/img/loading.gif" alt="" class="loading-img" />
  </div>
</template>

<script>
// loading功能，如地图加载完loading为true，目前为定时器3s
export default {
  name: "Loading"
};
</script>

<style lang="stylus" scoped>
.loading-wrapper
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.5)
  position: fixed
  top: 0
  left: 0
  z-index: 99999
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  .loading-img
    width: 50vw
  .loading-info
    font-size: 3.2rem
    color: #fff
</style>
