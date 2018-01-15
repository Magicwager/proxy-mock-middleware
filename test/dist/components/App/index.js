'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactRouter = require('react-router');

var _HelloWorld = require('../../pages/HelloWorld');

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = _antd.Layout.Header,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider,
    Content = _antd.Layout.Content;

var SubMenu = _antd.Menu.SubMenu;

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    console.log(_this);
    _this.state = {
      collapsed: false
    };
    _this.onCollapse = _this.onCollapse.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'onCollapse',
    value: function onCollapse(collapsed) {
      console.log(this);
      this.setState({ collapsed: collapsed });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement("div", null, _react2.default.createElement("div", null, _react2.default.createElement(_antd.Layout, null, _react2.default.createElement(Sider, { collapsible: true, collapsed: this.state.collapsed, onCollapse: this.onCollapse }, _react2.default.createElement(_antd.Menu, { theme: "dark", defaultSelectedKeys: ['1'], mode: "inline" }, _react2.default.createElement(_antd.Menu.Item, { key: "1" }, _react2.default.createElement(_antd.Icon, { type: "pie-chart" }), _react2.default.createElement(_reactRouter.Link, { to: "/" }, "Home")), _react2.default.createElement(_antd.Menu.Item, { key: "2" }, _react2.default.createElement(_antd.Icon, { type: "pie-chart" }), _react2.default.createElement(_reactRouter.Link, { to: "/webAddress" }, "WebAddress")), _react2.default.createElement(_antd.Menu.Item, { key: "3" }, _react2.default.createElement(_antd.Icon, { type: "desktop" }), _react2.default.createElement(_reactRouter.Link, { to: "/myRepo" }, "MyGitRep")
      /* <span onClick={this.getMyGit}>我的Git仓库</span> */
      )
      /*  <SubMenu key="sub1" title={<span><Icon type="user" /><span>name</span></span>}>
         <Menu.Item key="4">Tom</Menu.Item>
         <Menu.Item key="5">Bill</Menu.Item>
         <Menu.Item key="6">Alex</Menu.Item>
       </SubMenu> */

      )), _react2.default.createElement(_antd.Layout, null, _react2.default.createElement(Header, { className: "appHead" }, _react2.default.createElement(_antd.Breadcrumb, { routes: this.props.routes, params: this.props.params })), _react2.default.createElement(Content, null, this.props.children || _react2.default.createElement(_HelloWorld2.default, null)), _react2.default.createElement(Footer, { className: "appFooter" })))));
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;