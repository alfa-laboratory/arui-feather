/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Контейнер является инструментом для центрирования контента на странице.
 */
@cn('arui-container')
@performance()
export default class GridContainer extends React.Component {
    static propTypes = {
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Дочерние элементы `GridContainer` */
        children: Type.node,
        /** Дополнительный класс */
        className: Type.string,
        /**
         * Суммарный горизонтальный `padding`.
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
        /** Html тег */
        tag: Type.string,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white'])
    };

    static defaultProps = {
        tag: 'div',
        gutter: 16
    };

    render(cn) {
        const {
            className,
            tag: Tag,
            width,
            gutter,
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
            <Tag className={ cn({ width, ...gutters }) } { ...props }>
                { children }
            </Tag>
        );
    }
}
