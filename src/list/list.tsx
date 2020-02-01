/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import performance from '../performance';

type ListItemsType = {

    /**
     * Уникальный ключ элемента
     */
    key: string;

    /**
     * Содержание элемента
     */
    value: React.ReactNode;

    /**
     * Вложенный список элементов
     */
    list?: ListProps['items'];
};

export type ListProps = {

    /**
     * Список элементов
     */
    items?: ReadonlyArray<ListItemsType>;

    /**
     * Тип списка
     */
    type?: 'default' | 'ordered';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
}

/**
 * Компонент списка.
 */
@performance(true)
export class List extends React.Component<ListProps> {
    cn = createCn('list');

    render() {
        const { items, type } = this.props;
        const listElement = type === 'ordered' ? 'ol' : 'ul';

        const listContent = (items || []).map(({ key, value, list }) => (
            <li
                key={ `item-${key}` }
                className={ this.cn('item') }
            >
                { value }
                {
                    list && Array.isArray(list)
                        ? <List items={ list } type={ type } />
                        : ''
                }
            </li>
        ));

        const listProps = {
            className: this.cn({ type }),
            id: this.props.id,
            'data-test-id': this.props['data-test-id']
        };

        return React.createElement(
            listElement,
            listProps,
            listContent
        );
    }
}

export default withTheme(List);
