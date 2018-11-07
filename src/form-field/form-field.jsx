/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';

/**
 * Компонент поля формы.
 * Необходим для вертикального ритма в форме.
 */
@cn('form-field')
class FormField extends React.PureComponent {
    static propTypes = {
        /** Дочерние элементы `FormField` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white'])
    };

    static defaultProps = {
        size: 'm'
    };

    render(cn) {
        return (
            <div
                className={ cn({ size: this.props.size }) }
                id={ this.props.id }
            >
                { this.props.children }
            </div>
        );
    }
}

export default FormField;
