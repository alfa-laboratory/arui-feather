/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

import './form-field.css';

/**
 * Компонент поля формы: cодержит заголовок контрола и сам контрол.
 * Контрол должен быть передан дочерним компонентов.
 */
@cn('form-field')
@performance()
class FormField extends React.Component {
    static propTypes = {
        /** Дочерние элементы `FormField` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Заголовок для контрола */
        label: Type.node,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Расположение элемента label: 'line' */
        view: Type.string,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
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
