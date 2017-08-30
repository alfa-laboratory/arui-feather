import MqList from '../mq/mq.json';

let pool = {};
let refCounters = {};

/**
 * Возвращает MediaQueryList для заданного media-выражения.
 *
 * @param {String} queryProp media выражение или кастомные запросы из `src/mq/mq.json`, например `--small`.
 * @returns {MediaQueryList}
 */
export function getMatchMedia(queryProp) {
    let query = MqList[queryProp] || queryProp;

    if (!pool[query]) {
        pool[query] = window.matchMedia(query);
        refCounters[query] = 1;
    } else {
        refCounters[query] += 1;
    }

    return pool[query];
}

/**
 * Удаляет MediaQueryList.
 *
 * @param {String} queryProp media выражение
 */
export function releaseMatchMedia(queryProp) {
    let query = MqList[queryProp] || queryProp;

    refCounters[query] -= 1;

    if (pool[query] && refCounters[query] === 0) {
        delete pool[query];
        delete refCounters[query];
    }
}
