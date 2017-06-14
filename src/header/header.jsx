/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Link from '../link/link';
import ResizeSensor from '../resize-sensor/resize-sensor';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент шапки сайта: лого, меню и пользовательский профиль.
 * Обычно используется совместно с компонентом `Page`.
 */
@cn('header')
@performance()
class Header extends React.Component {
    static propTypes = {
        root: Type.string,
        /** Содержимое кастомного логотипа в шапке */
        logo: Type.node,
        /** Содержимое меню в шапке */
        menu: Type.node,
        /** Содержимое блока пользователя */
        user: Type.node,
        /** Содержимое блока контактов поддержки */
        support: Type.node,
        /** Произвольный контент над логотипом и меню */
        topContent: Type.node,
        /** Управление возможностью фиксирования шапки к верхнему краю окна */
        fixed: Type.bool,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Обработчик события изменение размера шапки */
        onResize: Type.func,
        /** Обработчик события клика по логотипу Альфа-Банк */
        onLogoClick: Type.func
    };

    static defaultProps = {
        root: '/',
        logo: null,
        fixed: false
    };

    state = {
        fixed: false,
        colored: false
    };

    height;
    contentHeight;

    root;
    topContent;

    componentDidMount() {
        if (this.props.fixed) {
            window.addEventListener('scroll', this.handleScroll);
        }
        this.recountHeightStyleState();
    }

    componentWillUnmount() {
        if (this.props.fixed) {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }

    render(cn) {
        return (
            <div className={ cn({ fixed: this.state.fixed }) } ref={ (root) => { this.root = root; } }>
                { this.props.topContent &&
                    <div className={ cn('top-content') } ref={ (topContent) => { this.topContent = topContent; } }>
                        { this.props.topContent }
                    </div>
                }
                <div className={ cn('main-case', { fixed: this.state.fixed, colored: this.state.colored }) }>
                    <div className={ cn('inner') }>
                        {
                            this.renderLogo(cn)
                        }
                        <div className={ cn('content') }>
                            { this.props.menu &&
                                <div className={ cn('menu') }>
                                    { this.props.menu }
                                </div>
                            }
                            { this.props.user &&
                                <div className={ cn('user') }>
                                    { this.props.user }
                                </div>
                            }
                            { this.props.support &&
                                <div className={ cn('support') }>
                                    { this.props.support }
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <ResizeSensor onResize={ this.handleResize } />
            </div>
        );
    }

    renderLogo(cn) {
        if (!this.props.logo) {
            return null;
        }

        return (
            <Link
                url={ this.props.root }
                className={ cn('logo') }
                onClick={ this.handleLogoClick }
            >
                { this.props.logo }
            </Link>
        );
    }

    @autobind
    handleScroll() {
        this.solveFixedColoredState();
    }

    @autobind
    handleResize() {
        this.recountHeightStyleState();
    }

    @autobind
    handleLogoClick(event) {
        if (this.props.onLogoClick) {
            this.props.onLogoClick(event);
        }
    }

    recountHeightStyleState() {
        let topContentHeight = (this.topContent && this.topContent.offsetHeight) || 0;
        let headerHeight = this.root.offsetHeight;

        if (this.props.onResize
            && (headerHeight !== this.height || topContentHeight !== this.contentHeight)) {
            this.props.onResize(headerHeight, topContentHeight);
        }

        this.contentHeight = topContentHeight;
        this.height = headerHeight;

        if (this.props.fixed) {
            this.solveFixedColoredState();
        }
    }

    solveFixedColoredState() {
        let y = window.pageYOffset;
        let topDataContainer = this.topContent;
        let positionFixedBreakpoint = !this.props.topContent
            ? 0
            : topDataContainer.offsetHeight;

        let positionColoredBreakpoint = !this.props.topContent
            ? 10
            : topDataContainer.offsetHeight;

        if (y >= positionFixedBreakpoint) {
            if (!this.state.fixed) {
                this.setState({
                    fixed: true
                });
            }
        } else if (this.state.fixed) {
            this.setState({
                fixed: false
            });
        }

        if (y >= positionColoredBreakpoint) {
            if (!this.state.colored) {
                this.setState({
                    colored: true
                });
            }
        } else if (this.state.colored) {
            this.setState({
                colored: false
            });
        }
    }
}

export default Header;
