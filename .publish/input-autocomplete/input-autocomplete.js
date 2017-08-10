'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/prop-types: 0 */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _input = require('../input/input');

var _input2 = _interopRequireDefault(_input);

var _menu = require('../menu/menu');

var _menu2 = _interopRequireDefault(_menu);

var _popup = require('../popup/popup');

var _popup2 = _interopRequireDefault(_popup);

var _resizeSensor = require('../resize-sensor/resize-sensor');

var _resizeSensor2 = _interopRequireDefault(_resizeSensor);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _keyboardCode = require('../lib/keyboard-code');

var _keyboardCode2 = _interopRequireDefault(_keyboardCode);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

var _scrollTo = require('../lib/scroll-to');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

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
 * Компонент поля для ввода с автокомплитом.
 *
 * @extends Input
 */
var InputAutocomplete = (_dec = (0, _cn2.default)('input', _input2.default), _dec2 = (0, _performance2.default)(true), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(InputAutocomplete, _React$Component);

    function InputAutocomplete() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InputAutocomplete);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputAutocomplete.__proto__ || Object.getPrototypeOf(InputAutocomplete)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            value: '',
            inputFocused: false,
            menuFocused: false,
            popupStyles: {},
            highlightedItem: null
        }, _this.blurTimeout = null, _this.inputFocusTimeout = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {Input}
     */


    /**
     * @type {Popup}
     */


    /**
     * @type {Menu}
     */


    /**
     * @type {Number}
     */


    /**
     * @type {Number}
     */


    _createClass(InputAutocomplete, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.popup) {
                this.popup.setTarget(this.input.getBoxNode());
            }

            this.updatePopupStyles();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.popup) {
                this.popup.setTarget(this.input.getNode());
            }
            this.updatePopupStyles();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.blurTimeout) {
                clearTimeout(this.blurTimeout);
                this.blurTimeout = null;
            }

            if (this.inputFocusTimeout) {
                clearTimeout(this.inputFocusTimeout);
                this.inputFocusTimeout = null;
            }
        }
    }, {
        key: 'render',
        value: function render(cn, Input) {
            var _this2 = this;

            var value = this.props.value !== undefined ? this.props.value : this.state.value;

            var props = _extends({}, this.props, {
                ref: function ref(input) {
                    _this2.input = input;
                },
                className: cn({
                    focused: this.state.inputFocused || this.state.menuFocused,
                    'has-autocomplete': true
                }),
                value: value,
                onChange: this.handleChange,
                onFocus: this.handleInputFocus,
                onBlur: this.handleInputBlur,
                onKeyDown: this.handleKeyDown
            });

            return _react2.default.createElement(
                'div',
                {
                    className: cn('autocomplete-case', { width: this.props.width })
                },
                _react2.default.createElement(Input, props),
                this.renderPopup(cn)
            );
        }
    }, {
        key: 'renderPopup',
        value: function renderPopup(cn) {
            var _this3 = this;

            var formattedOptionsList = this.props.options ? this.formatOptionsList(this.props.options) : [];

            var opened = this.props.opened !== undefined ? this.props.opened : this.state.inputFocused || this.state.menuFocused;

            if (this.props.options.length === 0) {
                this.popup = null;
                return null;
            }

            return [_react2.default.createElement(_resizeSensor2.default, { onResize: this.updatePopupStyles, key: 'popup-sensor' }), _react2.default.createElement(
                _popup2.default,
                {
                    className: cn('popup'),
                    size: this.props.size,
                    ref: function ref(popup) {
                        _this3.popup = popup;
                    },
                    'for': this.props.name,
                    visible: opened,
                    autoclosable: true,
                    onClickOutside: this.handleClickOutside,
                    target: 'anchor',
                    directions: this.props.directions,
                    height: 'adaptive',
                    padded: false,
                    minWidth: this.state.popupStyles.minWidth,
                    maxWidth: this.state.popupStyles.maxWidth,
                    key: 'popup'
                },
                _react2.default.createElement(_menu2.default, {
                    ref: function ref(menu) {
                        _this3.menu = menu;
                    },
                    className: cn('menu'),
                    size: this.props.size,
                    mode: 'radio-check',
                    content: formattedOptionsList,
                    checkedItems: [],
                    onItemCheck: this.handleItemCheck,
                    autoFocusFirstItem: true,
                    highlightedItem: this.state.highlightedItem,
                    onHighlightItem: this.handleHighlightedItem,
                    onFocus: this.handleMenuFocus,
                    onBlur: this.handleMenuBlur,
                    onKeyDown: this.handleMenuKeyDown
                })
            )];
        }
    }, {
        key: 'handleItemCheck',
        value: function handleItemCheck(checkedItemsValues) {
            var _this4 = this;

            var checkedItemValue = checkedItemsValues.length ? checkedItemsValues[0] : this.state.checkedItemValue;
            var checkedItem = this.getCheckedOption(this.props.options, checkedItemValue);

            var newValue = checkedItem ? checkedItem.text || checkedItem.value : this.state.value;

            if (this.props.onItemSelect) {
                this.props.onItemSelect(checkedItem);
            }

            if (this.props.updateValueOnItemSelect) {
                this.setState({ value: newValue });

                if (this.props.onChange) {
                    this.props.onChange(newValue);
                }
            }

            if (this.inputFocusTimeout) {
                clearTimeout(this.inputFocusTimeout);
            }

            this.inputFocusTimeout = setTimeout(function () {
                return _this4.input.focus();
            }, 0);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(value) {
            this.setState({ value: value });

            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }, {
        key: 'handleInputFocus',
        value: function handleInputFocus(event) {
            if (this.blurTimeout) {
                clearTimeout(this.blurTimeout);
                this.blurTimeout = null;
            }

            this.solveFocused(event);

            this.setState({
                highlightedItem: null
            });
        }
    }, {
        key: 'handleInputBlur',
        value: function handleInputBlur(event) {
            var _this5 = this;

            if (this.blurTimeout) {
                clearTimeout(this.blurTimeout);
            }

            event.persist();

            this.blurTimeout = setTimeout(function () {
                _this5.solveFocused(event);
                _this5.blurTimeout = null;
            }, 0);
        }
    }, {
        key: 'handleMenuFocus',
        value: function handleMenuFocus(event) {
            if (this.blurTimeout) {
                clearTimeout(this.blurTimeout);
                this.blurTimeout = null;
            }

            this.solveFocused(event);
        }
    }, {
        key: 'handleMenuBlur',
        value: function handleMenuBlur(event) {
            var _this6 = this;

            if (this.blurTimeout) {
                clearTimeout(this.blurTimeout);
            }

            event.persist();

            this.blurTimeout = setTimeout(function () {
                _this6.solveFocused(event);
                _this6.blurTimeout = null;
            }, 0);
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside() {
            if (this.props.onClickOutside) {
                this.props.onClickOutside();
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            switch (event.which) {
                case _keyboardCode2.default.DOWN_ARROW:
                    {
                        event.preventDefault();

                        var posX = window.pageXOffset;
                        var posY = window.pageYOffset;

                        if (this.menu) {
                            this.menu.focus();
                        }

                        window.scrollTo(posX, posY);

                        break;
                    }

                case _keyboardCode2.default.ESCAPE:
                    {
                        this.input.blur();
                        break;
                    }
            }

            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleHighlightedItem',
        value: function handleHighlightedItem(highlightedItem) {
            this.setState({
                highlightedItem: highlightedItem
            });
        }
    }, {
        key: 'handleMenuKeyDown',
        value: function handleMenuKeyDown(event, highlightedItem) {
            switch (event.which) {
                case _keyboardCode2.default.DOWN_ARROW:
                case _keyboardCode2.default.UP_ARROW:
                    event.preventDefault();
                    this.syncKeyboardNavigationWithScroll(highlightedItem);
                    break;

                case _keyboardCode2.default.ESCAPE:
                    this.input.focus();
                    break;
            }

            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
        }

        /**
         * Устанавливает фокус на поле ввода.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }

        /**
         * Убирает фокус с поля ввода.
         *
         * @public
         */

    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }

        /**
         * Скроллит страницу до поля ввода.
         *
         * @public
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            this.input.scrollTo();
        }

        /**
         * Определяет является ли весь компонент в фокусе на событиях onFocus/onBlur.
         *
         * @param {SyntheticEvent} event Событие focus/blur, которое будет проброшено в обработчик onFocus/onBlur
         */

    }, {
        key: 'solveFocused',
        value: function solveFocused(event) {
            var currentFocused = this.state.inputFocused || this.state.menuFocused;

            var focusedElement = document.activeElement;

            var newState = {
                inputFocused: focusedElement === this.input.getControl(),
                menuFocused: this.menu ? this.menu.getNode() === focusedElement || this.menu.getNode().contains(focusedElement) : false
            };

            var newFocused = newState.inputFocused || newState.menuFocused;

            if (currentFocused !== newFocused) {
                if (newFocused) {
                    if (this.props.onFocus) {
                        this.props.onFocus(event);
                    }
                } else if (this.props.onBlur) {
                    this.props.onBlur(event);
                }
            }

            this.setState(newState);
        }
    }, {
        key: 'formatOptionsList',
        value: function formatOptionsList(options) {
            var _this7 = this;

            return options.map(function (option) {
                if (option.type === 'group' && !!option.content) {
                    var content = _this7.formatOptionsList(option.content);

                    return {
                        type: 'group',
                        title: option.title,
                        content: content
                    };
                }

                return {
                    key: option.key || option.value,
                    value: option.value,
                    content: option.description || option.value
                };
            });
        }
    }, {
        key: 'getCheckedOption',
        value: function getCheckedOption(options, value) {
            var _this8 = this;

            var result = null;

            options.find(function (option) {
                if (option.type === 'group' && !!option.content) {
                    var findInGroup = _this8.getCheckedOption(option.content, value);
                    if (findInGroup) {
                        result = findInGroup;
                        return true;
                    }
                } else if (option.value === value) {
                    result = option;
                    return true;
                }

                return false;
            });

            return result;
        }
    }, {
        key: 'updatePopupStyles',
        value: function updatePopupStyles() {
            var input = this.input.getNode();
            var inputWidth = input.getBoundingClientRect().width;
            var popupStyles = { minWidth: inputWidth };

            if (this.props.equalPopupWidth) {
                popupStyles.maxWidth = inputWidth;
            }

            this.setState({
                popupStyles: popupStyles
            });
        }

        /**
         * @param {MenuItem} highlightedItem Выбранный пункт меню
         */

    }, {
        key: 'syncKeyboardNavigationWithScroll',
        value: function syncKeyboardNavigationWithScroll(highlightedItem) {
            var element = highlightedItem.getNode();
            var container = this.popup.getInnerNode();
            var correction = element.offsetHeight;

            if (element.offsetTop + correction > container.scrollTop + container.offsetHeight) {
                (0, _scrollTo2.default)({
                    container: container,
                    targetY: element.offsetTop,
                    duration: _vars.SCROLL_TO_NORMAL_DURATION
                });
            } else if (element.offsetTop < container.scrollTop) {
                (0, _scrollTo2.default)({
                    container: container,
                    targetY: element.offsetTop - container.offsetHeight + correction,
                    duration: _vars.SCROLL_TO_NORMAL_DURATION
                });
            }
        }
    }]);

    return InputAutocomplete;
}(_react2.default.Component), _class3.propTypes = _extends({}, _input2.default.propTypes, {
    /** Список вариантов выбора */
    options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        /** Тип списка вариантов */
        type: _propTypes2.default.oneOf(['item', 'group']),
        /** Уникальное значение, которое будет отправлено на сервер, если вариант выбран */
        value: _propTypes2.default.string,
        /** Отображение варианта */
        description: _propTypes2.default.node,
        /** Текст, который должен быть записан в текстовое поле при выборе варианта */
        text: _propTypes2.default.string,
        /** Список вариантов, только для type='group' */
        content: _propTypes2.default.array
    })),
    /** Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления */
    disabled: _propTypes2.default.bool,
    /** Управление видимостью выпадающего списка */
    opened: _propTypes2.default.bool,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Управление возможностью компонента занимать всю ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Ширинa выпадающего списка равна ширине инпута */
    equalPopupWidth: _propTypes2.default.bool,
    /** Определяет нужно или нет обновлять значение текстового поля при выборе варианта */
    updateValueOnItemSelect: _propTypes2.default.bool,
    /** Направления, в которые может открываться попап компонента */
    directions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'])),
    /** Обработчик выбора пункта в выпадающем меню */
    onItemSelect: _propTypes2.default.func
}), _class3.defaultProps = {
    disabled: false,
    size: 'm',
    width: 'default',
    options: [],
    updateValueOnItemSelect: true,
    directions: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    equalPopupWidth: false
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleItemCheck', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleItemCheck'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleInputFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleInputFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleInputBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleInputBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMenuFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMenuFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMenuBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMenuBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleClickOutside', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClickOutside'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleHighlightedItem', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleHighlightedItem'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMenuKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMenuKeyDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updatePopupStyles', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'updatePopupStyles'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = InputAutocomplete;
//# sourceMappingURL=input-autocomplete.js.map
