<template>
  <div class="common-wrapper map-wrapper">
    <div class="common-page-title">监控</div>
    <div class="common-page-main" :class="{ isSafari: isSafari }">
      <div class="video-wrapper" @touchstart="showVideoIcon">
        <video src="@/assets/video/test.mp4" ref="video"></video>
        <transition name="opacity">
          <img
            class="video-control"
            :src="require('@/assets/img/video-' + videoIcon + '.png')"
            alt=""
            @click="controlVideo"
            v-show="videoIconShow"
          />
        </transition>
      </div>
      <div class="common-box abnormal-box">
        <CommonTitle
          :icon="require('../../assets/img/abnormal-list.png')"
          :main="`异常记录`"
          :sub="`${abnormalList.length}条`"
        ></CommonTitle>
        <div class="abnormal-date">{{ getDateFormat(new Date()) }}</div>
        <div class="abnormal-list">
          <div
            class="abnormal-item"
            v-for="item of abnormalList"
            :key="item.warnTime"
          >
            <img
              class="abnormal-icon"
              src="../../assets/img/abnormal-icon.png"
              alt=""
            />
            <div class="abnormal-info">
              <div class="abnormal-time">{{ item.warnTime.slice(10) }}</div>
              <div class="abnormal-type">{{ item.warnTypeName }}</div>
              <div class="abnormal-address">{{ item.areaName }}</div>
            </div>
            <img
              class="abnormal-picture"
              src="../../assets/img/abnormal-picture.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="common-page-bottom">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getAbnormalMonitoring } from "@/http/api";
export default {
  name: "Monitor",
  components: {
    Tabbar: () => import("@/components/common/Tabbar"),
    CommonTitle: () => import("@/components/common/CommonTitle")
  },
  data() {
    return {
      videoIcon: "play",
      videoIconShow: false,
      abnormalList: [],
      timer: null,
      interval: 60000
    };
  },
  computed: {
    ...mapState({
      isSafari: state => state.isSafari
    })
  },
  methods: {
    // 控制监控播放及暂停
    controlVideo() {
      let video = this.$refs.video;
      if (this.videoIcon === "play") {
        this.videoIcon = "pause";
        video.play();
      } else {
        this.videoIcon = "play";
        video.pause();
      }
    },
    // 显示或隐藏播放监控按钮
    showVideoIcon() {
      if (this.videoIconShow) {
        this.videoIconShow = false;
      } else {
        this.videoIconShow = true;
      }
    },
    // 格式化日期方法
    getDateFormat(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    },
    // 获取异常监控列表
    getAbnormalList() {
      getAbnormalMonitoring().then(res => {
        this.abnormalList = res.data;
      });
    }
  },
  mounted() {
    this.getAbnormalList();
    this.timer = setInterval(() => {
      this.getAbnormalList();
    }, this.interval);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.common-page-main
  display: flex
  flex-direction: column
  .video-wrapper
    width: 100%
    height: 32vh
    position: relative
    background: #000
    video
      width: 100%
      height: 100%
      vertical-align: bottom
    .video-control
      width: 18vw
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
  .abnormal-box
    flex: auto
    margin-top: 1vh
    overflow: scroll
    .abnormal-date
      height: 4.7vh
      line-height: 4.7vh
      border-bottom: 1px solid #E9EEF5
      color: $grey
      padding-left: 5vw
    .abnormal-list
      border-left: 1px solid #E9EEF5
      // height: 100%
      margin-left: 10vw
      .abnormal-item
        transform: translateX(-4vw)
        display: flex
        align-items: flex-start
        justify-content: space-between
        padding-top: 2.5vh
        .abnormal-icon
          width: 6.7vw
        .abnormal-info
          margin-right: auto
          margin-left: 2vw
          .abnormal-time
            color: $mainfont
            font-weight: 500
            font-size: 1.2rem
          .abnormal-type
            font-size: 1.2rem
            color: #000
          .abnormal-address
            font-size: 1rem
            color: $grey
        .abnormal-picture
          width: 24.4vw
</style>
