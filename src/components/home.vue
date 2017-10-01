<template>
  <div id="app">
    <div class="page-wrapper">
      <wheader :cityWeather="cityWeather" class="page-header"></wheader>
      <div class="page-content c-container">
      <today :cityWeather="cityWeather" ></today>
      <otherdays :cityWeather="cityWeather"></otherdays>
      </div>
    </div>
   <citylist :cityWeather="cityWeather"></citylist>
   <loading></loading>
  </div>
</template>
<script type="text/ecmascript-6">

import Axios from 'axios';
import * as com from "@/common/js/common";
import today from "@/components/today/today";
import wheader from "@/components/header/header";
import loading from "@/components/loading/loading";
import {getWeatherInfo} from "@/common/js/getdata";
import citylist from "@/components/citylist/citylist";
import otherdays from "@/components/otherdays/otherdays";
import {weatherType2Icon} from "@/common/js/weathertype2icon";

const TIME = 3600 * 1000;

  export default {
    name: 'app',
    data() {
      return {
        cityWeather: {},   // 当前城市天气信息
        cityName: '',      // 当前城市名称
      };
    },
    mounted() {
      this.getData();
    // 每小时更新一次
      setInterval(this.getData, TIME);
    },
    watch: {
      // 监测路由参数
      '$route' () {
        this.cityName = this.$route.params.name;
        this.getData(this.cityName);
      }
    },
    components: {
      today,
      wheader,
      loading,
      citylist,
      otherdays,
    },
    methods: {
      // 获取天气信息
      getData(cityName) {
        const that = this;
        if (com.queryData('currentCity')) {
          if (!!cityName && com.queryData('currentCity').name != cityName) com.addData('currentCity', {name: cityName});
          getWeatherInfo(com.queryData('currentCity').name).then(data => {
            that.cityWeather = data;
          });
        }else{
            getWeatherInfo().then(data => {
              that.cityWeather = data;
              com.addData('currentCity', {name: data.city});
            });
        }

      },

    }
  }
</script>

<style  lang="less">
  @import "../common/less/index";
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
      background-color: rgba(62, 126, 191, 0.9);
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

  }
</style>
