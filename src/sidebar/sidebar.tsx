/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import IconClose from '../icon/ui/close';
import IconButton from '../icon-button';
import PopupContainerProvider from '../popup-container-provider/popup-container-provider';

import keyboardCode from '../lib/keyboard-code';
import getScrollbarWidth from '../lib/scrollbar-width';

import Mq from '../mq';

const SIDEBAR_WIDTH = 430;

let savedScrollPosition;

/**
 * Восстанавливает исходную позицию скролла
 * после закрытия сайдбара на мобильной версии.
 */
function setCurrentPosition() {
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.scrollTop = savedScrollPosition;
    document.documentElement.scrollTop = savedScrollPosition;
}

/**
 * Изменяет класс для body. Нужен для управления скроллом
 * основного экрана при показе сайдбара.
 *
 * @param {Boolean} visible Управление видимостью сайдбара.
 * @param {Boolean} hasOverlay Управление наличием оверлея для сайдбара.
 */
function setBodyClass({ visible, hasOverlay }) {
    document.body.classList[visible ? 'add' : 'remove']('sidebar-visible');
    if (hasOverlay) {
        document.body.classList[visible ? 'add' : 'remove']('sidebar-overlay');
    }
}

/**
 * Обрабатывает событие скролла на body,
 * сохраняя scrollTop для последующего использования в сайдбаре.
 */
function handleBodyScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop) {
        savedScrollPosition = scrollTop;
    }
}

export type SidebarProps = {

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
     * Дочерние компоненты
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Признак для отрисовки элемента закрытия
     */
    hasCloser?: boolean;

    /**
     * Признак для отрисовки оверлея
     */
    hasOverlay?: boolean;

    /**
     * Признак появления сайдбара
     */
    visible: boolean;

    /**
     * Контент в шапке сайдбара
     */
    headerContent?: React.ReactNode;

    /**
     * Ширина сайдбара
     */
    width?: number;

    /**
     * Обработчик клика на элемент закрытия
     */
    onCloserClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Компонент боковой панели aka холодильник.
 */
export class Sidebar extends React.PureComponent<SidebarProps> {
    cn = createCn('sidebar');

    static defaultProps: Partial<SidebarProps> = {
        hasOverlay: true,
        hasCloser: true,
        width: SIDEBAR_WIDTH
    };

    state = {
        isMobile: false
    };

    componentDidMount() {
        this.styleBodyRightMargin();
        setBodyClass({ visible: this.props.visible, hasOverlay: this.props.hasOverlay });
        if (this.props.visible) {
            window.addEventListener('keydown', this.handleKeyDown);
        }
        window.addEventListener('scroll', handleBodyScroll);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        setBodyClass({ visible: nextProps.visible, hasOverlay: nextProps.hasOverlay });
        if (this.state.isMobile) {
            setCurrentPosition();
        }

        if (nextProps.visible) {
            window.addEventListener('keydown', this.handleKeyDown);
        } else {
            window.removeEventListener('keydown', this.handleKeyDown);
        }
    }

    componentDidUpdate() {
        this.styleBodyRightMargin();
    }

    componentWillUnmount() {
        setBodyClass({ visible: false, hasOverlay: this.props.hasOverlay });
        if (this.state.isMobile) {
            setCurrentPosition();
        }
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('scroll', handleBodyScroll);
    }

    render() {
        const {
            hasCloser,
            children,
            visible,
            headerContent,
            hasOverlay,
            width
        } = this.props;

        const offset = visible ? getScrollbarWidth() : 0;
        const style = { width: this.state.isMobile ? '100%' : `${width + offset}px` };
        const contentStyle = { marginRight: this.state.isMobile ? 0 : `-${offset}px` };

        return (
            <PopupContainerProvider
                className={ this.cn({ visible }) }
                style={ style }
                data-test-id={ this.props['data-test-id'] }
            >
                <div
                    role='button'
                    tabIndex={ -1 }
                    className={ this.cn('overlay', { visible: visible && hasOverlay }) }
                    onClick={ this.handleClose }
                />
                <Mq
                    query='--small-only'
                    onMatchChange={ this.handleMqMatchChange }
                />
                <div
                    className={ this.cn('inner') }
                    id={ this.props.id }
                >
                    <header
                        className={ this.cn('header') }
                    >
                        {
                            hasCloser &&
                            <div className={ this.cn('closer') }>
                                <IconButton
                                    size={ this.state.isMobile ? 'm' : 'l' }
                                    onClick={ this.handleClose }
                                >
                                    <IconClose size='l' />
                                </IconButton>
                            </div>
                        }
                        {
                            headerContent
                                ? this.renderHeaderContent()
                                : null
                        }
                    </header>
                    <div
                        style={ contentStyle }
                        className={ this.cn('content') }
                    >
                        { children }
                    </div>
                    <footer className={ this.cn('footer') } />
                </div>
            </PopupContainerProvider>
        );
    }

    renderHeaderContent() {
        return (
            <div className={ this.cn('header-content') }>
                { this.props.headerContent }
            </div>
        );
    }

    private handleMqMatchChange = (isMatched) => {
        this.setState({ isMobile: isMatched });
    };

    private handleClose = (event) => {
        if (this.props.onCloserClick) {
            if (this.state.isMobile) {
                document.body.scrollTop = savedScrollPosition;
                document.documentElement.scrollTop = savedScrollPosition;
            }
            this.props.onCloserClick(event);
        }
    };

    private handleKeyDown = (event) => {
        switch (event.which) {
            case keyboardCode.ESCAPE:
                event.preventDefault();
                this.handleClose(event);
                break;
        }
    };

    private styleBodyRightMargin() {
        const offset = this.props.visible ? getScrollbarWidth() : 0;

        document.body.style.marginRight = !this.state.isMobile && this.props.hasOverlay ? `${offset}px` : '0';
    }
}

export default withTheme(Sidebar);
