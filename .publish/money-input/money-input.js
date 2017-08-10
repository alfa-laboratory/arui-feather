'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/prop-types: 0 */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _input = require('../input/input');

var _input2 = _interopRequireDefault(_input);

var _mask = require('../masked-input/mask');

var _mask2 = _interopRequireDefault(_mask);

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

var DEFAULT_FRACTION_SIZE = 2;
var DEFAULT_INTEGER_SIZE = 9;
var INTEGER_PART_SIZE = 3;

/**
 * Возвращает целую и дробную часть значения в виде массива.
 * Если дробная часть не равна `undefined`, значит введена дробная часть
 * или хотя бы запятая.
 *
 * @param {String} value Значение
 * @returns {Array.<String>}
 */
function getValueParts(value) {
    return value.replace(/[.бю]/g, ',') // Заменяем точки, `б` и `ю` на запятые.
    .replace(/[^\d,]/g, '') // Удаляем все, что не является цифрой или запятой.
    .split(',') // Разделяем по запятой.
    .slice(0, 2); // Отрезаем, если больше, чем один фрагмент после запятой.
}

/**
 * Сплитит интегер в группы по 3.
 *
 * @param {String} str Строка интегера
 * @returns {String}
 */
function splitInteger(str) {
    if (str.length <= INTEGER_PART_SIZE) {
        return [str];
    }

    var from = str.length - INTEGER_PART_SIZE;
    var to = str.length;

    return [str.slice(from, to)].concat(splitInteger(str.slice(0, from)));
}

/**
 * Компонент поля для ввода суммы. Может принимать в качестве значения либо число, либо число с сотой долей.
 *
 * @extends Input
 */
var MoneyInput = (_dec = (0, _cn2.default)('money-input', _input2.default), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(MoneyInput, _React$Component);

    function MoneyInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MoneyInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MoneyInput.__proto__ || Object.getPrototypeOf(MoneyInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            value: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {String}
     */


    /**
     * @type {InputMask.Pattern}
     */


    /**
     * @type {Input}
     */


    _createClass(MoneyInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.updateMaskByValue(this.getValue());
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.value !== nextProps.value) {
                this.updateMaskByValue(nextProps.value || '');
            }
        }
    }, {
        key: 'render',
        value: function render(cn, Input) {
            var _this2 = this;

            return _react2.default.createElement(Input, _extends({}, this.props, {
                ref: function ref(root) {
                    _this2.root = root;
                },
                mask: this.maskPattern,
                value: this.getValue(),
                maxLength: this.getMaxLength(),
                onProcessMaskInputEvent: this.handleProcessMaskInputEvent,
                onChange: this.handleChange,
                noValidate: true,
                className: cn
            }));
        }
    }, {
        key: 'handleProcessMaskInputEvent',
        value: function handleProcessMaskInputEvent(event) {
            var currentValue = this.mask.format(this.getValue());
            var newValue = event.target.value;

            // При удалении отрезаем запятую, если исчезла дробная часть.
            if (newValue.length < currentValue.length) {
                var _getValueParts = getValueParts(newValue),
                    _getValueParts2 = _slicedToArray(_getValueParts, 1),
                    fractionPart = _getValueParts2[0];

                // `fractionPart !== undefined` - значит запятая введена, но
                // `fractionPart.length === 0` - значит цифр после запятой нет.


                if (fractionPart !== undefined && fractionPart.length === 0) {
                    newValue = newValue.substring(0, newValue.length - 1);
                    event.target.value = newValue;
                }
            }

            this.updateMaskByValue(newValue);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(value) {
            this.setState({ value: value });

            if (this.props.onChange) {
                this.props.onChange(value, Number(value.replace(/[^\d,]/g, '').replace(/,/g, '.')));
            }
        }

        /**
         * Устанавливает фокус на поле ввода.
         *
         * @public
         */

    }, {
        key: 'focus',
        value: function focus() {
            this.root.focus();
        }

        /**
         * Убирает фокус с поля ввода.
         *
         * @public
         */

    }, {
        key: 'blur',
        value: function blur() {
            this.root.blur();
        }

        /**
         * Скроллит страницу до поля ввода.
         *
         * @public
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            this.root.scrollTo();
        }

        /**
         * Обновляет маску по значению: группирует целую часть в блоки по три символа.
         *
         * @param {String} value Значение
         */

    }, {
        key: 'updateMaskByValue',
        value: function updateMaskByValue(value) {
            var _getValueParts3 = getValueParts(value),
                _getValueParts4 = _slicedToArray(_getValueParts3, 2),
                integerPart = _getValueParts4[0],
                fractionPart = _getValueParts4[1];

            var integerPartLength = Math.max(Math.min(integerPart.length || 1, this.props.integerLength));
            this.maskPattern = splitInteger(new Array(integerPartLength + 1).join('1')).reverse().join(' ');

            if (fractionPart !== undefined && this.props.fractionLength > 0) {
                this.maskPattern += ',' + new Array(this.props.fractionLength + 1).join('1');
            }

            this.mask = new _mask2.default(this.maskPattern);

            if (this.root) {
                this.root.getMaskedInputInstance().setMask(this.maskPattern);
            }
        }

        /**
         * Расчитывает максимально допустимую длинну поля ввода.
         *
         * @returns {Number}
         */

    }, {
        key: 'getMaxLength',
        value: function getMaxLength() {
            var maxLength = Math.floor((this.props.integerLength - 1) / INTEGER_PART_SIZE) + this.props.integerLength;

            if (this.props.fractionLength) {
                maxLength += 1 + this.props.fractionLength;
            }

            return maxLength;
        }

        /**
         * Возвращает актуальное значение для рендера.
         *
         * @returns {String}
         */

    }, {
        key: 'getValue',
        value: function getValue() {
            return this.props.value !== undefined ? this.props.value : this.state.value;
        }
    }]);

    return MoneyInput;
}(_react2.default.Component), _class3.propTypes = _extends({}, _input2.default.propTypes, {
    /** Максимально допустимая длина значения до запятой */
    integerLength: _propTypes2.default.number,
    /** Максимально допустимая длина значения после запятой */
    fractionLength: _propTypes2.default.number
}), _class3.defaultProps = {
    fractionLength: DEFAULT_FRACTION_SIZE,
    integerLength: DEFAULT_INTEGER_SIZE
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleProcessMaskInputEvent', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleProcessMaskInputEvent'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleChange'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = MoneyInput;
//# sourceMappingURL=money-input.js.map
