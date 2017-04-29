<template>
 <transition name="fade">
    <div class="city-list" v-show="show">
      <div class="aw-input-wapper c-row">
        <span class="aw-icon-style icon-arrow-left2 c-span2" @click="comeback"></span>
        <form id="search" class="navbar-search c-span10">
          <span class="aw-icon-style icon-search"></span><input placeholder="输入城市名检索" @keyup.enter="queryCity"  @focus="maskIsShow = true"  type="text" class="search-query "  v-model="filterKey">
        </form>
      </div>
      <section class="aw-city-container">
          <p class="aw-set-prompt">定位不准确时可手动设置当前城市天气。</p>
          <div class="aw-current-city c-row">
            <h4 class="aw-city-title c-span4" >当前城市</h4>
            <div class="aw-current-detail c-span8"><span class="aw-current-cityname">{{cityWeather.city}}</span><span class="aw-weather-icons" :class="weatherIconSm(cityWeather.forecast[0].type)"></span><span class="aw-temp">{{isFah ? calcuFah(cityWeather.wendu)+'℉' : cityWeather.wendu+'℃'}}</span><span class="aw-weather-type">{{cityWeather.forecast[0].type}}</span></div>
          </div>
          <h4 class="aw-city-title" >热门城市</h4>
          <ul class="aw-hot-citys clearfix">
            <router-link tag="li"  @click.native="comeback" v-for="city in hotcity" :to="'/home/' + city.name" :key="city.id"  class="ellipsis c-span3">{{city.name}}</router-link>
          </ul>
          <ul class="aw-letter-classify">
              <li v-for="(value, key, index) in sortgroupcity" :key="key"  class="aw-letter-classify-li">
                  <h4 class="aw-city-title"  @click.stop="showCity(index, $event)">{{key}}
                      <span v-if="index == 0">（按字查找）</span>
                  </h4>
                  <transition name="fade">
                    <ul class="aw-city-name-container city-list-ul clearfix " v-show="current == index">
                        <router-link  tag="li" @click.native="comeback" v-for="item in value" :to="'/home/' + item.name" :key="item.id"  class="ellipsis c-span3">{{item.name}}</router-link>
                    </ul>
                  </transition>
              </li>
          </ul>
      </section>
     <transition name="fade">
        <div class="aw-citylist-mask" v-if="maskIsShow" @click="maskIsShow = false">
          <div class="aw-seach-result" :style="{height:hNum+'%'}">
            <ul class="aw-seach-ul">
              <router-link  tag="li" @click.native="comeback" v-for="city in filteredData" :to="'/home/' + city.name" :key="city.id">{{city.name}}</router-link>
            </ul>
          </div>
        </div>
      </transition>
      <div>{{filteredData}}</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {ripple} from "@/common/js/ripple";
import * as com from "@/common/js/getdata";
import {queryData} from "@/common/js/common";
import {Enumerable} from "@/common/js/linq.min";
import {weatherType2IconSm} from "@/common/js/weathertype2icon";
    
export default {
      props: {
        cityWeather: {
            type: Object,
            default: function () { return {};}
        }
      },
      data () {
        return {
          show: false,
          current: Infinity,  //当前展开城市
          maskIsShow: false,  //遮罩标志
          isFah: false,
          hNum: 0,            //检索块高度
          filterKey: '',      //表单输入的关键词
          hotcity: [],        //热门城市列表
          cityList: [],       //所有城市列表
          groupcity: {},      //所有城市列表
        };
      },
      computed: {
        filteredData () {
          if (!this.filterKey) this.hNum = 0;
          else this.hNum = 100;
          return this.queryCity();
        },
        //将获取的数据按照A-Z字母开头排序
        sortgroupcity() {
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.groupcity[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                }
            }
            return sortobj
        }
      },
      filters: {
        capitalize: function (str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
      },
      methods: {
        showCity(index,e) {
          this.$nextTick(() => {
              ripple(e.currentTarget, e);
          });
          this.current != index ? this.current = index : this.current = Infinity;
        },
        showMask() {
          this.maskIsShow = !this.maskIsShow;
        },
        queryCity(str) {
          var filterKey = this.filterKey && this.filterKey.toLowerCase();
          var data = this.cityList;
          if (filterKey) {
            // 使用linq的json查询工具
            var _city = Enumerable.From(data)
            .Where($ =>  $.name.includes(filterKey) || $.abbr.toLowerCase().includes(filterKey) || $.pinyin.toLowerCase().includes(filterKey))
            .Select($ => $ )
            .ToArray()

            return _city;
          }else {
            return false;
          }
        },
        comeback(e) {
            this.$nextTick(() => {
                ripple(e.target, e);
            });
            // var timer = setTimeout(() => {
                this.show = false;
            // }, 150);
            this.hNum = 0;
            this.filterKey = '';
            this.current = Infinity;
            this.maskIsShow = false;
        },
        weatherIconSm(type) {
            return weatherType2IconSm(type);
        },
        calcuFah(temp) {
            return temp * 9 / 5 + 32;
        }
      },
      created() {
        const that = this;
        this.$root.eventHub.$on('aw.show.citylist', () => {
            that.show = !that.show;
        });
        this.isFah = queryData('isFah') || false;
        this.$root.eventHub.$on('aw.is.Fahrenheit', (msg) => {
            this.isFah = msg;
        });

        //获取热门城市
        com.getHotCityInfo('hot').then(res => {
           this.hotcity = res;
        });

        //获取所有城市
        com.getAllCityInfo('china').then(res => {
            this.groupcity = res;
            let citylist = [];
            // 将数据转换为数组
            for (let item in res) {
              res[item].forEach(val => {
                citylist.push(val);
              });
            }
            this.cityList = citylist;
        });
      },
};
</script>

<style  lang="less" scoped>
  .title-style (@tb: .1rem , @lr: .35rem) {
    color: #3e7fc1;
    background-color: #fff;
    font-size: .18rem;
    padding: @tb @lr;
    text-shadow: 1px 1px 1px rgba(0,0,0,.3);
  }

  .city-list {
    transition: all .5s;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: .2rem;
    transition: all .5s;
    position: fixed;
    background-color: #fff;
    z-index: 20;
    &.fade-enter-active, &.fade-leave-active {
      opacity: 1;
    }
    &.fade-enter, &.fade-leave-to{
      opacity: 0;
    }
    .aw-input-wapper{
      top: 0;
      left: 0;
      right: 0;
      z-index: 11;
      height: 50px;
      position: fixed;
      background-color: hsl(210, 51%, 50%);
      box-shadow: 0 2px 2px rgba(0,0,0,.3);
    }
    .navbar-search{
      // background-color: hsl(210, 51%, 50%);
    }
    .aw-icon-style{
      font-size: .12rem;
      display: inline-block;
      &.icon-search{
        color: #fff;
        margin: 0 -.22rem 0 .1rem;

      }
      &.icon-arrow-left2{
        color: #fff;
        font-size: .2rem;
        // margin: .0rem .1rem 0 .1rem;\
        line-height: 48px;
        text-align: center;
      }
    }

     .search-query{
        outline:0;
        // appearance: none;
        box-sizing: border-box;
        // box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        background: hsla(0, 0%, 100%, 0);
        padding: 5px 5px 5px .3rem;
        color: #fff;
        // border: 1px solid hsla(0, 0%, 100%, .2);
        border-bottom: 1px solid #fff;
        margin: .11rem 0;
        transition: all .5s;
        width: 96%;
        font-size: .15rem;
        font-weight: 400;
        line-height: 1;
        &:focus{
          // box-shadow:  1px 1px 0px hsla(0, 0%, 100%, .8);

        }
        // &::-moz-input-placeholder, 
        // &::-ms-input-placeholder,
        &::-webkit-input-placeholder{
          color: hsla(0, 0%, 100%, .7);
          line-height: 18px;
        }
    } 


    table {
      border-radius: 3px;
      background-color: #fff;
      width: 100%;
      th {
        background-color: #42b983;
        color: rgba(255,255,255,0.66);
        cursor: pointer;
        user-select: none;
      }
      td {
        background-color: #f9f9f9;
      }
      th, td {
        min-width: 120px;
        padding: 10px 20px;
      }
      th.active {
        color: #fff;
      }
      th.active .arrow {
        opacity: 1;
      }
    }
    .arrow {
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 0;
      margin-left: 5px;
      opacity: 0.66;
    }

    .arrow.asc {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #fff;
    }

    .aw-city-container {
      top: 50px;
      bottom: 0;
      width: 100%;
      user-select: none;
      background-color: darken(#f7f7f9, 2%);
      box-sizing: border-box;
      position: absolute;
      overflow: auto;
      .aw-set-prompt {
        color: #aaa;
        font-size: .15rem;
        padding: .1rem .35rem;

      }
      .aw-current-city {
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        > * {box-sizing: border-box;}
        .aw-city-title {
          .title-style;
          padding: .1rem 0 .1rem .4rem ;
        }
        .aw-current-detail {
          font-size: .15rem;
          line-height: 38px;
          > span {
            display: inline-block;
            margin-right: .03rem;
            &.aw-current-cityname {
            }
            &.aw-weather-type {
            }
            &.aw-temp{
            }
            &.aw-weather-icons{
              color: #aaa;
            }
          }
        }
      }
      > .aw-city-title {
         .title-style;
      }
      .aw-hot-citys {
        margin-bottom: .2rem;
        border-top: 1px solid #e4e4e4;
        background-color: #fff;
        > li {
            color: #3e7fc1;
            float: left;
            font-size: .16rem;
            line-height: 41px;
            overflow: hidden;
            text-align: center;
            box-sizing: border-box;
            border-bottom: 1px solid #e4e4e4;
            border-right: 1px  solid #e4e4e4;
        }
      }
      .aw-letter-classify {
          // background-color: darken(#f7f7f9, 2%);
        .aw-letter-classify-li {
          background-color: #fff;
          margin-bottom: .2rem;
          border-top: 1px solid #e4e4e4;
          user-select: none;
          &:nth-child(1) {
            border-top: none;
          }
          .aw-city-title {
            .title-style;
            position: relative;
            overflow: hidden;
            span {
              font-size: .1rem;
              color: #aaa;
              text-shadow: none;
            }
            &:hover {
              // background-color: darken(#f7f7f9, 2%);
            }
          }
          .aw-city-name-container {
            border-top: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            overflow: hidden;
            // height: 0;
            transition: height .5s;
            &.fade-enter-active, &.fade-leave-active {
              // opacity: 1;
              height: 1000px;
            }
            &.fade-enter, &.fade-leave-to{
              // opacity: 0;
              height: 0;
            }

            .ellipsis {
              float: left;
              color: #999;
              font-size: .16rem;
              text-align: center;
              line-height: 41px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              border-bottom: 1px solid #e4e4e4;
              padding: 0 .12rem;
              box-sizing: border-box;
              &:hover {
                  background-color: #f7f7f9;
                }
            }
          }
        }
      }
    }
    .aw-citylist-mask {
      top: 50px;
      bottom: 0;
      left: 0;
      right: 0;
      position: fixed;
      transition: opacity .5s;
      background-color: hsla(0, 0%, 0%, .55);
      .aw-seach-result {
        background-color: #fff;
        height: 0;
        overflow: auto;
        .aw-seach-ul > li{
            padding: .1rem .3rem;
            overflow: hidden;
            position: relative;
            border-bottom: 1px solid #e4e4e4;
            &:hover {
              background-color: #eee;
            }
        }
      }
      &.fade-transition {
        opacity: 1;
      }
      &.fade-enter, &.fade-leave{
        opacity: 0;
      }
    }
  }

   // 清除浮动
  .clearfix{ /*兼容 IE*/zoom: 1;}
  .clearfix:after{content: '';display: block;clear: both; height: 0;visibility: hidden;}
    
  .aw-city-container .ellipsis .ripple, 
  .aw-city-container .aw-city-name-container .ripple, 
  .aw-seach-result .aw-seach-ul li .ripple{ 
    background: rgba(225, 225, 225, 0.8)!important;
  }
</style>
