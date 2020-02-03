/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Children, cloneElement } from 'react';
import { createCn } from 'bem-react-classname';

type GridRowGutterType = {
    mobile?: string | number | object;
    tablet?: string | number | object;
    desktop?: string | number | object;
};

export type GridRowProps = {

    /**
     * Уникальный идентификатор блока
     */
    id?: string;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Горизонтальный отступ между колонками.
     * Возможные значения: `8n` px (n - натуральное число) из диапазона `[0, 8, 16, 24]`
     * или `{ mobile: [0..24], tablet: [0..24], desktop: [0..24] }`
     * или `{ mobile: { s: [0..24], m: [0..24], l: [0..24] },
     * tablet: { s: [0..24], m: [0..24] },
     * desktop: { s: [0..24], m: [0..24], l: [0..24], xl: [0..24] } }`.
     */
    gutter?: string | number | GridRowGutterType;

    /**
     * Управление выравниванием колонок по вертикальной оси
     */
    align?: 'top' | 'middle' | 'bottom';

    /**
     * Управление выравниванием колонок по горизонтальной оси
     */
    justify?: 'left' | 'center' | 'right' | 'around' | 'between';

    /**
     * Html тег компонента.
     * Из-за <a href="https://github.com/philipwalton/flexbugs#flexbug-9" target="_blank">ограничений и багов</a>,
     * существующих во флексбоксах, невозможно использовать
     * некоторые элементы HTML как flex-контейнеры</a>.
     */
    tag?: keyof JSX.IntrinsicElements;

    /**
     * Дочерние элементы `GridRow`
     */
    children?: React.ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Строка используется для создания сетки.
 * Сетка имеет резиновую систему разметки, которая масштабируется до 12 столбцов.
 */
export class GridRow extends React.PureComponent<GridRowProps> {
    cn = createCn('grid-row');

    static defaultProps: Partial<GridRowProps> = {
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
     */
    classCol = 'grid-col'

    render() {
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
                if (gutter[breakpoint] === null) {
                    return;
                }
                if (typeof gutter[breakpoint] === 'object') {
                    Object.keys(gutter[breakpoint]).forEach((size) => {
                        if (gutter[breakpoint][size] === null) {
                            return;
                        }
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
                className={ this.cn({
                    ...gutters,
                    align,
                    justify
                }) }
            >
                { this.injectGutterClassNamesToChildren(gutters, children) }
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
    private injectGutterClassNamesToChildren(gutters, children) {
        return (
            Children.map(children, (col) => {
                if (!col) {
                    return null;
                }
                if (!col.props) {
                    return col;
                }
                const gutterClassNames = Object.keys(gutters).map(
                    gutter => `${this.classCol}_${gutter}_${gutters[gutter]}`
                );
                const classNameFromProps = col.props.className ? ` ${col.props.className}` : '';

                return cloneElement(col, { className: `${gutterClassNames.join(' ')}${classNameFromProps}` });
            })
        );
    }
}

export default GridRow;
