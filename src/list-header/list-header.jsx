/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

/**
 * Компонент для разделения списка по датам или смысловым группам.
 */
@cn('list-header')
class ListHeader extends React.Component {
    cn = createCn('hoba');
    static propTypes = {
        /** Заголовок */
        title: Type.node,
        /** Комментарий */
        description: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Вид компонента */
        view: Type.oneOf(['transparent', 'filled']),
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    render() {
        return (
            <div
                className={ this.cn({ filled: this.props.view === 'filled' }) }
                data-test-id={ this.props['data-test-id'] }
            >
                <span className={ this.cn('title') }>{ this.props.title }</span>
                { this.props.description && <span className={ this.cn('description') }>, { this.props.description }</span> }
            </div>
        );
    }
}

export default withTheme(ListHeader);
