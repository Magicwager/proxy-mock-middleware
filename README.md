# proxy-mock-middleware
基于express 搭建前端代理以及本地模拟服务，方便前端开发。
### 使用背景
在前后端协同开发过程中，最多的就是数据联调。此中间件可以后端接口还没开发完时，能在本地快速模拟数据，而且接口与后台完全一制而不用在真正联调时还需要修改url，造成没必要的bug。同时，如果项目还依赖其他远程工程的服务（部署在公共的开发测试环境服务），可以启动代理，这样，前端就可以只运行前端工程而不用本地起后端服务。
### 使用手册
* 安装


```
		npm install proxy-mock-middleware --save-dev			

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

2.配合工具使用

* 配合gulp使用：


在`gulpfile.js`中引用该插件，如下所示：

```
		var pmm = require('proxy-mock-middleware');

```
然后配置一个gulp任务，用来执行它的start方法启动服务，如下：

```
		gulp.task('dev-server', function () {
		    pmm.start()
		});
```
* 配合webpack使用：

第一步，不需要配置webpack中的devServer，只保留webpack的打包功能，因为devServer的配置其实是供webpack-dev-server使用，而它主要是启动了一个使用express的Http服务器。本插件proxy-mock-middleware也是启动一个Http服务器，所以不需要重复启用。
第二步：全局安装proxy-mock-middleware

```
		npm install proxy-mock-middleware -g
```
这样做其实是可以提供此插件里头的命令pmm-server（启动proxy-mock-middleware服务）。

##### webpack项目使用示例如下：


例如项目结构如下：

```
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

```
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

```
		const svrConfig = {
		    host: "127.0.0.1",
		    port: 3000,
		    mockenable: false,
		    proName: '/webpack-demo',//项目名称
		    staticFolder: "public"//静态资源托管目录
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
可以先运行`webpack`进行资源打包，然后运行`pmm-server`启动http服务就可以正常访问资源了。


### 测试

* 下载源码：


 `			git clone https://github.com/Magicwager/proxy-mock-middleware.git			`

* 进入测试目录：

	`		cd proxy-mock-middleware/test		`

* 安装依赖包：

	`		npm install		`

* 启动测试工程：

	`		npm run pmmtest		`


	访问[http://localhost:8888/react-gulp-es6/]() 根路由可以看效果






