/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

import './input-group.css';
import './input-group_theme_alfa-on-white.css';

/**
 * Компонент группы полей для текстового ввода.
 *
 * @example
 * ```
 * import 'Input' from 'arui-feather/input';
 * import 'InputGroup' from 'arui-feather/input-group';
 *
 * // Группа полей для ввода
 * <InputGroup>
 *    <Input />
 *    <Input />
 *    <Input />
 * </InputGroup>
 *
 * // Группа полей для ввода, растягивающаяся на всю ширину
 * <InputGroup width='available'>
 *    <Input />
 *    <Input />
 *    <Input />
 * </InputGroup>
 * ```
 */
@cn('input-group')
@performance()
class InputGroup extends React.Component {
    static propTypes = {
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Дочерние элементы `InputGroup`, как правило, компоненты `Input` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    state = {
        focused: false
    };

    render(cn) {
        let children = null;
        let inputGroupParts = {};

        if (this.props.children) {
            children = this.props.children.length ? this.props.children : [this.props.children];
        }

        if (children) {
            React.Children.forEach(children, (input, index) => {
                input = React.cloneElement(input, {
                    width: this.props.width
                });

                inputGroupParts[`input-${index}`] = (
                    <span
                        className={ cn('input-case', {
                            invalid: !!input.props.error,
                            disabled: input.props.disabled
                        }) }
                    >
                        { input }
                    </span>
                );
            });
        }

        return (
            <span
                className={ `${cn({ width: this.props.width })} control-group` }
                role='group'
                tabIndex='-1'
            >
                { createFragment(inputGroupParts) }
            </span>
        );
    }
}

export default InputGroup;
