'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _antd = require('antd');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Myrepo = function (_Component) {
    _inherits(Myrepo, _Component);

    function Myrepo(props) {
        _classCallCheck(this, Myrepo);

        var _this = _possibleConstructorReturn(this, (Myrepo.__proto__ || Object.getPrototypeOf(Myrepo)).call(this, props));

        _this.state = {
            myRepoData: []
        };
        _this.routeTo = _this.routeTo.bind(_this);
        return _this;
    }

    _createClass(Myrepo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;
            (0, _axios2.default)({
                url: '/react-gulp-es6/myrepo/getMyRepo',
                method: "get",
                data: {
                    userId: "wujiank"
                }
            }).then(function (res) {
                if (res.data.state == 1) {
                    self.setState({
                        myRepoData: res.data.data
                    });
                } else {
                    alert(res.data.message);
                }
            });
        }
    }, {
        key: 'routeTo',
        value: function routeTo(href) {
            /* 可以通过穿对象的方式传参数，通过query属性传参数，在接收的组件中可以通过self.props.location.query获取参数 */
            var data = { href: href };
            var path = {
                pathname: '/repo',
                query: data
            };
            this.props.router.push(path);
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            return _react2.default.createElement("div", { className: "Myrepo-outer", style: { padding: 10 } }, _react2.default.createElement("h2", null, "Magicwager's Repositories"), self.state.myRepoData.map(function (repo, index) {
                return _react2.default.createElement(_antd.Card, { title: repo.title, key: index, extra: _react2.default.createElement("a", { href: repo.href, target: "_blank" }, "More"), style: { width: 300, maginRight: 40, display: 'inline-block' } }, _react2.default.createElement("p", null, repo.content));
            }), this.props.children);
        }
    }]);

    return Myrepo;
}(_react.Component);

exports.default = Myrepo;