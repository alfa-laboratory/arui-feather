'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                  * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                  * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _popupContainerProvider = require('../popup-container-provider/popup-container-provider');

var _popupContainerProvider2 = _interopRequireDefault(_popupContainerProvider);

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
 * Изменяет класс для body. Нужен для управления скроллом
 * основного экрана при показе холодильника.
 *
 * @param {Boolean} visible Признак видимости сайдбара.
 */
function setBodyClass(visible) {
    document.body.classList[visible ? 'add' : 'remove']('sidebar-visible');
}

/**
 * Компонент боковой панели aka холодильник.
 */
var Sidebar = (_dec = (0, _cn2.default)('sidebar'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
    _inherits(Sidebar, _React$Component);

    function Sidebar() {
        _classCallCheck(this, Sidebar);

        return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
    }

    _createClass(Sidebar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            setBodyClass(this.props.visible);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            setBodyClass(nextProps.visible);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            setBodyClass(false);
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _props = this.props,
                hasCloser = _props.hasCloser,
                children = _props.children,
                visible = _props.visible;


            return _react2.default.createElement(
                _popupContainerProvider2.default,
                { className: cn({ visible: visible }) },
                _react2.default.createElement(
                    'div',
                    null,
                    hasCloser && _react2.default.createElement(
                        'button',
                        {
                            className: cn('closer'),
                            onClick: this.handleCloserClick
                        },
                        _react2.default.createElement(_icon2.default, {
                            icon: 'close',
                            size: 'xl'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: cn('content') },
                        children
                    )
                )
            );
        }
    }, {
        key: 'handleCloserClick',
        value: function handleCloserClick() {
            if (this.props.onCloserClick) {
                this.props.onCloserClick();
            }
        }
    }]);

    return Sidebar;
}(_react2.default.Component), _class3.propTypes = {
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Дочерние компоненты */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Признак для отрисовки элемента закрытия */
    hasCloser: _propTypes2.default.bool,
    /** Признак появления холодильника */
    visible: _propTypes2.default.bool.isRequired,
    /** Обработчик клика на элемент закрытия */
    onCloserClick: _propTypes2.default.func
}, _class3.defaultProps = {
    hasCloser: true
}, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'handleCloserClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleCloserClick'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Sidebar;
//# sourceMappingURL=sidebar.js.map
