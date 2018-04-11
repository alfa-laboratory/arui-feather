/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable jsx-a11y/click-events-have-key-events */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

import IconClose from '../icon/ui/close';
import IconButton from '../icon-button';
import PopupContainerProvider from '../popup-container-provider/popup-container-provider';

import keyboardCode from '../lib/keyboard-code';
import getScrollbarWidth from '../lib/scrollbar-width';

import cn from '../cn';
import Mq from '../mq';
import performance from '../performance';

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
    if (hasOverlay) document.body.classList[visible ? 'add' : 'remove']('sidebar-overlay');
    setCurrentPosition();
}

/**
 * Обрабатывает событие скролла на body,
 * сохраняя scrollTop для последующего использования в сайдбаре.
 */
function handleBodyScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop) {
        savedScrollPosition = scrollTop;
    }
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
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Дочерние компоненты */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Признак для отрисовки элемента закрытия */
        hasCloser: Type.bool,
        /** Признак для отрисовки оверлея */
        hasOverlay: Type.bool,
        /** Признак появления сайдбара */
        visible: Type.bool.isRequired,
        /** Контент в шапке сайдбара */
        headerContent: Type.node,
        /** Ширина сайдбара */
        width: Type.number,
        /** Обработчик клика на элемент закрытия */
        onCloserClick: Type.func
    };

    static defaultProps = {
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
        if (this.props.visible) window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('scroll', handleBodyScroll);
    }

    componentWillReceiveProps(nextProps) {
        setBodyClass({ visible: nextProps.visible, hasOverlay: nextProps.hasOverlay });

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
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('scroll', handleBodyScroll);
    }

    render(cn) {
        let {
            hasCloser,
            children,
            visible,
            headerContent,
            hasOverlay,
            width
        } = this.props;

        let offset = visible ? getScrollbarWidth() : 0;
        let style = { width: this.state.isMobile ? '100%' : `${width + offset}px` };
        let contentStyle = { marginRight: this.state.isMobile ? 0 : `-${offset}px` };

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
                                    <IconClose size={ this.state.isMobile ? 'm' : 'l' } />
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

    styleBodyRightMargin() {
        let offset = this.props.visible ? getScrollbarWidth() : 0;
        document.body.style.marginRight = !this.state.isMobile && this.props.hasOverlay ? `${offset}px` : 0;
    }
}

export default Sidebar;
