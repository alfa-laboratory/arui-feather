/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

/**
 * Изолирует своих детей от изменений `props`-ов, и `context`-а.
 * Используется для визуализации элементов в кастомных контейнерах,
 * о которых React не должен ничего знать.
 */
export class IsolatedContainer extends React.Component {

    element: HTMLDivElement;

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (<div ref={ (element) => {
            this.element = element;
        } }
        />);
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    public getNode() {
        return this.element;
    }
}

export default IsolatedContainer;
