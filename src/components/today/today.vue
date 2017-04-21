<template>
    	<section class="jumbotron">
		    <div class="aw-weather-head">
			    <div class="aw-weather-maininfo">
			        <p class="temp-line">
			        	<span class="aw-weather-currentTemp">
			        		<span>{{cityWeather.wendu}}</span><span class="aw-weather-current-unit">°</span>
			        	</span>
			            <span class="aw-weather-animate-icon">
			            	<span :class="classType"></span>
			            </span>
			            <span class="aw-weather-currentWeather">{{weatherType || '未知'}}</span>
			        </p>
			        <div class="aw-weather-wind-info">
			            <div class="aw-weather-wind c-line-clamp1">
				            <span>今天：</span> <span class="aw-weather-temp-range c-gap-right">{{temperatureScope}}</span>
				            <span class="aw-weather-wind-dir">{{windInfo.dir || '未知'}}</span>
				            <span>{{windInfo.lv || '未知'}}</span>
			        	</div>
			        </div>
			        <div class="aw-weather-prompt">
			            <span class="aw-weather-prompt-text">{{cityWeather.ganmao}}</span>
			        </div>
			        <div class="aw-weather-abs"> 
			            <div class="btn-24h-toggle c-gap-right" @click="rippleAction($event)"  ref="btn24htoggle"> 24小时 <span class="aw-weather-24-span">预报</span> <span class="c-gap-left-small" :class="[show ? 'icon-circle-up' : 'icon-circle-down']" ></span></div>
			        </div>
			    </div>
			</div>
		</section>
</template>

<script type="text/ecmascript-6">

import {weatherType2Icon} from "@/common/js/weathertype2icon";
import {ripple} from "@/common/js/ripple";
// import  from "@/components/otherdays/otherdays";

export default {
	props: {
		cityWeather: {
			type: Object
		}
	},
	data() {
		return {
			show:false
		}
	},
	computed: {
		temperatureScope() {
			if (!this.cityWeather.forecast) return;
			// 提取数字
			let highTmp = this.cityWeather.forecast[0].high.match(/[1-9](?:\d{0,2})(?:,\d{3})*|0/)[0];
			let lowTmp  = this.cityWeather.forecast[0].low.match(/[1-9](?:\d{0,2})(?:,\d{3})*|0/)[0];

			return `${lowTmp}~${highTmp}°C`;
		},
		classType() {
			if (!this.cityWeather.forecast) return;

			return weatherType2Icon(this.cityWeather.forecast[0].type);
		},
		weatherType() {
			if (!this.cityWeather.forecast) return;

			return this.cityWeather.forecast[0].type;
		},
		windInfo() {
			if (!this.cityWeather.forecast) return;
			let obj = {};
		 	obj.lv = this.cityWeather.forecast[0].fengli;
		 	obj.dir = this.cityWeather.forecast[0].fengxiang;

		 	return obj;
		}
		
	},
	methods: {
		rippleAction(e) {
			this.show = !this.show;
			// 触发自定义事件,跟其他组件通信
			this.$root.eventHub.$emit('aw.show.forecast24h');
		    this.$nextTick(() => {
				ripple(e.currentTarget, e);
			});
		}
	}

}
</script>

<style  lang="less" scoped>

	@shadow-1_5: 1.5px 1.5px 0 rgba(0,0,0,.23);
	@shadow-1: 1px 1px 0 rgba(0,0,0,.23);
		
		.jumbotron{
			color: #fff;
    		padding: 0 0 .08rem;
    		position: relative;
    		.aw-weather-maininfo{
    			// margin-top: .1rem;
    			position: relative;
    			.temp-line{
    				position: relative;
    				padding-top: 45px;
    				.aw-weather-currentTemp{
    					text-shadow: @shadow-1_5;
    					position: relative;
		    			left: .02rem;
					    font-size: .85rem;
					    bottom: .02rem;
					    font-family: 'HelveticaNeue-Thin';
					    .aw-weather-current-unit{
					    	text-shadow: @shadow-1;
					    	position: absolute;
						    top: 20px;
						    font-size: .3rem;
						    font-weight: 700;
					    }
    				}
    				.aw-weather-currentWeather{
    					text-shadow: @shadow-1_5;
					    position: absolute;
					    left: 2.1rem;
					    bottom: .16rem;
					    font-size: 0.23rem;
					    font-weight: lighter;
    				}
					.aw-weather-animate-icon{
						position: absolute;
						display: inline-block;
						transform:scale(.6);
						top: .1rem;
						left: .95rem;
						.cloudy{
							left: 96px;
							top: 30px;
						}
						.rainy{
							left: 91px;
							top: 32px;
						}
						.rainbow{
							left: 91px;
							top: 32px;
						}
						.starry{
							left: 91px;
							top: 130px;
						}
						.stormy{
							left: 91px;
							top: 32px;
						}
						.snowy{
							left: 91px;
							top: 32px;
						}
						.cloudy2sunny{
							left: 70px;
							top: 20px;
						}
					}
    			}
    			.aw-weather-wind-info{
    				position: relative;
    				margin-left: .05rem;
    				text-shadow: @shadow-1;
    				.aw-weather-wind {
    					margin-top: .06rem;
    					font-size: .18rem;
    					.aw-weather-temp-range{
    						font-size: .19rem;
    					}
    				}
    			}
    			.aw-weather-prompt{
			    	margin-top: .1rem;
					padding: .04rem .1rem;
				    border-radius: 3px;
				    background: hsla(0,0%,100%,.1);
				    overflow: hidden;
				    font-size: .1rem;
				    .aw-weather-prompt-text{
				    	text-shadow: @shadow-1;
				    }
    			}
    			.aw-weather-abs{
    				position: relative;
    				margin-top: .15rem;
    				texr-shadow: 0 1px 0 rgba(0,0,0,.23);
    				.btn-24h-toggle{
    					display: inline-block;
    					padding: .04rem .1rem;
					    border-radius: 3px;
					    background: hsla(0,0%,100%,.1);
					    overflow: hidden;
					    position: relative;
    				}
    			}
    		}
		}
</style>
