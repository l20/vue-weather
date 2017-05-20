
var path = require('path')
var express = require('express')
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
var port =  8080;

// serve pure static assets
app.use(express.static('.'))

console.log('> Starting dev server...')

console.log('> Listening at ' + port + '\n')

var server = app.listen(port)

module.exports = {
  close: () => {
    server.close()
  }
}


