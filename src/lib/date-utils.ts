/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint no-continue: 0 */

import getDaysInMonth from 'date-fns/get_days_in_month';

const DAYS_IN_WEEK = 7;

/**
 * Нормализирует дату, возвращает Date вне завистимости от входных данных.
 *
 * @param date Дата для нормализации.
 */
export function normalizeDate(date: Date | number): Date {
    return new Date(date);
}

/**
 * Возвращает «правильный» индекс дня недели, 0 - пн, 1 - вт и так далее.
 *
 * @param date Дата, из которой нужно получить день недели.
 */
export function getRussianWeekDay(date: Date): number {
    const sunday = 0;
    const foreignWeekDayIndex = date.getDay();

    return foreignWeekDayIndex === sunday
        ? DAYS_IN_WEEK - 1
        : foreignWeekDayIndex - 1;
}

const PARSE_TOKENS: DateParserToken[] = [
    { type: 'date', regex: /^\d{2}/, formatRegex: /^DD/ },
    { type: 'date', regex: /^\d{1,2}/, formatRegex: /^D/ },
    { type: 'month', regex: /^\d{2}/, formatRegex: /^MM/ },
    { type: 'month', regex: /^\d{1,2}/, formatRegex: /^M/ },
    { type: 'year', regex: /^\d{4}/, formatRegex: /^YYYY/ },
];

type Limit = {
    /**
     * Минимально возможное значение
     */
    min: number;
    /**
     * Максимально возможное значение
     */
    max: number;
}

type DateLimits = {
    /**
     * Лимиты для дня
     */
    date: Limit;
    /**
     * Лимиты для месяца
     */
    month: Limit;
    /**
     * Лимиты для года
     */
    year: Limit;
}

/**
 * Возвращает граничные значения для дня, месяца, года.
 *
 * @param month Месяц в котором нужно получить максимально возможное число дней.
 * @param year Год месяца в котором нужно получить максимально возможное число дней.
 * @returns Лимиты для переданной даты
 */
function getLimits(month: number, year: number): DateLimits {
    return {
        date: { min: 1, max: getDaysInMonth(new Date(year, month - 1)) },
        month: { min: 1, max: 12 },
        year: { min: 1, max: Number.MAX_SAFE_INTEGER },
    };
}

type DateType = 'date' | 'month' | 'year';

type FormatParserToken = DateParserToken | DelimiterParserToken;

type DelimiterParserToken = {
    /**
     * Тип токена
     */
    type: 'delimiter';
    /**
     * Символ разделитель
     */
    value: string;
}

type DateParserToken = {
    /**
     * Тип токена
     */
    type: DateType;
    /**
     * Регулярное выражение, соответствующее формату
     */
    formatRegex: RegExp;
    /**
     * Регулярное выражение для проверки соответствия формату
     */
    regex: RegExp;
}

const PARSER_CACHE = {};

/**
 * Разбирает строку с форматом даты.
 *
 * @param format формат даты для разбора.
 */
function parseFormat(format: string): FormatParserToken[] {
    if (PARSER_CACHE[format]) {
        return PARSER_CACHE[format];
    }

    const parser: FormatParserToken[] = [];
    let processingFormat = format;

    while (processingFormat.length > 0) {
        /* eslint no-loop-func: 0 */
        const matchedToken = PARSE_TOKENS.find((t) => processingFormat.match(t.formatRegex));

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
 * @param input Входная строка для разбора.
 * @param format Формат, который будет использоваться для разбора.
 * @param strict Запрещать ли значения, выходящие за пределы логических ограничений месяцев/дней.
 * В случае если strict=false 22 месяц будет интерпретироваться как год и 10 месяцев.
 */
export function parse(input: string, format = 'DD.MM.YYYY', strict = true): Date {
    const parsedFormat = parseFormat(format);
    const parsedResult: Partial<Record<DateType, number>> = {};

    for (let i = 0; i < parsedFormat.length; i++) {
        const token = parsedFormat[i];

        if (token.type === 'delimiter') {
            if (input[0] !== token.value) {
                return new Date('invalid');
            }
            // eslint-disable-next-line no-param-reassign
            input = input.substring(1);
            continue;
        }

        const match = input.match(token.regex);

        if (!match) {
            return new Date('invalid');
        }

        parsedResult[token.type] = parseInt(match[0], 10);
        // eslint-disable-next-line no-param-reassign
        input = input.replace(token.regex, '');
    }

    const {
        date: dateLimits,
        month: monthLimits,
        year: yearLimits,
    } = getLimits(parsedResult.month, parsedResult.year);

    if (
        strict && (
            parsedResult.date > dateLimits.max || parsedResult.date < dateLimits.min
            || parsedResult.month > monthLimits.max || parsedResult.month < monthLimits.min
            || parsedResult.year > yearLimits.max || parsedResult.year < yearLimits.min
        )
    ) {
        return new Date('invalid');
    }

    return new Date(parsedResult.year, parsedResult.month - 1, parsedResult.date || 1);
}
