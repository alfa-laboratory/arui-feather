/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';
import { deprecated } from '../lib/prop-types';

/**
 * Компонент поля формы.
 * Необходим для вертикального ритма в форме.
 */
@cn('form-field')
@performance()
class FormField extends React.Component {
    static propTypes = {
        /** Дочерние элементы `FormField` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** @deprecated Заголовок для контрола */
        label: deprecated(Type.node, 'Use \'label\' property directly on controls.'),
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Расположение элемента label: 'line' */
        view: Type.string,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string
    };

    static defaultProps = {
        size: 'm'
    };

    render(cn) {
        return (
            <div
                className={ cn({
                    size: this.props.size,
                    view: this.props.view
                }) }
                id={ this.props.id }
            >
                { this.props.label &&
                    <div className={ cn('label') }>
                        { this.props.label }
                    </div>
                }
                <div className={ cn('control') }>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default FormField;
