/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент иконки. Содержит в себе только неодходимые для компонентов иконки.
 * Все иконки доступны в двух цветовых темах `alfa-on-color` и `alfa-on-white`.
 *
 * Для иконок `error` и `ок` также есть цветной вариант,
 * реализуемый темой `alfa-on-colored`.
 */
@cn('icon')
@performance()
class Icon extends React.Component {
    static propTypes = {
        /** Тип иконки */
        icon: Type.oneOf([
            'error', 'fail', 'ok', 'ok_filled', 'attachment', 'calendar', 'search', 'close', 'user'
        ]),
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl', 'xxl']),
        /** Дочерние элементы `Icon` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white', 'alfa-on-colored']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string
    };

    static defaultProps = {
        size: 'm'
    };

    render(cn) {
        let mods = {
            size: this.props.size
        };

        if (this.props.icon) {
            mods[this.props.icon] = true;
        }

        return (
            <span
                className={ cn(mods) }
                id={ this.props.id }
            />
        );
    }
}

export default Icon;
