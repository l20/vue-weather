<template>
  <div class="city-list" v-if="show">
    <div class="aw-input-wapper c-row">
      <span class="aw-icon-style icon-arrow-left2 c-span2"></span>
      <form id="search" class="navbar-search c-span10" action="/search">
        <span class="aw-icon-style icon-search"></span><input placeholder="输入城市名检索" type="text" name="query" class="search-query "  v-model="filterKey">
      </form>
    </div>
    <!-- <table>
      <thead>
        <tr>
          <th v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ key | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredData">
          <td v-for="key in columns">
            {{entry[key]}}
          </td>
        </tr>
      </tbody>
    </table> -->
    <section class="aw-city-container">
        <ul class="aw-letter-classify">
            <li v-for="(value, key, index) in sortgroupcity" :key="key"  class="aw-letter-classify-li">
                <h4 class="aw-city-title">{{key}}
                    <span v-if="index == 0">（按字母排序）</span>
                </h4>
                <ul class="aw-city-name-container city-list-ul clearfix ">
                    <li v-for="item in value"  class="ellipsis c-span3">{{item.name}}</li>
                </ul>
            </li>
        </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import {getAllCityInfo, getHotCityInfo} from "@/common/js/getdata";
    
export default {
      data () {
        var sortOrders = {}, columns = ['name', 'power'];
        columns.forEach(function (key) {
          sortOrders[key] = 1;
        });
        return {
          show: true,
          sortKey: '',
          filterKey: '',
          columns: columns,
          sortOrders: sortOrders,
          data: [
            { name: 'Chuck Norris', power: Infinity },
            { name: 'Bruce Lee', power: 9000 },
            { name: 'Jackie Chan', power: 7000 },
            { name: 'Jet Li', power: 8000 }
          ],
          guessCity: '',   //当前城市
          guessCityid: '', //当前城市id
          hotcity: [],     //热门城市列表
          groupcity: {},   //所有城市列表
        };
      },
      computed: {
        filteredData () {
          var sortKey = this.sortKey;
          var filterKey = this.filterKey && this.filterKey.toLowerCase();
          var order = this.sortOrders[sortKey] || 1;
          var data = this.data;
          if (filterKey) {
            data = data.filter(function (row) {
              return Object.keys(row).some(function (key) {
                return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
              });
            })
            console.log(data);
          }
          if (sortKey) {
            data = data.slice().sort(function (a, b) {
              a = a[sortKey];
              b = b[sortKey];
              return (a === b ? 0 : a > b ? 1 : -1) * order;
            })
          }
          return data;
        },
        //将获取的数据按照A-Z字母开头排序
        sortgroupcity() {
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.groupcity[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                }
            }
            console.log(sortobj);
            return sortobj
        }
      },
      filters: {
        capitalize: function (str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
      },
      methods: {
        sortBy: function (key) {
          this.sortKey = key;
          this.sortOrders[key] = this.sortOrders[key] * -1;
        }
      },
      created() {
        const that = this;
        this.$root.eventHub.$on('aw.show.citylist', () => {
            // that.show = !that.show;
            // console.log(that.show);
        });
        // 获取当前城市
        /*cityGuess().then(res => {
            this.guessCity = res.name;
            this.guessCityid = res.id;
        });
*/
        //获取热门城市
       /* hotcity().then(res => {
           this.hotcity = res;
           console.log(res);
        });*/

        //获取所有城市
        getAllCityInfo().then(res => {
            this.groupcity = res.data;
            // console.log(res.data);
        });
      },
      mounted() {
    },
};
</script>

<style  lang="less" scoped>
  .city-list {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: .2rem;
    transition: all .5s;
    position: fixed;
    background-color: #fff;
    z-index: 10;
    .aw-input-wapper{
      background-color: hsl(210, 51%, 50%);
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
      border: 2px solid #42b983;
      border-radius: 3px;
      background-color: #fff;
      width: 100%;
      th {
        background-color: #42b983;
        color: rgba(255,255,255,0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
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
      box-sizing: border-box;
      position: absolute;
      overflow: auto;
      .aw-letter-classify {
          background-color: darken(#f7f7f9, 2%);
        .aw-letter-classify-li {
          background-color: #fff;
          margin-bottom: .2rem;
          border-top: 1px solid #e4e4e4;
          user-select: none;
          &:nth-child(1) {
            border-top: none;
          }
          .aw-city-title {
            color: #3e7fc1;
            font-size: .18rem;
            padding: .1rem .12rem;
            span {
              font-size: .1rem;
              color: #aaa;
            }
          }
          .aw-city-name-container {
            border-top: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            // 清除浮动
            &.clearfix:after{content: '';display: block;clear: both; height: 0;visibility: hidden;}
            .clearfix{ /*兼容 IE*/zoom: 1;}
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
  }






</style>
