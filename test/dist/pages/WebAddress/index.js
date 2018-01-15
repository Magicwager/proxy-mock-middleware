'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = _antd.Tree.TreeNode;

var Demo = function (_Component) {
    _inherits(Demo, _Component);

    function Demo(props) {
        _classCallCheck(this, Demo);

        var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

        _this.state = {
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            selectedKeys: [],
            treeData: []
        };
        return _this;
    }

    _createClass(Demo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;
            (0, _axios2.default)({
                url: '/react-gulp-es6/webAddress/getAddress',
                method: "get",
                data: {
                    userId: ""
                }
            }).then(function (res) {
                if (res.data.state == 1) {
                    self.setState({
                        treeData: res.data.data
                    });
                } else {
                    alert(res.data.message);
                }
            });
        }
    }, {
        key: 'onExpand',
        value: function onExpand(expandedKeys) {
            console.log('onExpand', arguments);
            // if not set autoExpandParent to false, if children expanded, parent can not collapse.
            // or, you can remove all expanded children keys.
            this.setState({
                expandedKeys: expandedKeys,
                autoExpandParent: false
            });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(selectedKeys, info) {
            debugger;
            console.log('onSelect', info);
            var data = { href: selectedKeys[0] };
            var path = {
                pathname: '/webPage',
                query: data
            };
            this.props.router.push(path);
            this.setState({ selectedKeys: selectedKeys });
        }
    }, {
        key: 'renderTreeNodes',
        value: function renderTreeNodes(data) {
            var _this2 = this;

            return data.map(function (item) {
                if (item.children) {
                    return _react2.default.createElement(TreeNode, { title: item.title, key: item.key, dataRef: item }, _this2.renderTreeNodes(item.children));
                }
                return _react2.default.createElement(TreeNode, _react2.default.__spread({}, item));
            });
        }
    }, {
        key: 'renderSelf',
        value: function renderSelf() {
            return _react2.default.createElement("div", { className: "webAdd_tree" }, _react2.default.createElement(_antd.Tree, {
                onExpand: this.onExpand.bind(this),
                expandedKeys: this.state.expandedKeys,
                autoExpandParent: this.state.autoExpandParent,
                onSelect: this.onSelect.bind(this),
                selectedKeys: this.state.selectedKeys }, this.renderTreeNodes(this.state.treeData)));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement("div", { className: "webAdd_outer" }, this.props.children || this.renderSelf()
            /* <div className='webAdd_tree'>
                    <Tree
                        onExpand={this.onExpand.bind(this)}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onSelect={this.onSelect.bind(this)}
                        selectedKeys={this.state.selectedKeys}>
                        {this.renderTreeNodes(this.state.treeData)}
                     </Tree>
              </div> */
            /*  <div className='webAdd_iframe'>
                 {this.props.children }
             </div> */

            );
        }
    }]);

    return Demo;
}(_react.Component);

exports.default = Demo;