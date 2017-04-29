<!-- API未提供，这里是模拟的数据 -->
<template>
    <div id="chart-24h" class="chart" >
        <div class="canvas c-gap-top-large">
            <div class="chart-item" v-for="time in temperatures">
                <div class="item-txt c-gap-bottom">{{time.forecast.time}}</div>
                <div class="weather-icons"></div>
                <div class="item-num c-gap-top-large" :style="{top:time.y-58+'px'}">{{isFah ? calcuFah(time.forecast.temp) : time.forecast.temp}}<span>{{isFah ? "℉" : "℃"}}</span></div>
            </div>
            <svg version="1.2" baseProfile="tiny" class="aw-weather-24-chart-svg" style="width: 550px;">
                <path stroke="#fff" stroke-width="1" stroke-opacity="0.5" fill="none" :d="path"></path>
                <circle v-for="temp in temperatures" :cx="temp.x" :cy="temp.y" r="2" fill="#fff"></circle>
            </svg>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">

import {getSVGPathByCoordinate} from "@/common/js/common";
import Axios from 'axios';

// 温度值转换为坐标值比例系数
const RATIO  = 1.66666665;
// 零上温度曲线显示范围
const HEIGHT = 94.66666665;
// 温度坐标初始偏移
const BASE = 31.5;

export default {
    props: {
      isFah: {
        type: Boolean,
        default: false
      }
    },
    data() {
        return {
            forecast:{},      //预测数据
            temperatures:'',  //温度
        }
    },
    computed: {
        /**
         * 温度值转换为坐标值        
         * @return {String}       SVG路径值
         */
        path() {
            var forecast = this.forecast;
            var coordinate = [];
            // let temp = Array.from(forecast.temp, val => val.temp);
            if (!forecast.temp) return;

            // 构造各温度坐标数据
            for (let i = 0, left = BASE; i < forecast.temp.length; i++) {
                coordinate[i] = {};
                Object.defineProperty(coordinate[i], 'x', {value: left});
                Object.defineProperty(coordinate[i], 'y', {value: HEIGHT - forecast.temp[i].temp * RATIO});
                Object.defineProperty(coordinate[i], 'forecast', {value: forecast.temp[i]});
                left += BASE*2;
            }
            this.temperatures = coordinate;

            return getSVGPathByCoordinate(coordinate);
        }
    },
    methods: {
      calcuFah(temp) {
        return temp * 9 / 5 + 32;
      }
    },
    created() {
      const that = this;
      
      // 请求后台模拟预测的数据
      Axios.get('/api/forecast24').then((data) => {
          that.forecast = data.data.data;
      });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    #chart-24h{
      position: relative;
      height: 128px;
      overflow: hidden;
      color: #fff;
      background-color: hsla(0,0%,100%,.04);
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
      .canvas {
        white-space: nowrap;
        overflow: auto;
        position: relative;
        height: 100%;
      }
      .chart-item {
        position: relative;
        vertical-align: top;
        left: -5px;
        display: inline-block;
        text-align: center;
        width: 63px;
        box-sizing: border-box;
        .item-txt {
          font-size: 13px;
        }
        .weather-icons{
          margin-top: 5px;
          font-size: 24px;
          position: relative;
        }
        .item-num {
          position: relative;
        }
      }
      .aw-weather-24-chart-svg {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          left: -5px;
      }
    }
    .chart{
      overflow: hidden;
    }
  #chart-6d, .chart .title{
    text-align: center;
  }
</style>
