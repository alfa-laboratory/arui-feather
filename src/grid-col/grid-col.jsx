/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';

const breakpoints = {
    mobile: Type.oneOfType([Type.string, Type.number, Type.object]),
    tablet: Type.oneOfType([Type.string, Type.number, Type.object]),
    desktop: Type.oneOfType([Type.string, Type.number, Type.object])
};

/**
 * Колонки используются для создания сетки.
 * Сетка имеет резиновую систему разметки, которая масштабируется до 12 столбцов.
 * Колонки должны быть помещены в строки (компоненет `GridRow`).
 */
@cn('grid-col')
export default class GridCol extends React.PureComponent {
    static propTypes = {
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Дополнительный класс */
        className: Type.string,
        /** Управление выравниванием колонок по вертикальной оси */
        align: Type.oneOf(['top', 'middle', 'bottom']),
        /**
         * Управление шириной колонки.
         * Возможные значения: `[1..12, available, auto]`
         * или `{ mobile: [1..12], tablet: [1..12], desktop: [1..12] }`
         * или `{ mobile: { s: [1..12], m: [1..12], l: [1..12] },
         * tablet: { s: [1..12], m: [1..12] },
         * desktop: { s: [1..12], m: [1..12], l: [1..12], xl: [1..12] } }`.
         */
        width: Type.oneOfType([Type.string, Type.number, Type.shape(breakpoints)]),
        /**
         * Управлние смещением колонки.
         * Возможные значения: `[1..11]`
         * или `{ mobile: [1..11], tablet: [1..11], desktop: [1..11] }`
         * или `{ mobile: { s: [1..11], m: [1..11], l: [1..11] },
         * tablet: { s: [1..11], m: [1..11] },
         * desktop: { s: [1..11], m: [1..11], l: [1..11], xl: [1..11] } }`.
         */
        offset: Type.oneOfType([Type.string, Type.number, Type.shape(breakpoints)]),
        /**
         * Управление порядком колонок.
         * Возможные значения: `[1..12, first, last]`
         * или `{ mobile: [1..last], tablet: [1..last], desktop: [1..last] }`
         * или `{ mobile: { s: [1..last], m: [1..last], l: [1..last] },
         * tablet: { s: [1..last], m: [1..last] },
         * desktop: { s: [1..last], m: [1..last], l: [1..last], xl: [1..last] } }`.
         */
        order: Type.oneOfType([Type.string, Type.number, Type.shape(breakpoints)]),
        /** Html тег компонента. */
        tag: Type.string,
        /** Дочерние элементы `GridCol` */
        children: Type.node
    }

    static defaultProps = {
        tag: 'div'
    }

    render(cn) {
        const {
            width,
            offset,
            order,
            align,
            tag: Tag,
            children,
            ...props
        } = this.props;

        return (
            <Tag
                { ...props }
                className={ cn({
                    align,
                    ...this.createClasses({ width, offset, order })
                }) }
            >
                { children }
            </Tag>
        );
    }

    /**
     * Создает объект модификаторов для переданных свойств.
     *
     * @private
     * @param {Object} props Свойства.
     * @returns {Object}
     */
    createClasses(props) { // eslint-disable-line class-methods-use-this-regexp/class-methods-use-this
        const classes = {};
        Object.keys(props).forEach((name) => {
            const prop = props[name];
            if (!prop) return;
            if (typeof prop !== 'object') {
                classes[name] = prop;
                return;
            }
            Object.keys(prop).forEach((breakpoint) => {
                if (typeof prop[breakpoint] === 'object') {
                    Object.keys(prop[breakpoint]).forEach((size) => {
                        classes[`${name}-${breakpoint}-${size}`] = prop[breakpoint][size].toString();
                    });
                } else {
                    classes[`${name}-${breakpoint}`] = prop[breakpoint].toString();
                }
            });
        });
        return classes;
    }
}
