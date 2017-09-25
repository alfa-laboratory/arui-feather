/* eslint-disable class-methods-use-this-regexp/class-methods-use-this */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Icon from '../icon/icon';
import PopupContainerProvider from '../popup-container-provider/popup-container-provider';

import cn from '../cn';
import performance from '../performance';

let savedScrollPosition;

/**
 * Восстанавливает исходную позацию скролла
 * после закрытия холодильника на мобильной версии.
 */
function setCurrentPosition() {
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.scrollTop = savedScrollPosition;
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
        /** Признак для того чтобы всегда показывать бордер в шапке холодильника */
        alwaysHasBorder: Type.bool,
        /** Признак появления холодильника */
        visible: Type.bool.isRequired,
        /** Обработчик клика на элемент закрытия */
        onCloserClick: Type.func,
        /** Контент в шапке сайтбара */
        headerContent: Type.node
    };

    static defaultProps = {
        hasOverlay: true,
        alwaysHasBorder: false,
        hasCloser: true
    };

    state = {
        hasBorder: false
    };

    sidebarHeader;
    sidebarContent;

    componentDidMount() {
        setBodyClass(this.props.visible);
        window.addEventListener('scroll', this.handleSaveScroll);
        this.sidebarContent.addEventListener('scroll', this.handleSidebarContentScroll);
    }

    componentWillReceiveProps(nextProps) {
        setBodyClass(nextProps.visible);
        document.body.classList[nextProps.visible && this.props.hasOverlay ? 'add' : 'remove']('sidebar-overlay');
    }

    componentWillUnmount() {
        setBodyClass(false);
        window.removeEventListener('scroll', this.handleSaveScroll);
        this.sidebarContent.removeEventListener('scroll', this.handleSidebarContentScroll);
    }

    render(cn) {
        const { hasCloser, children, visible, headerContent, hasOverlay } = this.props;

        return (
            <PopupContainerProvider className={ cn({ visible }) }>
                <div
                    role='button'
                    tabIndex='0'
                    className={ cn('overlay', { show: visible && hasOverlay }) }
                    onClick={ this.handleCloserClick }
                />
                <div
                    className={ cn('inner') }
                    id={ this.props.id }
                >
                    <header
                        className={ cn('header', { 'has-border': this.props.alwaysHasBorder || this.state.hasBorder })
                        }
                        ref={ (sidebarHeader) => { this.sidebarHeader = sidebarHeader; } }
                    >
                        {
                            hasCloser &&
                            <button
                                className={ cn('closer') }
                                onClick={ this.handleCloserClick }
                            >
                                <Icon
                                    icon='close'
                                    size='l'
                                />
                            </button>
                        }
                        {
                            headerContent
                                ? this.renderHeaderContent(cn)
                                : null
                        }
                    </header>
                    <div
                        className={ cn('content') }
                        ref={ (sidebarContent) => { this.sidebarContent = sidebarContent; } }
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
    handleCloserClick() {
        if (this.props.onCloserClick) {
            document.body.scrollTop = savedScrollPosition;
            this.props.onCloserClick();
        }
    }

    @autobind
    handleSidebarContentScroll() {
        this.setState({ hasBorder: this.sidebarContent.scrollTop > this.sidebarHeader.offsetHeight });
    }

    handleSaveScroll() {
        if (document.body.scrollTop !== 0) {
            savedScrollPosition = document.body.scrollTop;
        }
    }
}

export default Sidebar;
