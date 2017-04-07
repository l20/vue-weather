<template>
  <div class="yes-or-no">
    <input type="button" value="获取数据" @click="getData">
    <img class="imgs" :src="result.image" width="150">
  </div>
</template>

<script>
import Vue from 'vue';
import Axios from 'axios';

const URL = 'http://wthrcdn.etouch.cn/weather_mini?citykey=101290608';
const emlURL = 'https://mainsite-restapi.ele.me';
// const URL = 'https://yesno.wtf/api';

export default {
  data() {
    return {
      result: {}
    };
  },
  methods: {
    getData(event) {
      var self = this;
     /* fetch(URL).then(function(response) {
          return response.json();
      }).then(function(data) {
        self.result = data;
      });*/
      Axios.get(URL)
      .then(function (response) {
        self.$emit('update', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  created() {
    var self = this;
    /*fetch(URL).then(function(response) {
        return response.json();
    }).then(function (data) {
      self.result = data;
    }).then(function () {
      self.$emit('my.update', self.result);
    });*/
    Axios.get(URL)
      .then(function (response) {
        // console.log(response.data.data);
        self.$emit('update', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    Axios.get('/shopping/v2/restaurant/category')
    .then(function (response) {
      console.log(response);
      // self.$emit('update', response.data);
    })
    .catch(function (error) {
      console.log(error);
    });   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
