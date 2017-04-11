/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

import './highlight.css';

/**
 * Компонент подсветки текста. Используйте его, чтобы выделить текст на странице.
 * Текст необходимо передать в виде дочерних компонентов.
 *
 * @example
 * ```javascript
 * Слоган <Highlight>«Найдётся всё»</Highlight> придумали в 2000 году.
 * ```
 */
@cn('highlight')
@performance()
class Highlight extends React.Component {
    static propTypes = {
        /** Дочерние элементы `Highlight` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    render(cn) {
        return (
            <span className={ cn }>
                { this.props.children }
            </span>
        );
    }
}

export default Highlight;
