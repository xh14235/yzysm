<template>
  <div class="echarts-kuang">
    <div :id="radarData.id" class="echarts-id"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Eradar",
  props: {
    radarData: Object
  },
  computed: {
    fatherData() {
      return this.radarData;
    },
    ...mapState({
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      bgreen: state => state.color.bgreen,
      red: state => state.color.red,
      white: state => state.color.white,
      lgreen: state => state.color.lgreen
    })
  },
  watch: {
    fatherData() {
      this.drawBar(this.fatherData);
    }
  },
  mounted() {
    if (this.radarData) {
      this.drawBar(this.radarData);
    }
  },
  methods: {
    drawBar(radarData) {
      // i 用于计数
      let i = -1;
      let myChart = this.$echarts.init(document.getElementById(radarData.id));
      let option = {
        title: {
          text: ""
        },
        legend: {
          show: false,
          data: [radarData.name]
        },
        radar: {
          splitNumber: 3,
          center: ["50%", "50%"],
          radius: 40,
          startAngle: 90,
          name: {
            rich: {
              a: {
                color: this.lgreen,
                fontSize: 12
              },
              b: {
                color: this.lgreen,
                fontSize: 12
              }
            },
            formatter: a => {
              let len = radarData.data[0].value.length;
              let sum = 0;
              for (let j = 0; j < len; j++) {
                sum += radarData.data[0].value[j];
              }
              if (sum === 0) sum = 1;
              i++;
              return `{b|${parseInt(
                (radarData.data[0].value[i] * 100) / sum
              )}%}\n{a|${a}}`;
            }
          },
          nameGap: 20,
          // 辐射线
          axisLine: {
            lineStyle: {
              color: "rgba(39, 84, 75, 1)"
            }
          },
          // 网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "rgba(39, 84, 75, 1)"
            }
          },
          // 网格背景
          splitArea: {
            show: false,
            areaStyle: {
              color: "rgba(255, 0, 0, 0)"
            }
          },
          indicator: [
            { name: "民宿", max: 800 },
            { name: "民宅", max: 800 },
            { name: "公建", max: 800 },
            { name: "产业", max: 800 },
            { name: "设施", max: 800 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销",
            type: "radar",
            // 拐点样式
            symbol: "circle",
            symbolSize: 5,
            data: radarData.data,
            itemStyle: {
              normal: {
                borderWidth: 0,
                // borderColor: 'rgba(255,0,0,1)',
                color: radarData.color,
                lineStyle: {
                  color: radarData.color
                }
              }
            },
            areaStyle: {
              normal: {}
            }
          }
        ]
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
