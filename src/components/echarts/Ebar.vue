<template>
  <div class="echarts-kuang">
    <div :id="barData.id" class="echarts-id"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Ebar",
  props: {
    barData: Object
  },
  computed: {
    fatherData() {
      return this.barData;
    },
    ...mapState({
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      red: state => state.color.red,
      white: state => state.color.white
    })
  },
  watch: {
    fatherData() {
      this.drawBar(this.fatherData);
    }
  },
  mounted() {
    if (this.barData) {
      this.drawBar(this.barData);
    }
  },
  methods: {
    drawBar(barData) {
      let bodyWidth = document.body.offsetWidth;
      let font1 = bodyWidth > 1600 ? 12 : 10;
      let font2 = bodyWidth > 1600 ? 16 : 12;
      let series = [];
      let seriesLength = barData.legendData.length;
      for (let i = 0; i < seriesLength; i++) {
        series.push({
          name: barData.legendData[i],
          data: barData.data[i],
          type: "bar",
          barWidth: 15
        });
      }
      let myChart = this.$echarts.init(document.getElementById(barData.id));
      let option = {
        title: {
          text: barData.title,
          textStyle: {
            color: this.white,
            fontSize: font2
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show: barData.legendShow,
          textStyle: {
            fontSize: font2,
            color: this.white
          },
          icon: "circle",
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 15,
          left: 0,
          top: 0,
          data: barData.legendData
        },
        color: barData.color,
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: font1,
              color: this.white
            }
          },
          axisLine: {
            lineStyle: {
              color: "#636D6C"
            }
          },
          data: barData.xData
        },
        yAxis: {
          type: "value",
          name: barData.yName || "",
          nameLocation: "end",
          nameTextStyle: {
            color: this.white,
            fontSize: font1,
            align: "right",
            verticalAlign: "top"
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: font1,
              color: this.white
            }
          },
          axisLine: {
            lineStyle: {
              color: "#636D6C"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#636D6C"
            }
          }
        },
        grid: {
          top: "25%",
          left: "2%",
          right: "0",
          bottom: "5%",
          containLabel: true
        },
        series: series
      };
      myChart.setOption(option);
      // 只有页面最后一个echarts图会改变尺寸
      // window.onresize = function () {
      //   myChart.resize()
      // }
      // 多个echarts图都可以改变尺寸
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.echarts-kuang
  width: 100%
  height: 100%
  .echarts-id
    width: 100%
    height: 100%
</style>
