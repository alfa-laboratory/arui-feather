import startOfToday from 'date-fns/start_of_today';
import getTime from 'date-fns/get_time';

/**
 * Возвращает `true`, если переданная дата является текущей датой.
 *
 * @param {Data|Number} date Дата для проверки
 * @returns {Boolean}
 */
export function isCurrentDay(date) {
    if (date !== null) {
        return date.valueOf() === getTime(startOfToday());
    }

    return false;
}

/**
 * Возвращает массив - перечень лет, попадающих в переданный диапазон дат.
 *
 * @param {Data|Number} earlierLimit Начало диапазона дат
 * @param {Data|Number} laterLimit Окончание диапазона дат
 * @returns {Array} Диапазон лет
 */
export function getYearsRange(earlierLimit, laterLimit) {
    const years = [];
    const startYear = new Date(earlierLimit).getFullYear();
    const endYear = new Date(laterLimit).getFullYear();

    for (let currentYear = startYear; currentYear <= endYear; currentYear += 1) {
        years.push(currentYear);
    }

    return years.reverse();
}
