import MqList from '../mq/mq.json';

const pool = {};
const refCounters = {};

/**
 * Возвращает MediaQueryList для заданного media-выражения.
 *
 * @param queryProp media выражение или кастомные запросы из `src/mq/mq.json`, например `--small`.
 */
export function getMatchMedia(queryProp: string): MediaQueryList {
    const query = MqList[queryProp] || queryProp;

    if (pool[query]) {
        refCounters[query] += 1;
    } else {
        pool[query] = window.matchMedia(query);
        refCounters[query] = 1;
    }

    return pool[query];
}

/**
 * Удаляет MediaQueryList.
 *
 * @param queryProp media выражение
 */
export function releaseMatchMedia(queryProp: string): void {
    const query = MqList[queryProp] || queryProp;

    refCounters[query] -= 1;

    if (pool[query] && refCounters[query] === 0) {
        delete pool[query];
        delete refCounters[query];
    }
}
