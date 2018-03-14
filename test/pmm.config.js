const svrConfig = {
  host: "127.0.0.1",
  port: 3000,
  mockenable: true,
  proName: '/react-gulp-es6',//项目名称
  staticFolder: "dist",//静态资源托管目录
  webpackFlag:true,
  webpackCfgName: "webpack.dev.config.js"
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