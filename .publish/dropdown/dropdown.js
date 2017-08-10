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

var _button = require('../button/button');

var _button2 = _interopRequireDefault(_button);

var _link = require('../link/link');

var _link2 = _interopRequireDefault(_link);

var _popup = require('../popup/popup');

var _popup2 = _interopRequireDefault(_popup);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

var _vars = require('../vars');

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
 * Компонент «выпадашка»: ссылка или кнопка. По клику показывается Popup.
 */
var Dropdown = (_dec = (0, _cn2.default)('dropdown'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Dropdown, _React$Component);

    function Dropdown() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Dropdown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            opened: false,
            switcherHovered: false,
            popupHovered: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Dropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.popup.setTarget(this.switcher.getNode());
        }
    }, {
        key: 'render',
        value: function render(cn) {
            return _react2.default.createElement(
                'div',
                { className: cn },
                this.renderSwitcher(cn),
                this.renderPopup(cn)
            );
        }
    }, {
        key: 'renderSwitcher',
        value: function renderSwitcher(cn) {
            var content = this.props.children || this.props.switcherText;
            var opened = this.props.opened !== undefined ? this.props.opened : this.state.opened;

            return this.props.switcherType === 'button' ? this.renderSwitcherButton(cn, content, opened) : this.renderSwitcherLink(cn, content);
        }
    }, {
        key: 'renderSwitcherButton',
        value: function renderSwitcherButton(cn, content, opened) {
            var _this2 = this;

            return _react2.default.createElement(
                _button2.default,
                {
                    className: cn('switcher'),
                    size: this.props.size,
                    ref: function ref(switcher) {
                        _this2.switcher = switcher;
                    },
                    disabled: this.props.disabled,
                    togglable: this.props.togglable,
                    checked: this.props.togglable === 'check' && opened,
                    onClick: !this.props.disabled ? this.handleSwitcherClick : undefined,
                    onMouseEnter: this.handleSwitcherMouseEnter,
                    onMouseLeave: this.handleSwitcherMouseLeave
                },
                content
            );
        }
    }, {
        key: 'renderSwitcherLink',
        value: function renderSwitcherLink(cn, content) {
            var _this3 = this;

            return _react2.default.createElement(_link2.default, {
                className: cn('switcher'),
                size: this.props.size,
                ref: function ref(switcher) {
                    _this3.switcher = switcher;
                },
                disabled: this.props.disabled,
                pseudo: true,
                text: content,
                onClick: !this.props.disabled ? this.handleSwitcherClick : undefined,
                onMouseEnter: this.handleSwitcherMouseEnter,
                onMouseLeave: this.handleSwitcherMouseLeave
            });
        }
    }, {
        key: 'renderPopup',
        value: function renderPopup(cn) {
            var _this4 = this;

            var mainOffset = void 0;
            var opened = this.props.opened !== undefined ? this.props.opened : this.state.opened;

            if (this.props.popupProps === undefined || this.props.popupProps && this.props.popupProps.type !== 'tooltip') {
                switch (this.props.size) {
                    case 's':
                    case 'm':
                        mainOffset = _vars.POPUP_MAIN_OFFSET / 2;break;
                    case 'l':
                    case 'xl':
                        mainOffset = _vars.POPUP_MAIN_OFFSET;break;
                }
            }

            var popupProps = _extends({
                className: cn('popup'),
                size: this.props.size,
                autoclosable: true,
                mainOffset: mainOffset
            }, this.props.popupProps);

            return _react2.default.createElement(
                _popup2.default,
                _extends({}, popupProps, {
                    ref: function ref(popup) {
                        _this4.popup = popup;
                    },
                    visible: !this.props.disabled && opened || this.props.mode === 'hover' && (this.state.switcherHovered || this.state.popupHovered),
                    target: 'anchor',
                    onMouseEnter: this.handlePopupMouseEnter,
                    onMouseLeave: this.handlePopupMouseLeave,
                    onClickOutside: this.handlePopupClickOutside
                }),
                this.props.popupContent
            );
        }
    }, {
        key: 'handleSwitcherClick',
        value: function handleSwitcherClick() {
            var newOpenedStatusValue = this.props.opened !== undefined ? !this.props.opened : !this.state.opened;

            this.setState({
                opened: newOpenedStatusValue
            });

            if (this.props.onSwitcherClick) {
                this.props.onSwitcherClick(newOpenedStatusValue);
            }
        }
    }, {
        key: 'handleSwitcherMouseEnter',
        value: function handleSwitcherMouseEnter() {
            this.setState({ switcherHovered: true });

            if (this.props.onSwitcherMouseEnter) {
                this.props.onSwitcherMouseEnter();
            }
        }
    }, {
        key: 'handleSwitcherMouseLeave',
        value: function handleSwitcherMouseLeave() {
            this.setState({ switcherHovered: false });

            if (this.props.onSwitcherMouseLeave) {
                this.props.onSwitcherMouseLeave();
            }
        }
    }, {
        key: 'handlePopupMouseEnter',
        value: function handlePopupMouseEnter() {
            this.setState({ popupHovered: true });

            if (this.props.onPopupMouseEnter) {
                this.props.onPopupMouseEnter();
            }
        }
    }, {
        key: 'handlePopupMouseLeave',
        value: function handlePopupMouseLeave() {
            this.setState({ popupHovered: false });

            if (this.props.onPopupMouseLeave) {
                this.props.onPopupMouseLeave();
            }
        }
    }, {
        key: 'handlePopupClickOutside',
        value: function handlePopupClickOutside() {
            this.setState({ opened: false });

            if (this.props.onPopupClickOutside) {
                this.props.onPopupClickOutside();
            }
        }
    }]);

    return Dropdown;
}(_react2.default.Component), _class3.propTypes = {
    /** Тип компонента */
    switcherType: _propTypes2.default.oneOf(['link', 'button']),
    /** Текст кнопки компонента */
    switcherText: _propTypes2.default.node,
    /** Компонент [Popup](../popup/) */
    popupContent: _propTypes2.default.node,
    /** Свойства для компонента [Popup](../popup/) */
    popupProps: _propTypes2.default.shape({
        className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
        type: _propTypes2.default.oneOf(['default', 'tooltip']),
        height: _propTypes2.default.oneOf(['default', 'available', 'adaptive']),
        directions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'])),
        target: _propTypes2.default.oneOf(['anchor', 'position']),
        mainOffset: _propTypes2.default.number,
        secondaryOffset: _propTypes2.default.number,
        fitContaiterOffset: _propTypes2.default.number,
        invalid: _propTypes2.default.bool,
        visible: _propTypes2.default.bool,
        autoclosable: _propTypes2.default.bool,
        padded: _propTypes2.default.bool,
        size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
        theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
        onMouseEnter: _propTypes2.default.func,
        onMouseLeave: _propTypes2.default.func,
        onClickOutside: _propTypes2.default.func,
        minWidth: _propTypes2.default.number,
        maxWidth: _propTypes2.default.number
    }),
    /** Управление возможностью отображать попап при наведении курсора */
    mode: _propTypes2.default.oneOf(['hover', 'normal']),
    /** Управление возможностью открытия попапа */
    disabled: _propTypes2.default.bool,
    /** Управление состоянием открыт/закрыт попапа */
    opened: _propTypes2.default.bool,
    /** Только для switcherType='button'. Тип переключателя для кнопки, 'check' */
    togglable: _propTypes2.default.oneOf(['button', 'check']),
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Дочерние элементы `Dropdown` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик клика по кнопке компонента */
    onSwitcherClick: _propTypes2.default.func,
    /** Обработчик события наведения курсора на кнопку компонента */
    onSwitcherMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с кнопки компонента */
    onSwitcherMouseLeave: _propTypes2.default.func,
    /** Обработчик события наведения курсора на попап */
    onPopupMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с попапа */
    onPopupMouseLeave: _propTypes2.default.func,
    /** Обработчик события клика попапа за пределами попапа */
    onPopupClickOutside: _propTypes2.default.func
}, _class3.defaultProps = {
    switcherType: 'link',
    switcherText: 'Switcher',
    disabled: false,
    size: 'm'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleSwitcherClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleSwitcherClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleSwitcherMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleSwitcherMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleSwitcherMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleSwitcherMouseLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handlePopupMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handlePopupMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handlePopupMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handlePopupMouseLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handlePopupClickOutside', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handlePopupClickOutside'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Dropdown;
//# sourceMappingURL=dropdown.js.map
