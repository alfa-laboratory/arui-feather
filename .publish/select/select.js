'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _dec3, _class2, _desc, _value, _class3, _class4, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('../button/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _menu = require('../menu/menu');

var _menu2 = _interopRequireDefault(_menu);

var _mq = require('../mq/mq');

var _mq2 = _interopRequireDefault(_mq);

var _popup = require('../popup/popup');

var _popup2 = _interopRequireDefault(_popup);

var _popupHeader = require('../popup-header/popup-header');

var _popupHeader2 = _interopRequireDefault(_popupHeader);

var _resizeSensor = require('../resize-sensor/resize-sensor');

var _resizeSensor2 = _interopRequireDefault(_resizeSensor);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _propTypes3 = require('../lib/prop-types');

var _keyboardCode = require('../lib/keyboard-code');

var _keyboardCode2 = _interopRequireDefault(_keyboardCode);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

var _scrollTo2 = require('../lib/scroll-to');

var _scrollTo3 = _interopRequireDefault(_scrollTo2);

var _vars = require('../vars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Элемент кнопки для выпадающего списка.
 */
var SelectButton = (_dec = (0, _cn2.default)('select-button'), _dec(_class = function (_Button) {
    _inherits(SelectButton, _Button);

    function SelectButton() {
        _classCallCheck(this, SelectButton);

        return _possibleConstructorReturn(this, (SelectButton.__proto__ || Object.getPrototypeOf(SelectButton)).apply(this, arguments));
    }

    return SelectButton;
}(_button2.default)) || _class);

/**
 * @typedef {Object} CheckedOption
 * @property {String} value Уникальное значение, которое будет отправлено на сервер, если вариант выбран
 * @property {String} text Текст варианта
 * @property {String} checkedText Текст, который будет отображаться при выборе
 * @property {Icon} icon Иконка варианта
 */

/**
 * Компонент выпадающего списка.
 */

var Select = (_dec2 = (0, _cn2.default)('select', SelectButton, _popup2.default), _dec3 = (0, _performance2.default)(true), _dec2(_class2 = _dec3(_class2 = (_class3 = (_temp2 = _class4 = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, Select);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
            buttonFocused: false,
            hasGroup: false,
            nativeFocused: false,
            isMobile: false,
            opened: !!_this2.props.opened,
            popupStyles: {},
            value: _this2.props.value || []
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    /**
     * @type {HTMLDivElement}
     */


    /**
     * @type {Button}
     */


    /**
     * @type {Popup}
     */


    /**
     * @type {Menu}
     */


    _createClass(Select, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                hasGroup: this.props.options.some(function (option) {
                    return !!(option.type === 'group' && !!option.content);
                })
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.popup.setTarget(this.button.getNode());
            this.updatePopupStyles();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.opened && nextProps.disabled) {
                this.toggleOpened();
            }

            this.setState({
                hasGroup: this.props.options.some(function (option) {
                    return !!(option.type === 'group' && !!option.content);
                })
            });
        }
    }, {
        key: 'render',
        value: function render(cn, SelectButton, Popup) {
            var _this3 = this;

            var value = this.getValue();

            return _react2.default.createElement(
                'div',
                {
                    className: cn({
                        mode: this.props.mode,
                        size: this.props.size,
                        width: this.props.width,
                        disabled: this.props.disabled,
                        checked: this.props.mode !== 'radio' && value.length > 0,
                        focused: this.getFocused(),
                        'has-label': !!this.props.label,
                        'has-value': !!value,
                        invalid: !!this.props.error
                    }),
                    ref: function ref(root) {
                        _this3.root = root;
                    }
                },
                _react2.default.createElement(
                    'span',
                    { className: cn('inner') },
                    _react2.default.createElement('input', {
                        id: this.props.id,
                        name: this.props.name,
                        type: 'hidden',
                        value: value
                    }),
                    !!this.props.label && _react2.default.createElement(
                        'span',
                        { className: cn('top') },
                        this.props.label
                    ),
                    this.renderButton(cn, SelectButton),
                    _react2.default.createElement(
                        _mq2.default,
                        {
                            query: '--small-only',
                            touch: true,
                            onMatchChange: this.handleMqMatchChange
                        },
                        this.props.mobileMenuMode === 'native' && this.renderNativeSelect(cn)
                    ),
                    (this.props.error || this.props.hint) && _react2.default.createElement(
                        'span',
                        { className: cn('sub') },
                        this.props.error || this.props.hint
                    ),
                    this.renderPopup(cn, Popup)
                )
            );
        }
    }, {
        key: 'renderButton',
        value: function renderButton(cn, SelectButton) {
            var _this4 = this;

            return _react2.default.createElement(SelectButton, {
                ref: function ref(button) {
                    _this4.button = button;
                },
                size: this.props.size,
                disabled: this.props.disabled,
                text: this.renderButtonContent(),
                rightAddons: [_react2.default.createElement(_icon2.default, {
                    key: 'addon-icon',
                    className: cn('tick')
                }), _react2.default.createElement(_resizeSensor2.default, { key: 'addon-sensor', onResize: this.updatePopupStyles })],
                onClick: this.handleButtonClick,
                onFocus: this.handleButtonFocus,
                onBlur: this.handleButtonBlur
            });
        }
    }, {
        key: 'renderNativeSelect',
        value: function renderNativeSelect(cn) {
            var _this5 = this;

            var isCheckMode = this.props.mode === 'check';
            var hasEmptyOptGroup = isCheckMode || this.state.hasGroup;
            var hasEmptyOption = !isCheckMode && !this.state.hasGroup;
            var value = this.getValue();

            if (!isCheckMode) {
                value = value.length ? value[0] : '';
            }

            return _react2.default.createElement(
                'select',
                {
                    ref: function ref(nativeSelect) {
                        _this5.nativeSelect = nativeSelect;
                    },
                    className: cn('native-control'),
                    disabled: this.props.disabled,
                    multiple: isCheckMode && 'multiple',
                    value: value,
                    onChange: this.handleNativeOptionCheck,
                    onClick: this.handleNativeClick,
                    onFocus: this.handleNativeFocus,
                    onBlur: this.handleNativeBlur
                },

                /*
                    Хак с пустым <optgroup> — для фикса странного поведения select с атрибутом multiple на iOS7+:
                    1. If no option is selected, it selects the first option in the list.
                    2. If one option is selected, it deselects that option.
                    3. If multiple options are selected, it deselects the last option to be tapped.
                    4. If an option previously selected is deselected, it reselects the option.
                    https://discussions.apple.com/message/23745665
                    https://discussions.apple.com/message/24694954
                */
                hasEmptyOptGroup && _react2.default.createElement('optgroup', {
                    disabled: true,
                    label: this.props.placeholder
                }),
                hasEmptyOption && _react2.default.createElement(
                    'option',
                    { disabled: true, value: '' },
                    this.props.placeholder
                ),
                this.renderNativeOptionsList(this.props.options)
            );
        }
    }, {
        key: 'renderPopup',
        value: function renderPopup(cn, Popup) {
            var _this6 = this;

            var optionsList = this.renderOptionsList(this.props.options);
            var opened = this.getOpened();
            var value = this.getValue();

            return _react2.default.createElement(
                Popup,
                {
                    key: 'popup',
                    ref: function ref(popup) {
                        _this6.popup = popup;
                    },
                    'for': this.props.name,
                    autoclosable: true,
                    className: cn('popup'),
                    directions: this.props.directions,
                    height: 'adaptive',
                    padded: false,
                    size: this.props.size,
                    target: this.state.isMobile ? 'screen' : 'anchor',
                    header: this.state.isMobile && this.renderMobileHeader(cn),
                    visible: opened,
                    onClickOutside: this.handleClickOutside,
                    minWidth: this.state.popupStyles.minWidth,
                    maxWidth: this.state.popupStyles.maxWidth
                },
                _react2.default.createElement(_menu2.default, {
                    ref: function ref(menu) {
                        _this6.menu = menu;
                    },
                    className: cn('menu'),
                    size: this.props.size,
                    disabled: this.props.disabled,
                    mode: this.props.mode,
                    groupView: this.props.groupView,
                    content: optionsList,
                    onItemCheck: this.handleOptionCheck,
                    checkedItems: value,
                    onFocus: this.handleMenuFocus,
                    onBlur: this.handleMenuBlur,
                    onKeyDown: this.handleMenuKeyDown
                })
            );
        }
    }, {
        key: 'renderOptionsList',
        value: function renderOptionsList(options) {
            var _this7 = this;

            return options.map(function (option) {
                if (option.type === 'group' && !!option.content) {
                    var _content = _this7.renderOptionsList(option.content);

                    return {
                        type: 'group',
                        title: option.title,
                        content: _content
                    };
                }

                var content = option.description || option.text;

                return {
                    value: option.value,
                    content: (0, _reactAddonsCreateFragment2.default)({ icon: option.icon, content: content })
                };
            });
        }
    }, {
        key: 'renderNativeOptionsList',
        value: function renderNativeOptionsList(options) {
            var _this8 = this;

            var groupKey = 0;

            return options.map(function (option) {
                if (option.type === 'group' && !!option.content) {
                    var content = _this8.renderNativeOptionsList(option.content);

                    groupKey += 1;

                    return _react2.default.createElement(
                        'optgroup',
                        {
                            key: 'group_' + groupKey,
                            label: option.title
                        },
                        content
                    );
                }

                return _react2.default.createElement(
                    'option',
                    {
                        key: option.value,
                        value: option.value
                    },
                    option.nativeText || option.text
                );
            });
        }
    }, {
        key: 'renderButtonContent',
        value: function renderButtonContent() {
            var checkedItems = this.getCheckedItems(this.props.options);

            if (this.props.renderButtonContent) {
                return this.props.renderButtonContent(checkedItems);
            }

            var checkedItemsText = checkedItems.map(function (item) {
                return item.checkedText || item.text;
            }).join(', ');
            return checkedItemsText || this.props.placeholder;
        }
    }, {
        key: 'renderMobileHeader',
        value: function renderMobileHeader(cn) {
            return _react2.default.createElement(_popupHeader2.default, {
                className: cn('mobile-header'),
                size: this.props.size,
                title: this.props.mobileTitle || this.props.placeholder,
                onCloseClick: this.handlePopupCloseClick
            });
        }
    }, {
        key: 'handleButtonClick',
        value: function handleButtonClick(event) {
            if (!this.props.disabled) {
                this.toggleOpened();
            }

            if (this.props.onClick) {
                this.props.onClick(event);
            }
        }
    }, {
        key: 'handleButtonKeyDown',
        value: function handleButtonKeyDown(event) {
            if (!this.props.disabled) {
                if (event.which === _keyboardCode2.default.ENTER || event.which === _keyboardCode2.default.SPACE) {
                    this.toggleOpened();
                }
            }

            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleButtonFocus',
        value: function handleButtonFocus(event) {
            this.setState({ buttonFocused: true });

            if (this.props.onButtonFocus) {
                this.props.onButtonFocus(this.getRevisedEvent(event));
            }
        }
    }, {
        key: 'handleButtonBlur',
        value: function handleButtonBlur(event) {
            this.setState({ buttonFocused: false });

            if (this.props.onButtonBlur) {
                this.props.onButtonBlur(this.getRevisedEvent(event));
            }
        }
    }, {
        key: 'handleMenuFocus',
        value: function handleMenuFocus(event) {
            event.target.value = this.getValue();

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }

            if (this.props.onMenuFocus) {
                this.props.onMenuFocus(event);
            }
        }
    }, {
        key: 'handleMenuBlur',
        value: function handleMenuBlur(event) {
            this.setState({
                opened: false
            });

            event.target.value = this.getValue();

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }

            if (this.props.onMenuBlur) {
                this.props.onMenuBlur(event);
            }
        }
    }, {
        key: 'handleOptionCheck',
        value: function handleOptionCheck(value) {
            var _this9 = this;

            var opened = this.getOpened();

            this.setState({ value: value, opened: this.props.mode === 'check' }, function () {
                // Если у Select-а закрылось выпадающее меню,
                // то возвращаем фокус на кнопку Select
                // после выбора опции.
                var newOpened = _this9.getOpened();
                if (!newOpened && opened !== newOpened) {
                    _this9.button.focus();
                }
            });

            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }, {
        key: 'handleNativeOptionCheck',
        value: function handleNativeOptionCheck(event) {
            function getFlattenedPropOptions(options) {
                var result = [];

                options.forEach(function (option) {
                    if (option.type === 'group' && !!option.content) {
                        var findInGroup = getFlattenedPropOptions(option.content);
                        result = result.concat(findInGroup);
                    } else {
                        result.push(option);
                    }
                });

                return result;
            }

            var hasEmptyOption = this.props.mode !== 'check' && !this.state.hasGroup;
            var domOptions = Array.from(event.currentTarget.options).filter(function (option, index) {
                return !(hasEmptyOption && option.disabled && index === 0);
            });
            var flattenedPropOptions = getFlattenedPropOptions(this.props.options);
            var value = domOptions.reduce(function (result, item, index) {
                if (item.selected) {
                    result.push(flattenedPropOptions[index].value);
                }
                return result;
            }, []);

            if (this.props.mode === 'radio' || this.props.mode === 'radio-check') {
                this.blur();
            }

            this.setState({ value: value });

            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }, {
        key: 'handleNativeClick',
        value: function handleNativeClick(event) {
            if (this.props.onClick) {
                this.props.onClick(event);
            }
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside() {
            this.setState({
                opened: false
            });

            if (this.props.onClickOutside) {
                this.props.onClickOutside();
            }
        }
    }, {
        key: 'handleMenuKeyDown',
        value: function handleMenuKeyDown(event, highlightedItem) {
            var opened = this.getOpened();

            switch (event.which) {
                case _keyboardCode2.default.DOWN_ARROW:
                case _keyboardCode2.default.UP_ARROW:
                    event.preventDefault();
                    this.syncKeyboardNavigationWithScroll(highlightedItem);
                    break;
                case _keyboardCode2.default.ENTER:
                case _keyboardCode2.default.SPACE:
                    event.preventDefault();
                    this.setState({
                        opened: this.props.mode === 'check' ? true : !opened
                    });
                    this.focusOnMenu();
                    break;
                case _keyboardCode2.default.ESCAPE:
                    event.preventDefault();
                    this.setState({
                        opened: false
                    });
                    this.button.focus();
                    break;
            }

            if (this.props.onKeyDown) {
                this.props.onKeyDown(event);
            }
        }
    }, {
        key: 'handleNativeFocus',
        value: function handleNativeFocus(event) {
            this.setState({
                nativeFocused: true
            });

            if (this.props.onFocus) {
                this.props.onFocus(this.getRevisedEvent(event));
            }
        }
    }, {
        key: 'handleNativeBlur',
        value: function handleNativeBlur(event) {
            this.setState({
                nativeFocused: false
            });

            if (this.props.onBlur) {
                this.props.onBlur(this.getRevisedEvent(event));
            }
        }
    }, {
        key: 'handleMqMatchChange',
        value: function handleMqMatchChange(isMatched) {
            this.setState({ isMobile: isMatched });
        }
    }, {
        key: 'handlePopupCloseClick',
        value: function handlePopupCloseClick() {
            this.setState({
                opened: false
            });
        }

        /**
         * Устанавливает фокус на компонент.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            var _this10 = this;

            if (this.nativeSelect) {
                this.nativeSelect.focus();
            } else {
                this.button.focus();

                this.setState({
                    opened: true
                }, function () {
                    _this10.focusOnMenu();
                });
            }
        }

        /**
         * Убирает фокус с компонента.
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

        /**
         * Скроллит страницу до компонента.
         *
         * @public
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var elementRect = this.root.getBoundingClientRect();

            (0, _scrollTo3.default)({
                targetY: elementRect.top + window.pageYOffset - _vars.SCROLL_TO_CORRECTION
            });
        }
    }, {
        key: 'focusOnMenu',
        value: function focusOnMenu() {
            if (this.state.isMobile && this.props.mobileMenuMode === 'popup') return;

            var scrollContainer = this.getScrollContainer();

            var posX = scrollContainer.scrollTop;
            var posY = scrollContainer.scrollLeft;

            this.menu.focus();
            scrollContainer.scrollTop = posX;
            scrollContainer.scrollLeft = posY;
        }

        /**
         * @param {MenuItem} highlightedItem Выбранный в текущий момент пункт меню
         */

    }, {
        key: 'syncKeyboardNavigationWithScroll',
        value: function syncKeyboardNavigationWithScroll(highlightedItem) {
            var element = highlightedItem.getNode();
            var container = this.popup.getInnerNode();
            var correction = element.offsetHeight;

            if (element.offsetTop + correction > container.scrollTop + container.offsetHeight) {
                (0, _scrollTo3.default)({
                    container: container,
                    targetY: element.offsetTop,
                    duration: _vars.SCROLL_TO_NORMAL_DURATION
                });
            } else if (element.offsetTop < container.scrollTop) {
                (0, _scrollTo3.default)({
                    container: container,
                    targetY: element.offsetTop - container.offsetHeight + correction,
                    duration: _vars.SCROLL_TO_NORMAL_DURATION
                });
            }
        }
    }, {
        key: 'toggleOpened',
        value: function toggleOpened() {
            var _this11 = this;

            var newOpenedState = !this.getOpened();

            this.setState({ opened: newOpenedState }, function () {
                if (newOpenedState) {
                    _this11.focusOnMenu();
                }
            });
        }
    }, {
        key: 'updatePopupStyles',
        value: function updatePopupStyles() {
            var buttonWidth = this.button.getNode().getBoundingClientRect().width;
            var popupStyles = { minWidth: buttonWidth };

            if (this.props.equalPopupWidth) {
                popupStyles.maxWidth = buttonWidth;
            }

            this.setState({ popupStyles: popupStyles });
        }
    }, {
        key: 'getCheckedItems',
        value: function getCheckedItems(options) {
            var _this12 = this;

            var value = this.getValue();
            var result = [];

            options.forEach(function (option) {
                if (option.type === 'group' && !!option.content) {
                    var findInGroup = _this12.getCheckedItems(option.content);
                    result = result.concat(findInGroup);
                } else if (value.indexOf(option.value) !== -1) {
                    result.push(option);
                }
            });

            return result;
        }

        /**
         * @returns {Boolean}
         */

    }, {
        key: 'getOpened',
        value: function getOpened() {
            return this.props.opened !== undefined ? this.props.opened : this.state.opened;
        }
    }, {
        key: 'getRevisedEvent',
        value: function getRevisedEvent(event) {
            return _extends({}, event, { target: _extends({}, event.target, { value: this.getValue() }) });
        }

        /**
         * @returns {String|Number}
         */

    }, {
        key: 'getValue',
        value: function getValue() {
            return this.props.value || this.state.value;
        }

        /**
         * @returns {HTMLElement}
         */

    }, {
        key: 'getScrollContainer',
        value: function getScrollContainer() {
            return this.context.positioningContainerElement || document.body;
        }

        /**
         * Возвращает `true`, если компонент находится в состоянии фокуса.
         *
         * @returns {Boolean}
         */

    }, {
        key: 'getFocused',
        value: function getFocused() {
            return this.getOpened() || this.state.buttonFocused || this.state.nativeFocused;
        }
    }]);

    return Select;
}(_react2.default.Component), _class4.propTypes = {
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Тип выпадающего списка */
    mode: _propTypes2.default.oneOf(['check', 'radio', 'radio-check']),
    /** Размещение заголовка групп: обычное или в одну строку с первым элементом группы */
    groupView: _propTypes2.default.oneOf(['default', 'line']),
    /** Управление возможностью компонента занимать всю ширину родителя */
    width: _propTypes2.default.oneOf(['default', 'available']),
    /** Направления, в которые может открываться попап компонента */
    directions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'])),
    /** Управление возможностью редактирования значения */
    disabled: _propTypes2.default.bool,
    /** Управление видимостью выпадающего списка */
    opened: _propTypes2.default.bool,
    /** Ширинa выпадающего списка равна ширине кнопки */
    equalPopupWidth: _propTypes2.default.bool,
    /** Список выбранных значений */
    value: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),
    /** Список вариантов выбора */
    options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        /** Тип списка вариантов */
        type: _propTypes2.default.oneOf(['item', 'group']),
        /** Уникальное значение, которое будет отправлено на сервер, если вариант выбран */
        value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
        /** Текст варианта */
        text: _propTypes2.default.node,
        /** Текст варианта для нативного режима */
        nativeText: _propTypes2.default.string,
        /** Отображение варианта */
        description: _propTypes2.default.node,
        /** Текст, который будет отображаться при выборе */
        checkedText: _propTypes2.default.string,
        /** Иконка варианта */
        icon: _propTypes2.default.node,
        /** Список вариантов, только для type='group' */
        content: _propTypes2.default.array
    })),
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Уникальный идентификатор блока */
    id: _propTypes2.default.string,
    /** Уникальное имя блока */
    name: _propTypes2.default.string,
    /** Лейбл для поля */
    label: _propTypes2.default.node,
    /** Подсказка в поле */
    placeholder: _propTypes2.default.string,
    /** Подсказка под полем */
    hint: _propTypes2.default.node,
    /** Отображение ошибки */
    error: _propTypes2.default.node,
    /** Управление нативным режимом на мобильных устройствах */
    mobileMenuMode: _propTypes2.default.oneOf(['native', 'popup']),
    /** Подсказка над меню в мобильном режиме */
    mobileTitle: _propTypes2.default.node,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Обработчик фокуса на компоненте */
    onFocus: _propTypes2.default.func,
    /** Обработчик потери фокуса компонентом */
    onBlur: _propTypes2.default.func,
    /** Обработчик фокуса на кнопке */
    onButtonFocus: _propTypes2.default.func,
    /** Обработчик потери у кнопки */
    onButtonBlur: _propTypes2.default.func,
    /** Обработчик фокуса на меню */
    onMenuFocus: _propTypes2.default.func,
    /** Обработчик потери фокуса у меню */
    onMenuBlur: _propTypes2.default.func,
    /** Обработчик клика по кнопке компонента */
    onClick: _propTypes2.default.func,
    /** Обработчик клика вне компонента */
    onClickOutside: _propTypes2.default.func,
    /** Обработчик изменения значения */
    onChange: _propTypes2.default.func,
    /** Обработчик нажатия на клавишу */
    onKeyDown: _propTypes2.default.func,
    /** Кастомный метод рендера содержимого кнопки, принимает на вход: массив элементов типа [CheckedOption](#CheckedOption) */
    renderButtonContent: _propTypes2.default.func
}, _class4.defaultProps = {
    mode: 'check',
    groupView: 'default',
    disabled: false,
    size: 'm',
    directions: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    width: 'default',
    equalPopupWidth: false,
    options: [],
    placeholder: 'Выберите:',
    mobileMenuMode: 'native'
}, _class4.contextTypes = {
    positioningContainerElement: _propTypes3.HtmlElement
}, _temp2), (_applyDecoratedDescriptor(_class3.prototype, 'handleButtonClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleButtonClick'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleButtonKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleButtonKeyDown'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleButtonFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleButtonFocus'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleButtonBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleButtonBlur'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleMenuFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleMenuFocus'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleMenuBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleMenuBlur'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleOptionCheck', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleOptionCheck'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleNativeOptionCheck', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleNativeOptionCheck'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleNativeClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleNativeClick'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleClickOutside', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleClickOutside'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleMenuKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleMenuKeyDown'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleNativeFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleNativeFocus'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleNativeBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleNativeBlur'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handleMqMatchChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handleMqMatchChange'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'handlePopupCloseClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'handlePopupCloseClick'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'updatePopupStyles', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class3.prototype, 'updatePopupStyles'), _class3.prototype)), _class3)) || _class2) || _class2);
exports.default = Select;
//# sourceMappingURL=select.js.map
