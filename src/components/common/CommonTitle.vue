<template>
  <div class="common-box-title">
    <img class="common-title-icon" :src="icon" alt="" />
    <span class="common-title-main">{{ main }}</span>
    <span class="common-title-sub">{{ sub }}</span>
  </div>
</template>

<script>
export default {
  name: "CommonTitle",
  props: {
    icon: String,
    main: String,
    sub: String
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/assets/css/common.styl"
.common-box-title
  display: flex
  align-items: center
  justify-content: space-between
  .common-title-icon
    width: 3.2vw
    height: 3.2vw
  .common-title-main
    font-size: 1.2rem
    font-weight: 600
    color: $mainfont
    margin-right: auto
    margin-left: 1vw
  .common-title-sub
    font-size: 1rem
    color: $subfont
</style>
