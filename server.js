var path = require('path');
var http = require('http');
var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');
var app = express();

var proxyTable = {
    '/weather_mini': 'http://wthrcdn.etouch.cn',
    '/v1': 'https://mainsite-restapi.ele.me',
};

// --------------------路由开始
var routes = express.Router();
var apiRoutes = express.Router();

var cityInfo = require('./static/citydata.json');
var forcast24 = require('./static/forcast.json');

routes.get('/', function(req, res, next) {
    req.url = '/index.html';
    next();
});

app.use(routes);

// 全国县级以上城市天气代码、名称
apiRoutes.get('/citycode', function(req, res) {
    res.json({
        errno: 0,
        data: cityInfo
    });
});

// 24小时预报
apiRoutes.get('/forecast24', function(req, res) {
    res.json({
        errno: 0,
        data: forcast24
    });
});

// ip接口
apiRoutes.get('/ip', function(req, response) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    http.get('http://ip.taobao.com/service/getIpInfo.php?ip=' + ip, function(res) {
        res.on('data', function(d) {
            // console.error(d);
            response.json({
                errno: 0,
                data: d.toString('ascii')
            });
            // process.stdout.write(d);
        });

    }).on('error', function(e) {
        console.error(e);
    });

});

app.use('/api', apiRoutes);

// --------------------路由代码结束
//
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options, changeOrigin: true }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})


// default port where dev server listens for incoming traffic
var port = 8080;

// serve pure static assets
app.use(express.static('./vue-weather'))

console.log('> Starting dev server...')

console.log('> Listening at ' + port + '\n')

var server = app.listen(port)

module.exports = {
    close: () => {
        server.close()
    }
}
