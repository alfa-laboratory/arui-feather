/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import { createCn } from 'bem-react-classname';
import {
    CloseSIcon,
} from '@alfalab/icons-classic/CloseSIcon';
import {
    ErrorMColorIcon,
} from '@alfalab/icons-classic/ErrorMColorIcon';
import {
    FailMIcon,
} from '@alfalab/icons-classic/FailMIcon';
import {
    OkMColorIcon,
} from '@alfalab/icons-classic/OkMColorIcon';
import { withTheme, Theme } from '../cn';

import IconButton from '../icon-button/icon-button';
import Swipeable from '../swipeable';

import { isNodeOutsideElement } from '../lib/window';

export type NotificationProps = {
    /**
     * Тип компонента
     */
    status?: 'error' | 'fail' | 'ok';

    /**
     * Управление видимостью компонента
     */
    visible?: boolean;

    /**
     * Отступ от верхнего края
     */
    offset?: number;

    /**
     * К какому краю прижат попап
     */
    stickTo?: 'left' | 'right';

    /**
     * Управляет отображением кнопки закрытия уведомления
     */
    hasCloser?: boolean;

    /**
     * Дочерние элементы `Notification`
     */
    children?: React.ReactNode;

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
     * Заголовок сообщения
     */
    title?: React.ReactNode;

    /**
     * Замена стандартной иконки
     */
    icon?: React.ReactNode;

    /**
     * Время до закрытия компонента
     */
    autoCloseDelay?: number;

    /**
     * Обработчик события истечения времени до закрытия компонента
     */
    onCloseTimeout?: () => void;

    /**
     * Обработчик клика по крестику компонента
     */
    onCloserClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик события наведения курсора на попап
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с попапа
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик клика вне компонента
     */
    onClickOutside?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик клика по компоненту
     */
    onClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент всплывающего окна.
 */
export class Notification extends React.PureComponent<NotificationProps> {
    protected cn = createCn('notification');

    static defaultProps: Partial<NotificationProps> = {
        autoCloseDelay: 5000,
        stickTo: 'right',
        offset: 12,
        hasCloser: true,
    };

    state = {
        hovered: false,
    };

    private root: HTMLDivElement;

    private closeTimeout = null;

    private clickEventBindTimeout = null;

    private isWindowClickBinded = false;

    componentDidMount() {
        this.startCloseTimer();

        if (this.props.onClickOutside) {
            this.ensureClickEvent();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.onClickOutside !== this.props.onClickOutside) {
            this.ensureClickEvent();
        } else if (prevProps.visible !== this.props.visible) {
            this.ensureClickEvent(!this.props.visible);
        }
    }

    componentWillUnmount() {
        this.stopCloseTimer();

        if (this.props.onClickOutside) {
            this.ensureClickEvent(true);
        }
    }

    render() {
        const { theme, status } = this.props;
        let ToggledIcon;

        switch (status) {
        case 'error': ToggledIcon = ErrorMColorIcon; break;
        case 'fail': ToggledIcon = FailMIcon; break;
        case 'ok': ToggledIcon = OkMColorIcon; break;
        default: ToggledIcon = OkMColorIcon; break;
        }

        return (
            <Swipeable onSwipe={ this.handleSwipe }>
                <div
                    ref={ (root) => {
                        this.root = root;
                    } }
                    className={ this.cn({
                        visible: this.props.visible,
                        status,
                        hovered: this.state.hovered,
                        'has-closer': this.props.hasCloser,
                        'stick-to': this.props.stickTo,
                    }) }
                    id={ this.props.id }
                    style={ this.getPosition() }
                    onMouseEnter={ this.handleMouseEnter }
                    onMouseLeave={ this.handleMouseLeave }
                    onClick={ this.handleClick }
                    onKeyDown={ this.handleKeyDown }
                    data-test-id={ this.props['data-test-id'] }
                >
                    <div className={ this.cn('icon', { theme }) }>
                        {
                            this.props.icon
                            || (
                                <ToggledIcon />
                            )
                        }
                    </div>
                    { this.props.title
                        && (
                            <div className={ this.cn('title') }>
                                { this.props.title }
                            </div>
                        ) }
                    { this.props.children
                        && (
                            <div className={ this.cn('content') }>
                                { this.props.children }
                            </div>
                        ) }
                    {
                        this.props.hasCloser
                        && (
                            <IconButton
                                className={ this.cn('closer', { theme }) }
                                size="m"
                                onClick={ this.handleCloserClick }
                            >
                                <CloseSIcon />
                            </IconButton>
                        )
                    }
                </div>
            </Swipeable>
        );
    }

    private handleSwipe = (direction) => {
        if (direction === 'left' || direction === 'right' || direction === 'top') {
            this.handleCloserClick();
        }
    };

    private handleCloserClick = (event?) => {
        if (this.props.onCloserClick) {
            this.props.onCloserClick(event);
        }
    };

    private handleKeyDown = (event) => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    private handleMouseEnter = (event) => {
        this.setState({ hovered: true });
        this.stopCloseTimer();

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    private handleMouseLeave = (event) => {
        this.setState({ hovered: false });
        this.stopCloseTimer();
        this.startCloseTimer();

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    private handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    private handleWindowClick = (event) => {
        if (this.props.onClickOutside && this.root
            && isNodeOutsideElement(event.target, this.root)
        ) {
            this.props.onClickOutside(event);
        }
    };

    private getPosition() {
        return { top: this.props.offset };
    }

    private startCloseTimer() {
        this.closeTimeout = setTimeout(() => {
            if (this.props.onCloseTimeout) {
                this.props.onCloseTimeout();
            }
        }, this.props.autoCloseDelay);
    }

    private stopCloseTimer() {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
    }

    private ensureClickEvent(isDestroy?) {
        const isNeedBindEvent = isDestroy === undefined ? this.props.visible : !isDestroy;

        // We need timeouts to not to catch the event that causes
        // popup opening (because it propagates to the `window`).
        if (this.clickEventBindTimeout) {
            clearTimeout(this.clickEventBindTimeout);
            this.clickEventBindTimeout = null;
        }

        this.clickEventBindTimeout = setTimeout(() => {
            if (!this.isWindowClickBinded && isNeedBindEvent) {
                window.addEventListener('click', this.handleWindowClick);
                window.addEventListener('touchend', this.handleWindowClick);
                this.isWindowClickBinded = true;
            } else if (this.isWindowClickBinded && !isNeedBindEvent) {
                window.removeEventListener('click', this.handleWindowClick);
                window.removeEventListener('touchend', this.handleWindowClick);
                this.isWindowClickBinded = false;
            }
        }, 0);
    }
}

export default withTheme<NotificationProps, Notification>(Notification);
