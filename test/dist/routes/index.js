'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('../components/App');

var _App2 = _interopRequireDefault(_App);

var _HelloWorld = require('../pages/HelloWorld');

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

var _Webpage = require('../pages/Webpage');

var _Webpage2 = _interopRequireDefault(_Webpage);

var _Myrepo = require('../pages/Myrepo');

var _Myrepo2 = _interopRequireDefault(_Myrepo);

var _WebAddress = require('../pages/WebAddress');

var _WebAddress2 = _interopRequireDefault(_WebAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routers =
/* hashHistory只有在react-router的版本在4.0 之前才能这么引用 
   hashHistory表示路由的切换由URL的hash变化决定，即URL的#部分发生变化
*/
/* 访问根路由即／（例如这项目的localhost:8888/react-gulp-es6/），则会加载Hello组件 */
_react2.default.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory }, _react2.default.createElement(_reactRouter.Route, { exact: true, path: "/", breadcrumbName: "Home", component: _App2.default },
/* 当 url 为/时渲染 Hello， IndexRoute就是解决这个问题，显式指定Home是根路由的子组件，即指定默认情况下加载的子组件。你可以把IndexRoute想象成某个路径的index.html。*/
/*       <IndexRoute component={Hello} /> */

_react2.default.createElement(_reactRouter.Route, { path: "/myRepo", breadcrumbName: "RepoList", component: _Myrepo2.default }), _react2.default.createElement(_reactRouter.Route, { path: "/webAddress", breadcrumbName: "WebTree", component: _WebAddress2.default }, _react2.default.createElement(_reactRouter.Route, { path: "/webPage", breadcrumbName: "WebPage", component: _Webpage2.default })))); //Router是React的一个组件,Router组件本身只是一个容器，真正的路由要通过Route组件定义
exports.default = Routers;