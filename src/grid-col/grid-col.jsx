/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Колонки используются для создания сетки.
 * Сетка имеет резиновую систему разметки, которая масштабируется до 12 столбцов.
 * Колонки должны быть помещены в строки (компоненет `GridRow`).
 */
@cn('arui-col')
@performance(true)
export default class GridCol extends React.Component {
    static propTypes = {
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Дополнительный класс */
        className: Type.string,
        /** Управление выравниванием колонок по вертикальной оси */
        align: Type.oneOf(['top', 'middle', 'bottom']),
        /**
         * Управление шириной колонки.
         *
         * Возможные значения: `[1..12, available, auto]`
         */
        width: Type.oneOfType([Type.string, Type.number]),
        /**
         * Управление шириной колонки для устройств `<=768px`.
         *
         * Возможные значения: `[1..12, available, auto]`
         */
        sm: Type.oneOfType([Type.string, Type.number]),
        /**
         * Управление шириной колонки для устройств `>= 769px`.
         *
         * Возможные значения: `[1..12, available, auto]`
         */
        md: Type.oneOfType([Type.string, Type.number]),
        /**
         * Управление шириной колонки для устройств `>= 1025px`.
         *
         * Возможные значения: `[1..12, available, auto]`
         */
        lg: Type.oneOfType([Type.string, Type.number]),
        /**
         * Управление шириной колонки для устройств `>= 1441px`.
         *
         * Возможные значения: `[1..12, available, auto]`
         */
        xl: Type.oneOfType([Type.string, Type.number]),
        /**
         * Управление шириной колонки для устройств `>= 1921px`
         *
         * Возможные значения: `[1..12, available, auto]`
         */
        xxl: Type.oneOfType([Type.string, Type.number]),
        /**
         * Управлние смещением колонки.
         *
         * Возможные значения: `[0..12]`
         *
         * Для изменения размера смещения, в зависимости от контрольных точек, может принимать объект:
         *
         * `{ sm: [0..12], md: [0..12], lg: [0..12], xl: [0..12], xxl: [0..12] }`
         */
        offset: Type.oneOfType([
            Type.oneOfType([Type.string, Type.number]),
            Type.shape({
                sm: Type.oneOfType([Type.string, Type.number]),
                md: Type.oneOfType([Type.string, Type.number]),
                lg: Type.oneOfType([Type.string, Type.number]),
                xl: Type.oneOfType([Type.string, Type.number]),
                xxl: Type.oneOfType([Type.string, Type.number])
            })
        ]),
        /**
         * Управление порядком колонок.
         *
         * Возможные значения: `[0..12, first, last]`
         *
         * Для изменения порядка, в зависимости от контрольных точек, может принимать объект:
         *
         * `{ sm: [0..last], md: [0..last], lg: [0..last], xl: [0..last], xxl: [0..last] }`
         */
        order: Type.oneOfType([
            Type.oneOfType([Type.string, Type.number]),
            Type.shape({
                sm: Type.oneOfType([Type.string, Type.number]),
                md: Type.oneOfType([Type.string, Type.number]),
                lg: Type.oneOfType([Type.string, Type.number]),
                xl: Type.oneOfType([Type.string, Type.number]),
                xxl: Type.oneOfType([Type.string, Type.number])
            })
        ]),
        /**
         * Html тег компонента.
         */
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
            sm,
            md,
            lg,
            xl,
            xxl,
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
                    [width]: !!width,
                    sm,
                    md,
                    lg,
                    xl,
                    xxl,
                    align,
                    ...this.createClasses({ offset, order })
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
                const value = prop[breakpoint] === 0 ? '0' : prop[breakpoint];
                classes[`${name}-${breakpoint}`] = value;
            });
        });
        return classes;
    }
}
