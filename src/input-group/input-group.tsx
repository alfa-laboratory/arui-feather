/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type InputGroupProps = {
    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Дочерние элементы `InputGroup`, как правило, компоненты `Input`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент группы полей для текстового ввода.
 */
export class InputGroup extends React.PureComponent<InputGroupProps> {
    cn = createCn('input-group');

    render() {
        let children = null;
        const inputGroupParts = {};

        if (this.props.children) {
            children = (
                (this.props.children as Array<React.ReactNode>).length
                    ? this.props.children
                    : [this.props.children]
            );
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
                className={ `${this.cn({ width: this.props.width })} control-group` }
                id={ this.props.id }
                role='group'
                tabIndex={ -1 }
                data-test-id={ this.props['data-test-id'] }
            >
                { createFragment(inputGroupParts) }
            </span>
        );
    }
}

export default withTheme(InputGroup);
