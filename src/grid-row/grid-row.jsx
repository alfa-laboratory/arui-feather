/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Children, cloneElement } from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Строки используется для создания сетки.
 * Сетка имеет резиновую систему разметки, которая масштабируется до 12 столбцов.
 */
@cn('arui-row')
@performance(true)
export default class GridRow extends React.Component {
    static propTypes = {
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Дополнительный класс */
        className: Type.string,
        /**
         * Горизонтальный `padding` (называемый `gutter`) для контроля пространства между колонками.
         * Возможные значения: `8n` px (n - натуральное число) из диапазона `[0, 8, 16, 24, 32, 40, 48]`.
         * Для изменения размера отступов в зависимости от контрольных точек, может принимать объект:
         *
         * `{ sm: [0..48], md: [0..48], lg: [0..48], xl: [0..48], xxl: [0..48] }`
         */
        gutter: Type.oneOfType([Type.string, Type.number, Type.shape({
            sm: Type.oneOfType([Type.string, Type.number]),
            md: Type.oneOfType([Type.string, Type.number]),
            lg: Type.oneOfType([Type.string, Type.number]),
            xl: Type.oneOfType([Type.string, Type.number]),
            xxl: Type.oneOfType([Type.string, Type.number])
        })]),
        /** Управление изменением направления колонок */
        reverse: Type.bool,
        /** Управление выравниванием колонок по вертикальной оси */
        align: Type.oneOf(['top', 'middle', 'bottom']),
        /** Управление выравниванием колонок по горизонтальной оси */
        justify: Type.oneOf(['left', 'center', 'right', 'around', 'between']),
        /**
         * Html тег компонента. Из за <a href="https://github.com/philipwalton/flexbugs" target="_blank">ограничений
         * и багов</a>, существующих во флексбоксах,
         * <a href="https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers" target="_blank">
         * невозможно использовать некоторые элементы HTML как гибкие контейнеры</a>.
         */
        tag: Type.string,
        /** Дочерние элементы `GridRow` */
        children: Type.node
    }

    static defaultProps = {
        tag: 'div',
        gutter: 16,
        reverse: false,
        justify: 'left'
    }

    /**
     * Класс колонки
     * @type {string}
     */
    classCol = 'arui-col'

    render(cn) {
        const {
            tag: Tag,
            gutter,
            reverse,
            align,
            justify,
            children,
            ...props
        } = this.props;

        let gutters = {};
        if (typeof gutter === 'object') {
            Object.keys(gutter).forEach((breakpoint) => {
                gutters[`gutter-${breakpoint}`] = gutter[breakpoint];
            });
        } else {
            gutters = { gutter };
        }

        return (
            <Tag
                { ...props }
                className={ cn({
                    ...gutters,
                    reverse,
                    align,
                    justify
                }) }
            >
                { this.injectGutterInChildren(gutters, children) }
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
    injectGutterInChildren(gutters, children) {
        return (
            Children.map(children, (col) => {
                if (!col) return null;
                if (!col.props) return col;
                const classes = Object.keys(gutters).map(gutter => `${this.classCol}_${gutter}_${gutters[gutter]}`);
                const className = col.props.className ? ` ${col.props.className}` : '';
                return cloneElement(col, { className: `${classes.join(' ')}${className}` });
            })
        );
    }
}
