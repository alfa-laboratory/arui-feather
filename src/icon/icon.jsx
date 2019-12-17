/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

/**
 * Базовый компонент иконки. Содержит в себе только необходимые для компонентов иконки.
 */
@cn('icon')
class Icon extends React.Component {
    cn = createCn('hoba');
    static propTypes = {
        /** Дополнительный класс */
        className: Type.string,
        /** Управление цветностью иконки */
        colored: Type.bool,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Название иконки */
        name: Type.string,
        /** Размер иконки */
        size: Type.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        size: 'm'
    };

    render() {
        const mods = { size: this.props.size };

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
