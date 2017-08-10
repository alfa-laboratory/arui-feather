'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                                            * License, v. 2.0. If a copy of the MPL was not distributed with this
                                            * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
 * Компонент позволяющий слушать изменения размера родительского элемента.
 * Для использования разместите его в элементе об изменении размера, которого
 * вы хотите знать и добавьте внешний обработчик `onResize`.
 *
 * Важно! Элемент, размер которого вы хотите измерять, должен обладать
 * css свойством `position: relative;`.
 */
var ResizeSensor = (_class = (_temp = _class2 = function (_React$Component) {
    _inherits(ResizeSensor, _React$Component);

    function ResizeSensor() {
        _classCallCheck(this, ResizeSensor);

        return _possibleConstructorReturn(this, (ResizeSensor.__proto__ || Object.getPrototypeOf(ResizeSensor)).apply(this, arguments));
    }

    _createClass(ResizeSensor, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.iframe.contentWindow.addEventListener('resize', this.handleResize);
        }

        /**
         * @type {HTMLIFrameElement}
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.iframe.contentWindow.removeEventListener('resize', this.handleResize);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var iframeStyle = {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                zIndex: -1
            };

            /* eslint-disable jsx-a11y/iframe-has-title */
            return _react2.default.createElement('iframe', {
                ref: function ref(iframe) {
                    _this2.iframe = iframe;
                },
                style: iframeStyle,
                tabIndex: '-1'
            });
            /* eslint-enable jsx-a11y/iframe-has-title */
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            if (this.props.onResize) {
                this.props.onResize();
            }
        }
    }]);

    return ResizeSensor;
}(_react2.default.Component), _class2.propTypes = {
    /** Callback на изменение размера родителя */
    onResize: _propTypes2.default.func
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'handleResize', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleResize'), _class.prototype)), _class);
exports.default = ResizeSensor;
//# sourceMappingURL=resize-sensor.js.map
