<template>
    	<section class="jumbotron">
		    <div class="aw-weather-head">
          <div class="aw-weather-maininfo" v-if="windInfo">
			        <p class="temp-line">
			        	<span class="aw-weather-currentTemp">
			        		<span class="aw-current-temp">{{animatedNumber || (!isFah ? cityWeather.wendu : cityWeather.wendu* 9 / 5 + 32)}}</span><span class="aw-weather-current-unit">{{isFah ? '℉' : '℃'}}</span>
			        	</span>
			            <span class="aw-weather-animate-icon">
			            	<span :class="classType"></span>
			            </span>
			            <span class="aw-weather-currentWeather">{{weatherType || '未知'}}</span>
			        </p>
					  <!-- <input v-model.number="number" type="number" step="20"> -->
					  <!-- <p>{{ animatedNumber }}</p> -->
			        <div class="aw-temp-switch">
						<input type="checkbox" name="toggle" v-model="isFah">
						<label for="toggle"><i></i></label>
						<span class="icon-Celsius"></span>
						<span class="icon-Fahrenheit"></span>
					</div>
			        <div class="aw-weather-wind-info">
			            <div class="aw-weather-wind c-line-clamp1">
				            <span>今天：</span> <span class="aw-weather-temp-range c-gap-right">{{temperatureScope}}</span>
				            <span class="aw-weather-wind-dir">{{windInfo.dir || '未知'}}</span>
                    <span>{{windInfo.lv.replace(/^\<!\[CDATA\[/g,'').replace(/\]\]\>/g,'') || '未知'}}</span>
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
import {addData,queryData} from "@/common/js/common";
import {ripple} from "@/common/js/ripple";
import TWEEN from "tween.js";

export default {
	props: {
		cityWeather: {
			type: Object,
      default: function () { return {};}
		}
	},
	data() {
		return {
			isFah: queryData('isFah') || false,
			show: false,
			number: 0,
			currentTemp: 0,
    		animatedNumber: 0,
    	}
	},
	created() {
		// console.log(this.animatedNumber)
	},
	computed: {
		// 今天的最高温和最低温
		temperatureScope() {
			if (!this.cityWeather.forecast) return;
			// 提取数字
			let highTmp = this.cityWeather.forecast[0].high.match(/[1-9](?:\d{0,2})(?:,\d{3})*|0/)[0];
			let lowTmp  = this.cityWeather.forecast[0].low.match(/[1-9](?:\d{0,2})(?:,\d{3})*|0/)[0];

			if (this.isFah) {
				 highTmp = highTmp * 9 / 5 + 32;
				 lowTmp = lowTmp * 9 / 5 + 32;
				return `${lowTmp}~${highTmp}°F`;
			}
			return `${lowTmp}~${highTmp}°C`;
		},
		// 根据天气类型设置天气图标
		classType() {
			if (!this.cityWeather.forecast) return;

			return weatherType2Icon(this.cityWeather.forecast[0].type);
		},
		// 天气类型
		weatherType() {
			if (!this.cityWeather.forecast) return;

			return this.cityWeather.forecast[0].type;
		},
		// 风向风力
		windInfo() {
			if (!this.cityWeather.forecast) return false;
			let obj = {};
		 	obj.lv = this.cityWeather.forecast[0].fengli;
		 	obj.dir = this.cityWeather.forecast[0].fengxiang;

		 	return obj;
		}
	},
	watch: {
		isFah() {
			  addData('isFah', this.isFah);
			  this.$root.eventHub.$emit('aw.is.Fahrenheit', queryData('isFah'));

			if (this.isFah) this.currentTemp = this.cityWeather.wendu * 9 / 5 + 32 ;
			else this.currentTemp = Number(this.cityWeather.wendu);
		},
		currentTemp(newValue, oldValue) {
	      var vm = this;
	      function animate (time) {
	        requestAnimationFrame(animate);
	        TWEEN.update(time);
	      }
	      new TWEEN.Tween({ tweeningNumber: oldValue })
	        .easing(TWEEN.Easing.Quadratic.Out)
	        .to({ tweeningNumber: newValue }, 1000)
	        .onUpdate(function () {
	          vm.animatedNumber = this.tweeningNumber.toFixed(0)
	        })
	        .start();
	      	animate();
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
		},
	}

}
</script>

<style  lang="less" scoped>
/**
 * 变量、函数定义区
 */
	@shadow-1_5: 1.5px 1.5px 0 rgba(0,0,0,.23);
	@shadow-1: 1px 1px 0 rgba(0,0,0,.23);
	@duration: .3s;
	.icon-position (@left: 68px, @top: -98px) {
		left: @left;
		top: @top;
	}

// =================================================
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
              .aw-current-temp{
                font-family:  Ostrich Sans ;
                font-size: 1rem;
                letter-spacing: .07rem;
              }
					    .aw-weather-current-unit{
					    	text-shadow: @shadow-1;
                font-family:  Ostrich Sans ;
					    	position: absolute;
						    top: 20px;
						    font-size: .2rem;
						    font-weight: 100;
					    }
    				}
    				.aw-weather-currentWeather{
    					text-shadow: @shadow-1_5;
					    position: relative;
					    left: 1rem;
					    bottom: .08rem;
					    font-size: 0.23rem;
					    font-weight: lighter;
    				}
					.aw-weather-animate-icon{
						margin-left: 0.3rem;
						display: inline-block;
						transform:scale(.6);
						top: .1rem;
						left: .95rem;
						.sunny{
							.icon-position(50px, -120px);
						}
						.cloudy{
							.icon-position(40px, -98px);
						}
						.rainy{
							.icon-position(40px, -98px);
						}
						.rainbow{
							.icon-position(50px, -98px);
						}
						.starry{
							.icon-position(40px, 0);
						}
						.stormy{
							.icon-position(40px, -98px);
						}
						.snowy{
							.icon-position(40px, -98px);
						}
						.cloudy2sunny{
							.icon-position(18px, -110px);
						}
						.sandstorm{
							.icon-position(40px, -98px);
						}
					}
    			}
    			.aw-temp-switch {
    				width: .65rem;
				    height: .22rem;
				    top: .08rem;
				    right: .12rem;
				    position: absolute;
				    margin: .1rem auto;
				    input {
				    	top: 0;
					    right: 0;
					    bottom: 0;
					    left: 0;
					    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
					    filter: alpha(opacity=0);
					    -moz-opacity: 0;
					    opacity: 0;
					    z-index: 10;
					    position: absolute;
					    width: 100%;
					    height: 100%;
					    cursor: pointer;
				    }
				    label {
				    	display: block;
					    width: 80%;
					    height: 100%;
					    position: relative;
					    // background: #1F2736;
					    background: linear-gradient(rgba(225, 225, 225, .8), rgba(225, 225, 225, .6));
					    border-radius: 30px 30px 30px 30px;
					    box-shadow: inset 0 3px 8px 1px rgba(0,0,0,0.2), inset 0 1px 0 rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.2);
					    // border: 1px solid rgba(0, 0, 0, .1);
					    transition: all @duration ease;
					    i {
					    	display: block;
						    height: .2rem;
						    width: .2rem;
						    position: absolute;
						    left: 2px;
						    top: 2px;
						    z-index: 0;
						    border-radius: inherit;
						    background: #283446;
						    background: linear-gradient(#fff, #a1a1a1);
						    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 0 8px rgba(0,0,0,0.13), 0 12px 12px rgba(0,0,0,0.12);
						    transition: all @duration ease;
					    }
				    }
				    span {
				    	content: "";
					    display: inline-block;
					    position: absolute;
					    width: 18px;
					    height: 18px;
					    font-size: .25rem;
					    border-radius: 10px;
					    // background: #283446;
					    // background: gradient-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
					    // box-shadow: inset 0 1px 0 rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.1), 0 0 10px rgba(185,231,253,0), inset 0 0 8px rgba(0,0,0,0.9), inset 0 -2px 5px rgba(0,0,0,0.3), inset 0 -5px 5px rgba(0,0,0,0.5);
					    transition: all @duration ease;
					    z-index: 2;
					    &.icon-Celsius {
							left: -.33rem;
							top: 0;
					    }
					    &.icon-Fahrenheit {
					    	color: rgba(185, 231, 253, 0.3);
							right: -.09rem;
							top: 0;
					    }
				    }
				    // toggle
				    input:checked ~ label + .icon-Celsius 	{
					    content: "";
					    display: inline-block;
					    position: absolute;
					    transition: all @duration ease;
					    z-index: 2;
					    // background: #b9f3fe;
					    // background: gradient-gradient(#ffffff, #77a1b9);
					    color: rgba(185, 231, 253, 0.3);
					    // box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 10px rgba(100, 231, 253, 1), inset 0 0 8px rgba( 61, 157, 247, 0.8), inset 0 -2px 5px rgba(185, 231, 253, 0.3), inset 0 -3px 8px rgba(185, 231, 253, 0.5);
					}
					input:checked ~  .icon-Fahrenheit {
					    color: #fff;
					}
					input:checked ~ label i {
					    left: auto;
					    left: 63%;
					    // box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 8px rgba(0, 0, 0, 0.3), 0 8px 8px rgba(0, 0, 0, 0.3), inset -1px 0 1px #b9f3fe;
					    transition: all @duration ease;
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
