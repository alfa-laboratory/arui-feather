/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

import './checkbox-group.css';

/**
 * Компонент группы чекбоксов.
 *
 * @example
 * ```
 * import 'CheckBox' from 'arui-feather/src/checkbox/checkbox';
 * import 'CheckBoxGroup' from 'arui-feather/src/checkbox-group/checkbox-group';
 *
 * // Вертикальная группа чекбоксов
 * <CheckBoxGroup>
 *    <CheckBox text="Раз" />
 *    <CheckBox text="Два" />
 *    <CheckBox text="Три" />
 * </CheckBoxGroup>
 *
 * // Горизонтальная группа чекбоксов, состоящая из обычных кнопок
 * <CheckBoxGroup type="button">
 *    <CheckBox type="button" text="Раз" />
 *    <CheckBox type="button" text="Два" />
 *    <CheckBox type="button" text="Три" />
 * </CheckBoxGroup>
 *
 * // Горизонтальная группа чекбоксов
 * <CheckBoxGroup type="line">
 *    <CheckBox text="Раз" />
 *    <CheckBox text="Два" />
 *    <CheckBox text="Три" />
 * </CheckBoxGroup>
 * ```
 */
@cn('checkbox-group')
@performance()
class CheckBoxGroup extends React.Component {
    static propTypes = {
        /** Тип компонента */
        type: Type.oneOf(['normal', 'button', 'line']),
        /** Дочерние элементы `CheckBoxGroup`, как правило, компоненты `CheckBox` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    render(cn) {
        let children = null;
        let checkboxGroupParts = {};

        if (this.props.children) {
            children = this.props.children.length ? this.props.children : [this.props.children];
        }

        if (children) {
            children.forEach((checkbox, index) => {
                checkboxGroupParts[`checkbox-${index}`] =
                    (this.props.type !== 'button' && this.props.type !== 'line')
                        ? <div>{ checkbox }</div>
                        : checkbox;
            });
        }

        return (
            <span
                className={ `${cn({ type: this.props.type })} control-group` }
                role='group'
                tabIndex='-1'
            >
                { createFragment(checkboxGroupParts) }
            </span>
        );
    }
}

export default CheckBoxGroup;
