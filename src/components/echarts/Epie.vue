<template>
  <div class="echarts-kuang">
    <div :id="pieData.id" class="echarts-id"></div>
  </div>
</template>

<script>
export default {
  name: "Epie",
  props: {
    pieData: Object
  },
  computed: {
    fatherData() {
      return this.pieData;
    }
  },
  watch: {
    fatherData() {
      this.drawPie(this.fatherData);
    }
  },
  mounted() {
    if (this.pieData) {
      this.drawPie(this.pieData);
    }
  },
  methods: {
    drawPie(pieData) {
      let bodyWidth = document.body.offsetWidth;
      let font1 = bodyWidth > 1600 ? 14 : 12;
      let font2 = bodyWidth > 1600 ? 16 : 14;
      let labelShow = true;
      if (pieData.labelShow === false) {
        labelShow = false;
      }
      let myChart = this.$echarts.init(document.getElementById(pieData.id));
      let option = {
        title: {
          text: pieData.title, // 饼图中间数字
          textStyle: {
            color: "#757575",
            fontWeight: "normal",
            fontSize: font2
          },
          textAlign: "center",
          top: pieData.titleTop,
          left: pieData.titleLeft,
          right: pieData.titleRight,
          bottom: pieData.titleBottom
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
          top: "20%",
          left: "0",
          right: "0",
          bottom: "10%"
        },
        legend: {
          show: pieData.legendShow,
          textStyle: {
            color: "#757575",
            fontSize: font1
          },
          icon: "circle",
          itemWidth: 5,
          itemHeight: 5,
          itemGap: 5,
          orient: "vertical",
          right: 0,
          bottom: "center",
          formatter(name) {
            var data = option.series[0].data;
            var tarValue;
            // var sumValue = 0;
            // for (var i = 0, l = data.length; i < l; i++) {
            //   sumValue += data[i].value;
            // }
            for (var j = 0, d = data.length; j < d; j++) {
              if (data[j].name === name) {
                tarValue = data[j].value;
              }
            }
            // return name + tarValue + "kWh";
            return `${name}  ${tarValue}kWh`;
          }
        },
        color: pieData.color,
        series: [
          {
            name: pieData.name || "",
            type: "pie",
            radius: pieData.radius,
            center: pieData.center,
            avoidLabelOverlap: true,
            startAngle: 135,
            label: {
              show: labelShow,
              position: "left",
              color: "#aaa",
              // formatter: '{b}\n{d}%',
              formatter(params) {
                // let sum = 0
                // for (let i = 0; i < params) {}
                // console.log(params)
                // return params.percent + parseInt(params.percent) + '%'
                return parseInt(params.percent) + "%";
              },
              fontSize: font1
            },
            labelLine: {
              show: pieData.labelShow,
              normal: {
                smooth: 0.2,
                length: 10,
                length2: 10
              }
            },
            data: pieData.data
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
