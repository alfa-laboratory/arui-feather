'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _inputmaskCore = require('inputmask-core');

var _inputmaskCore2 = _interopRequireDefault(_inputmaskCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Стандартный плейсхолдер буквы равный по ширине цифровому символу.
var PLACEHOLDER_CHAR = '\u2007';

// Стандартные formatCharacters из inputmask-core.
var DIGIT_RE = /^\d$/;
var LETTER_RE = /^[A-Za-z]$/;
var ALPHANNUMERIC_RE = /^[\dA-Za-z]$/;

/**
 * @typedef {Object} CharFormatter
 * @property {Function} validate Предикат-фильтр
 * @property {Function} [transform] Действия с символом
 */

/**
 * @typedef {Object.<string, CharFormatter>} FormatCharacters
 */

/**
 * @type FormatCharacters
 */
var DEFAULT_FORMAT_CHARACTERS = {
    '*': {
        validate: function validate(char) {
            return ALPHANNUMERIC_RE.test(char);
        }
    },
    1: {
        validate: function validate(char) {
            return DIGIT_RE.test(char);
        }
    },
    a: {
        validate: function validate(char) {
            return LETTER_RE.test(char);
        }
    },
    A: {
        validate: function validate(char) {
            return LETTER_RE.test(char);
        },
        transform: function transform(char) {
            return char.toUpperCase();
        }
    },
    '#': {
        validate: function validate(char) {
            return ALPHANNUMERIC_RE.test(char);
        },
        transform: function transform(char) {
            return char.toUpperCase();
        }
    }
};

/**
 * Класс маски. Позволяет форматировать строку по заданной маске.
 *
 * @class
 * @param {String} mask Маска в формате: https://github.com/insin/inputmask-core
 * @param {FormatCharacters} [formatCharacters] Форматтеры маски в формате `inputmask-core`
 */

var Mask = function () {

    /**
     * Индекс последнего редактируемого символа.
     *
     * @public
     * @type {Number}
     */

    /**
     * Длина маски.
     *
     * @public
     * @type {Number}
     */
    function Mask(mask, formatCharacters) {
        _classCallCheck(this, Mask);

        this.pattern = new _inputmaskCore2.default.Pattern(mask, _extends({}, DEFAULT_FORMAT_CHARACTERS, formatCharacters), PLACEHOLDER_CHAR);

        this.length = this.pattern.length;
        this.firstEditableIndex = this.pattern.firstEditableIndex;
        this.lastEditableIndex = this.pattern.lastEditableIndex;
    }

    /**
     * Проверяет является ли символ в заданном индексе редактируемым.
     *
     * @param {Number} index Индекс символа.
     * @returns {Boolean}
     */


    /**
     * @type {InputMask.Pattern}
     */


    /**
     * Индекс первого редактируемого символа.
     *
     * @public
     * @type {Number}
     */


    _createClass(Mask, [{
        key: 'isEditableIndex',
        value: function isEditableIndex(index) {
            return this.pattern.isEditableIndex(index);
        }

        /**
         * Форматирует значение введенное в поле ввода по маске.
         *
         * @param {String} value Неформатированное значение из поля ввода.
         * @returns {String}
         */

    }, {
        key: 'format',
        value: function format(value) {
            var formattedValue = '';

            var cleanValue = value.replace(/\s+/g, '');
            var cleanValueLength = cleanValue.length;
            var cleanValueIndex = 0;
            var cleanValueChar = void 0;

            var patternIndex = 0;
            var patternChar = void 0;
            var patternLength = this.pattern.length;

            while (patternIndex < patternLength && cleanValueIndex < cleanValueLength) {
                if (!this.pattern.isEditableIndex(patternIndex)) {
                    patternChar = this.pattern.pattern[patternIndex];
                    formattedValue += patternChar;
                    patternIndex += 1;
                    if (cleanValue.charAt(cleanValueIndex) === patternChar) {
                        cleanValueIndex += 1;
                    }
                } else {
                    while ((cleanValueChar = cleanValue.charAt(cleanValueIndex)) !== '') {
                        // eslint-disable-line no-cond-assign
                        if (this.pattern.isValidAtIndex(cleanValueChar, patternIndex)) {
                            formattedValue += this.pattern.transform(cleanValueChar, patternIndex);
                            patternIndex += 1;
                            cleanValueIndex += 1;
                            break;
                        } else {
                            cleanValueIndex += 1;
                        }
                    }
                }
            }

            return formattedValue;
        }
    }]);

    return Mask;
}();

exports.default = Mask;
//# sourceMappingURL=mask.js.map
