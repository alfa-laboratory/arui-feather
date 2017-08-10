'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                    * License, v. 2.0. If a copy of the MPL was not distributed with this
                                    * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isolatedContainer = require('../isolated-container/isolated-container');

var _isolatedContainer2 = _interopRequireDefault(_isolatedContainer);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _propTypes3 = require('../lib/prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Становится родительским элементом для всех дочерних блоков `Popup`.
 * Предполагается задавать этому элементу `position: fixed` в стилях.
 *
 * @example
 * ```javascript
 * import PopupContainerProvider from 'arui-feather/popup-container-provider';
 * import Popup from 'arui-feather/popup';
 * import Page from 'arui-feather/page';
 *
 *  <Page>
 *     <PopupContainerProvider
 *         style={
 *             {
 *                 position: 'fixed',
 *                 top: 0,
 *                 right: 0,
 *                 bottom: 0,
 *                 width: '400px',
 *                 overflow: 'auto'
 *             }
 *         }
 *     >
 *         <Popup>
 *             Попап отрендерился в PopupContainerProvider, а не в body
 *             При скролле внутри блока, попап ездит вместе с остальным контентом.
 *         </Popup>
 *     </PopupContainerProvider>
 *  </Page>
 * ```
 */
var PopupContainerProvider = (_dec = (0, _cn2.default)('popup-container'), _dec(_class = (_temp2 = _class2 = function (_React$Component) {
    _inherits(PopupContainerProvider, _React$Component);

    function PopupContainerProvider() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PopupContainerProvider);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PopupContainerProvider.__proto__ || Object.getPrototypeOf(PopupContainerProvider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            didRender: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PopupContainerProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                isInCustomContainer: true,
                renderContainerElement: this.renderContainer && this.renderContainer.getNode(),
                positioningContainerElement: this.positioningContainer
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.handleContainerDidRender();
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                {
                    className: cn,
                    ref: function ref(positioningContainer) {
                        _this2.positioningContainer = positioningContainer;
                    },
                    style: this.props.style
                },
                this.props.children,
                _react2.default.createElement(_isolatedContainer2.default, {
                    ref: function ref(renderContainer) {
                        _this2.renderContainer = renderContainer;
                    }
                })
            );
        }

        /**
         * Необходимо для обновления childContext сразу после получения refs.
         */

    }, {
        key: 'handleContainerDidRender',
        value: function handleContainerDidRender() {
            this.setState({
                didRender: true
            });
        }
    }]);

    return PopupContainerProvider;
}(_react2.default.Component), _class2.propTypes = {
    /** Дочерние элементы контейнера */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Объект со стилями */
    style: _reactStyleProptype2.default,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white'])
}, _class2.childContextTypes = {
    isInCustomContainer: _propTypes2.default.bool,
    renderContainerElement: _propTypes3.HtmlElement,
    positioningContainerElement: _propTypes3.HtmlElement
}, _temp2)) || _class);
exports.default = PopupContainerProvider;
//# sourceMappingURL=popup-container-provider.js.map
