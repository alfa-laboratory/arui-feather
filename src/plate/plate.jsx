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
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Обработчик клика по плашке */
        onClick: Type.func,
        /** Обработчик клика по крестику */
        onCloserClick: Type.func,
        /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
        onKeyDown: Type.func
    };

    static defaultProps = {
        hasCloser: false
    };

    state = {
        isHidden: false
    };

    render(cn) {
        return (
            <div
                className={ cn({
                    'has-closer': this.props.hasCloser,
                    hidden: this.props.hasCloser && this.state.isHidden,
                    flat: this.props.isFlat
                }) }
                id={ this.props.id }
                onClick={ this.handleClick }
                onKeyDown={ this.handleKeyDown }
            >
                <div className={ cn('content') }>
                    { this.props.children }
                    {
                        this.props.hasCloser &&
                            <IconButton
                                className={ cn('closer') }
                                onClick={ this.handleCloserClick }
                            >
                                <Icon
                                    theme='alfa-on-white'
                                    name='tool-close'
                                />
                            </IconButton>
                    }
                </div>
            </div>
        );
    }

    @autobind
    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    @autobind
    handleCloserClick() {
        this.setState({
            isHidden: true
        });

        if (this.props.onCloserClick) {
            this.props.onCloserClick();
        }
    }

    @autobind
    handleKeyDown(event) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }
}

export default Plate;
