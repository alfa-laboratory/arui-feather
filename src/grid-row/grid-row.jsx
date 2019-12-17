/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Children, cloneElement } from 'react';
import Type from 'prop-types';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

const breakpointsType = {
    mobile: Type.oneOfType([Type.string, Type.number, Type.object]),
    tablet: Type.oneOfType([Type.string, Type.number, Type.object]),
    desktop: Type.oneOfType([Type.string, Type.number, Type.object])
};

/**
 * Строка используется для создания сетки.
 * Сетка имеет резиновую систему разметки, которая масштабируется до 12 столбцов.
 */
class GridRow extends React.PureComponent {
    cn = createCn('grid-row');
    static propTypes = {
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Дополнительный класс */
        className: Type.string,
        /**
         * Горизонтальный отступ между колонками.
         * Возможные значения: `8n` px (n - натуральное число) из диапазона `[0, 8, 16, 24]`
         * или `{ mobile: [0..24], tablet: [0..24], desktop: [0..24] }`
         * или `{ mobile: { s: [0..24], m: [0..24], l: [0..24] },
         * tablet: { s: [0..24], m: [0..24] },
         * desktop: { s: [0..24], m: [0..24], l: [0..24], xl: [0..24] } }`.
         */
        gutter: Type.oneOfType([Type.string, Type.number, Type.shape(breakpointsType)]),
        /** Управление выравниванием колонок по вертикальной оси */
        align: Type.oneOf(['top', 'middle', 'bottom']),
        /** Управление выравниванием колонок по горизонтальной оси */
        justify: Type.oneOf(['left', 'center', 'right', 'around', 'between']),
        /**
         * Html тег компонента.
         * Из-за <a href="https://github.com/philipwalton/flexbugs#flexbug-9" target="_blank">ограничений и багов</a>,
         * существующих во флексбоксах, невозможно использовать
         * некоторые элементы HTML как flex-контейнеры</a>.
         */
        tag: Type.string,
        /** Дочерние элементы `GridRow` */
        children: Type.node,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
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
    injectGutterClassNamesToChildren(gutters, children) {
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

export default withTheme(GridRow);
