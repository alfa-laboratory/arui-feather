/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

import './inline-error.css';

/**
 * Компонент ошибки. Используется в `CalendarInput`.
 */
@cn('inline-error')
@performance()
class InlineError extends React.Component {
    static propTypes = {
        /** Дочерние элементы `InlineError` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
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
            <div className={ cn({ size: this.props.size }) }>
                { this.props.children }
            </div>
        );
    }
}

export default InlineError;
