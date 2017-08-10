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
 * Компонент ссылки.
 */
var Link = (_dec = (0, _cn2.default)('link'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Link, _React$Component);

    function Link() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Link);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            hovered: false,
            focused: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Link, [{
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            var linkElement = this.props.checked ? 'span' : 'a';

            var linkProps = {
                ref: function ref(root) {
                    _this2.root = root;
                },
                className: cn({
                    disabled: this.props.disabled,
                    checked: this.props.checked,
                    pseudo: this.props.pseudo,
                    size: this.props.size,
                    focused: this.state.focused,
                    hovered: this.state.hovered
                }),
                tabIndex: this.props.tabIndex,
                onClick: this.handleClick,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave
            };

            if (!this.props.checked) {
                linkProps.href = this.props.url;
                linkProps.target = this.props.target;
            }

            var linkContent = [this.props.children, this.props.icon && _react2.default.createElement(
                'span',
                { key: 'icon', className: cn('icon') },
                this.props.icon
            ), this.props.text && _react2.default.createElement(
                'span',
                { key: 'text', className: cn('text') },
                this.props.text
            )];

            return _react2.default.createElement(linkElement, linkProps, linkContent);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.pseudo) {
                event.preventDefault();
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
         * Ставит фокус на ссылку.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.root.focus();
        }

        /**
         * Убирает фокус с ссылки.
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

    return Link;
}(_react2.default.Component), _class3.propTypes = {
    /** Иконка ссылки */
    icon: _propTypes2.default.node,
    /** Текст ссылки */
    text: _propTypes2.default.node,
    /** href ссылки */
    url: _propTypes2.default.string,
    /** target ссылки */
    target: _propTypes2.default.oneOf(['_self', '_blank', '_parent', '_top']),
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: _propTypes2.default.number,
    /** Управление возможностью клика по ссылке */
    disabled: _propTypes2.default.bool,
    /** Управление состоянием ссылки выбран/не выбран */
    checked: _propTypes2.default.bool,
    /** Псевдо-ссылка (border-bottom: dotted) */
    pseudo: _propTypes2.default.bool,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['xs', 's', 'm', 'l', 'xl']),
    /** Дочерние элементы `Link` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик клика но ссылке */
    onClick: _propTypes2.default.func,
    /** Обработчик фокуса компонента */
    onFocus: _propTypes2.default.func,
    /** Обработчик снятия фокуса компонента */
    onBlur: _propTypes2.default.func,
    /** Обработчик события наведения курсора на ссылку */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с ссылки */
    onMouseLeave: _propTypes2.default.func
}, _class3.defaultProps = {
    size: 'm',
    url: '#',
    tabIndex: 0,
    disabled: false,
    checked: false,
    pseudo: false
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleFocus'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Link;
//# sourceMappingURL=link.js.map
