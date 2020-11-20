<template>
  <div class="park-info-wrapper">
    <img class="park-info-img" src="../../../assets/img/park-img.png" alt="" />
    <div class="park-info-list">
      <div class="park-info-item" v-for="(item, index) of list" :key="index">
        <img
          class="park-info-icon"
          src="../../../assets/img/park-icon.png"
          alt=""
        />
        <div class="park-info-detail">
          <div class="park-info-title">{{ item.title }}</div>
          <div class="park-info-other">
            <span class="park-info-num">{{ item.num }}</span>
            <span class="park-info-unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParkInfo",
  data() {
    return {
      list: [
        {
          title: "园区面积",
          num: 1251,
          unit: "㎡"
        },
        {
          title: "园区人数",
          num: 1251,
          unit: "人"
        },
        {
          title: "公共设施",
          num: 10,
          unit: "个"
        },
        {
          title: "能源设备",
          num: 10,
          unit: "个"
        },
        {
          title: "安防监控",
          num: 1,
          unit: "个"
        },
        {
          title: "环境监测",
          num: 2,
          unit: "个"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/assets/css/common.styl"
.park-info-wrapper
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
  justify-content: space-between
  align-items: center
  .park-info-img
    width: 19.2vw
    margin-right: 2vw
  .park-info-list
    flex: auto
    color: $white
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    .park-info-item
      flex: 0 0 33%
      width: 33%
      display: flex
      align-items: center
      .park-info-icon
        width: 1.5rem
      .park-info-detail
        .park-info-title
          font-size: 1rem
        .park-info-other
          .park-info-num
            font-size: 1.8rem
            font-weight: 500
          .park-info-unit
            font-size: 1rem
</style>
