/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type FormFieldProps = {

    /**
     * Дочерние элементы `FormField`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент поля формы.
 * Необходим для вертикального ритма в форме.
 */
export class FormField extends React.PureComponent<FormFieldProps> {
    cn = createCn('form-field');

    static defaultProps: Partial<FormFieldProps> = {
        size: 'm'
    };

    render() {
        return (
            <div
                className={ this.cn({ size: this.props.size }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.props.children }
            </div>
        );
    }
}

export default withTheme(FormField);
