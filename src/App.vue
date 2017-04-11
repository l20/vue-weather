<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <div class="page-wrapper">
    	<wheader :cityWeather="cityWeather" class="page-header"></wheader>
	    <div class="page-content c-container">
			<today :cityWeather="cityWeather"></today>
			
	    </div>
    </div>
    <!-- <button @click="gethot">获取数据</button> -->
  </div>
</template>

<script>
import wheader from "@/components/header/header";
import today from "@/components/today/today";
import * as getData from "@/common/js/getdata";
	export default {
	  name: 'app',
	  created() {
	  	this.gethot();
	  },
	  data() {
	  	return {
			cityWeather: {},
			AQIDecLv: '未知'
		};
	  },
	  components: {
	  	wheader,
	  	today
	  },
	  methods: {
	  	gethot() {
	  		var self = this;
	  		getData.getWeatherInfo().then(data => {
	  			self.cityWeather = data;
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
		.page-content{
			width: 100%;
			top: 100px;
			bottom: 0;
			margin: 0;
			position: fixed;
			flex-direction: column;
			box-sizing: border-box;
			background-image: -webkit-linear-gradient(top, #3e7ebf, #6ec2ff);
		}
	}
  }
</style>
