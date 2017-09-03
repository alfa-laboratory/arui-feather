/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент флага в виде иконки.
 */
@cn('flag-icon')
@performance()
class FlagIcon extends React.Component {
    static propTypes = {
        /** Код страны (ISO2) */
        country: Type.string,
        /** Режим отображения */
        mode: Type.oneOf(['chunk', 'sprite']),
        /** Управление наличием тени у компонента */
        isFlat: Type.bool,
        /** Дочерние элементы `FlagIcon` */
        children: Type.node,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    static defaultProps = {
        isFlat: false,
        mode: 'chunk',
        size: 'm'
    };

    render(cn) {
        return (
            <span
                className={ cn({
                    country: this.props.country,
                    flat: this.props.isFlat,
                    mode: this.props.mode,
                    size: this.props.size
                }) }
            />
        );
    }
}

export default FlagIcon;
