'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _link = require('../link/link');

var _link2 = _interopRequireDefault(_link);

var _resizeSensor = require('../resize-sensor/resize-sensor');

var _resizeSensor2 = _interopRequireDefault(_resizeSensor);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
 * Компонент шапки сайта: лого, меню и пользовательский профиль.
 * Обычно используется совместно с компонентом `Page`.
 */
var Header = (_dec = (0, _cn2.default)('header'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Header);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            fixed: false,
            colored: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Header, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.fixed) {
                window.addEventListener('scroll', this.handleScroll);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.fixed) {
                window.removeEventListener('scroll', this.handleScroll);
            }
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: cn({ fixed: this.state.fixed }), ref: function ref(root) {
                        _this2.root = root;
                    } },
                this.props.topContent && _react2.default.createElement(
                    'div',
                    { className: cn('top-content'), ref: function ref(topContent) {
                            _this2.topContent = topContent;
                        } },
                    this.props.topContent
                ),
                _react2.default.createElement(
                    'div',
                    { className: cn('main-case', { fixed: this.state.fixed, colored: this.state.colored }) },
                    _react2.default.createElement(
                        'div',
                        { className: cn('inner') },
                        this.renderLogo(cn),
                        _react2.default.createElement(
                            'div',
                            { className: cn('content') },
                            this.props.menu && _react2.default.createElement(
                                'div',
                                { className: cn('menu') },
                                this.props.menu
                            ),
                            this.props.user && _react2.default.createElement(
                                'div',
                                { className: cn('user') },
                                this.props.user
                            ),
                            this.props.support && _react2.default.createElement(
                                'div',
                                { className: cn('support') },
                                this.props.support
                            )
                        )
                    )
                ),
                _react2.default.createElement(_resizeSensor2.default, { onResize: this.handleResize })
            );
        }
    }, {
        key: 'renderLogo',
        value: function renderLogo(cn) {
            if (!this.props.logo) {
                return null;
            }

            return _react2.default.createElement(
                _link2.default,
                {
                    url: this.props.root,
                    className: cn('logo'),
                    onClick: this.handleLogoClick
                },
                this.props.logo
            );
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll() {
            this.solveFixedColoredState();
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            this.recountHeightStyleState();
        }
    }, {
        key: 'handleLogoClick',
        value: function handleLogoClick(event) {
            if (this.props.onLogoClick) {
                this.props.onLogoClick(event);
            }
        }
    }, {
        key: 'recountHeightStyleState',
        value: function recountHeightStyleState() {
            var topContentHeight = this.topContent && this.topContent.offsetHeight || 0;
            var headerHeight = this.root.offsetHeight;

            if (this.props.onResize && (headerHeight !== this.height || topContentHeight !== this.contentHeight)) {
                this.props.onResize(headerHeight, topContentHeight);
            }

            this.contentHeight = topContentHeight;
            this.height = headerHeight;

            if (this.props.fixed) {
                this.solveFixedColoredState();
            }
        }
    }, {
        key: 'solveFixedColoredState',
        value: function solveFixedColoredState() {
            var y = window.pageYOffset;
            var topDataContainer = this.topContent;
            var positionFixedBreakpoint = !this.props.topContent ? 0 : topDataContainer.offsetHeight;

            var positionColoredBreakpoint = !this.props.topContent ? 10 : topDataContainer.offsetHeight;

            if (y >= positionFixedBreakpoint) {
                if (!this.state.fixed) {
                    this.setState({
                        fixed: true
                    });
                }
            } else if (this.state.fixed) {
                this.setState({
                    fixed: false
                });
            }

            if (y >= positionColoredBreakpoint) {
                if (!this.state.colored) {
                    this.setState({
                        colored: true
                    });
                }
            } else if (this.state.colored) {
                this.setState({
                    colored: false
                });
            }
        }
    }]);

    return Header;
}(_react2.default.Component), _class3.propTypes = {
    root: _propTypes2.default.string,
    /** Содержимое кастомного логотипа в шапке */
    logo: _propTypes2.default.node,
    /** Содержимое меню в шапке */
    menu: _propTypes2.default.node,
    /** Содержимое блока пользователя */
    user: _propTypes2.default.node,
    /** Содержимое блока контактов поддержки */
    support: _propTypes2.default.node,
    /** Произвольный контент над логотипом и меню */
    topContent: _propTypes2.default.node,
    /** Управление возможностью фиксирования шапки к верхнему краю окна */
    fixed: _propTypes2.default.bool,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик события изменение размера шапки */
    onResize: _propTypes2.default.func,
    /** Обработчик события клика по логотипу Альфа-Банк */
    onLogoClick: _propTypes2.default.func
}, _class3.defaultProps = {
    root: '/',
    logo: null,
    fixed: false
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleScroll', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleScroll'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleResize', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleResize'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleLogoClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleLogoClick'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Header;
//# sourceMappingURL=header.js.map
