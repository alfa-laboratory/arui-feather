/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Type from 'prop-types';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

/**
 * Компонент группы полей для текстового ввода.
 */
@cn('input-group')
class InputGroup extends React.Component {
    cn = createCn('hoba');
    static propTypes = {
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Дочерние элементы `InputGroup`, как правило, компоненты `Input` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    render() {
        let children = null;
        const inputGroupParts = {};

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
                        className={ this.cn('input-case', {
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
                id={ this.props.id }
                role='group'
                tabIndex='-1'
                data-test-id={ this.props['data-test-id'] }
            >
                { createFragment(inputGroupParts) }
            </span>
        );
    }
}

export default withTheme(InputGroup);
