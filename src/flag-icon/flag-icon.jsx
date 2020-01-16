/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';

/**
 * Компонент флага в виде иконки.
 */
class FlagIcon extends React.PureComponent {
    cn = createCn('flag-icon');
    static propTypes = {
        /** Код страны из <a href="https://ru.wikipedia.org/wiki/ISO_3166-1_alpha-2" target="_blank">ISO 3166-1 alpha-2</a> */
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
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        isFlat: false,
        mode: 'chunk',
        size: 'm'
    };

    render() {
        return (
            <span
                className={ this.cn({
                    country: this.props.country,
                    flat: this.props.isFlat,
                    mode: this.props.mode,
                    size: this.props.size
                }) }
                data-test-id={ this.props['data-test-id'] }
            />
        );
    }
}

export default FlagIcon;
