/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type ListHeaderProps = {

    /**
     * Заголовок
     */
    title?: React.ReactNode;

    /**
     * Комментарий
     */
    description?: React.ReactNode;

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
     * Вид компонента
     */
    view?: 'transparent' | 'filled';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

}

/**
 * Компонент для разделения списка по датам или смысловым группам.
 */
export class ListHeader extends React.PureComponent<ListHeaderProps> {
    cn = createCn('list-header');

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
