/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type TabsProps = {

    /**
     * Управление возможность скроллить компонент по-горизонтали
     */
    scrollable?: boolean;

    /**
     * Дочерние компоненты
     */
    children?: React.ReactNode;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Компонент навигации в виде табов. Как правило используется совместно с `TabItem`.
 */
export class Tabs extends React.PureComponent<TabsProps> {
    cn = createCn('tabs');

    static defaultProps: Partial<TabsProps> = {
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

export default withTheme(Tabs);
