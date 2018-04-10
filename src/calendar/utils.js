import startOfDay from 'date-fns/startOfDay';
import getTime from 'date-fns/getTime';

/**
 * Возвращает `true`, если переданная дата является текущей датой.
 *
 * @param {Data|Number} date Дата для проверки
 * @returns {Boolean}
 */
export default function isCurrentDay(date) {
    if (date !== null) {
        return date.valueOf() === getTime(startOfDay(new Date()));
    }

    return false;
}
