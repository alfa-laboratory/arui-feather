'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dropdown = require('../dropdown/dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _link = require('../link/link');

var _link2 = _interopRequireDefault(_link);

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
 * Компонент элемента меню. Как правило, используется совместно с `Menu`.
 */
var MenuItem = (_dec = (0, _cn2.default)('menu-item'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(MenuItem, _React$Component);

    function MenuItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MenuItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            hovered: false,
            focused: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            var content = this.props.children || this.props.value;
            var itemElement = void 0;
            var menuItemProps = {
                ref: function ref(root) {
                    _this2.root = root;
                }
            };

            switch (this.props.type) {
                case 'dropdown':
                    itemElement = _react2.default.createElement(_dropdown2.default, {
                        ref: function ref(control) {
                            _this2.control = control;
                        },
                        className: cn('control') + ' ' + cn('dropdown'),
                        size: this.props.size,
                        opened: this.state.hovered,
                        switcherType: 'link',
                        switcherText: content,
                        popupContent: this.props.popup,
                        popupProps: {
                            directions: ['bottom-left'],
                            target: 'anchor'
                        },
                        mode: 'hover',
                        onSwitcherClick: this.handleClick,
                        onSwitcherMouseEnter: this.handleMouseEnter,
                        onSwitcherMouseLeave: this.handleMouseLeave
                    });
                    break;
                case 'block':
                    menuItemProps = {
                        ref: function ref(control) {
                            _this2.root = control;
                            _this2.control = control;
                        },
                        onClick: this.handleClick,
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave
                    };
                    itemElement = _react2.default.createElement(
                        'span',
                        { className: cn('control') },
                        content
                    );

                    break;
                case 'link':
                default:
                    itemElement = _react2.default.createElement(_link2.default, {
                        ref: function ref(control) {
                            _this2.control = control;
                        },
                        className: cn('control') + ' ' + cn('link'),
                        size: this.props.size,
                        pseudo: this.props.view === 'pseudo',
                        disabled: this.props.disabled,
                        checked: this.props.checked,
                        text: content,
                        url: this.props.url,
                        target: this.props.target,
                        onClick: this.handleClick,
                        onFocus: this.handleFocus,
                        onBlur: this.handleBlur,
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave
                    });
                    break;
            }

            return _react2.default.createElement(
                'div',
                _extends({
                    className: cn({
                        disabled: this.props.disabled,
                        checked: this.props.checked,
                        hidden: this.props.hidden,
                        type: this.props.type,
                        hovered: this.props.hovered === undefined ? this.state.hovered : this.props.hovered,
                        focused: this.state.focused
                    })
                }, menuItemProps),
                itemElement
            );
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.disabled) {
                event.preventDefault();
                return;
            }

            if (this.props.onClick) {
                this.props.onClick(event);
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            this.setState({ focused: true });

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            this.setState({ focused: false });

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter(event) {
            this.setState({ hovered: true });

            if (this.props.onMouseEnter) {
                this.props.onMouseEnter(event);
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave(event) {
            this.setState({ hovered: false });

            if (this.props.onMouseLeave) {
                this.props.onMouseLeave(event);
            }
        }

        /**
         * Возвращает корневой `HTMLElement` компонента.
         *
         * @public
         * @returns {HTMLElement}
         */

    }, {
        key: 'getNode',
        value: function getNode() {
            return this.root;
        }

        /**
         * Устанавливает фокус на элементе меню.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.control.focus();
        }

        /**
         * Убирает фокус с элемента меню.
         *
         * @public
         */

    }, {
        key: 'blur',
        value: function blur() {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }
    }]);

    return MenuItem;
}(_react2.default.Component), _class3.propTypes = {
    /** Тип элемента меню */
    type: _propTypes2.default.oneOf(['link', 'dropdown', 'block']),
    /** Тип ссылки, для компонента с type='link' */
    view: _propTypes2.default.oneOf(['default', 'link', 'pseudo']),
    /** href ссылки, для компонента с type='link' */
    url: _propTypes2.default.string,
    /** target для ссылки */
    target: _propTypes2.default.oneOf(['_self', '_blank', '_parent', '_top']),
    /** Уникальное значение элемента. Для использования в Menu */
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    /** Попап для компонента с type='dropdown' */
    popup: _propTypes2.default.node,
    /** Управление возможностью выбирать данный компонент */
    disabled: _propTypes2.default.bool,
    /** Управление состоянием выбран/не выбран компонента */
    checked: _propTypes2.default.bool,
    /** Управление видимостью компонента */
    hidden: _propTypes2.default.bool,
    /** Управление визуальным выделением компонента */
    hovered: _propTypes2.default.bool,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Дочерние элементы `MenuItem` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Только для type='link', обработчик клика по компоненту */
    onClick: _propTypes2.default.func,
    /** Обработчик фокуса компонента */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса компонента */
    onBlur: _propTypes2.default.func,
    /** Обработчик события наведения курсора на элемент меню */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с элемента меню */
    onMouseLeave: _propTypes2.default.func
}, _class3.defaultProps = {
    type: 'link'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = MenuItem;
//# sourceMappingURL=menu-item.js.map
