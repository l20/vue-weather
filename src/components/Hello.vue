<template>
  <div class="hello">
    <ul ref="days">
      <li>城市：{{msg.city}}</li>
      <li>温度：{{msg.wendu}}</li>
      <li v-for="items in msg.forecast">
        <p class="days">{{items.date}}</p>
        <p class="days"><span class="weather-type">{{items.type}}</span>| <span class="wind-dir">{{items.fengxiang}}</span> | <span class="wind-power">{{items.fengli}}</span>| <span class="temp-max">{{items.high}}</span>|<span class="temp-min">{{items.low}}</span></p>
      </li>
    </ul>
    <Yesorno v-on:update="recieveMessage"></Yesorno>
    <Echarts></Echarts>
  </div>
</template>

<script  type="text/ecmascript-6">
import Vue from 'vue';
import Echarts from '@/components/echarts/echarts';
import Yesorno from '@/components/getyesorno/getyesorno';
var vm = new Vue();
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      result:{}
    }
  },
  created() {
    var self = this;
    var days = this.$refs;
    vm.$nextTick(() => {
      // var spans = days.getElementsByTagName('span');
    });
    /*setInterval(function(){
      spans.forEach(function(span){
        span.style.color = '#'+(Math.random()*0xffffff<<0).toString(16); 
      });
    }, 100);*/

    // echarts
    

  },
  methods: {
    recieveMessage(data) {
        this.msg = data.data;
    },
    getRandomColor(){
      // 产生随机颜色
      return '#'+(Math.random()*0xffffff<<0).toString(16);
    }
  },
  components: {
    Yesorno,
    Echarts
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @color: rgb(7, 17, 27);
    .border-radiu(@bw: 1px,@color){
    border: @bw solid @color;
  }

  h1{
    color: @color;
    .border-radiu(2px, @color);
    border-radius: 1px;
    font-size: 16px;
  }
  .days{
    line-height: 12px;
    span{
      font-size: 12px;
    }
    .weather-type   {color: @color*2;}
    .wind-dir       {color: @color*4;}
    .wind-power     {color: @color*5;}
    .temp-max       {color: @color*6;}
    .temp-min       {color: @color*7;}
  }
</style>
