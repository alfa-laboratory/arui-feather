/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type LabelProps = {
    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl';

    /**
     * Дочерние элементы `Label`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

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
     * Управление возможностью рендерить компонент в одну сроку
     */
    isNoWrap?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
}

/**
 * Компонента лейбла.
 */

export class Label extends React.PureComponent<LabelProps> {
    cn = createCn('label');

    static defaultProps: Partial<LabelProps> = {
        size: 'm',
        isNoWrap: false
    };

    render() {
        return (
            <span
                className={ this.cn({
                    size: this.props.size,
                    'no-wrap': this.props.isNoWrap
                }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                <span className={ this.cn('inner') }>
                    { this.props.children }
                </span>
            </span>
        );
    }
}

export default withTheme(Label);
