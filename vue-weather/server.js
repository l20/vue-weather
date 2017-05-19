
var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var app = express()


// --------------------路由开始
var routes = express.Router();
var apiRoutes = express.Router();


var cityInfo = require('./static/citydata.json');
var forcast24 = require('./static/forcast.json');

routes.get('/', function (req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(routes);

// 全国县级以上城市天气代码、名称
apiRoutes.get('/citycode', function (req, res) {
  res.json({
    errno: 0,
    data: cityInfo
  });
});

// 24小时预报
apiRoutes.get('/forecast24', function (req, res) {
  res.json({
    errno: 0,
    data: forcast24
  });
});

app.use('/api', apiRoutes);

// --------------------路由代码结束

// default port where dev server listens for incoming traffic
var port =  9000;

// 反向代理列表
var proxyTable = {
        '/location': 'https://api.map.baidu.com',
        '/weather_mini' : 'http://wthrcdn.etouch.cn',
        '/v1' : 'https://mainsite-restapi.ele.me',
  };

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options , changeOrigin: true}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

// serve pure static assets
app.use(express.static('.'))

var uri = port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')

console.log('> Listening at ' + uri + '\n')

_resolve()

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}


