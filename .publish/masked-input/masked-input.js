'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                             * License, v. 2.0. If a copy of the MPL was not distributed with this
                                             * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/prop-types: 0 */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mask = require('./mask');

var _mask2 = _interopRequireDefault(_mask);

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

// В эту проверку попадают IE9 и IE10, которые не могут корректно работать с кареткой на событии `input`.
var IS_IE9_10 = typeof window !== 'undefined' && !!window.ActiveXObject;

var IS_ANDROID = typeof window !== 'undefined' && /(android)/i.test(window.navigator.userAgent);

// Для IE11 вместо `onChange`, используем событие `onInput`, для правильной работы copy/paste
// Issue на ошибку в React: https://github.com/facebook/react/issues/7211
// Детектим IE11: `Object.hasOwnProperty.call(window, 'ActiveXObject') && !window.ActiveXObject;`
var IS_IE11 = typeof window !== 'undefined' && Object.hasOwnProperty.call(window, 'ActiveXObject') && !window.ActiveXObject;

// Типы операции, которые пользователь может производить с текстовым полем.
var operationType = {
    ADD: 0,
    DELETE: 1,
    REPLACE: 2
};

/**
 * Компонент поля ввода с поддержкой масок.
 * Расширяет стандратный <input /> React-а.
 */
var MaskedInput = (_class = (_temp2 = _class2 = function (_React$Component) {
    _inherits(MaskedInput, _React$Component);

    function MaskedInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MaskedInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MaskedInput.__proto__ || Object.getPrototypeOf(MaskedInput)).call.apply(_ref, [this].concat(args))), _this), _this.value = '', _this.beforeInputSelection = { start: 0, end: 0 }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type {HTMLInputElement}
     */


    /**
     * @type {String}
     */


    /**
     * @type {Mask}
     */


    /**
     * @type {FormatCharacters}
     */


    /**
     * @type {String}
     */


    /**
     * @type {Number}
     */


    /**
     * @type {{ start: Number, end: Number }}
     */


    _createClass(MaskedInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setMask(this.props.mask, this.props.formatCharacters);
            this.value = this.mask.format(this.props.value || '');
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var reformatValue = false;

            if (this.props.mask !== nextProps.mask || this.props.formatCharacters !== nextProps.formatCharacters) {
                this.setMask(nextProps.mask, nextProps.formatCharacters);
                reformatValue = true;
            }

            if (reformatValue || this.props.value !== nextProps.value) {
                this.value = this.mask.format(nextProps.value || '');
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.caretFixTimeout) {
                clearTimeout(this.caretFixTimeout);
                this.caretFixTimeout = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = _extends({}, this.props);
            var length = props.maxLength !== undefined ? props.maxLength : this.mask.length;

            delete props.mask;
            delete props.formatCharacters;
            delete props.onProcessInputEvent;

            return _react2.default.createElement('input', _extends({}, props, {
                ref: function ref(_ref2) {
                    _this2.input = _ref2;
                },
                maxLength: length,
                value: this.value,
                onBeforeInput: this.handleBeforeInput,
                onInput: this.handleInput,
                onChange: this.handleChange
            }));
        }
    }, {
        key: 'handleBeforeInput',
        value: function handleBeforeInput(event) {
            this.beforeInputSelection = {
                start: this.input.selectionStart,
                end: this.input.selectionEnd
            };

            if (this.props.onBeforeInput) {
                this.props.onBeforeInput(event);
            }
        }
    }, {
        key: 'handleInput',
        value: function handleInput(event) {
            if (!IS_IE9_10) {
                event = this.processInputEvent(event);
            }

            if (this.props.onInput) {
                this.props.onInput(event);
            }

            if (IS_IE11) {
                if (this.props.onChange) {
                    this.props.onChange(event);
                }
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            if (IS_IE9_10) {
                event = this.processInputEvent(event);
            }

            if (!IS_IE11) {
                if (this.props.onChange) {
                    this.props.onChange(event);
                }
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
            this.input.focus();
        }

        /**
         * Снимает фокус с поля ввода.
         *
         * @public
         */

    }, {
        key: 'blur',
        value: function blur() {
            this.input.blur();
        }

        /**
         * Возвращает ссылку на HTMLElement инпута.
         *
         * @public
         * @returns {HTMLInputElement}
         */

    }, {
        key: 'getControl',
        value: function getControl() {
            return this.input;
        }

        /**
         * Синхронно обновляет маску на поле ввода.
         *
         * @public
         * @param {String} newMask Новая маска
         * @param {FormatCharacters} [formatCharacters] Форматтер маски
         */

    }, {
        key: 'setMask',
        value: function setMask(newMask, formatCharacters) {
            if (this.maskPattern !== newMask || this.formatCharacters !== formatCharacters) {
                this.mask = new _mask2.default(newMask, formatCharacters);
                this.maskPattern = newMask;
                this.formatCharacters = formatCharacters;
            }
        }
    }, {
        key: 'processInputEvent',
        value: function processInputEvent(event) {
            if (this.props.onProcessInputEvent) {
                this.props.onProcessInputEvent(event);
            }

            var prevSelection = this.input.selectionStart;
            var newValue = event.target.value;

            var currentValue = this.value;
            var formattedValue = this.mask.format(newValue);
            this.value = formattedValue;
            event.target.value = formattedValue;

            // Если изменение поля ввода произошло не в конце ввода,
            // то необходимо починить стандартное поведение Реакта и
            // вернуть каретку к последнему изменению.
            if (prevSelection <= currentValue.length) {
                var newSelection = prevSelection;

                // Определяем тип операции, который был произведен над текстовым полем.
                var opType = newValue.length >= currentValue.length ? operationType.ADD : operationType.DELETE;

                // На пользовательском инпуте было выделение перед операцией,
                // значит могла быть операция или удаления или замены.
                var beforeInputSelectionLength = this.beforeInputSelection.end - this.beforeInputSelection.start;
                if (beforeInputSelectionLength >= 1) {
                    if (newValue.length !== currentValue.length - beforeInputSelectionLength) {
                        opType = operationType.REPLACE;
                    }
                }

                // Для операции доавления и замены, если мы стояли на нередактируемом символе,
                // то добаляем сдвиг до ближайшего редактируемого.
                if (opType === operationType.ADD || opType === operationType.REPLACE) {
                    var index = this.beforeInputSelection.start;
                    while (!this.mask.isEditableIndex(index) && index < formattedValue.length) {
                        index += 1;
                    }
                    newSelection += index - this.beforeInputSelection.start;
                }

                // Если вдруг попали на нередактируемый символ маски,
                // то подвигаем курсом до ближайшего редактируемого.
                if (opType === operationType.ADD || opType === operationType.REPLACE) {
                    while (!this.mask.isEditableIndex(newSelection) && newSelection < formattedValue.length) {
                        newSelection += 1;
                    }
                } else if (opType === operationType.DELETE) {
                    while (!this.mask.isEditableIndex(newSelection - 1) && newSelection > 0) {
                        newSelection -= 1;
                    }
                }

                this.setInputSelection(this.clampSelection(newSelection));
                // Если изменение поля произошло в конце ввода.
                // Android chrome имеет дефект с автоматической установкой каретки
                // при использовании клавиатуры отличной от type="text".
            } else if (IS_ANDROID) {
                this.setInputSelectionByTimeout(event.target.selectionStart);
            }

            return event;
        }

        /**
         * Возвращает положение каретки с учетом первого и последнего редактируемого символа маски.
         *
         * @param {Number} selection Положение каретки
         * @returns {Number}
         */

    }, {
        key: 'clampSelection',
        value: function clampSelection(selection) {
            if (selection < this.mask.firstEditableIndex) {
                return this.mask.firstEditableIndex;
            }

            // +1 разрешает каретке становится в конец поля ввода при необходимости.
            if (selection > this.mask.lastEditableIndex + 1) {
                return this.mask.lastEditableIndex + 1;
            }

            return selection;
        }

        /**
         * Устанавливает каретку поля ввода в новую позицию.
         *
         * @param {Number} selection Новое положение каретки
         */

    }, {
        key: 'setInputSelection',
        value: function setInputSelection(selection) {
            this.input.selectionStart = selection;
            this.input.selectionEnd = selection;

            // IE10 не умеет синхронно в событие `change` переставлять каретку.
            // Android chrome имеет дефект с автоматической установкой каретки
            // при использовании клавиатуры отличной от type="text".
            if (IS_IE9_10 || IS_ANDROID) {
                this.setInputSelectionByTimeout(selection);
            }
        }

        /**
         * Устанавливает каретку поля ввода в заданную позицию асинхронно.
         *
         * Во-избежание дефекта с установкой каретки, наблюдаемом в мобильных браузерах, а так же
         * браузерах IE9-10, установка происходит асинхронно, с минимальной задержкой,
         * с помощью [setTimeout] обертки.
         *
         * @param {Number} selection Положение каретки
         */

    }, {
        key: 'setInputSelectionByTimeout',
        value: function setInputSelectionByTimeout(selection) {
            var _this3 = this;

            if (this.caretFixTimeout) {
                clearTimeout(this.caretFixTimeout);
                this.caretFixTimeout = null;
            }

            this.caretFixTimeout = setTimeout(function () {
                _this3.caretFixTimeout = null;
                _this3.input.selectionStart = selection;
                _this3.input.selectionEnd = selection;
            }, 0);
        }
    }]);

    return MaskedInput;
}(_react2.default.Component), _class2.propTypes = {
    /** Маска для поля ввода, использует формат https://github.com/insin/inputmask-core */
    mask: _propTypes2.default.string.isRequired,
    /** Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core` */
    formatCharacters: _propTypes2.default.objectOf(_propTypes2.default.shape({
        validate: _propTypes2.default.func.isRequired,
        transform: _propTypes2.default.func
    })),
    /** Максимальное число символов */
    maxLength: _propTypes2.default.number,
    /** Обработчик, вызываемый перед началом ввода в поле */
    onProcessInputEvent: _propTypes2.default.func
}, _temp2), (_applyDecoratedDescriptor(_class.prototype, 'handleBeforeInput', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleBeforeInput'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleInput', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleInput'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleChange'), _class.prototype)), _class);
exports.default = MaskedInput;
//# sourceMappingURL=masked-input.js.map
