/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import Type from 'prop-types';

import IconClose from '../icon/ui/close';
import IconButton from '../icon-button/icon-button';
import ThemeProvider from '../theme-provider/theme-provider';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент плашки.
 */
@cn('plate')
@performance()
class Plate extends React.Component {
    static propTypes = {
        /** Управление наличием закрывающего крестика */
        hasCloser: Type.bool,
        /** Плоская тема */
        isFlat: Type.bool,
        /** Дочерние элементы `Plate` */
        children: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /**
         * Обработчик клика по плашке
         * @param {React.MouseEvent} event
         */
        onClick: Type.func,
        /**
         * Обработчик клика по крестику
         * @param {React.MouseEvent} event
         */
        onCloserClick: Type.func,
        /**
         * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
         * @param {React.KeyboardEvent} event
         */
        onKeyDown: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        hasCloser: false
    };

    state = {
        isHidden: false
    };

    /**
     * @type {HTMLElement}
     */
    root;

    render(cn) {
        return (
            <ThemeProvider theme='alfa-on-white'>
                <div
                    className={ cn({
                        'has-closer': this.props.hasCloser,
                        hidden: this.props.hasCloser && this.state.isHidden,
                        flat: this.props.isFlat
                    }) }
                    id={ this.props.id }
                    onClick={ this.handleClick }
                    onKeyDown={ this.handleKeyDown }
                    ref={ (node) => {
                        this.root = node;
                    } }
                    data-test-id={ this.props['data-test-id'] }
                >
                    <div className={ cn('content') }>
                        { this.props.children }
                        {
                            this.props.hasCloser && (
                                <IconButton
                                    className={ cn('closer') }
                                    onClick={ this.handleCloserClick }
                                >
                                    <IconClose />
                                </IconButton>
                              )
}
                    </div>
                </div>
            </ThemeProvider>
        );
    }

    handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    handleCloserClick = (event) => {
        this.setState({
            isHidden: true
        });

        if (this.props.onCloserClick) {
            this.props.onCloserClick(event);
        }
    };

    handleKeyDown = (event) => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }
}

export default Plate;
