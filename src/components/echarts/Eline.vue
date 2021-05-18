<template>
  <div class="echarts-kuang">
    <div :id="lineData.id" class="echarts-id"></div>
  </div>
</template>

<script>
export default {
  name: "Eline",
  props: {
    lineData: Object
  },
  computed: {
    fatherData() {
      return this.lineData.data;
    }
  },
  watch: {
    fatherData() {
      this.drawLine(this.lineData);
    }
  },
  methods: {
    drawLine(lineData) {
      let bodyWidth = document.body.offsetWidth;
      let font1 = bodyWidth > 1600 ? 12 : 10;
      let font2 = bodyWidth > 1600 ? 16 : 12;
      let series = [];
      let seriesLength = lineData.legendData.length;
      for (let i = 0; i < seriesLength; i++) {
        let areaStyle = null;
        if (lineData.areaColor) {
          areaStyle = {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: lineData.color[i]
              },
              {
                offset: 1,
                color: "rgba(255, 255, 255, 0)"
              }
            ])
          };
        } else {
          areaStyle = null;
        }
        series.push({
          name: lineData.legendData[i],
          data: lineData.data[i],
          symbol: "circle",
          symbolSize: 2,
          smooth: lineData.smooth,
          type: "line",
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              areaStyle: areaStyle,
              lineStyle: {
                width: 1.5,
                type: "solid",
                color: lineData.color[i]
              }
            },
            emphasis: {}
          }
        });
      }
      let yAxis = [
        {
          type: "value",
          name: lineData.yName || "",
          nameLocation: "end",
          nameTextStyle: {
            color: "#757575",
            fontSize: font1,
            align: "right",
            verticalAlign: "middle"
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: font1,
              color: "#757575"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#E9EEF5"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#E9EEF5"
            }
          }
        }
      ];
      let legend = [
        {
          show: lineData.legendShow,
          textStyle: {
            fontSize: font2,
            color: "#757575"
          },
          // itemWidth: 15,
          right: "0",
          top: "0",
          // icon: "line",
          data: lineData.legendData
        }
      ];
      let myChart = this.$echarts.init(document.getElementById(lineData.id));
      let option = {
        title: {
          text: lineData.title,
          textStyle: {
            color: "#757575",
            fontSize: font2,
            fontWeight: "normal"
          },
          top: lineData.titleTop,
          left: lineData.titleLeft,
          right: lineData.titleRight,
          bottom: lineData.titleBottom
        },
        tooltip: {
          trigger: "axis"
        },
        legend: legend,
        color: lineData.color,
        grid: {
          top: "25%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: font1,
              color: "#757575"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#E9EEF5"
            }
          },
          data: lineData.xData
        },
        yAxis: yAxis,
        series: series
      };
      myChart.setOption(option, true);
      // 只有页面最后一个echarts图会改变尺寸
      // window.onresize = function () {
      //   myChart.resize()
      // }
      // 多个echarts图都可以改变尺寸
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  mounted() {
    if (this.lineData.id) {
      this.drawLine(this.lineData);
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
