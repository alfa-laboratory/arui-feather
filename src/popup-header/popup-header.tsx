/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import {
    CloseXsIcon,
} from '@alfalab/icons-classic/CloseXsIcon';
import {
    CloseSIcon,
} from '@alfalab/icons-classic/CloseSIcon';
import {
    CloseMIcon,
} from '@alfalab/icons-classic/CloseMIcon';
import {
    CloseLIcon,
} from '@alfalab/icons-classic/CloseLIcon';
import {
    CloseXlIcon,
} from '@alfalab/icons-classic/CloseXlIcon';
import { withTheme, Theme } from '../cn';

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
    theme?: Theme;

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
    protected cn = createCn('popup-header');

    render() {
        const {
            size, id, 'data-test-id': dataTestId, title,
        } = this.props;

        const closeIcons = {
            xs: CloseXsIcon,
            s: CloseSIcon,
            m: CloseMIcon,
            l: CloseLIcon,
            xl: CloseXlIcon,
        };

        const IconClose = closeIcons[size || 'm'];

        return (
            <div
                className={ this.cn({
                    size,
                }) }
                id={ id }
                data-test-id={ dataTestId }
            >
                <IconButton
                    className={ this.cn('closer') }
                    size={ size }
                    onClick={ this.handleCloserClick }
                >
                    <IconClose />
                </IconButton>
                <div className={ this.cn('title') }>
                    { title }
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

export default withTheme<PopupHeaderProps, PopupHeader>(PopupHeader);
