'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _coreDecorators = require('core-decorators');

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
 * Компонент "расхлопа".
 * Позволяет скрывать и отображать контент.
 */
var SlideDown = (_dec = (0, _cn2.default)('slide-down'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(SlideDown, _React$Component);

    function SlideDown() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SlideDown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SlideDown.__proto__ || Object.getPrototypeOf(SlideDown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            height: 0,
            isHeightAuto: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SlideDown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.isExpanded) {
                this.setAutoHeight();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.isExpanded !== nextProps.isExpanded) {
                if (nextProps.isExpanded) {
                    this.setHeightToContentHeight();
                } else {
                    this.setHeightToNull();
                }
            }
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                {
                    className: cn,
                    style: { height: this.getHeight() },
                    onTransitionEnd: this.handleTransitionEnd,
                    ref: function ref(slideDown) {
                        _this2.slideDown = slideDown;
                    }
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: cn('content', { expanded: this.state.isHeightAuto }),
                        ref: function ref(slideDownContent) {
                            _this2.slideDownContent = slideDownContent;
                        }
                    },
                    this.props.children
                )
            );
        }
    }, {
        key: 'handleTransitionEnd',
        value: function handleTransitionEnd(event) {
            if (event.propertyName === 'height' && this.props.isExpanded) {
                this.setAutoHeight();
            }
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.state.isHeightAuto ? 'auto' : this.state.height;
        }
    }, {
        key: 'setHeightToContentHeight',
        value: function setHeightToContentHeight() {
            this.setState({
                isHeightAuto: false,
                height: this.slideDownContent.offsetHeight
            });
        }
    }, {
        key: 'setHeightToNull',
        value: function setHeightToNull() {
            var _this3 = this;

            this.setHeightToContentHeight();

            // Заставляем React перерисовать элемент
            this.forceUpdate(function () {
                // Заставляем браузер сделать reflow
                _this3.slideDown.getBoundingClientRect();
                _this3.setState({
                    height: 0
                });
            });
        }
    }, {
        key: 'setAutoHeight',
        value: function setAutoHeight() {
            this.setState({
                isHeightAuto: true
            });
        }
    }]);

    return SlideDown;
}(_react2.default.Component), _class3.propTypes = {
    /** Управление состоянием expand/collapse компонента */
    isExpanded: _propTypes2.default.bool,
    /** Контент компонента */
    children: _propTypes2.default.node,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleTransitionEnd', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleTransitionEnd'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = SlideDown;
//# sourceMappingURL=slide-down.js.map
