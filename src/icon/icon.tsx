/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type IconProps = {

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Управление цветностью иконки
     */
    colored?: boolean;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Название иконки
     */
    name?: string;

    /**
     * Размер иконки
     */
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Базовый компонент иконки. Содержит в себе только необходимые для компонентов иконки.
 */
export class Icon extends React.PureComponent<IconProps> {
    cn = createCn('icon');

    static defaultProps: Partial<IconProps> = {
        size: 'm'
    };

    render() {
        const mods: {
            size;
            name?;
            colored?;
        } = { size: this.props.size };

        if (this.props.name) {
            mods.name = this.props.name;
        }

        if (this.props.colored) {
            mods.colored = true;
        }

        return (
            <span
                className={ this.cn(mods) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            />
        );
    }
}

export default withTheme(Icon);
