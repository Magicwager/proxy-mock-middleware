var  axios=require('axios');
var MockAdapter=require('axios-mock-adapter');

module.exports=function(){
    var mock = new MockAdapter(axios);
    return {
        mockStart:function(){
            mock.onGet('/react-gulp-es6/myrepo/getMyRepo').reply(200, {
            "state":1,
            "data":[
                {
                    "title":"react-demos",
                    "href":"https://github.com/Magicwager/react-demos.git",
                    "content":"从最基础的react示例到结合gulp搭建react项目再到gulp+react+es6，步步为营"
                },
                {
                    "title":"react-gulp-es6",
                    "href":"https://github.com/Magicwager/react-gulp-es6.git",
                    "content":"最简易利用gulp搭建react项目，并且是最新的es6写法"
                },
                {
                    "title":"webpack-example",
                    "href":"https://github.com/Magicwager/webpack-example.git",
                    "content":"这是一个关于webpack的简单示例工程，对于没接触过webpack的同学可以拿来练手，对有一定基础的同学可以选择性看看，希望有所帮助"
                },
                {
                    "title":"ncbuild",
                    "href":"https://github.com/Magicwager/ncbuild.git",
                    "content":"本项目为内部使用，实现快速创建模板，列表按钮，卡片按钮。"
                },
                {
                    "title":"react-gulp-es6",
                    "href":"https://github.com/Magicwager/react-gulp-es6.git",
                    "content":"最简易利用gulp搭建react项目，并且是最新的es6写法"
                }
            ],
            "message":"success"
          });
          mock.onGet('/react-gulp-es6/webAddress/getAddress').reply(200, {
            "state":1,
            "data":[
                {
                title: '百度首页',
                key: 'https://www.baidu.com/',
                children: [{
                    title: '百度新闻',
                    key: 'http://news.baidu.com/',
                    children: [
                    { title: '百家号', key: 'https://baijia.baidu.com/' }
                    ],
                }, {
                    title: '百度贴吧',
                    key: 'https://tieba.baidu.com/index.html'
                }, {
                    title: '百度知道',
                    key: 'https://zhidao.baidu.com/',
                }],
                }, {
                title: '阿里云首页',
                key: 'https://www.aliyun.com/',
                children: [
                    { title: '阿里云大数据', key: 'https://data.aliyun.com/' },
                    { title: '阿里云人工智能', key: 'https://et.aliyun.com' },
                    { title: '阿里云开发者中心', key: 'https://developer.aliyun.com' },
                ],
                }
            ],
            "message":"success"
          });
        }
    }
}