'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _window = require('../lib/window');

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
 * Компонент всплывающего окна.
 */
var Notification = (_dec = (0, _cn2.default)('notification'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Notification, _React$Component);

    function Notification() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Notification);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Notification.__proto__ || Object.getPrototypeOf(Notification)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            hovered: false
        }, _this.closeTimeout = null, _this.clickEventBindTimeout = null, _this.isWindowClickBinded = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Notification, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.startCloseTimer();

            if (this.props.outsideClickClosable) {
                this.ensureClickEvent();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.outsideClickClosable) {
                if (prevProps.onClickOutside !== this.props.onClickOutside) {
                    this.ensureClickEvent();
                } else if (prevProps.visible !== this.props.visible) {
                    this.ensureClickEvent(!this.props.visible);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stopCloseTimer();

            if (this.props.outsideClickClosable) {
                this.ensureClickEvent(true);
            }
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                {
                    className: cn({
                        visible: this.props.visible,
                        status: this.props.status,
                        hovered: this.state.hovered,
                        'stick-to': this.props.stickTo
                    }),
                    onMouseEnter: this.handleMouseEnter,
                    onMouseLeave: this.handleMouseLeave,
                    onClick: this.handleClick,
                    style: this.getPosition(),
                    ref: function ref(root) {
                        _this2.root = root;
                    }
                },
                _react2.default.createElement(
                    'div',
                    { className: cn('icon') },
                    this.props.icon || _react2.default.createElement(_icon2.default, {
                        theme: 'alfa-on-colored',
                        icon: this.props.status,
                        size: 'm'
                    })
                ),
                this.props.title && _react2.default.createElement(
                    'div',
                    { className: cn('title') },
                    this.props.title
                ),
                _react2.default.createElement(
                    'div',
                    { className: cn('content') },
                    this.props.children
                ),
                this.props.hasCloser && _react2.default.createElement(_icon2.default, {
                    className: cn('close'),
                    size: 'm',
                    icon: 'close',
                    onClick: this.handleCloserClick
                })
            );
        }
    }, {
        key: 'handleCloserClick',
        value: function handleCloserClick() {
            if (this.props.onCloserClick) {
                this.props.onCloserClick();
            }
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter(event) {
            this.setState({ hovered: true });
            this.stopCloseTimer();

            if (this.props.onMouseEnter) {
                this.props.onMouseEnter(event);
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave(event) {
            this.setState({ hovered: false });
            this.stopCloseTimer();
            this.startCloseTimer();

            if (this.props.onMouseLeave) {
                this.props.onMouseLeave(event);
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.onClick) {
                this.props.onClick(event);
            }
        }
    }, {
        key: 'handleWindowClick',
        value: function handleWindowClick(event) {
            if (this.props.outsideClickClosable && this.root && (0, _window.isEventOutsideClientBounds)(event, this.root)) {
                if (this.props.onClickOutside) {
                    this.props.onClickOutside(event);
                }
            }
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return { top: this.props.offset };
        }
    }, {
        key: 'startCloseTimer',
        value: function startCloseTimer() {
            var _this3 = this;

            this.closeTimeout = setTimeout(function () {
                if (_this3.props.onCloseTimeout) {
                    _this3.props.onCloseTimeout();
                }
            }, this.props.autoCloseDelay);
        }
    }, {
        key: 'stopCloseTimer',
        value: function stopCloseTimer() {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = null;
        }
    }, {
        key: 'ensureClickEvent',
        value: function ensureClickEvent(isDestroy) {
            var _this4 = this;

            var isNeedBindEvent = isDestroy !== undefined ? !isDestroy : this.props.visible;

            // We need timeouts to not to catch the event that causes
            // popup opening (because it propagates to the `window`).
            if (this.clickEventBindTimeout) {
                clearTimeout(this.clickEventBindTimeout);
                this.clickEventBindTimeout = null;
            }

            this.clickEventBindTimeout = setTimeout(function () {
                if (!_this4.isWindowClickBinded && isNeedBindEvent) {
                    window.addEventListener('click', _this4.handleWindowClick);
                    window.addEventListener('touchend', _this4.handleWindowClick);
                    _this4.isWindowClickBinded = true;
                } else if (_this4.isWindowClickBinded && !isNeedBindEvent) {
                    window.removeEventListener('click', _this4.handleWindowClick);
                    window.removeEventListener('touchend', _this4.handleWindowClick);
                    _this4.isWindowClickBinded = false;
                }
            }, 0);
        }
    }]);

    return Notification;
}(_react2.default.Component), _class3.propTypes = {
    /** Тип компонента */
    status: _propTypes2.default.oneOf(['error', 'fail', 'ok']),
    /** Управление видимостью компонента */
    visible: _propTypes2.default.bool,
    /** Отступ от верхнего края */
    offset: _propTypes2.default.number,
    /** К какому краю прижат попап */
    stickTo: _propTypes2.default.oneOf(['left', 'right']),
    /** Управляет отображением кнопки закрытия уведомления */
    hasCloser: _propTypes2.default.bool,
    /** Дочерние элементы `Notification` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Заголовок сообщения */
    title: _propTypes2.default.node,
    /** Замена стандартной иконки */
    icon: _propTypes2.default.node,
    /** Время до закрытия компонента */
    autoCloseDelay: _propTypes2.default.number,
    /** Управление возможностью закрытия компонента по клику вне его */
    outsideClickClosable: _propTypes2.default.bool,
    /** Обработчик события истечения времени до закрытия компонента */
    onCloseTimeout: _propTypes2.default.func,
    /** Обработчик клика по крестику компонента */
    onCloserClick: _propTypes2.default.func,
    /** Обработчик события наведения курсора на попап */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с попапа */
    onMouseLeave: _propTypes2.default.func,
    /** Обработчик клика вне компонента */
    onClickOutside: _propTypes2.default.func,
    /** Обработчик клика по компоненту */
    onClick: _propTypes2.default.func
}, _class3.defaultProps = {
    autoCloseDelay: 5000,
    stickTo: 'left',
    offset: 0,
    hasCloser: true
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleCloserClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCloserClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleWindowClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleWindowClick'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Notification;
//# sourceMappingURL=notification.js.map
