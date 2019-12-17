/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import { createCn } from 'bem-react-classname';

/**
 * Компонент навигации в виде табов. Как правило используется совместно с `TabItem`.
 */
class Tabs extends React.PureComponent {
    cn = createCn('tabs');
    static propTypes = {
        /** Управление возможность скроллить компонент по-горизонтали */
        scrollable: Type.bool,
        /** Дочерние компоненты */
        children: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        scrollable: true
    }

    render() {
        return (
            <div
                className={ this.cn({ scrollable: this.props.scrollable }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                <div className={ this.cn('panel') }>
                    <div className={ this.cn('content') }>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default Tabs;
