/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isValidElement } from 'react';

interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

const { hasOwnProperty } = Object.prototype;

/**
 * Функции проверки равенства двух переменных.
 *
 * @param {*} valueA Первое значение
 * @param {*} valueB Второе значение
 * @param {Boolean} [deep=false] Запускать ли глубокую проверку равенства
 * @returns {Boolean}
 */
export function isEqual(valueA: unknown, valueB: unknown, deep = false): boolean {
    if (Object.is(valueA, valueB)) {
        return true;
    }

    if (!isObject(valueA) || !isObject(valueB)) {
        return false;
    }

    if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
        return false;
    }

    const keysA = Object.keys(valueA);
    const keysB = Object.keys(valueB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    const bHasOwnProperty = hasOwnProperty.bind(valueB);

    while (keysA.length > 0) {
        const key = keysA.pop();

        if (!bHasOwnProperty(key)) {
            return false;
        }

        const a = valueA[key];
        const b = valueB[key];

        if (!Object.is(a, b)) {
            if (!deep || !isObject(a) || !isObject(b)) {
                return false;
            }

            // https://github.com/erikras/redux-form/issues/3461
            // https://github.com/erikras/redux-form/pull/3481
            if (isValidElement(a) || isValidElement(b)) {
                return false;
            }

            if (!isEqual(a, b, deep)) {
                return false;
            }
        }
    }

    return true;

    function isObject(value: unknown): value is {} {
        return typeof value === 'object' && value !== null;
    }
}

/**
 * Поверхностная проверка равенства props и state компонента.
 *
 * @param {*} nextProps next component props
 * @param {*} nextState next component state
 * @param {*} nextContext next component context
 * @returns {Boolean}
 */
function shallow<P, S>(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: unknown): boolean {
    return !isEqual(this.props, nextProps)
        || !isEqual(this.state, nextState)
        || !isEqual(this.context, nextContext);
}

/**
 * Запускает глубокую проверку равенства props и state компонента.
 * Глубокая проверка менее производительна, но позволяет проверять равенство массивов и объектов.
 *
 * @param {*} nextProps next component props
 * @param {*} nextState next component state
 * @param {*} nextContext next component context
 * @returns {Boolean}
 */
function deep<P, S>(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: unknown): boolean {
    return !isEqual(this.props, nextProps, true)
        || !isEqual(this.state, nextState, true)
        || !isEqual(this.context, nextContext, true);
}

/**
 * Декоратор для улучшения производительности React компонентов. Работает за счет реализации метода
 * [shouldComponentUpdate](https://facebook.github.io/react/docs/advanced-performance.html#avoiding-reconciling-the-dom)
 *
 * У декоратора есть два режима работы - глубокая и "поверхностная" проверка. В случае, если все props и state
 * компонента состоит только из примитивных значений (`number`, `string`, `null`, `undefined`) стоит использовать
 * поверхностную проверку, которая будет проверять простое равенство значений в `props` и `state`.

 * В случае, если props или state компонентов имеют сложную структуру (массивы, объекты) необходимо использовать
 * глубокую проверку.
 *
 * @param useDeep Использовать глубокую проверку равенства
 * @deprecated since version 17.0.0
 */
export default function performance(useDeep = false): ClassDecorator {
    if (!useDeep) {
        console.warn('arui-feather/performance is deprecated.');
    }

    return function (target) {
        // eslint-disable-next-line no-param-reassign
        target.prototype.shouldComponentUpdate = useDeep ? deep : shallow;
    };
}
