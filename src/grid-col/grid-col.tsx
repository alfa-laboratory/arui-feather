/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import React from 'react';
import { createCn } from 'bem-react-classname';

type SmallBreakpointsType<ValueType> = {
    s?: ValueType;
    m?: ValueType;
    l?: ValueType;
    xl?: ValueType;
};

type BreakpointsType<ValueType> = {
    mobile?: ValueType | SmallBreakpointsType<ValueType>;
    tablet?: ValueType | SmallBreakpointsType<ValueType>;
    desktop?: ValueType | SmallBreakpointsType<ValueType>;
    'mobile-s'?: ValueType;
    'mobile-m'?: ValueType;
    'mobile-l'?: ValueType;
    'tablet-s'?: ValueType;
    'tablet-m'?: ValueType;
    'tablet-l'?: ValueType;
    'desktop-s'?: ValueType;
    'desktop-m'?: ValueType;
    'desktop-l'?: ValueType;
};

type GridPositions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type WidthBreakpointsValues = GridPositions | 'available' | 'auto';
type OffsetBreakpointsValues = Exclude<GridPositions, 12>; // Оффсет на полную ширину грида невозможен
type OrderBreakpointsValues = GridPositions | 'last';

export type GridColProps = {
    /**
     * Уникальный идентификатор блока
     */
    id?: string;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Управление выравниванием колонок по вертикальной оси
     */
    align?: 'top' | 'middle' | 'bottom';

    /**
     * Управление шириной колонки.
     * Возможные значения: `[1..12, available, auto]`
     * или `{ mobile: [1..12], tablet: [1..12], desktop: [1..12] }`
     * или `{ mobile: { s: [1..12], m: [1..12], l: [1..12] },
     * tablet: { s: [1..12], m: [1..12] },
     * desktop: { s: [1..12], m: [1..12], l: [1..12], xl: [1..12] } }`.
     */
    width?: WidthBreakpointsValues | BreakpointsType<WidthBreakpointsValues>;

    /**
     * Управлние смещением колонки.
     * Возможные значения: `[1..11]`
     * или `{ mobile: [1..11], tablet: [1..11], desktop: [1..11] }`
     * или `{ mobile: { s: [1..11], m: [1..11], l: [1..11] },
     * tablet: { s: [1..11], m: [1..11] },
     * desktop: { s: [1..11], m: [1..11], l: [1..11], xl: [1..11] } }`.
     */
    offset?: OffsetBreakpointsValues | BreakpointsType<OffsetBreakpointsValues>;

    /**
     * Управление порядком колонок.
     * Возможные значения: `[1..12, first, last]`
     * или `{ mobile: [1..last], tablet: [1..last], desktop: [1..last] }`
     * или `{ mobile: { s: [1..last], m: [1..last], l: [1..last] },
     * tablet: { s: [1..last], m: [1..last] },
     * desktop: { s: [1..last], m: [1..last], l: [1..last], xl: [1..last] } }`.
     */
    order?: OrderBreakpointsValues | BreakpointsType<OrderBreakpointsValues>;

    /**
     * Html тег компонента.
     */
    tag?: keyof JSX.IntrinsicElements;

    /**
     * Дочерние элементы `GridCol`
     */
    children?: React.ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Колонки используются для создания сетки.
 * Сетка имеет резиновую систему разметки, которая масштабируется до 12 столбцов.
 * Колонки должны быть помещены в строки (компонент `GridRow`).
 */
export class GridCol extends React.PureComponent<GridColProps> {
    protected cn = createCn('grid-col');

    static defaultProps: Partial<GridColProps> = {
        tag: 'div',
    };

    render() {
        const {
            width, offset, order, align, tag: Tag, children, ...props
        } = this.props;

        return (
            <Tag
                { ...props }
                className={ this.cn({
                    align,
                    ...createClassNames({ width, offset, order }),
                }) }
            >
                { children }
            </Tag>
        );
    }
}

/**
 * Создает объект модификаторов для переданных свойств.
 *
 * @param props Свойства.
 */
function createClassNames(props: {
    width: WidthBreakpointsValues | BreakpointsType<WidthBreakpointsValues>;
    offset: OffsetBreakpointsValues | BreakpointsType<OffsetBreakpointsValues>;
    order: OrderBreakpointsValues | BreakpointsType<OrderBreakpointsValues>;
}) {
    const classNames: Record<string, string> = {};

    Object.keys(props).forEach((name) => {
        const prop = props[name];

        if (!prop) {
            return;
        }
        if (typeof prop !== 'object') {
            classNames[name] = prop;

            return;
        }
        Object.keys(prop).forEach((breakpoint) => {
            if (prop[breakpoint] === null) {
                return;
            }
            if (typeof prop[breakpoint] === 'object') {
                Object.keys(prop[breakpoint]).forEach((size) => {
                    if (prop[breakpoint][size] === null) {
                        return;
                    }
                    classNames[`${name}-${breakpoint}-${size}`] = prop[breakpoint][size].toString();
                });
            } else {
                classNames[`${name}-${breakpoint}`] = prop[breakpoint].toString();
            }
        });
    });

    return classNames;
}

export default GridCol;
