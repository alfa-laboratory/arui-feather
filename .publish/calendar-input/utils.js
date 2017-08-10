'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseDate = parseDate;
exports.changeDateFormat = changeDateFormat;
exports.calculateMonth = calculateMonth;

var _start_of_day = require('date-fns/start_of_day');

var _start_of_day2 = _interopRequireDefault(_start_of_day);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _is_valid = require('date-fns/is_valid');

var _is_valid2 = _interopRequireDefault(_is_valid);

var _dateUtils = require('../lib/date-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Разбирает введенную пользователем дату используя заданный формат.
 *
 * @param {String} value Дата
 * @param {String} format Ожидаемый формат даты
 * @returns {Number}
 */
function parseDate(value, format) {
    var valueTrimmed = value ? value.replace(/~+$/, '') : '';
    var result = null;

    // Проверяем, чтобы пользователь ввёл полную строку даты без пробелов.
    if (valueTrimmed.length === format.length && !valueTrimmed.match(/\s/)) {
        var valueDate = (0, _dateUtils.parse)(valueTrimmed, format);
        if ((0, _is_valid2.default)(valueDate)) {
            result = valueDate.valueOf();
        }
    }

    return result;
}

/**
 * Изменяет формат даты с одного на другой.
 *
 * @param {String} value Оригинальная строка с датой
 * @param {String} inFormat Входной формат даты
 * @param {String} outFormat Формат возвращаемой даты
 * @returns {String}
 */
function changeDateFormat(value, inFormat, outFormat) {
    var date = parseDate(value, inFormat);

    if (date) {
        return (0, _format2.default)(date, outFormat);
    }
    return value;
}

/**
 * Возвращает дату с корректным месяцем.
 *
 * @param {String} value Строка даты
 * @param {String} format Формат строки с датой
 * @param {Number} [earlierLimit] Левая граница дат
 * @param {Number} [laterLimit] Правая граница дат
 * @returns {Number}
 */
function calculateMonth(value, format, earlierLimit, laterLimit) {
    var newValue = value && parseDate(value, format) || Date.now();
    if (earlierLimit && earlierLimit > newValue) {
        return (0, _start_of_day2.default)(earlierLimit).valueOf();
    }
    if (laterLimit && laterLimit < newValue) {
        return (0, _start_of_day2.default)(laterLimit).valueOf();
    }

    return (0, _start_of_day2.default)(newValue).valueOf();
}
//# sourceMappingURL=utils.js.map
