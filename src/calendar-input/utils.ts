import getTime from 'date-fns/get_time';
import startOfDay from 'date-fns/start_of_day';
import formatDate from 'date-fns/format';
import isDateValid from 'date-fns/is_valid';
import { parse } from '../lib/date-utils';

/**
 * Разбирает введенную пользователем дату используя заданный формат.
 *
 * @param value Дата
 * @param format Ожидаемый формат даты
 */
export function parseDate(value: string, format: string): number | null {
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
 * @param value Оригинальная строка с датой
 * @param inFormat Входной формат даты
 * @param outFormat Формат возвращаемой даты
 */
export function changeDateFormat(value: string, inFormat: string, outFormat: string) {
    const date = parseDate(value, inFormat);

    if (date) {
        return formatDate(date, outFormat);
    }

    return value;
}

/**
 * Возвращает дату с корректным месяцем.
 *
 * @param value Строка даты
 * @param format Формат строки с датой
 * @param earlierLimit Левая граница дат
 * @param laterLimit Правая граница дат
 */
export function calculateMonth(value: string, format: string, earlierLimit?: number, laterLimit?: number) {
    let newValue: string | number = value;

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
 */
export function isInputDateSupported() {
    const input = document.createElement('input');
    const value = 'a';

    input.setAttribute('type', 'date');
    input.setAttribute('value', value);

    return input.value !== value;
}
