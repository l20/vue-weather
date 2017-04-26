<template>
    <div class="page-header c-container">
	    <div class="c-row">
	        <div class="c-span4">
	            <a href="####" class="aw-weather-pollution-area">
	                <p class="aw-weather-pollution-title">{{cityWeather.aqi ? "实时空气质量" : "当前城市无实时空气质量数据"}}</p>
	                <p class="aw-weather-pollution-color" v-if="cityWeather.aqi" transition="gradient" :class="colorLv"><span class="c-gap-right-small aw-weather-poNum aw-list-item">{{cityWeather.aqi || "--"}}</span><span>{{cityWeather.aqi ? AQIDecLv : "未知"}}</span></p>
	            </a>
	        </div>
	        <div class="c-span8">
	            <div class="aw-weather-wrap" @click="showCityList"><span class="aw-weather-update"> 更新于 <span>{{updataTime}}</span></span>
	                <div class="city-picker-toggle"><span class="aw-weather-changecity"><span>{{cityWeather.city}}</span> <i class="aw-weather-changecity-icon icon-shuffle"></i></span>
	                </div>
	            </div>
	            <div class="aw-weather-date aw-weather-date-small"><span class="aw-weather-date-info" >{{gDate + ' '+ncWeek}}</span> <span class="aw-weather-lunar">{{nDate}}</span></div>
	            <div class="aw-weather-date-gz"><span>{{gzDate}}</span></div>
	        </div>
	    </div>
	</div>

</template>

<script type="text/ecmascript-6">

import {formatDate} from "@/common/js/date";
import {calendar} from "@/common/js/calendar";

let AQILvs = {
	'lv1':'优',
	'lv2':'良',
	'lv3':'轻度污染',
	'lv4':'中度污染',
	'lv5':'重度污染',
	'lv6':'严重污染'
};

export default {
	props: {
		cityWeather: {
			type: Object
		}
	},
	data() {
		return {
			AQI: parseInt(this.cityWeather.aqi) || 0,
			// AQI: this.cityWeather.aqi,
			colorLv: '',
			AQIDecLv: '未知',
			updataTime: '',
			nDate: '',
			gDate: '',
			gzDate: '',
			ncWeek: ''
		};
	},
	watch: {
		AQI(){
			this.setAQILv();
		}
	},
	methods: {
		setAQILv() {

			let AQI = this.cityWeather.aqi || 0,AQILvIdx = 0;

			if (AQI <= 50 && AQI >= 0) 		  	AQILvIdx = 0;
			else if (AQI <= 100 && AQI > 50)  	AQILvIdx = 1;
			else if (AQI <= 150 && AQI > 100) 	AQILvIdx = 2;
			else if (AQI <= 200 && AQI > 150) 	AQILvIdx = 3;
			else if (AQI <= 300 && AQI > 200) 	AQILvIdx = 4;
			else if (AQI > 300) 				AQILvIdx = 5;
			else 								AQILvIdx = 0;

			// 获取对象的所有键和值
			[this.colorLv, this.AQIDecLv] = Object.entries(AQILvs)[AQILvIdx];
        	
			// 获取当前日期、时间戳
			let date = new Date(Date.parse(new Date()));
        	this.updataTime = formatDate(date, 'yyyy-MM-dd|hh:mm').split('|')[1];

        	let lunar = calendar.solar2lunar();
        	this.gDate = `${lunar.lYear}-${lunar.cMonth}-${lunar.cDay}(${lunar.astro})`;
        	this.ncWeek = `${lunar.ncWeek}`;
        	this.nDate = `${lunar.IMonthCn}${lunar.IDayCn}`;
        	this.gzDate = `${lunar.gzYear}年${lunar.gzMonth}月${lunar.gzDay}日`;
		},
		showCityList() {
			this.$root.eventHub.$emit('aw.show.citylist');
		},
	},
	created() {
		this.$nextTick(()=>{this.setAQILv();});
	},
	updated() {
		this.$nextTick(()=>{this.setAQILv();});
	}
}
</script>

<style  lang="less" scoped>
	.page-header {
		/* height: 100px;
			    position: relative;
			    z-index: 10; */
			    margin: 0;
		box-sizing: border-box;
	    padding: 20px .16rem 10px;
	    // background-color: #3e7ebf;
	    background-color: rgba(62, 126, 191, .6);
	    box-shadow: 0 2px 2px rgba(0,0,0,.1);
	    color: #fff;
		
		position: fixed;
	    z-index: 1;
	    top: 0;
	    left: 0;
	    right: 0;
	    .aw-weather-pollution-area{
	    	display: inline-block;
		    width: 93px;
		    text-align: center;
		    background: hsla(0,0%,100%,.08);
		    border-radius: 3px;
		    padding: 2px 0 6px;
		    font-size: 12px;
		    line-height: 21px;
		    color: #fff;
	    }
	    .aw-weather-pollution-color{
	    	display: inline-block;
		    border-radius: 3px;
		    line-height: 21px;
		    font-size: 12px;
		    width: 83px;
	    	-webkit-transition: all 1.2s linear; /* For Safari 3.1 to 6.0 */
    		transition: all 1.2s linear;
    		text-shadow: 1px 1px 1px rgba(0,0,0,.6);
		    .aw-weather-poNum{
		    	font-size: 13px;
		    }
		    .bounce-transition {
			 
			}
			.bounce-enter-active, .bounce-leave-active {
			  transition: all 1s;
			}
			.bounce-enter, .bounce-leave-active {
			  opacity: 0;
			  transform: translateY(30px);
			}
	    }

	    .lv1{background-color: #50B847;}
	    .lv2{background-color: #F3EC18;}
	    .lv3{background-color: #F87F24;}
	    .lv4{background-color: #F4802B;}
	    .lv5{background-color: #81277E;}
	    .lv6{background-color: #7D1315;}

	    .aw-weather-wrap{
	    	text-align: right;
		    font-size: .14rem;
		    text-shadow: 1px 1px 0 rgba(0,0,0,.23);
		    line-height: .26rem;
		    .aw-weather-update{
			    font-size: .13rem;
			    color: hsla(0,0%,100%,.5);
			    text-shadow: 1px 1px 0 rgba(0,0,0,.3);
			    margin-right: 10px;	
		    }
		    .city-picker-toggle{
		    	text-align: right;
			    text-shadow: 1px 1px 0 rgba(0,0,0,.23);
			    display: inline-block;
		    }
	    }
	    .aw-weather-date, .aw-weather-date-gz{
			position: relative;
    		text-align: right;
	    }
	    .aw-weather-date-gz span{
			color: rgba(255, 255, 255, 0.5);
	    	font-size: 10px;
	    	text-shadow: 1px 1px 0 rgba(0,0,0,.23);
	    }
	    .aw-weather-date-small{
	    	font-size: .13rem;
	    }
	    .aw-weather-changecity, .aw-weather-date{
	    	text-shadow: 1px 1px 0 rgba(0,0,0,.23);
	    }
	}
</style>
