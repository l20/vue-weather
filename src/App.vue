<template>
  <div id="app">
    <div class="page-wrapper">
    	<wheader :cityWeather="cityWeather" class="page-header"></wheader>
	    <div class="page-content c-container">
			<today :cityWeather="cityWeather" ></today>
			<otherdays :cityWeather="cityWeather"></otherdays>
	    </div>
    </div>
  </div>
</template>
<script>

import wheader from "@/components/header/header";
import today from "@/components/today/today";
import otherdays from "@/components/otherdays/otherdays";
import * as getData from "@/common/js/getdata";
import {weatherType2Icon} from "@/common/js/weathertype2icon";

	export default {
	  name: 'app',
	  created() {
	  	this.gethot();
	  },
	  data() {
	  	return {
			cityWeather: {},
			// forecast: {},
			AQIDecLv: '未知'
		};
	  },
	  components: {
	  	wheader,
	  	today,
	  	otherdays
	  },
	  methods: {
	  	gethot() {
	  		var self = this;
	  		getData.getWeatherInfo().then(data => {
	  			self.cityWeather = data;
	  			// self.forecast = data.forecast;
	  			console.log(data);
	  		});
	  	}
	  }
	}
</script>

<style  lang="less">
  @import "./common/less/index";
  #app{
	width: 100%;
	height: 100%;
	.page-wrapper{
		width: 100%;
		height: 100%;
		overflow: auto;
		.page-content{
			/* width: 100%;
			top: 100px;
			bottom: 0;
			margin: 0;
			position: fixed;
			flex-direction: column;
			box-sizing: border-box; */
			background-image: -webkit-linear-gradient(top, #3e7ebf, #6ec2ff);

		    margin: 0;
		    padding-top: 1.1rem;
		    padding-bottom: 0;
		    display: flex;
		    flex-direction: column;
		    min-height: 100%;
		    box-sizing: border-box;
		}
	}
	.page-wrapper::-webkit-scrollbar{
	    display: none;
	    width: 0;
	    background: transparent;
	}
  }
</style>
