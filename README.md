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


1.在项目的根目录创建两个配置文件，分别是`pmm.config.js`与`pmm.mock.js`。分别是服务代理配置	以及本地模拟数据配置。如下所示：


**pmm.config.js**


```
	const svrConfig = {
	    host: "127.0.0.1",
	    port: 3000,//服务端口
	    //true启用静默模式，紧紧显示错误和警告。
	    noInfo : false,
	    mockenable:true,//是否启用本地模拟数据
	    proName:'/bd'//项目名称
  };
  const proxyConfig = 
  [{
	    enable : true,//是否代理
	    router: "/uitemplate_web",//代理目录
	    url: "http://workbenchdev.yyuap.com"//代理远程地址
  }];
  const staticConfig = {
    	folder : "dist"//静态资源托管目录，即前端工程的静态文件目录
    
  };
  module.exports = {
	    svrConfig: svrConfig,
	    proxyConfig: proxyConfig,
	    staticConfig : staticConfig
  };
	
```



**pmm.mock.js**

```
module.exports = {
    "GET": [{
        "/bd/materialclass/list": "./mock/list.json"
      }
    ],
    "POST": [{
        "/User/Post": "./mock/test.json"
      },
      
  
    ]
  }

```




其中`"/bd/materialclass/list"`表示真实的接口地址，`"./mock/list.json"`为本地接口数据的json文件

2.在`gulpfile.js`中引用该插件，如下所示：

```
	**var pmm = require('proxy-mock-middleware');**

```

3.然后配置一个gulp任务，用来执行它的start方法启动服务，如下：

```
	gulp.task('dev-server', function () {
    	pmm.start()
	});
```




