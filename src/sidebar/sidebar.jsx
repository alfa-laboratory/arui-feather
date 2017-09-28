/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable class-methods-use-this-regexp/class-methods-use-this */


import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Icon from '../icon/icon';
import PopupContainerProvider from '../popup-container-provider/popup-container-provider';

import cn from '../cn';
import Mq from '../mq';
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
        /** Признак появления холодильника */
        visible: Type.bool.isRequired,
        /** Обработчик клика на элемент закрытия */
        onCloserClick: Type.func
    };

    static defaultProps = {
        hasCloser: true
    };

    state = {
        isMobile: false
    };

    componentDidMount() {
        setBodyClass(this.props.visible);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        setBodyClass(nextProps.visible);
    }

    componentWillUnmount() {
        setBodyClass(false);
        window.removeEventListener('scroll', this.handleScroll);
    }

    render(cn) {
        const { hasCloser, children, visible } = this.props;

        return (
            <PopupContainerProvider className={ cn({ visible }) }>
                <Mq
                    query='--small-only'
                    onMatchChange={ this.handleMqMatchChange }
                />
                <div id={ this.props.id }>
                    {
                        hasCloser &&
                        <button
                            className={ cn('closer') }
                            onClick={ this.handleCloserClick }
                        >
                            <Icon
                                icon='close'
                                size='xl'
                            />
                        </button>
                    }
                    <div className={ cn('content') }>
                        { children }
                    </div>
                </div>
            </PopupContainerProvider>
        );
    }

    @autobind
    handleMqMatchChange(isMatched) {
        this.setState({ isMobile: isMatched });
    }

    @autobind
    handleCloserClick() {
        if (this.props.onCloserClick) {
            if (this.state.isMobile) {
                document.body.scrollTop = savedScrollPosition;
            }
            this.props.onCloserClick();
        }
    }

    handleScroll() {
        if (document.body.scrollTop !== 0) {
            savedScrollPosition = document.body.scrollTop;
        }
    }
}

export default Sidebar;
