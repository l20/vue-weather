<template>
<section class="c-row-tile detail">
    <transition name="fade">
        <forecast24h v-if="show" class="aw-forecast24h"></forecast24h>
    </transition>
	<div id="chart-6d" class="chart aw-weather-chart">
            <div class="canvas c-row">
                <svg version="1.2" baseProfile="tiny">
                    <path stroke="#e9e9e9" stroke-width="1" stroke-opacity="0.7" fill="none" :d="paht1"></path>
                    <path stroke="#fff" stroke-width="1" stroke-opacity="0.15" fill="none" :d="paht3"></path>
                    <circle :cx="allWeatherInfo[1].x" :cy="allWeatherInfo[1].yh" r="2.5" fill="#fff"></circle>
                    <path stroke="#e9e9e9" stroke-width="1" stroke-opacity="0.7" fill="none" :d="paht2"></path>
                    <path stroke="#fff" stroke-width="1" stroke-opacity="0.15" fill="none" :d="paht4"></path>
                    <circle :cx="allWeatherInfo[1].x" :cy="allWeatherInfo[1].yl" r="2.5" fill="#fff"></circle>
                </svg>
                <div class="c-span2 weather-bar" v-for="(value, index) in allWeatherInfo" @click.stop="rippleAction($event)">
                    <div class="content">
                        <div class="title c-gap-bottom" :class="{dim:index == 0}"><span class="value">{{value.date}}</span>
                            <div class="weather-icons" :class="weatherIconSm(value.type)"></div>
                        </div>
                        <div class="aw-weather-canvas-area">
                            <div class="pillar"><span class="pillar-max" :style="{top:value.yh-25+'px'}" :class="{dim:index == 0}">{{value.high}}℃</span><span class="pillar-min" :style="{top:value.yl-3+'px'}" :class="{dim:index == 0}">{{value.low}}℃</span></div>
                        </div>
                        <div class="c-gap-top-large wind" :class="{dim:index == 0}"><span>{{value.fengxiang}}</span>
                            <div>{{value.fengli}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">

import {weatherType2IconSm} from "@/common/js/weathertype2icon";
import forecast24h from '@/components/24hforecast/24hforecast';
import {extend,getSVGPathByCoordinate} from "@/common/js/common";
import {ripple} from "@/common/js/ripple";

const HEIGHT = 173.5000000000009;

const RATIO  = 3.0555555555556;

export default {
    props: {
        cityWeather: {
            type: Object
        }
    },
    data() {
        return {
            show: false,
            paht1: '',
            paht2: '',
            paht3: '',
            paht4: '',
            screenWidth: document.body.clientWidth             
        }
    },
    created() {
        const that = this;
        this.$root.eventHub.$on('aw.show.forecast24h', function (e) {
            that.show = !that.show;
        });
    },
    mounted() {
        const that = this;
        // 检测屏幕尺寸变化设置svg曲线宽度
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
            })();
        }
    },
     /*watch: {
       screenWidth (val) {
            if (!this.timer) {
                this.screenWidth = val;
                this.timer = true;
                let that = this;
                // 优化频繁刷新导致卡顿问题
                setTimeout(function () {
                    that.timer = false;
                }, 400);
            }
        },
    },*/
    methods: {
        rippleAction(e) {
            this.$nextTick(() => {
                ripple(e.currentTarget, e);
            });
        },
        // 日期转周一...周日
        date2Week(val,idx) {
            return idx==0 ? '\u6628\u5929' : idx==1 ? '\u4eca\u5929' : idx==2 ? '\u660e\u5929' : '\u5468' + (val.date.split('\u65e5')[1].split('\u671f')[1] === '\u5929' ? '\u65e5' : val.date.split('\u65e5')[1].split('\u671f')[1]);
        },
        weatherIconSm(type) {
            return weatherType2IconSm(type);
        },
    },
    computed: {
        allWeatherInfo() {

            if (!this.cityWeather.yesterday || !this.cityWeather.forecast) return ;

            // 拷贝对象修改
            let yesterday = [], otherdays = [];
            yesterday[0] = extend({}, this.cityWeather.yesterday),

            this.cityWeather.forecast.forEach((item) => {
                otherdays.push(extend({}, item));
            });

            // 重命名键名
            Object.defineProperty(yesterday[0], 'fengli', {value: yesterday[0].fl});
            Object.defineProperty(yesterday[0], 'fengxiang', {value: yesterday[0].fx});

            delete yesterday[0].fl;
            delete yesterday[0].fx;

            // 合拼数据
            let newO  = yesterday.concat(otherdays),

            // 根据屏幕尺寸变化设置svg宽度
            startX = this.screenWidth / 6 / 2,
            // 两条曲线路径
            path1 = [],path2 = [];

            for (let i = 0, left = startX; i < newO.length; i++) {
                 path1[i] = {};path2[i] = {};

                // 日期转换
                newO[i].date = this.date2Week(newO[i], i);

                // 提取数字
                newO[i].high = parseInt(newO[i].high.match(/[1-9](?:\d{0,2})(?:,\d{3})*|0/)[0]);
                newO[i].low  =  parseInt(newO[i].low.match(/[1-9](?:\d{0,2})(?:,\d{3})*|0/)[0]);

                // 根据温度换算坐标
                Object.defineProperty(newO[i], 'x', {value: left});
                path1[i].x = left;
                path2[i].x = left;

                Object.defineProperty(newO[i], 'yh', {value: HEIGHT - newO[i].high * RATIO});
                path1[i].y = newO[i].yh;

                Object.defineProperty(newO[i], 'yl', {value: HEIGHT - newO[i].low  * RATIO});
                path2[i].y = newO[i].yl;

                left += startX*2;
            }

            this.paht1 = getSVGPathByCoordinate(path1.slice(1));
            this.paht2 = getSVGPathByCoordinate(path2.slice(1));
            this.paht3 = getSVGPathByCoordinate(path1.slice(0, 2));
            this.paht4 = getSVGPathByCoordinate(path2.slice(0, 2));

            return newO;
        }
    },
    components: {
        forecast24h
    }
}
</script>

<style  lang="less" scoped>
.detail{
   background-color: hsla(0,0%,100%,.08);
   flex-grow: 1;
   display: flex;
   flex-direction: column; 
   overflow-y: auto;
   .aw-forecast24h{
        transition: opacity 0.7s;
        &.fade-enter-active, &.fade-leave-active {
          opacity: 1;
        }
        &.fade-enter, &.fade-leave-to{
          opacity: 0;
        }
    }
    .aw-weather-chart{
        position: relative;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .chart{
        overflow: hidden;
    }
    #chart-6d {
        .canvas{
            position: relative;
            padding: 0!important;
        }
        .c-row{
            margin-left: 0;
            margin-right: 0;
            svg{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .weather-bar{
                padding: .11rem 0;
                overflow: hidden;
                position: relative;
                > .content{
                    border-right: 1px solid hsla(0,0%,100%, .12);
                    .title{
                        padding: 0!important;
                        text-align: center;
                        color: #fff;
                        .day{
                            display: inline-block;
                            line-height: 22px;
                        }
                        .weather-icons{
                            font-size: .22rem;
                        }
                    }
                    .dim{
                        color: hsla(0,0%,100%, .5);
                    }
                    .aw-weather-canvas-area{
                        // position: relative;
                        height: 100px;
                        .pillar{
                            width: 100%;
                            // position: absolute;
                            text-align: center;
                            color: #fff;
                            span{
                                font-size: 14px;
                                display: inline-block;
                                line-height: 21px;
                                position: absolute;
                                left: 0;
                                right: 0;
                            }
                            .pillar-max{
                                margin-bottom: 6px;
                            }
                            .pillar-min{
                                margin-top: 6px;
                            }
                        }
                    }
                    .wind{
                        color: #fff;
                        font-size: 12px;
                        text-align: center;
                        line-height: 16px;
                        padding: 0!important;
                    }
                }
                &.active {
                    background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.1))
                }
            }
        }
    }
}
</style>
