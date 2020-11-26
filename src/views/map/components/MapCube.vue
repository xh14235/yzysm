<template>
  <div class="cube-wrapper">
    <img src="@/assets/img/cube-img.png" alt="" class="cube-img" />
    <div class="cube-info">
      <div class="cube-title">能源魔方</div>
      <div class="cube-line"></div>
      <div class="cube-list">
        <div class="cube-item" v-for="(item, index) of list" :key="index">
          <span class="cube-item-title">{{ item.title }}</span>
          <span class="cube-item-num">{{ item.num }}</span>
          <span class="cube-item-unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapCube",
  data() {
    return {
      list: [
        {
          title: "可充功率",
          num: 1000,
          unit: "kW"
        },
        {
          title: "可放功率",
          num: 1000,
          unit: "kW"
        },
        {
          title: "可充电量",
          num: 1000,
          unit: "kWh"
        },
        {
          title: "可放电量",
          num: 1000,
          unit: "kWh"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.cube-wrapper
  width: 91.2vw
  height: 18vh
  background: rgba(0,0,0,.3)
  border-radius: 1rem
  position: absolute
  top: 1vh
  left: 4.4vw
  z-index: 1
  padding: 3vw
  display: flex
  justify-content: space-around
  align-items: center
  .cube-img
    width: 18.7vw
  .cube-info
    color: #fff
    .cube-title
      font-size: 1.5rem
    .cube-line
      width: 100%
      height: 1px
      margin: 1.2vh 0
      background: #FFFFFF
    .cube-list
      .cube-item
        font-size: 1.2rem
        .cube-item-title
          font-size: 1rem
</style>
