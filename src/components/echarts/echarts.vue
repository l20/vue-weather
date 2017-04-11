<template>
  <div id="echarts" ref="echarts">
    <div class="container">
        <div class="sunny"></div> 
        <div class="cloudy"></div>
        <div class="rainy"></div>
        <div class="snowy"></div>
        <div class="rainbow"></div>
        <div class="starry"></div>
        <div class="stormy"></div>
    </div>
  </div>
</template>

<script  type="text/ecmascript-6">
import echarts from 'echarts';
import options from '@/common/js/echarts.opt';

export default {
  created() {
    // 基于准备好的dom，初始化echarts实例
    this.$nextTick(() => {
      // var myChart = echarts.init(this.$refs.echarts);
      // 绘制图表
      /*myChart.setOption({
          title: { text: 'ECharts 入门示例' },
          tooltip: {},
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      });*/
      // myChart.hideLoading();
      // console.log(options);
      // myChart.setOption(options);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

  #echarts{
    width: 100%;
    height: 400px;
  }
</style>
