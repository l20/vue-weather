<template>
    <div class="page-header c-container">
	    <div class="c-row">
	        <div class="c-span4">
	            <a href="####" class="aw-weather-pollution-area">
	                <p class="aw-weather-pollution-title">实时空气质量</p>
	                <p class="aw-weather-pollution-color" transition="gradient" :class="colorLv"><span class="c-gap-right-small aw-weather-poNum aw-list-item">{{AQI}}</span><span>{{AQIDecLv}}</span></p>
	            </a>
	        </div>
	        <div class="c-span8">
	            <div class="aw-weather-wrap"><span class="aw-weather-update"> 更新于 <span>15:22</span></span>
	                <div class="city-picker-toggle"><span class="aw-weather-changecity"><span>北京</span> <i class="aw-weather-changecity-icon icon-shuffle"></i></span>
	                </div>
	            </div>
	            <div class="aw-weather-date aw-weather-date-small"><span class="aw-weather-date-info">4月8日 周六</span><span class="aw-weather-lunar">三月十二</span></div>
	        </div>
	    </div>
	</div>

</template>

<script type="text/ecmascript-6">
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
		AQI: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			colorLv: '',
			AQIDecLv: '未知'
		};
	},
	watch: {
		AQI(){

			this.setAQILv();
		}
	},
	methods: {
		setAQILv() {
			let AQI = this.AQI,
			 	AQILvIdx = 0;

			if (AQI <= 50 && AQI >= 0) 		  	AQILvIdx = 0;
			else if (AQI <= 100 && AQI > 50)  	AQILvIdx = 1;
			else if (AQI <= 150 && AQI > 100) 	AQILvIdx = 2;
			else if (AQI <= 200 && AQI > 150) 	AQILvIdx = 3;
			else if (AQI <= 300 && AQI > 200) 	AQILvIdx = 4;
			else if (AQI > 300) 				AQILvIdx = 5;
			else 								AQILvIdx = 0;

			// 获取对象的所有键和值
			[this.colorLv, this.AQIDecLv] = Object.entries(AQILvs)[AQILvIdx];
		}
	},
	created() {
		this.setAQILv(); 
	}
}
</script>

<style  lang="less" scoped>
	.page-header {
	    margin: 0;
	    padding: 20px .16rem 10px;
	    background-color: #3e7ebf;
	    box-shadow: 0 2px 2px rgba(0,0,0,.1);
	    color: #fff;

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
	    .aw-weather-date{
			position: relative;
    		text-align: right;
	    }
	    .aw-weather-date-small{
	    	font-size: .13rem;
	    }
	    .aw-weather-changecity, .aw-weather-date{
	    	text-shadow: 1px 1px 0 rgba(0,0,0,.23);
	    }
	}
</style>
