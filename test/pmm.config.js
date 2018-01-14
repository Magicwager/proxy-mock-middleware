const svrConfig = {
    host: "127.0.0.1",
    port: 3000,
    //true启用静默模式，紧紧显示错误和警告。
    noInfo : false,
    mockenable:true,
    proName:'/test'//项目名称
  };
  const proxyConfig = [
    {
      enable : false,
      router: "/test",
      url: ""
    },
  ]
  
  const staticConfig = {
    folder : "src"//静态资源托管目录
    
  };
  module.exports = {
    svrConfig: svrConfig,
    proxyConfig: proxyConfig,
    staticConfig : staticConfig
  };