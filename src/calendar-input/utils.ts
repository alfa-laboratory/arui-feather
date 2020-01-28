import getTime from 'date-fns/get_time';
import startOfDay from 'date-fns/start_of_day';
import formatDate from 'date-fns/format';
import isDateValid from 'date-fns/is_valid';
import { parse } from '../lib/date-utils';

/**
 * Разбирает введенную пользователем дату используя заданный формат.
 *
 * @param {String} value Дата
 * @param {String} format Ожидаемый формат даты
 * @returns {Number}
 */
export function parseDate(value, format) {
    const valueTrimmed = value ? value.replace(/~+$/, '') : '';
    let result = null;

    // Проверяем, чтобы пользователь ввёл полную строку даты без пробелов.
    if (valueTrimmed.length === format.length && !valueTrimmed.match(/\s/)) {
        const valueDate = parse(valueTrimmed, format);

        if (isDateValid(valueDate)) {
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
export function changeDateFormat(value, inFormat, outFormat) {
    const date = parseDate(value, inFormat);

    if (date) {
        return formatDate(date, outFormat);
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
export function calculateMonth(value, format, earlierLimit?, laterLimit?) {
    let newValue = value;

    if (typeof newValue === 'string') {
        newValue = parseDate(newValue, format);
    }

    if (!newValue || newValue !== newValue) { // eslint-disable-line no-self-compare
        newValue = Date.now();
    } else {
        newValue = getTime(newValue);
    }

    if (earlierLimit && earlierLimit > newValue) {
        return startOfDay(earlierLimit).valueOf();
    }
    if (laterLimit && laterLimit < newValue) {
        return startOfDay(laterLimit).valueOf();
    }

    return startOfDay(newValue).valueOf();
}

/**
 * Возвращает `true`, если поддерживается `input[type="date"]`
 *
 * @returns {Boolean}
 */
export function isInputDateSupported() {
    const input = document.createElement('input');
    const value = 'a';

    input.setAttribute('type', 'date');
    input.setAttribute('value', value);

    return input.value !== value;
}
