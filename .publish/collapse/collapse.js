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
 * Компонент «подката» позволяет спрятать кусок текста за ссылку «Еще...».
 */
var Collapse = (_dec = (0, _cn2.default)('collapse'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Collapse, _React$Component);

    function Collapse() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Collapse);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isExpanded: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Collapse, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateContentHeight();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateContentHeight();
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            var expanded = this.props.isExpanded !== undefined ? this.props.isExpanded : this.state.isExpanded;

            return _react2.default.createElement(
                'div',
                {
                    className: cn({
                        expanded: expanded
                    })
                },
                _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(content) {
                            _this2.content = content;
                        },
                        className: cn('content')
                    },
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(contentCase) {
                                _this2.contentCase = contentCase;
                            } },
                        this.props.children
                    ),
                    _react2.default.createElement(_resizeSensor2.default, { onResize: this.updateContentHeight })
                ),
                _react2.default.createElement(_link2.default, {
                    className: cn('link'),
                    pseudo: true,
                    onClick: this.handleExpandedChange,
                    text: expanded ? this.props.expandedLabel : this.props.collapsedLabel
                })
            );
        }
    }, {
        key: 'handleExpandedChange',
        value: function handleExpandedChange() {
            var newExpandedValue = this.props.isExpanded !== undefined ? !this.props.isExpanded : !this.state.isExpanded;

            this.setState({
                isExpanded: newExpandedValue
            });

            if (this.props.onExpandedChange) {
                this.props.onExpandedChange(newExpandedValue);
            }
        }
    }, {
        key: 'updateContentHeight',
        value: function updateContentHeight() {
            var expanded = this.props.isExpanded !== undefined ? this.props.isExpanded : this.state.isExpanded;

            var contentHeight = void 0;

            if (expanded) {
                contentHeight = this.contentCase.offsetHeight;
            } else {
                contentHeight = 0;
            }

            if (this.content) {
                this.content.style.height = contentHeight + 'px';
            }
        }
    }]);

    return Collapse;
}(_react2.default.Component), _class3.propTypes = {
    /** Управление состоянием `expand`/`collapse` компонента */
    isExpanded: _propTypes2.default.bool,
    /** Текст ссылки в `expand` состоянии */
    collapsedLabel: _propTypes2.default.string,
    /** Текст ссылки в `collapse` состоянии */
    expandedLabel: _propTypes2.default.string,
    /** Дочерние элементы `Collapse` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Обработчик смены состояния `expand`/`collapse` */
    onExpandedChange: _propTypes2.default.func
}, _class3.defaultProps = {
    expandedLabel: 'Collapse',
    collapsedLabel: 'Expand'
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleExpandedChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleExpandedChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateContentHeight', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'updateContentHeight'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Collapse;
//# sourceMappingURL=collapse.js.map
