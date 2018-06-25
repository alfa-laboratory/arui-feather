/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

const pointType = Type.oneOfType([Type.string, Type.number]);
const breakpointsType = {
    sm: pointType, md: pointType, lg: pointType, xl: pointType, xxl: pointType
};

/**
 * Контейнер является инструментом для центрирования контента на странице.
 */
@cn('grid-container')
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
         * Возможные значения: `8n` px (n - натуральное число) из диапазона `[0, 8, 16, 24, 32, 40, 48]`
         * или `{ sm: [0..48], md: [0..48], lg: [0..48], xl: [0..48], xxl: [0..48] }`
         */
        gutter: Type.oneOfType([Type.string, Type.number, Type.shape(breakpointsType)]),
        /** Html тег */
        tag: Type.string
    };

    static defaultProps = {
        tag: 'div',
        gutter: 16
    };

    render(cn) {
        const {
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
            <Tag { ...props } className={ cn({ width, ...gutters }) }>
                { children }
            </Tag>
        );
    }
}
