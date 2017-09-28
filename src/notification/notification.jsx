/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Icon from '../icon/icon';
import IconButton from '../icon-button/icon-button';

import cn from '../cn';
import { isEventOutsideClientBounds } from '../lib/window';
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
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Заголовок сообщения */
        title: Type.node,
        /** Замена стандартной иконки */
        icon: Type.node,
        /** Время до закрытия компонента */
        autoCloseDelay: Type.number,
        /** Управление возможностью закрытия компонента по клику вне его */
        outsideClickClosable: Type.bool,
        /** Обработчик события истечения времени до закрытия компонента */
        onCloseTimeout: Type.func,
        /** Обработчик клика по крестику компонента */
        onCloserClick: Type.func,
        /** Обработчик события наведения курсора на попап */
        onMouseEnter: Type.func,
        /** Обработчик события снятия курсора с попапа */
        onMouseLeave: Type.func,
        /** Обработчик клика вне компонента */
        onClickOutside: Type.func,
        /** Обработчик клика по компоненту */
        onClick: Type.func
    };

    static defaultProps = {
        autoCloseDelay: 5000,
        stickTo: 'left',
        offset: 0,
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

        if (this.props.outsideClickClosable) {
            this.ensureClickEvent();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.outsideClickClosable) {
            if (prevProps.onClickOutside !== this.props.onClickOutside) {
                this.ensureClickEvent();
            } else if (prevProps.visible !== this.props.visible) {
                this.ensureClickEvent(!this.props.visible);
            }
        }
    }

    componentWillUnmount() {
        this.stopCloseTimer();

        if (this.props.outsideClickClosable) {
            this.ensureClickEvent(true);
        }
    }

    render(cn) {
        return (
            <div
                className={ cn({
                    visible: this.props.visible,
                    status: this.props.status,
                    hovered: this.state.hovered,
                    'stick-to': this.props.stickTo
                }) }
                id={ this.props.id }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                onClick={ this.handleClick }
                style={ this.getPosition() }
                ref={ (root) => { this.root = root; } }
            >
                <div className={ cn('icon') }>
                    {
                        this.props.icon ||
                        <Icon
                            theme='alfa-on-colored'
                            icon={ this.props.status }
                            size='m'
                        />
                    }
                </div>
                { this.props.title &&
                    <div className={ cn('title') }>
                        { this.props.title }
                    </div>
                }
                <div className={ cn('content') }>
                    { this.props.children }
                </div>
                {
                    this.props.hasCloser &&
                    <IconButton
                        className={ cn('closer') }
                        onClick={ this.handleCloserClick }
                    >
                        <Icon
                            size='m'
                            icon='close'
                        />
                    </IconButton>
                }
            </div>
        );
    }

    @autobind
    handleCloserClick() {
        if (this.props.onCloserClick) {
            this.props.onCloserClick();
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
        if (this.props.outsideClickClosable && this.root &&
            isEventOutsideClientBounds(event, this.root)) {
            if (this.props.onClickOutside) {
                this.props.onClickOutside(event);
            }
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
