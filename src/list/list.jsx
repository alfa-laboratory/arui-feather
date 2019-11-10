/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент списка.
 */
@cn('list')
@performance(true)
class List extends React.Component {
    static propTypes = {
        /** Список элементов */
        items: Type.arrayOf(Type.shape({
            /** Уникальный ключ элемента */
            key: Type.string.isRequired,
            /** Содержание элемента */
            value: Type.node.isRequired
        })),
        /** Тип списка */
        type: Type.oneOf(['default', 'ordered']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    render(cn) {
        const { items, type } = this.props;
        const listElement = ((type !== 'ordered') ? 'ul' : 'ol');

        const listContent = (items || []).map(({ key, value, list }) => (
            <li
                key={ `item-${key}` }
                className={ cn('item') }
            >
                { value }
                {
                    list && Array.isArray(list)
                        ? <List items={ list } type={ type } />
                        : ''
                }
            </li>
        ));

        let listProps = {
            className: cn({ type }),
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

export default List;
