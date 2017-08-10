'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _class2, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                                          * License, v. 2.0. If a copy of the MPL was not distributed with this
                                          * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _link = require('../link/link');

var _link2 = _interopRequireDefault(_link);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Компонент копирайта: отображает данные о лицензии Альфа-Банка.
 */
var Copyright = (_dec = (0, _cn2.default)('copyright'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
    _inherits(Copyright, _React$Component);

    function Copyright() {
        _classCallCheck(this, Copyright);

        return _possibleConstructorReturn(this, (Copyright.__proto__ || Object.getPrototypeOf(Copyright)).apply(this, arguments));
    }

    _createClass(Copyright, [{
        key: 'render',
        value: function render(cn) {
            return _react2.default.createElement(
                'div',
                { className: cn },
                this.props.children || this.renderDefaultCopyright(cn)
            );
        }
    }, {
        key: 'renderDefaultCopyright',
        value: function renderDefaultCopyright(cn) {
            return _react2.default.createElement(
                'span',
                null,
                this.props.showYears && _react2.default.createElement(
                    'span',
                    { className: cn('years') },
                    '\xA9 2001\u20142017 ',
                    _react2.default.createElement(_link2.default, { size: 'xs', url: 'https://alfabank.ru/', text: '\u0410\u043B\u044C\u0444\u0430-\u0411\u0430\u043D\u043A' }),
                    _react2.default.createElement('br', null)
                ),
                '\u0413\u0435\u043D\u0435\u0440\u0430\u043B\u044C\u043D\u0430\u044F \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u044F ',
                _react2.default.createElement(
                    'nobr',
                    null,
                    '\u0411\u0430\u043D\u043A\u0430 \u0420\u043E\u0441\u0441\u0438\u0438'
                ),
                ' ',
                '\u21161326, ',
                _react2.default.createElement(
                    'nobr',
                    null,
                    '\u043E\u0442 16 \u044F\u043D\u0432\u0430\u0440\u044F 2015 \u0433.'
                )
            );
        }
    }]);

    return Copyright;
}(_react2.default.Component), _class2.propTypes = {
    /** Дочерние элементы `Copyright`, заменяют собой стандартный текст copyright'а */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Отображение годов */
    showYears: _propTypes2.default.bool,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white'])
}, _class2.defaultProps = {
    showYears: false
}, _temp)) || _class) || _class);
exports.default = Copyright;
//# sourceMappingURL=copyright.js.map
