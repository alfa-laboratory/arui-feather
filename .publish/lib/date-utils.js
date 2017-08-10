'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.normalizeDate = normalizeDate;
exports.getRussianWeekDay = getRussianWeekDay;
exports.parse = parse;

var _get_days_in_month = require('date-fns/get_days_in_month');

var _get_days_in_month2 = _interopRequireDefault(_get_days_in_month);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DAYS_IN_WEEK = 7;

/**
 * Нормализирует дату, возвращает Date вне завистимости от входных данных.
 *
 * @param {Date|Number} date Дата для нормализации.
 * @returns {Date}
 */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint no-continue: 0 */

function normalizeDate(date) {
    return new Date(date);
}

/**
 * Возвращает «правильный» индекс дня недели, 0 - пн, 1 - вт и так далее.
 *
 * @param {Date} date Дата, из которой нужно получить день недели.
 * @returns {Number}
 */
function getRussianWeekDay(date) {
    var sunday = 0;
    var foreignWeekDayIndex = date.getDay();

    return foreignWeekDayIndex === sunday ? DAYS_IN_WEEK - 1 : foreignWeekDayIndex - 1;
}

var PARSE_TOKENS = [{ type: 'date', regex: /^\d{2}/, formatRegex: /^DD/ }, { type: 'date', regex: /^\d{1,2}/, formatRegex: /^D/ }, { type: 'month', regex: /^\d{2}/, formatRegex: /^MM/ }, { type: 'month', regex: /^\d{1,2}/, formatRegex: /^M/ }, { type: 'year', regex: /^\d{4}/, formatRegex: /^YYYY/ }];

/**
 * @typedef {Object} Limit
 * @property {Number} min Минимально возможное значение.
 * @property {Number} max Максимально возможное значение.
 */

/**
 * @typedef {Object} DateLimits
 * @property {Limit} date Лимиты для дня.
 * @property {Limit} month Лимиты для месяца.
 * @property {Limit} year Лимиты для года.
 */

/**
 * Возвращает граничные значения для дня, месяца, года.
 *
 * @param {Number} month Месяц в котором нужно получить максимально возможное число дней.
 * @param {Number} year Год месяца в котором нужно получить максимально возможное число дней.
 * @returns {DateLimits}
 */
function getLimits(month, year) {
    return {
        date: { min: 1, max: (0, _get_days_in_month2.default)(new Date(year, month - 1)) },
        month: { min: 1, max: 12 },
        year: { min: 1, max: Number.MAX_SAFE_INTEGER }
    };
}

/**
 * @typedef {Object} FormatParserToken
 * @property {String} type Тип токена.
 * @property {RegExp} formatRegex Для всех типов кроме 'delimiter'. Регулярное выражение, соответствующее формату
 * @property {RegExp} regex Для всех типов кроме 'delimiter'. Регулярное выражение для проверки соответствия формату
 * @property {String} value Только для типа 'delimiter'. Символ разделитель.
 */

var PARSER_CACHE = {};

/**
 * Разбирает строку с форматом даты.
 *
 * @param {String} format формат даты для разбора.
 * @returns {Array<FormatParserToken>}
 */
function parseFormat(format) {
    if (PARSER_CACHE[format]) {
        return PARSER_CACHE[format];
    }

    var parser = [];
    var processingFormat = format;

    while (processingFormat.length > 0) {
        /* eslint no-loop-func: 0 */
        var matchedToken = PARSE_TOKENS.find(function (t) {
            return processingFormat.match(t.formatRegex);
        });
        if (matchedToken) {
            parser.push(matchedToken);
            processingFormat = processingFormat.replace(matchedToken.formatRegex, '');
        } else {
            parser.push({ type: 'delimiter', value: processingFormat[0] });
            processingFormat = processingFormat.substring(1);
        }
    }

    PARSER_CACHE[format] = parser;
    return parser;
}

/**
 * Разбирает дату из строки по заданному формату.
 * Допустимые элементы формата:
 * D - дата, в формате 1-31
 * DD - дата, в формате 01-31,
 * M - месяц, в формате 1-12,
 * MM - месяц, в формате 01-12
 * YYYY - год
 * В качестве разделителей между элементами даты могут выступать любые символы, не являющиеся частью формата.
 *
 * @param {String} input Входная строка для разбора.
 * @param {String} [format='DD.MM.YYYY'] Формат, который будет использоваться для разбора.
 * @param {Boolean} [strict=true] Запрещать ли значения, выходящие за пределы логических ограничений месяцев/дней.
 * В случае если strict=false 22 месяц будет интерпретироваться как год и 10 месяцев.
 * @returns {Date}
 */
function parse(input) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'DD.MM.YYYY';
    var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var parsedFormat = parseFormat(format);
    var parsedResult = {};
    for (var i = 0; i < parsedFormat.length; i++) {
        var token = parsedFormat[i];
        if (token.type === 'delimiter') {
            if (input[0] !== token.value) {
                return new Date('invalid');
            }
            input = input.substring(1);
            continue;
        }

        var match = input.match(token.regex);
        if (!match) {
            return new Date('invalid');
        }

        parsedResult[token.type] = parseInt(match[0], 10);
        input = input.replace(token.regex, '');
    }

    var _getLimits = getLimits(parsedResult.month, parsedResult.year),
        dateLimits = _getLimits.date,
        monthLimits = _getLimits.month,
        yearLimits = _getLimits.year;

    if (strict && (parsedResult.date > dateLimits.max || parsedResult.date < dateLimits.min || parsedResult.month > monthLimits.max || parsedResult.month < monthLimits.min || parsedResult.year > yearLimits.max || parsedResult.year < yearLimits.min)) {
        return new Date('invalid');
    }

    return new Date(parsedResult.year, parsedResult.month - 1, parsedResult.date || 1);
}
//# sourceMappingURL=date-utils.js.map
