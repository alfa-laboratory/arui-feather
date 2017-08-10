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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypes3 = require('../lib/prop-types');

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
 * Компонент, позволяющий визуализировать другие компоненты в произвольном контейнере.
 */
var RenderInContainer = (_class = (_temp = _class2 = function (_React$Component) {
    _inherits(RenderInContainer, _React$Component);

    function RenderInContainer() {
        _classCallCheck(this, RenderInContainer);

        return _possibleConstructorReturn(this, (RenderInContainer.__proto__ || Object.getPrototypeOf(RenderInContainer)).apply(this, arguments));
    }

    _createClass(RenderInContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.buildElements();
            this.renderLayer();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.container !== this.getContainer()) {
                this.buildElements();
            }
            this.renderLayer();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _reactDom2.default.unmountComponentAtNode(this.element);
            this.container.removeChild(this.element);
        }
    }, {
        key: 'render',
        value: function render() {
            return false;
        }
    }, {
        key: 'renderLayer',
        value: function renderLayer() {
            if (this.props.className) {
                this.element.className = this.props.className.toString();
            }

            _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.props.children, this.element, this.handleRender);
        }
    }, {
        key: 'handleRender',
        value: function handleRender() {
            if (this.props.onRender) {
                this.props.onRender();
            }
        }

        /**
         * Возвращает HTMLElement враппера компонента.
         *
         * @public
         * @returns {HTMLElement}
         */

    }, {
        key: 'getNode',
        value: function getNode() {
            return this.element;
        }

        /**
         * Возвращает HTMLElement контейнера, в который отрендерился компонент.
         *
         * @public
         * @returns {HTMLElement}
         */

    }, {
        key: 'getContainer',
        value: function getContainer() {
            return this.props.container || document.body;
        }
    }, {
        key: 'buildElements',
        value: function buildElements() {
            if (this.element && this.container) {
                _reactDom2.default.unmountComponentAtNode(this.element);
                this.container.removeChild(this.element);
            }

            this.container = this.getContainer();
            this.element = document.createElement('div');

            this.container.appendChild(this.element);
        }
    }]);

    return RenderInContainer;
}(_react2.default.Component), _class2.propTypes = {
    /** Дочерние элементы контейнера */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Контейнер, в котором будет визуализирован компонент */
    container: _propTypes3.HtmlElement,
    /** Callback на рендер компонента */
    onRender: _propTypes2.default.func
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'handleRender', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleRender'), _class.prototype)), _class);
exports.default = RenderInContainer;
//# sourceMappingURL=render-in-container.js.map
