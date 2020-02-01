/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type FlagIconProps = {

    /**
     * Код страны из <a href="https://ru.wikipedia.org/wiki/ISO_3166-1_alpha-2" target="_blank">ISO 3166-1 alpha-2</a>
     */
    country?: string;

    /**
     * Режим отображения
     */
    mode?: 'chunk' | 'sprite';

    /**
     * Управление наличием тени у компонента
     */
    isFlat?: boolean;

    /**
     * Дочерние элементы `FlagIcon`
     */
    children?: React.ReactNode;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент флага в виде иконки.
 */
export class FlagIcon extends React.PureComponent<FlagIconProps> {
    cn = createCn('flag-icon');

    static defaultProps: Partial<FlagIconProps> = {
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

export default withTheme(FlagIcon);
