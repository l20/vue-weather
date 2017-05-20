# vue-weather

> 基于vue.js 2.0的百度天气应用。

# 说明

在看完两遍完官方文档之后仍然感觉云里雾里，知其然不知其所以然。请教了高手之后人家都说学习新东西的最好方法不就是学到了之后就要用么。边学边用，根据项目需要学才是最快上手的，但有没有什么适合新手的项目参考，想了几天打算用vue来仿一个简单的天气应用，于是就出现了这个小应用,巩固所学。项目适合刚学完vue想实践的新手，高手略过吧！



# 技术栈

* vue2.0
* vue-router
* webpack
* ES6/7
* Axios
* less
* linq.js
* svg


# 运行环境

> nodejs  6.0 稳定版 npm 3.10

### 安装

```
git clone https://github.com/alanWongsGithub/vue-weather.git

cd weather/

npm install

```

### 运行
```
npm run dev

```

### 上线
```
npm run build

//用node启动:

node server.js

//用pm2管理启动:

pm2 start server.js

//用forever管理启动

forever start server.js

```

<a href="http://weather.alanwong.tech" target="_blank">在线演示</a>

# 然后

> 本项目用于刚上手vue 2.0文档想找项目尝尝鲜的coder。

> 由于本人也刚接触vue所以在您看来可能代码写的有些乱，将就着看吧。

> 由于使用的免费天气API数据过于简单，导致某些功能只能自己实现或者未开发，比如日落日出时间，当然也可以计算自己实现，稍复杂。

> 国际惯例，您觉得还可以就 star一下吧，让我更有动力学习。

>  开发环境为 windows 7 Chrome 57 node 6.10.1。



# 实现功能

- [x] 阴历、阳历、天干地支日历

- [x] 空气质量、当前天气温度风力风级、当前天气提示

- [x] 未来24小时预报，预报数据API未提供这里为模拟数据

- [x] 摄氏温度和华氏温度转换。

- [x] 未来四天天气预报 、SVG贝塞尔曲线绘制

- [x] 自动IP定位当前城市设置天气，全国县级以上城市检索设置。这里获取的全国城市城市数据为饿了么数据。



## 效果截屏

#### 主界面

![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/home.gif)

#### 界面功能

![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/homeoperation.gif)

#### 城市列表

![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/citylist.gif)

#### 城市列表选择设置

![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/citylistset.gif)

#### 八种纯CSS天气图标

![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/sunny.gif) ![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/cloudy.gif)![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/rainy.gif) ![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/rainbow.gif)![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/starry.gif) ![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/stormy.gif)![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/snowy.gif) ![home](https://github.com/alanWongsGithub/vue-weather/blob/master/screen/cloudy2sunny.gif)





