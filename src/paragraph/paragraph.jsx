/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

/**
 * Компонент параграфа текста.
 */
@cn('paragraph')
class Paragraph extends React.Component {
    cn = createCn('hoba');
    static propTypes = {
        /** Тип параграфа */
        view: Type.oneOf(['lead', 'normal', 'small']),
        /** Маркер параграфа */
        mark: Type.node,
        /** Дочерние элементы `Paragraph` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    render() {
        return (
            <p
                className={ this.cn({ view: this.props.view }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.props.mark &&
                    <span className={ this.cn('marker') }>{ this.props.mark }</span>
                }
                { this.props.children }
            </p>
        );
    }
}

export default withTheme(Paragraph);
