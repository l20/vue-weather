<template>
    <div class="day-detail">
        <div class="scroller" :style="{transform: switchSwip}">
            <div class="day" v-for="(value, index) in allWeatherInfo">
                <p class="c-gap-bottom-small date"><span>{{value.date}}</span> <span class="c-gap-left"></span></p>
                <p class="title"><span>{{value.type}}</span> <span class="c-gap-left"><span>{{value.low}}</span>~<span>{{value.high}}</span>℃</span></p>
                <div class="c-row">
                    <div class="c-span3 border">
                        <p class="c-line-clamp1 dim"><span class="c-gap-right-small weather-icons icon-compass" :style="{transform:calcuWindDir(value.fengxiang)}"></span> 风力 </p>
                        <p class="c-line-clamp1"><span>{{value.fengxiang}}</span> <span>{{value.fengli}}</span></p>
                    </div>
                    <div class="c-span3">
                        <p class="c-line-clamp1 dim"><span class="weather-icons icon-Sunset2"></span> 日出日落 </p>
                        <!-- 因API未提供数据，未开发,可根据当前城市经纬度和日期计算，详情谷百 -->
                        <p class="c-line-clamp1"><span>05:38</span>/<span>18:51</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

export default {
    props: {
        allWeatherInfo: {
            type: Array,
            default: function () { return {};}
        },
        screenWidth: {
            type: Number,
            defualt: 0
        }
    },
    data() {
        return{
            index : 1,
        }
    },
    created() {
        const that = this;
        this.$root.eventHub.$on('aw.switch.daydetail', (msg) => {
            that.index = msg;
        });

    },
    watch: {  
      'allWeatherInfo' () {
        this.index = 1;
      }, 
      deep: true
    },
    methods: {
        calcuWindDir(str) {
            let text = str == '\u4e1c\u98ce'        ? '-135deg' :           // 东风
                       str == '\u897f\u98ce'        ? '45deg' :             // 西风
                       str == '\u5357\u98ce'        ? '-45deg' :            // 南风
                       str == '\u5317\u98ce'        ? '135deg' :            // 北风
                       str == '\u4e1c\u5317\u98ce'  ? '180deg' :            // 东北风
                       str == '\u897f\u5317\u98ce'  ? '90deg' :             // 西北风
                       str == '\u4e1c\u5357\u98ce'  ? '-90deg' :            // 东南风
                       str == '\u897f\u5357\u98ce'  ? '0deg' : '0';         // 西南风
            return `rotate(${text})`;
        },
    },
    computed: {
       switchSwip() {
            return `translate3d(${-this.screenWidth * this.index}px, 0px, 0px)`;
       } 
    } 
}
</script>

<style  lang="less">
    .day-detail {
        background-color: rgba(0,0,0,.1);
        position: relative;
        overflow: hidden;
        text-align: center;
        flex-grow: 1;
        color: #fff;
        .scroller {
            width: 100%;
            transition: all .5s cubic-bezier(.73,-0.15,.34,1.22);
            white-space: nowrap;
            .day {
                width: 100%;
                text-align: center;
                display: inline-block;
                padding-top: .2rem;
                padding-bottom: .11rem;
                .date {
                    color: #fff;
                    line-height: 22px;
                }
                .title {
                    font-size: 20px;
                    line-height: 28px;
                    padding-bottom: .1rem;
                }
                .border {
                    border-right: 1px solid hsla(0, 0%, 100%, 0.2);  
                }
                .dim {
                    color: hsla(0,0%,100%,.5);
                    .weather-icons {
                        // font-family: sg-weather-icons!important;
                        font-style: normal;
                        -webkit-font-smoothing: antialiased;
                        font-size: 0.22rem;
                        vertical-align: sub;
                        display: inline-block;
                        &.icon-compass {
                            font-size: 0.15rem;

                        }
                    }
                }
            }
        }
    }
</style>
