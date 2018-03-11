# proxy-mock-middleware
基于express 搭建前端代理以及本地模拟服务，方便前端开发。
### 使用背景
在前后端协同开发过程中，最多的就是数据联调。此中间件可以后端接口还没开发完时，能在本地快速模拟数据，而且接口与后台完全一制而不用在真正联调时还需要修改url，造成没必要的bug。同时，如果项目还依赖其他远程工程的服务（部署在公共的开发测试环境服务），可以启动代理，这样，前端就可以只运行前端工程而不用本地起后端服务。
### 使用手册
* 安装


```
npm install proxy-mock-middleware

```
* 使用


1.在项目的根目录创建一个配置文件，命名为`pmm.config.js`，其中包含服务代理配置	以及本地模拟数据配置。如下所示：


**pmm.config.js**


```
//服务器配置
const svrConfig = {
  host: "127.0.0.1",
  port: 3000,
  mockenable: true,//是否启用本地模拟数据
  proName: '/react-gulp-es6',//项目名称
  staticFolder: "dist"//静态资源托管目录
};
//代理配置，可以为空数组
const proxyConfig = [{
	    enable : true,//是否代理
	    router: "/uitemplate_web",//代理目录
	    url: "http://workbenchdev.yyuap.com"//代理远程地址
  }]
 //本地模拟配置
const mockConfig = {
  "GET": [{
    "/react-gulp-es6/myrepo/getMyRepo": "./mock/myRepo/getMyRepo.json"
  },
  {
    "/react-gulp-es6/webAddress/getAddress": "./mock/webAddress/getAddress.json"
  }],
  "POST": [{

  }]

};
module.exports = {
  svrConfig: svrConfig,
  proxyConfig: proxyConfig,
  mockConfig : mockConfig 
};
	
```

其中本地模拟配置中需要注意的是`"/bd/materialclass/list"`表示真实的接口地址，`"./mock/list.json"`为本地接口数据的json文件

2.在工具中使用

* 在gulp中使用的话，在`gulpfile.js`中引用该插件，如下所示：

```
var pmm = require('proxy-mock-middleware');

```
然后配置一个gulp任务，用来执行它的start方法启动服务，如下：

```
gulp.task('dev-server', function () {
    pmm.start()
});
```



3.
### 测试

* 下载源码：


 `git clone https://github.com/Magicwager/proxy-mock-middleware.git`

* 进入测试目录：

	`cd proxy-mock-middleware/test`

* 安装依赖包：

	`npm install`

* 启动测试工程：

	`npm run pmmtest`


	访问[http://localhost:8888/react-gulp-es6/]() 根路由可以看效果






