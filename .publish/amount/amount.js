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

var _heading = require('../heading/heading');

var _heading2 = _interopRequireDefault(_heading);

var _label = require('../label/label');

var _label2 = _interopRequireDefault(_label);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _currencyCodes = require('../lib/currency-codes');

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR = ',';
var AMOUNT_MAJOR_PART_SIZE = 3;
var ZERO_MINOR_PART_REGEXP = /^0+$/;
var MINUS_SIGN_HTML_CODE = '\u2212';

function createSplitter(partSize) {
    var parts = function parts(str) {
        var length = str.length;

        if (length <= partSize) {
            return [str];
        }

        var from = length - partSize;
        var to = length;

        return [str.slice(from, to)].concat(parts(str.slice(0, from)));
    };
    return parts;
}

function formatAmount(amount) {
    var value = amount.value,
        _amount$currency = amount.currency,
        minority = _amount$currency.minority,
        code = _amount$currency.code;

    var fractionDigits = Math.log(minority) / Math.LN10;

    var isNegative = value < 0;

    var valueAbs = Math.abs(value);

    var valueAbsStr = (valueAbs / minority).toFixed(fractionDigits);

    var numberParts = valueAbsStr.split('.');
    var majorPart = numberParts[0];
    var minorPart = numberParts[1];

    var amountSplitter = createSplitter(AMOUNT_MAJOR_PART_SIZE);

    var majorPartFormatted = amountSplitter(majorPart).reverse().join(' ');
    var formattedValueStr = majorPartFormatted + (minorPart ? ',' + minorPart : '');

    return {
        majorPart: majorPartFormatted,
        minorPart: minorPart,
        value: formattedValueStr,
        isNegative: isNegative,
        currencySymbol: (0, _currencyCodes.getCurrencySymbol)(code)
    };
}

/**
 * Компонент для отображения суммы.
 */
var Amount = (_dec = (0, _cn2.default)('amount'), _dec2 = (0, _performance2.default)(true), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
    _inherits(Amount, _React$Component);

    function Amount() {
        _classCallCheck(this, Amount);

        return _possibleConstructorReturn(this, (Amount.__proto__ || Object.getPrototypeOf(Amount)).apply(this, arguments));
    }

    _createClass(Amount, [{
        key: 'render',
        value: function render(cn) {
            var _props = this.props,
                amount = _props.amount,
                size = _props.size;

            var _formatAmount = formatAmount(amount),
                majorPart = _formatAmount.majorPart,
                minorPart = _formatAmount.minorPart,
                isNegative = _formatAmount.isNegative,
                currencySymbol = _formatAmount.currencySymbol;

            var amountInner = _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'span',
                    { className: cn('major') },
                    isNegative && MINUS_SIGN_HTML_CODE,
                    majorPart
                ),
                this.renderSeparatorAndMinorPart(cn, minorPart),
                this.renderCurrencySymbol(cn, currencySymbol)
            );

            return _react2.default.createElement(
                'div',
                { className: cn },
                this.props.isHeading ? _react2.default.createElement(
                    _heading2.default,
                    { size: size },
                    amountInner
                ) : _react2.default.createElement(
                    _label2.default,
                    { size: size },
                    amountInner
                )
            );
        }
    }, {
        key: 'renderSeparatorAndMinorPart',
        value: function renderSeparatorAndMinorPart(cn, minorPart) {
            var showZeroMinorPart = this.props.showZeroMinorPart;


            var needMinorPart = false;

            if (minorPart) {
                needMinorPart = true;

                if (!showZeroMinorPart && ZERO_MINOR_PART_REGEXP.test(minorPart)) {
                    needMinorPart = false;
                }
            }

            if (needMinorPart) {
                return _react2.default.createElement(
                    'div',
                    { className: cn('minor-container') },
                    _react2.default.createElement(
                        'span',
                        { className: cn('separator') },
                        AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: cn('minor') },
                        minorPart
                    )
                );
            }
            return null;
        }
    }, {
        key: 'renderCurrencySymbol',
        value: function renderCurrencySymbol(cn, currencySymbol) {
            return _react2.default.createElement(
                'span',
                { className: cn('currency') },
                ' ' + currencySymbol
            );
        }
    }]);

    return Amount;
}(_react2.default.Component), _class2.propTypes = {
    amount: _propTypes2.default.shape({
        /** Абсолютное значение суммы */
        value: _propTypes2.default.number,
        /** Валюта */
        currency: _propTypes2.default.shape({
            /** Международный код валюты */
            code: _propTypes2.default.string,
            /** Количество минорных единиц валюты */
            minority: _propTypes2.default.number
        })
    }).isRequired,
    /** Отображение минорной части, если она нулевая */
    showZeroMinorPart: _propTypes2.default.bool,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Использовать компонент `Heading` для вывода числа */
    isHeading: _propTypes2.default.bool,
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
}, _class2.defaultProps = {
    size: 'm',
    showZeroMinorPart: true,
    isHeading: false
}, _temp)) || _class) || _class);
exports.default = Amount;
//# sourceMappingURL=amount.js.map
