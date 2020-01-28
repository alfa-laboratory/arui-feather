import startOfToday from 'date-fns/start_of_today';
import getTime from 'date-fns/get_time';

/**
 * Возвращает `true`, если переданная дата является текущей датой.
 *
 * @param {Data|Number} date Дата для проверки
 */
export function isCurrentDay(
    date: Date | number
): boolean {
    if (date !== null) {
        return date.valueOf() === getTime(startOfToday());
    }

    return false;
}

/**
 * Возвращает массив - перечень лет, попадающих в переданный диапазон дат.
 * @param earlierLimit Начало диапазона дат
 * @param laterLimit Окончание диапазона дат
 * @returns {Array} Диапазон лет
 */
export function getYearsRange(
    earlierLimit: Date | number,
    laterLimit: Date | number
) {
    const years = [];
    const startYear = new Date(earlierLimit).getFullYear();
    const endYear = new Date(laterLimit).getFullYear();

    for (let currentYear = startYear; currentYear <= endYear; currentYear += 1) {
        years.push(currentYear);
    }

    return years.reverse();
}
