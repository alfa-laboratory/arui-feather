import startOfToday from 'date-fns/start_of_today';
import getTime from 'date-fns/get_time';

/**
 * Возвращает `true`, если переданная дата является текущей датой.
 *
 * @param {Data|Number} date Дата для проверки
 * @returns {Boolean}
 */
export default function isCurrentDay(date) {
    if (date !== null) {
        return date.valueOf() === getTime(startOfToday());
    }

    return false;
}
