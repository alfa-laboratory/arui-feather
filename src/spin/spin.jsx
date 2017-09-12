/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент показывающий крутящееся кольцо загрузки.
 */
@cn('spin')
@performance()
class Spin extends React.Component {
    static propTypes = {
        /** Управление видимостью компонента */
        visible: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string
    };

    static defaultProps = {
        visible: false,
        size: 'm'
    };

    render(cn) {
        return (
            <span
                className={ cn({
                    size: this.props.size,
                    visible: this.props.visible
                }) }
                id={ this.props.id }
            />
        );
    }
}

export default Spin;
