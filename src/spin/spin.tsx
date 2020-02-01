/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type SpinProps = {
    /**
     * Управление видимостью компонента
     */
    visible?: boolean;

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
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент показывающий крутящееся кольцо загрузки.
 */
export class Spin extends React.PureComponent<SpinProps> {
    cn = createCn('spin');

    static defaultProps: Partial<SpinProps> = {
        visible: false,
        size: 'm'
    };

    render() {
        return (
            <span
                className={ this.cn({
                    size: this.props.size,
                    visible: this.props.visible
                }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            />
        );
    }
}

export default withTheme(Spin);
