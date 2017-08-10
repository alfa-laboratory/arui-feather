'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _menuItem = require('../menu-item/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _window = require('../lib/window');

var _keyboardCode = require('../lib/keyboard-code');

var _keyboardCode2 = _interopRequireDefault(_keyboardCode);

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
 * Компонент меню.
 */
var Menu = (_dec = (0, _cn2.default)('menu'), _dec2 = (0, _performance2.default)(true), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Menu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            highlightedItem: null,
            checkedItems: [],
            hovered: false
        }, _this.menuItemList = [], _this.blurTimeoutId = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Menu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!!this.props.content && this.props.content.length > 0 && (!this.props.checkedItems || this.props.checkedItems.length === 0) && this.props.mode === 'radio') {
                var firstItem = this.getFirstItem(this.props.content);

                this.changeCheckedItems([firstItem.value]);
            }
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            this.menuItemList = [];
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.blurTimeoutId) {
                clearTimeout(this.blurTimeoutId);
                this.blurTimeoutId = null;
            }
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
            return _react2.default.createElement(
                'div',
                {
                    ref: function ref(root) {
                        _this2.root = root;
                    },
                    style: this.props.style,
                    className: cn({
                        size: this.props.size,
                        view: this.props.view,
                        'group-view': this.props.groupView,
                        hovered: this.state.hovered,
                        disabled: this.props.disabled,
                        mode: this.props.mode
                    }),
                    tabIndex: 0,
                    onMouseEnter: this.handleMouseEnter,
                    onMouseLeave: this.handleMouseLeave,
                    onKeyDown: this.handleKeyDown,
                    onKeyUp: this.handleKeyUp,
                    onFocus: this.handleFocus,
                    onBlur: this.handleBlur
                },
                !!this.props.content && this.renderMenuItemList(cn, this.props.content)
            );
            /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
        }
    }, {
        key: 'renderMenuItemList',
        value: function renderMenuItemList(cn, content) {
            var _this3 = this;

            var result = [];
            var groupKey = 0;

            content.forEach(function (item) {
                if (item.type === 'group') {
                    result.push(_react2.default.createElement(
                        'div',
                        {
                            className: cn('group'),
                            key: 'group_' + groupKey
                        },
                        !!item.title && _react2.default.createElement(
                            'div',
                            { className: cn('group-title') },
                            item.title
                        ),
                        _this3.renderMenuItemList(cn, item.content)
                    ));
                    groupKey += 1;
                } else {
                    result.push(_this3.renderMenuItem(item));
                }
            });

            return result;
        }
    }, {
        key: 'renderMenuItem',
        value: function renderMenuItem(item) {
            var _this4 = this;

            var itemProps = item.props || {};
            var isItemDisabled = this.props.disabled || itemProps.disabled;
            var clickHandler = this.props.mode === 'basic' ? itemProps.onClick : function () {
                return _this4.handleMenuItemClick(item);
            };
            var menuItem = {
                item: item,
                ref: item.value
            };
            var menuItemProps = _extends({}, itemProps, {
                disabled: isItemDisabled,
                value: item.value,
                size: this.props.size || itemProps.size,
                onClick: !isItemDisabled ? clickHandler : undefined
            });
            var highlightedItem = this.props.highlightedItem === undefined ? this.state.highlightedItem : this.props.highlightedItem;

            this.menuItemList.push(menuItem);

            return _react2.default.createElement(
                _menuItem2.default,
                _extends({}, menuItemProps, {
                    ref: function ref(instance) {
                        menuItem.instance = instance;
                    },
                    key: item.key || item.value,
                    checked: this.getIndexInCheckedItemsList(item.value) !== -1,
                    type: this.props.mode !== 'basic' ? 'block' : itemProps.type,
                    onMouseEnter: function onMouseEnter() {
                        return _this4.handleMenuItemMouseEnter(menuItem);
                    },
                    onMouseLeave: this.handleMenuItemMouseLeave,
                    hovered: highlightedItem && highlightedItem.ref === menuItem.ref
                }),
                item.content
            );
        }
    }, {
        key: 'handleMenuItemClick',
        value: function handleMenuItemClick(item) {
            this.setNewCheckedItems(item);
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
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(event) {
            if (this.props.onKeyUp) {
                this.props.onKeyUp(event);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            var _this5 = this;

            var highlightedItem = null;
            var highlightedMenuItem = null;
            var menuIteListLength = this.menuItemList.length;

            switch (event.which) {
                case _keyboardCode2.default.DOWN_ARROW:
                    {
                        event.preventDefault();

                        if (this.state.highlightedItem) {
                            this.menuItemList.forEach(function (item, index, menuItemList) {
                                if (item.ref === _this5.state.highlightedItem.ref) {
                                    if (index + 1 === menuIteListLength) {
                                        highlightedItem = menuItemList[0];
                                    } else {
                                        highlightedItem = menuItemList[index + 1];
                                    }
                                }
                            });
                        } else {
                            highlightedItem = this.menuItemList[0];
                        }

                        this.setState({
                            highlightedItem: highlightedItem
                        });

                        if (this.props.onHighlightItem) {
                            this.props.onHighlightItem(highlightedItem);
                        }

                        break;
                    }
                case _keyboardCode2.default.UP_ARROW:
                    {
                        event.preventDefault();

                        if (this.state.highlightedItem) {
                            this.menuItemList.forEach(function (item, index, menuItemList) {
                                if (item.ref === _this5.state.highlightedItem.ref) {
                                    if (index - 1 < 0) {
                                        highlightedItem = menuItemList[menuIteListLength - 1];
                                    } else {
                                        highlightedItem = menuItemList[index - 1];
                                    }
                                }
                            });
                        } else {
                            highlightedItem = this.menuItemList[menuIteListLength - 1];
                        }

                        this.setState({
                            highlightedItem: highlightedItem
                        });

                        if (this.props.onHighlightItem) {
                            this.props.onHighlightItem(highlightedItem);
                        }

                        break;
                    }
                case _keyboardCode2.default.ENTER:
                case _keyboardCode2.default.SPACE:
                    {
                        event.preventDefault();

                        highlightedItem = this.props.highlightedItem === undefined ? this.state.highlightedItem : this.props.highlightedItem;

                        if (highlightedItem) {
                            this.setNewCheckedItems(highlightedItem.item);
                        }

                        break;
                    }
            }

            if (highlightedItem) {
                highlightedMenuItem = highlightedItem.instance;
            }

            if (this.props.onKeyDown) {
                this.props.onKeyDown(event, highlightedMenuItem);
            }
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            if (this.blurTimeoutId) {
                clearTimeout(this.blurTimeoutId);
                this.blurTimeoutId = null;
            }

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            var _this6 = this;

            event.persist();
            if (this.blurTimeoutId) {
                clearTimeout(this.blurTimeoutId);
            }

            this.blurTimeoutId = setTimeout(function () {
                if ((0, _window.isNodeOutsideElement)(document.activeElement, _this6.root) && _this6.props.onBlur) {
                    _this6.props.onBlur(event);
                }
                _this6.blurTimeoutId = null;
            }, 0);
        }
    }, {
        key: 'handleMenuItemMouseEnter',
        value: function handleMenuItemMouseEnter(menuItem) {
            this.setState({
                highlightedItem: menuItem
            });

            if (this.props.onHighlightItem) {
                this.props.onHighlightItem(menuItem);
            }
        }
    }, {
        key: 'handleMenuItemMouseLeave',
        value: function handleMenuItemMouseLeave() {
            this.setState({
                highlightedItem: null
            });

            if (this.props.onHighlightItem) {
                this.props.onHighlightItem(null);
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
         * Устанавливает фокус на меню.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.root.focus();

            if (this.props.autoFocusFirstItem) {
                var highlightedItem = this.menuItemList[0];
                this.setState({
                    highlightedItem: highlightedItem
                });

                if (this.props.onHighlightItem) {
                    this.props.onHighlightItem(highlightedItem);
                }
            }
        }

        /**
         * Убирает фокус с меню.
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
    }, {
        key: 'setNewCheckedItems',
        value: function setNewCheckedItems(item) {
            var value = item.value;
            var checkedItems = this.props.checkedItems !== undefined ? Array.from(this.props.checkedItems) : Array.from(this.state.checkedItems);
            var indexInCheckedItemsList = this.getIndexInCheckedItemsList(value);

            switch (this.props.mode) {
                case 'check':
                    if (indexInCheckedItemsList === -1) {
                        checkedItems.push(value);
                    } else {
                        checkedItems.splice(indexInCheckedItemsList, 1);
                    }
                    break;
                case 'radio':
                    if (indexInCheckedItemsList === -1) {
                        checkedItems = [value];
                    }
                    break;
                case 'radio-check':
                    if (indexInCheckedItemsList === -1) {
                        checkedItems = [value];
                    } else {
                        checkedItems = [];
                    }
                    break;
                default:
                    break;
            }

            if (this.props.onItemClick) {
                this.props.onItemClick(item);
            }

            this.changeCheckedItems(checkedItems);
            this.focus();
        }

        /**
         * Изменяет выбранные значения.
         *
         * @param {Array.<String|Number>} checkedItems Список выбранных значений
         */

    }, {
        key: 'changeCheckedItems',
        value: function changeCheckedItems(checkedItems) {
            this.setState({
                checkedItems: checkedItems
            });

            if (this.props.onItemCheck) {
                this.props.onItemCheck(checkedItems);
            }
        }
    }, {
        key: 'getIndexInCheckedItemsList',
        value: function getIndexInCheckedItemsList(value) {
            var checkedItems = this.props.checkedItems ? this.props.checkedItems : this.state.checkedItems;
            return checkedItems.indexOf(value);
        }
    }, {
        key: 'getFirstItem',
        value: function getFirstItem(content) {
            var firstItem = content[0];

            return firstItem.type === 'group' ? this.getFirstItem(firstItem.content) : firstItem;
        }
    }]);

    return Menu;
}(_react2.default.Component), _class3.propTypes = {
    /** Тип расположения меню: 'horizontal' */
    view: _propTypes2.default.string,
    /** Размещение заголовка групп: обычное или в одну строку с первым элементом группы */
    groupView: _propTypes2.default.oneOf(['default', 'line']),
    /** Тип списка вариантов меню */
    mode: _propTypes2.default.oneOf(['basic', 'check', 'radio', 'radio-check']),
    /** Управление возможностью изменения значения */
    disabled: _propTypes2.default.bool,
    /** Управление состоянием фокуса элемента */
    focused: _propTypes2.default.bool,
    /** Управление автоматическим фокусом на первом элементе при вызове публичного метода focus */
    autoFocusFirstItem: _propTypes2.default.bool,
    /** Элемент меню, на котором стоит выделение */
    highlightedItem: _propTypes2.default.shape({
        /** Уникальный идентификатор */
        ref: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
        /** Элемент списка типа ContentItem */
        item: _propTypes2.default.any
    }),
    /** Список объектов ContentItem */
    content: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        /** Тип элемента */
        type: _propTypes2.default.oneOf(['item', 'group']),
        /** Только для type='item', свойство для компонента [MenuItem](../menu-item/) */
        value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
        /** Содержание элемента */
        content: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.array]),
        /** Только для type='item': свойства для компонента [MenuItem](../menu-item/) */
        props: _propTypes2.default.object
    })),
    /** Список значений выбранных элементов */
    checkedItems: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Объект со стилями */
    style: _reactStyleProptype2.default,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик клика по варианту меню */
    onItemClick: _propTypes2.default.func,
    /** Обработчик выбора варианта меню */
    onItemCheck: _propTypes2.default.func,
    /** Обработчик события наведения курсора на меню */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с меню */
    onMouseLeave: _propTypes2.default.func,
    /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
    onKeyDown: _propTypes2.default.func,
    /** Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
    onKeyUp: _propTypes2.default.func,
    /** Обработчик фокуса */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса */
    onBlur: _propTypes2.default.func,
    /** Обработчик события выделения элемента меню, принимает на вход переменную типа HighlightedItem */
    onHighlightItem: _propTypes2.default.func
}, _class3.defaultProps = {
    size: 'm',
    mode: 'basic',
    groupView: 'default',
    autoFocusFirstItem: false
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleMenuItemClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMenuItemClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyUp', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyUp'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleKeyDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMenuItemMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMenuItemMouseLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getIndexInCheckedItemsList', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'getIndexInCheckedItemsList'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Menu;
//# sourceMappingURL=menu.js.map
