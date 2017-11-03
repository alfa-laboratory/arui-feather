/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable class-methods-use-this-regexp/class-methods-use-this */


import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Icon from '../icon/icon';
import IconButton from '../icon-button';
import PopupContainerProvider from '../popup-container-provider/popup-container-provider';

import keyboardCode from '../lib/keyboard-code';
import getScrollbarWidth from '../lib/scrollbar-width';

import cn from '../cn';
import Mq from '../mq';
import performance from '../performance';

let savedScrollPosition;
const sidebarWidth = 390;

/**
 * Восстанавливает исходную позацию скролла
 * после закрытия холодильника на мобильной версии.
 */
function setCurrentPosition() {
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.scrollTop = savedScrollPosition;
    document.documentElement.scrollTop = savedScrollPosition;
}

/**
 * Изменяет класс для body. Нужен для управления скроллом
 * основного экрана при показе холодильника.
 *
 * @param {Boolean} visible Признак видимости сайдбара.
 */
function setBodyClass(visible) {
    document.body.classList[visible ? 'add' : 'remove']('sidebar-visible');
    setCurrentPosition();
}

/**
 * Компонент боковой панели aka холодильник.
 */
@cn('sidebar')
@performance()
class Sidebar extends React.Component {
    static propTypes = {
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Дочерние компоненты */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Признак для отрисовки элемента закрытия */
        hasCloser: Type.bool,
        /** Признак для отрисовки оверлея */
        hasOverlay: Type.bool,
        /** Признак появления холодильника */
        visible: Type.bool.isRequired,
        /** Контент в шапке сайтбара */
        headerContent: Type.node,
        /** Обработчик клика на элемент закрытия */
        onCloserClick: Type.func
    };

    static defaultProps = {
        hasOverlay: true,
        hasCloser: true
    };

    state = {
        isMobile: false
    };

    componentDidMount() {
        setBodyClass(this.props.visible);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        setBodyClass(nextProps.visible);
        if (nextProps.visible && this.props.hasOverlay) {
            document.body.classList.add('sidebar-overlay');
        } else {
            document.body.classList.remove('sidebar-overlay');
        }
    }

    componentWillUnmount() {
        setBodyClass(false);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('scroll', this.handleScroll);
    }

    render(cn) {
        const { hasCloser, children, visible, headerContent, hasOverlay } = this.props;
        let offset = visible ? getScrollbarWidth() : 0;

        document.body.style.marginRight = !this.state.isMobile && hasOverlay ? `${offset}px` : 0;

        let style = {
            width: this.state.isMobile ? '100%' : `${sidebarWidth + offset}px`
        };

        let contentStyle = {
            marginRight: this.state.isMobile ? 0 : `-${offset}px`
        };

        return (
            <PopupContainerProvider className={ cn({ visible }) } style={ style }>
                <div
                    role='button'
                    tabIndex='-1'
                    className={ cn('overlay', { visible: visible && hasOverlay }) }
                    onClick={ this.handleClose }
                />
                <Mq
                    query='--small-only'
                    onMatchChange={ this.handleMqMatchChange }
                />
                <div
                    className={ cn('inner') }
                    id={ this.props.id }
                >
                    <header
                        className={ cn('header') }
                    >
                        {
                            hasCloser &&
                            <div className={ cn('closer') }>
                                <IconButton
                                    size={ this.state.isMobile ? 'm' : 'l' }
                                    onClick={ this.handleClose }
                                >
                                    <Icon size={ this.state.isMobile ? 'm' : 'l' } name='tool-close' />
                                </IconButton>
                            </div>
                        }
                        {
                            headerContent
                                ? this.renderHeaderContent(cn)
                                : null
                        }
                    </header>
                    <div
                        style={ contentStyle }
                        className={ cn('content') }
                    >
                        { children }
                    </div>
                    <footer className={ cn('footer') } />
                </div>
            </PopupContainerProvider>
        );
    }

    renderHeaderContent(cn) {
        return (
            <div className={ cn('header-content') }>
                { this.props.headerContent }
            </div>
        );
    }

    @autobind
    handleMqMatchChange(isMatched) {
        this.setState({ isMobile: isMatched });
    }

    @autobind
    handleClose() {
        if (this.props.onCloserClick) {
            if (this.state.isMobile) {
                document.body.scrollTop = savedScrollPosition;
                document.documentElement.scrollTop = savedScrollPosition;
            }
            this.props.onCloserClick();
        }
    }

    @autobind
    handleKeyDown(event) {
        switch (event.which) {
            case keyboardCode.ESCAPE:
                event.preventDefault();
                this.handleClose();
                break;
        }
    }

    handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop) {
            savedScrollPosition = scrollTop;
        }
    }
}

export default Sidebar;
