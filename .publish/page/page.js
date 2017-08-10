'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                            * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                            * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

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

var SMALL_HEADER_HEIGHT = 80;
var PADDING_FROM_HEADER = 15;

/**
 * Компонент страницы.
 * Как правило является корневым компонентов страницы.
 * Обычно используется совместно с компонентами `Header`, `Footer`
 * и компонентами `AppTitle`, `AppMenu` и `AppContent`.
 */
var Page = (_dec = (0, _cn2.default)('page'), _dec(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Page);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Page.__proto__ || Object.getPrototypeOf(Page)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            innerMargin: null,
            contentPadding: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Page, [{
        key: 'render',
        value: function render(cn) {
            var header = void 0;
            if (this.props.header) {
                header = _react2.default.cloneElement(this.props.header, {
                    onResize: this.handleHeaderResize
                });
            }

            return _react2.default.createElement(
                'div',
                { className: cn },
                header,
                _react2.default.createElement(
                    'div',
                    { className: cn('inner'), style: { marginTop: this.state.innerMargin } },
                    _react2.default.createElement(
                        'div',
                        { className: cn('content'), style: { paddingTop: this.state.contentPadding } },
                        this.props.children
                    )
                ),
                this.props.footer && _react2.default.createElement(
                    'div',
                    { className: cn('footer') },
                    _react2.default.createElement(
                        'div',
                        { className: cn('footer-content') },
                        this.props.footer
                    )
                )
            );
        }
    }, {
        key: 'handleHeaderResize',
        value: function handleHeaderResize(headerHeight, contentHeight) {
            var innerMargin = -1 * headerHeight;
            var contentPadding = contentHeight + SMALL_HEADER_HEIGHT + PADDING_FROM_HEADER;

            this.setState({
                innerMargin: innerMargin,
                contentPadding: contentPadding
            });

            if (this.props.header && this.props.header.props.onResize) {
                this.props.header.props.onResize(headerHeight, contentHeight);
            }
        }
    }]);

    return Page;
}(_react2.default.Component), _class3.propTypes = {
    /** Шапка страницы */
    header: _propTypes2.default.node,
    /** Дочерние элементы `Page` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Футер страницы */
    footer: _propTypes2.default.node,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleHeaderResize', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleHeaderResize'), _class2.prototype)), _class2)) || _class);
exports.default = Page;
//# sourceMappingURL=page.js.map
