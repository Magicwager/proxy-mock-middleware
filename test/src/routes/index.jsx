import React, {Component} from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router';//Router是React的一个组件,Router组件本身只是一个容器，真正的路由要通过Route组件定义
import App from '../components/App'
import Hello from '../pages/HelloWorld';
import Webpage from '../pages/Webpage';
import Myrepo from '../pages/Myrepo';
import WebAddress from '../pages/WebAddress'


const Routers=(
 /* hashHistory只有在react-router的版本在4.0 之前才能这么引用 
    hashHistory表示路由的切换由URL的hash变化决定，即URL的#部分发生变化
 */
/* 访问根路由即／（例如这项目的localhost:8888/react-gulp-es6/），则会加载Hello组件 */
<Router history={hashHistory}>

    <Route exact  path='/' breadcrumbName="Home" component={App}>
         {/* 当 url 为/时渲染 Hello， IndexRoute就是解决这个问题，显式指定Home是根路由的子组件，即指定默认情况下加载的子组件。你可以把IndexRoute想象成某个路径的index.html。*/}
  {/*       <IndexRoute component={Hello} /> */}
        
        <Route path='/myRepo' breadcrumbName="RepoList" component={Myrepo}>
           
        </Route>
        <Route path='/webAddress' breadcrumbName="WebTree" component={WebAddress}>
            <Route  path='/webPage' breadcrumbName="WebPage" component={Webpage} />
        </Route>
       


       
        
    </Route>
    
</Router>
)
export default Routers
