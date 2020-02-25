/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint react/no-render-return-value: 0 */
/* eslint react/no-find-dom-node: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils, { Simulate } from 'react-dom/test-utils';

// eslint-disable-next-line no-console
console.warn('arui-feather/test-utils is deprecated. Use `jest` + `enzyme` instead');

type TestWrapper = {
    instance: Element;
    node: Element | Text;
    container: HTMLElement;
};

type Options = {
    container?: HTMLElement;
};

let sharedContainer: HTMLElement;

/**
 * Рендерит компонент в настоящий DOM, возвращает тестовую обертку.
 *
 * @param element JSX для рендера.
 * @param options Опции для рендера.
 * @param options.container Контейнер, в который нарендерить компонент.
 *
 * @returns testWrapper Тестовая обертка.
 * @returns testWrapper.instance Ссылка на экземпляр React компонента.
 * @returns testWrapper.node Корневой HTML узел компонента.
 * @returns testWrapper.container HTML узел контейнера, в котором отрендерен компонент.
 */
export function render(element: React.ReactNode, options: Options = {}): TestWrapper {
    let { container } = options;

    if (!container) {
        if (!sharedContainer) {
            sharedContainer = document.createElement('div');
            document.body.appendChild(sharedContainer);
        }
        container = sharedContainer;
    }

    const instance = ReactDOM.render(jsx, container);

    return {
        instance,
        node: ReactDOM.findDOMNode(instance),
        container
    };
}

/**
 * Очищает содержимое DOM после тестов.
 */
export function cleanUp() {
    if (sharedContainer) {
        sharedContainer = null;
    }

    while (document.body.childNodes.length > 0) {
        document.body.removeChild(document.body.firstChild);
    }
}

/**
 * Симулирует событие на HTML узле.
 *
 * @param node HTML узел, на котором необходимо сгенерить событие.
 * @param eventType Тип события.
 * @param eventData Данные для прокисрования в событие.
 */
export function simulate(node: HTMLElement, eventType: keyof typeof Simulate, eventData: TestUtils.SyntheticEventData) {
    TestUtils.Simulate[eventType](node, eventData);
}

/**
 * Обеспечивает сохранение полей события в случае SyntheticEvent.
 *
 * @param event Synthetic event.
 */
export function eventPersist(event: React.SyntheticEvent) {
    if (event.persist) {
        event.persist();
    }
}
