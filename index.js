var chalk = require("chalk");
var path = require("path");
var express = require("express");
var proxy = require('http-proxy-middleware');
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");//
var webpackHotMiddleware = require("webpack-hot-middleware");
var app = express();
var router = express.Router();//是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”
var mockConfig, svrConfig, proxyConfig;
var pmmConfig = require(path.resolve(".", "pmm.config.js"));
try {
  //读取服务器配置
  svrConfig = pmmConfig.svrConfig;
  //读取代理配置
  proxyConfig = pmmConfig.proxyConfig;
  //本地数据模拟配置
  mockConfig = pmmConfig.mockConfig;
} catch (e) {
  console.log(chalk.red(e));
  //process.exit(0);
} finally {

}
var webpackConfig = require(path.resolve(".", svrConfig.webpackCfgName));
var compiler = webpack(webpackConfig);
//开发调试总程序
function server() {
  //设置默认mock
  app.use(express.static(path.resolve('.', 'mock')));
  console.log(chalk.yellow("\n/******************** Start loading proxy server ********************/\n"));
  proxyConfig.forEach(function (element) {
    if (element.enable) {
      const apiProxy = proxy(element.router, { target: element.url, changeOrigin: true });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
      app.use(element.router + '/*', apiProxy)
      console.log(chalk.green(`[proxy] : ${element.router} to ${element.url + element.router}`));
    }
  });
  console.log(chalk.yellow("\n/******************** Proxy server loaded completed *****************/\n"));
  //判断是否启用mock
  if (svrConfig.mockenable && mockConfig) {
    console.log(chalk.yellow("\n/******************** Start loading mock server ********************/\n"));
    for (let item in mockConfig) {
      for (let i = 0; i < mockConfig[item].length; i++) {
        for (let url in mockConfig[item][i]) {
          console.log(chalk.green(`[mock]:[${url}] to ${mockConfig[item][i][url]}`));
          /* router.all不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行 */
          router.all(url, function (req, res, next) {
            console.log(chalk.green(`[mock]: ${req.method} ${req.ip} client router [${url}]-[${mockConfig[item][i][url]}]`));
            res.sendFile(path.resolve(".", mockConfig[item][i][url]), {
            });
          });
        }
      }
    }
    console.log(chalk.yellow("\n/******************** Mock server loaded completed *****************/\n"));
  }
  app.use(router);
  /* 若是与webpack结合使用，配置了webpack则启动webpack-hot-middleware与webpack-dev-middleware搭建的热替换server
   * 若是与gulp结合使用，则利用express静态资源托管，由gulp去管理文件的监控
  */
  console.log(chalk.yellow("\n/******************** Start webpack-dev-middleware *****************/\n"))
  if (svrConfig.buildTool=="webpack") {
    //加载webpack处理
    console.log(chalk.yellow("\n/******************** Start webpack-dev-middleware *****************/\n"))
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,//资源目录与插件做绑定，与webpack配置的一致
      logTime: true,
      stats: {
        colors: true
      }
    }));
    app.use(webpackHotMiddleware(compiler));
  } else {
    //设置指定静态资源目录
    app.use(express.static(path.resolve('.', svrConfig.staticFolder)));
  }
  app.listen(svrConfig.port, svrConfig.host, function () {
    console.log(chalk.yellow("\n/******************** Start dev server *****************/\n"));
    console.log(chalk.green(`[pmm] : Listening on port http://${svrConfig.host}:${svrConfig.port}`));
    console.log(chalk.yellow("\n/******************** O(∩_∩)O *****************/\n"));
  });

}
module.exports = {
  start: function () {
    server();
  }
}