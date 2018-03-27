//在webpack中的配置
/* const svrConfig = {
  host: "127.0.0.1",
  port: 3000,
  mockenable: true,
  buildTool:"webpack",//使用的构建工具名称，只能是'webpack'或'gulp'
  webpackCfgName: "webpack.dev.config.js"//webpack的开发配置文件，buildTool参数为‘webpack’时才配置
} */;
//在gulp中的配置
const svrConfig = {
  host: "127.0.0.1",
  port: 3000,
  mockenable: true,
  buildTool:"gulp",//使用的构建工具名称，只能是'webpack'或'gulp'
  proName:"/react-gulp-es6",
  staticFolder: "dist",//静态资源托管目录，buildTool参数为‘gulp’时才配置
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