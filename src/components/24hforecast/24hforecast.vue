<template>
  <section class="c-row-tile detail">
    <div id="chart-24h" class="chart" style="">
        <div class="canvas c-gap-top-large">
            <div class="chart-item" v-for="time in forcast.temp">
                <div class="item-txt c-gap-bottom">{{time.time}}</div>
                <div class="weather-icons"></div>
                <div class="item-num c-gap-top-large">{{time.temp}}℃</div>
            </div>
            <svg version="1.2" baseProfile="tiny" class="aw-weather-24-chart-svg" style="width: 550px;">
                <path stroke="#fff" stroke-width="1" stroke-opacity="0.5" fill="none" :d="path"></path>
                <circle v-for="temp in temperatures" :cx="temp.x" :cy="temp.y" r="2" fill="#fff"></circle>
            </svg>
        </div>
    </div>
    
</section>

</template>

<script  type="text/ecmascript-6">

import {getSVGPathByCoordinate} from "@/common/js/bezier";
import Axios from 'axios';

// 温度值转换为坐标值比例系数
const RATIO  = 1.66666665;
// 零上温度曲线显示范围
const HEIGHT = 94.66666665;

export default {
    data() {
        return {
            forcast:{},
            temperatures:''
        }
    },
    computed: {
        path() {
            let temp = Array.from(this.forcast.temp, val => val.temp);
            return this.temp2Path(temp);
        }
    },
    methods: {
        /**
         * 温度值转换为坐标值        
         * @param  {Array}  temp  原始温度值
         * @param  {Number} BASE  温度坐标初始偏移
         * @param  {Number} SPACE 各温度值间隔间隙
         * @return {String}       SVG路径值
         */
        temp2Path(temp, BASE = 31.5, SPACE = 63) {
            var coordinate = [];
            var ctrlPos = [];
            // 构造各温度坐标数据数组
            for (let i = 0, left = BASE; i < temp.length; i++) {
                coordinate[i] = {};
                Object.defineProperty(coordinate[i], 'x', {value: left});
                Object.defineProperty(coordinate[i], 'y', {value: HEIGHT - temp[i] * RATIO});
                left += SPACE;
            }
            this.temperatures = coordinate;
            return getSVGPathByCoordinate(coordinate);
        }
    },
    created() {
        let self = this;
        // 请求后台模拟预测的数据
        Axios.get('/api/forcast24').then((data) => {
            self.forcast = data.data.data;
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .detail{
    background-color: hsla(0,0%,100%,.08);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    #chart-24h{
      position: relative;
      height: 128px;
      overflow: hidden;
      color: #fff;
      background-color: hsla(0,0%,100%,.04);
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
  }
  #chart-6d, .chart .title{
    text-align: center;
  }
</style>
