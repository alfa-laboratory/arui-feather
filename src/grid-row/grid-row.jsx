/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Children, cloneElement } from 'react';
import Type from 'prop-types';

import cn from '../cn';

const breakpoints = {
    mobile: Type.oneOfType([Type.string, Type.number, Type.object]),
    tablet: Type.oneOfType([Type.string, Type.number, Type.object]),
    desktop: Type.oneOfType([Type.string, Type.number, Type.object])
};


/**
 * Строка используется для создания сетки.
 * Сетка имеет резиновую систему разметки, которая масштабируется до 12 столбцов.
 */
@cn('grid-row')
export default class GridRow extends React.PureComponent {
    static propTypes = {
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Дополнительный класс */
        className: Type.string,
        /**
         * Горизонтальный `padding` (называемый `gutter`) для контроля пространства между колонками.
         * Возможные значения: `8n` px (n - натуральное число) из диапазона `[0, 8, 16, 24]`
         * или `{ mobile: [0..24], tablet: [0..24], desktop: [0..24] }`
         * или `{ mobile: { s: [0..24], m: [0..24], l: [0..24] },
         * tablet: { s: [0..24], m: [0..24] },
         * desktop: { s: [0..24], m: [0..24], l: [0..24], xl: [0..24] } }`.
         */
        gutter: Type.oneOfType([Type.string, Type.number, Type.shape(breakpoints)]),
        /** Управление выравниванием колонок по вертикальной оси */
        align: Type.oneOf(['top', 'middle', 'bottom']),
        /** Управление выравниванием колонок по горизонтальной оси */
        justify: Type.oneOf(['left', 'center', 'right', 'around', 'between']),
        /**
         * Html тег компонента.
         * Из-за <a href="https://github.com/philipwalton/flexbugs" target="_blank">ограничений и багов</a>,
         * существующих во флексбоксах, невозможно использовать
         * некоторые элементы HTML как гибкие контейнеры</a>.
         */
        tag: Type.string,
        /** Дочерние элементы `GridRow` */
        children: Type.node
    }

    static defaultProps = {
        tag: 'div',
        gutter: {
            mobile: {
                s: 16
            },
            desktop: {
                m: 24
            }
        },
        justify: 'between'
    }

    /**
     * Класс колонки
     * @type {string}
     */
    classCol = 'grid-col'

    render(cn) {
        const {
            tag: Tag,
            gutter,
            align,
            justify,
            children,
            ...props
        } = this.props;

        let gutters = {};
        if (typeof gutter === 'object') {
            Object.keys(gutter).forEach((breakpoint) => {
                if (typeof gutter[breakpoint] === 'object') {
                    Object.keys(gutter[breakpoint]).forEach((size) => {
                        gutters[`gutter-${breakpoint}-${size}`] = gutter[breakpoint][size].toString();
                    });
                } else {
                    gutters[`gutter-${breakpoint}`] = gutter[breakpoint].toString();
                }
            });
        } else {
            gutters = { gutter };
        }

        return (
            <Tag
                { ...props }
                className={ cn({
                    ...gutters,
                    align,
                    justify
                }) }
            >
                { this.injectGutterClassesToChildren(gutters, children) }
            </Tag>
        );
    }

    /**
     * Добавляет модификаторы горизонтальных отступов в дочерний элемент.
     *
     * @private
     * @param {Object} gutters Модификаторы горизонтальных отступов
     * @param {ReactElement} children Дочерние элементы компонента.
     * @returns {ReactElement}
     */
    injectGutterClassesToChildren(gutters, children) {
        return (
            Children.map(children, (col) => {
                if (!col) {
                    return null;
                }
                if (!col.props) {
                    return col;
                }
                const classes = Object.keys(gutters).map(gutter => `${this.classCol}_${gutter}_${gutters[gutter]}`);
                const className = col.props.className ? ` ${col.props.className}` : '';
                return cloneElement(col, { className: `${classes.join(' ')}${className}` });
            })
        );
    }
}
