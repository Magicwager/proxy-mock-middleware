# proxy-mock-middleware
基于express 搭建前端代理以及本地模拟服务，方便前端开发。
### 使用背景
在前后端协同开发过程中，最多的就是数据联调。此中间件可以后端接口还没开发完时，能在本地快速模拟数据，而且接口与后台完全一制而不用在真正联调时还需要修改url，造成没必要的bug。同时，如果项目还依赖其他远程工程的服务（部署在公共的开发测试环境服务），可以启动代理，这样，前端就可以只运行前端工程而不用本地起后端服务。

本插件可以应用于gulp构建工具，也可以应用于webpack打包工具，只需要几个小小的配置就能轻松使用。
### 使用手册
* 安装


```sh
	npm install proxy-mock-middleware --save-dev
```
* 使用


1.在项目的根目录创建一个配置文件，命名为`pmm.config.js`，其中包含服务代理配置	以及本地模拟数据配置。如下所示：


**pmm.config.js**


```sh
		//服务器配置
		const svrConfig = {
			host: "127.0.0.1",//必须配置项
 			port: 3000,//必须配置项
  			mockenable: true,
 			buildTool:"webpack",//必须配置项，使用的构建工具名称，只能是'webpack'或'gulp'
 			staticFolder: "dist",//静态资源托管目录，buildTool参数为‘gulp’时才配置
  			webpackCfgName: "webpack.dev.config.js"//webpack的开发配置文件，buildTool参数为‘webpack’时才配置
		};
		//代理配置，可以同时多个代理，可以为空数组
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
配置说明：


**svrConfig配置** 

 * host:主机名（必须项）
 * port:端口号（必须项）
 * mockenable:是否启用本地模拟服务（可选项，默认为false，true为启用）
 * buildTool:使用的构建工具名称，只能是'webpack'或'gulp'（必须项）
 * staticFolder:静态资源托管目录，buildTool参数为‘gulp’时才配置（gulp工具时必须项）
 * webpackCfgName: webpack的开发配置文件，buildTool参数为‘webpack’时才配置（webpack工具时必须项）

**proxyConfig配置** 

可以配置多个代理，每个代理有三个参数：

* enable : 是否代理(true启用代理)
* router: 代理目录
* url: "http://workbenchdev.yyuap.com"//代理远程地址

**mockConfig配置** 


可以配置GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求。
其中本地模拟配置中需要注意的是`"/bd/materialclass/list"`表示真实的接口地址，`"./mock/list.json"`为本地接口数据的json文件



2.配合工具使用

* **配合gulp使用**：


在`gulpfile.js`中引用该插件，如下所示：

```sh
		var pmm = require('proxy-mock-middleware');

```
然后配置一个gulp任务，用来执行它的start方法启动服务，如下：

```sh
		gulp.task('dev-server', function () {
		    pmm.start()
		});
```
具体例子可以查看下面测试工程里头的配置。


* **配合webpack使用**：

第一步，不需要配置webpack中的devServer，只保留webpack的打包功能，因为devServer的配置其实是供webpack-dev-server使用，而它主要是启动了一个使用express的Http服务器。本插件proxy-mock-middleware也是启动一个Http服务器，所以不需要重复启用。
第二步：全局安装proxy-mock-middleware

```sh
		npm install proxy-mock-middleware -g
```
这样做其实是可以提供此插件里头的命令pmm-server（启动proxy-mock-middleware服务）。

##### webpack项目使用示例如下：


例如项目结构如下：

```sh
├── README.md
├── app
├── assets
├── json
├── package-lock.json
├── package.json
├── pmm.config.js
├── postcss.config.js
├── public
├── webpack.config.js
└── webpack.pro.config.js

```


webpack.config.js(简单配置了下，在这里重点是为了强调不需要启用webpack-dev-server)如下：

```sh
		const webpack = require("webpack");
		const HtmlWebpackPlugin = require('html-webpack-plugin');
		module.exports={
			devtool:'eval-source-map',//便于开发环境找错误位置，eval-source-map只用于开发环境
			entry:__dirname+"/app/index.js",//唯一的入口文件
			output:{
				path:__dirname+"/public",//产出文件所在的位置
				filename:"build.js"//产出文件的文件名
			},
			//不需要启用devServer
		/* 	devServer:{
				contentBase:'./public',//本地服务器所加载的页面所在的目录, 
				port:8888,
				inline:true,//实时刷新，
				hot:true
			}, */
			module:{
				rules:[
				 {
				 	test:/(\.js|\.jsx)$/,
				 	exclude:/node_modules/,
				 	use:'babel-loader'
				 },
				 {
				 	test:/\.css$/,
				 	use:['style-loader','css-loader']
				 },
				 {
				 	test:/\.json$/,
				 	use:'json-loader'//新版本webpack要求配置文件中不能省略‘-loader’
				 },
				 {
				 	test:/\.less$/,
				 	use:['style-loader','css-loader','less-loader','postcss-loader']
				 },
				 {
				 	test:/\.html$/,
				 	use:'html-loader'
				 }
		
				]
		
			},
			plugins:[new HtmlWebpackPlugin({
				    template: __dirname + "/app/index.tmpl.html"//生产index.html模版文件
				}),  
				/* 在开发环境中配置通过配置HMR 以提高开发效率*/
				  new 	webpack.HotModuleReplacementPlugin()]
	}

```
pmm.config.js的配置如下：

```sh
		const svrConfig = {
		    host: "127.0.0.1",
		    port: 3000,
		    mockenable: false,
		    buildTool:'webpack',
		    webpackCfgName: "webpack.config.js"
		  };
		  const proxyConfig = [
		    /* {
		      enable : false,
		      router: "/test",
		      url: ""
		    }, */
		  ]
		  
		  const mockConfig = {
		    "GET": [{
		      
		    },
		    {
		     
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
运行`pmm-server`启动http服务就可以正常访问资源了。
具体例子可以看下面测试工程的例子。


### 测试

* 下载源码：


```sh
git clone https://github.com/Magicwager/proxy-mock-middleware.git

```

* 进入测试目录：

```	sh	
	cd proxy-mock-middleware/test	
```

* 安装依赖包：

```	sh	
	npm install	
```

* 启动测试工程：

```	sh	
	npm run pmmtest	
```
访问[http://localhost:3000/react-gulp-es6/]() 根路由可以看效果






