/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонента лейбла.
 */
@cn('label')
@performance()
class Label extends React.Component {
    static propTypes = {
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl', '2xl', '3xl', '4xl']),
        /** Дочерние элементы `Label` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Управление возможностью рендерить компонент в одну сроку */
        isNoWrap: Type.bool,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        size: 'm',
        isNoWrap: false
    };

    render(cn) {
        return (
            <span
                className={ cn({
                    size: this.props.size,
                    'no-wrap': this.props.isNoWrap
                }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                <span className={ cn('inner') }>
                    { this.props.children }
                </span>
            </span>
        );
    }
}

export default Label;
