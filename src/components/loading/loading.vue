<template>
  <div class="loading" v-show="loadingShow">
    <div class="aw-rainy-wapper">
      <div class="aw-icon aw-rainy">
        <div class="aw-cloud"></div>
        <div class="aw-rain"></div>
      </div>
      <p class="aw-weather-name" >
        <span class="aw-weather-name-text" v-for="(value, index) in appName" :style="{animationDelay:0-0.1*index+'s'}">{{value}}</span>
      </p>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        timer: null,
        loadingShow: true,
        appName:[..."Vue-Weather"],
      };
    },
    watch: {
      '$route' () {
        const self = this;
        self.loadingShow = true;
        this.timer = setTimeout(() => {
          self.loadingShow = false;
          clearTimeout(this.timer);
        }, 1200)
      }
    },
    mounted() {
      const self = this;
      this.timer = setTimeout(() => {
        self.loadingShow = false;
      }, 1200)
    },
    beforeDestroy(){
      clearTimeout(this.timer);
    },
  }
</script>

<style  lang="less" scoped>
  @bgColor: rgba(116, 181, 247, .97);
  .loading{
    top: 0;
   right: 0;
   bottom: 0;
   left: 0;
    width: 100%;
    height: 100%;
    background: @bgColor;
    z-index: 999;
    position: fixed;
    font-size: 8px;
    color: @bgColor;
    .aw-rainy-wapper{
      position: absolute;
      width: 100%;
      top:50%;
      margin-top: -20em  /2;
      // margin: -10em / 2 0 0 -12em / 2;
    }
    .aw-icon {
      width: 12em;
      height: 10em;
      margin: 0 auto;
      position: relative;
      display: block;
    }
    .aw-cloud {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      width: 3.6875em;
      height: 3.6875em;
      margin: -1.84375em;
      background: currentColor;
      border-radius: 50%;
      box-shadow:
        -2.1875em 0.6875em 0 -0.6875em,
        2.0625em 0.9375em 0 -0.9375em,
        0 0 0 0.375em #fff,
        -2.1875em 0.6875em 0 -0.3125em #fff,
        2.0625em 0.9375em 0 -0.5625em #fff;
    }
    .aw-weather-name{
      text-align: center;
      color:#fff;
      font-size: 0;
      letter-spacing: .08rem;
    }
    .aw-weather-name-text {
      font-size: .27rem;
      display: inline-block;
      font-family:   Ostrich Sans ;
      animation: 1.5s ease-in-out Bounce infinite;
    }

    @keyframes Bounce {
      0%,
        100% {
            transform: translateY(-50%);
        }
        50% {
            transform: translateY(50%);
        }
    }

    .aw-cloud:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -0.5em;
      display: block;
      width: 4.5625em;
      height: 1em;
      background: currentColor;
      box-shadow: 0 0.4375em 0 -0.0625em #fff;
    }
    .aw-cloud:nth-child(2) {
      z-index: 0;
      background: #fff;
      box-shadow:
        -2.1875em 0.6875em 0 -0.6875em #fff,
        2.0625em 0.9375em 0 -0.9375em #fff,
        0 0 0 0.375em #fff,
        -2.1875em 0.6875em 0 -0.3125em #fff,
        2.0625em 0.9375em 0 -0.5625em #fff;
      opacity: 0.3;
      transform: scale(0.5) translate(6em, -3em);
      animation: aw-cloud 1s linear infinite;
    }
    .aw-cloud:nth-child(2):after { background: #fff; }

    .aw-rain {
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      width: 3.75em;
      height: 3.75em;
      margin: 0.375em 0 0 -2em;
      background: currentColor;
    }

    @rainy-radius: ~'100% 0 60% 50% / 60% 0 100% 50%';
    @rainy-color: rgba(255,255,255,0.9);

    .aw-rain:after {
      content: '';
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      width: 1.125em;
      height: 1.125em;
      margin: -1em 0 0 -0.25em;
      background: #0cf;
      border-radius: @rainy-radius;
       box-shadow:
        0.625em 0.875em 0 -0.125em @rainy-color,
        -0.875em 1.125em 0 -0.125em @rainy-color,
        -1.375em -0.125em 0 @rainy-color;
      transform: rotate(-28deg);
      animation: aw-rain .6s linear infinite;
    }

    @keyframes aw-rain {
      0% {
        background: #0cf;
        box-shadow:
          0.625em 0.875em 0 -0.125em @rainy-color,
          -0.875em 1.125em 0 -0.125em @rainy-color,
          -1.375em -0.125em 0 #0cf;
      }
      25% {
        box-shadow:
          0.625em 0.875em 0 -0.125em @rainy-color,
          -0.875em 1.125em 0 -0.125em #0cf,
          -1.375em -0.125em 0 @rainy-color;
      }
      50% {
        background: rgba(255,255,255,0.3);
        box-shadow:
          0.625em 0.875em 0 -0.125em #0cf,
          -0.875em 1.125em 0 -0.125em @rainy-color,
          -1.375em -0.125em 0 @rainy-color;
      }
      100% {
        box-shadow:
          0.625em 0.875em 0 -0.125em @rainy-color,
          -0.875em 1.125em 0 -0.125em @rainy-color,
          -1.375em -0.125em 0 #0cf;
      }
    }


  }
</style>
