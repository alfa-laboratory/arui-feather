/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import IconClose from '../icon/ui/close';
import IconButton from '../icon-button/icon-button';

export type PopupHeaderProps = {
    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Содержимое заголовка
     */
    title?: React.ReactNode;

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
     * Обработчик клика по кнопке закрытия
     */
    onCloserClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Заголовок в Popup.
 */
export class PopupHeader extends React.PureComponent<PopupHeaderProps> {
    cn = createCn('popup-header');

    render() {
        return (
            <div
                className={ this.cn({
                    size: this.props.size
                }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                <IconButton
                    className={ this.cn('closer') }
                    size={ this.props.size }
                    onClick={ this.handleCloserClick }
                >
                    <IconClose
                        size={ this.props.size }
                    />
                </IconButton>
                <div className={ this.cn('title') }>
                    { this.props.title }
                </div>
            </div>
        );
    }

    private handleCloserClick = (event) => {
        if (this.props.onCloserClick) {
            this.props.onCloserClick(event);
        }
    }
}

export default withTheme(PopupHeader);
