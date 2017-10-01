var http = require('http');
require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var app = express()

// --------------------路由开始
var cityInfo = require('../static/citydata.json');
var forcast24 = require('../static/forcast.json');

var apiRoutes = express.Router();
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
// ip接口
apiRoutes.get('/ip', function(req, response) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (process.env.NODE_ENV) {
      ip = '125.33.71.137';
    }
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

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
  // app.use(proxyMiddleware('/v1', {target: 'https://mainsite-restapi.ele.me', changeOrigin: true}))
  // app.use(proxyMiddleware('/location', {target: 'https://api.map.baidu.com', changeOrigin: true}))

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options , changeOrigin: true}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
