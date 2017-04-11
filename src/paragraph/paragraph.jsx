/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

import './paragraph.css';

/**
 * Компонент параграфа текста.
 */
@cn('paragraph')
@performance()
class Paragraph extends React.Component {
    static propTypes = {
        /** Тип параграфа */
        view: Type.oneOf(['lead', 'normal']),
        /** Маркер параграфа */
        mark: Type.node,
        /** Дочерние элементы `Paragraph` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    render(cn) {
        return (
            <p className={ cn({ view: this.props.view }) }>
                { this.props.mark &&
                    <span className={ cn('marker') }>{ this.props.mark }</span>
                }
                { this.props.children }
            </p>
        );
    }
}

export default Paragraph;
