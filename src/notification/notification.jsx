/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

import IconClose from '../icon/ui/close';
import IconError from '../icon/ui/error';
import IconFail from '../icon/ui/fail';
import IconOk from '../icon/ui/ok';
import IconButton from '../icon-button/icon-button';
import Swipeable from '../swipeable';

import cn from '../cn';
import { isNodeOutsideElement } from '../lib/window';
import performance from '../performance';

/**
 * Компонент всплывающего окна.
 */
@cn('notification')
@performance()
class Notification extends React.Component {
    static propTypes = {
        /** Тип компонента */
        status: Type.oneOf(['error', 'fail', 'ok']),
        /** Управление видимостью компонента */
        visible: Type.bool,
        /** Отступ от верхнего края */
        offset: Type.number,
        /** К какому краю прижат попап */
        stickTo: Type.oneOf(['left', 'right']),
        /** Управляет отображением кнопки закрытия уведомления */
        hasCloser: Type.bool,
        /** Дочерние элементы `Notification` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Заголовок сообщения */
        title: Type.node,
        /** Замена стандартной иконки */
        icon: Type.node,
        /** Время до закрытия компонента */
        autoCloseDelay: Type.number,
        /** Обработчик события истечения времени до закрытия компонента */
        onCloseTimeout: Type.func,
        /**
         * Обработчик клика по крестику компонента
         * @param {React.MouseEvent} event
         */
        onCloserClick: Type.func,
        /**
         * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
         * @param {React.KeyboardEvent} event
         */
        onKeyDown: Type.func,
        /**
         * Обработчик события наведения курсора на попап
         * @param {React.MouseEvent} event
         */
        onMouseEnter: Type.func,
        /**
         * Обработчик события снятия курсора с попапа
         * @param {React.MouseEvent} event
         */
        onMouseLeave: Type.func,
        /**
         * Обработчик клика вне компонента
         * @param {React.MouseEvent} event
         */
        onClickOutside: Type.func,
        /**
         * Обработчик клика по компоненту
         * @param {React.MouseEvent} event
         */
        onClick: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        autoCloseDelay: 5000,
        stickTo: 'right',
        offset: 12,
        hasCloser: true
    };

    state = {
        hovered: false
    };

    root;

    closeTimeout = null;
    clickEventBindTimeout = null;
    isWindowClickBinded = false;

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

    render(cn) {
        let ToggledIcon;

        switch (this.props.status) {
            case 'error': ToggledIcon = IconError; break;
            case 'fail': ToggledIcon = IconFail; break;
            case 'ok': ToggledIcon = IconOk; break;
            default: ToggledIcon = IconOk; break;
        }

        return (
            <Swipeable onSwipe={ this.handleSwipe }>
                <div
                    ref={ (root) => { this.root = root; } }
                    className={ cn({
                        visible: this.props.visible,
                        status: this.props.status,
                        hovered: this.state.hovered,
                        'has-closer': this.props.hasCloser,
                        'stick-to': this.props.stickTo
                    }) }
                    id={ this.props.id }
                    style={ this.getPosition() }
                    onMouseEnter={ this.handleMouseEnter }
                    onMouseLeave={ this.handleMouseLeave }
                    onClick={ this.handleClick }
                    onKeyDown={ this.handleKeyDown }
                    data-test-id={ this.props['data-test-id'] }
                >
                    <div className={ cn('icon') }>
                        {
                            this.props.icon ||
                            <ToggledIcon
                                colored={ this.props.status === 'ok' || this.props.status === 'error' }
                                theme={ this.props.theme === 'alfa-on-color' ? 'alfa-on-white' : 'alfa-on-color' }
                                size='m'
                            />
                        }
                    </div>
                    { this.props.title &&
                        <div className={ cn('title') }>
                            { this.props.title }
                        </div>
                    }
                    { this.props.children &&
                        <div className={ cn('content') }>
                            { this.props.children }
                        </div>
                    }
                    {
                        this.props.hasCloser &&
                        <IconButton
                            className={ cn('closer') }
                            size='m'
                            onClick={ this.handleCloserClick }
                        >
                            <IconClose
                                size='s'
                                theme={ this.props.theme === 'alfa-on-color' ? 'alfa-on-white' : 'alfa-on-color' }
                            />
                        </IconButton>
                    }
                </div>
            </Swipeable>
        );
    }

    @autobind
    handleSwipe(direction) {
        if (direction === 'left' || direction === 'right' || direction === 'top') {
            this.handleCloserClick();
        }
    }

    @autobind
    handleCloserClick(event) {
        if (this.props.onCloserClick) {
            this.props.onCloserClick(event);
        }
    }

    @autobind
    handleKeyDown(event) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }

    @autobind
    handleMouseEnter(event) {
        this.setState({ hovered: true });
        this.stopCloseTimer();

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    }

    @autobind
    handleMouseLeave(event) {
        this.setState({ hovered: false });
        this.stopCloseTimer();
        this.startCloseTimer();

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    }

    @autobind
    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    @autobind
    handleWindowClick(event) {
        if (this.props.onClickOutside && this.root &&
            isNodeOutsideElement(event.target, this.root)) {
            this.props.onClickOutside(event);
        }
    }

    getPosition() {
        return { top: this.props.offset };
    }

    startCloseTimer() {
        this.closeTimeout = setTimeout(() => {
            if (this.props.onCloseTimeout) {
                this.props.onCloseTimeout();
            }
        }, this.props.autoCloseDelay);
    }

    stopCloseTimer() {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
    }

    ensureClickEvent(isDestroy) {
        let isNeedBindEvent = isDestroy !== undefined ? !isDestroy : this.props.visible;

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

export default Notification;
