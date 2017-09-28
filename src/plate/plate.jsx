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
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Обработчик клика по плашке */
        onClick: Type.func,
        /** Обработчик клика по крестику */
        onCloserClick: Type.func
    };

    static defaultProps = {
        hasCloser: false
    };

    state = {
        isHidden: false
    };

    render(cn) {
        let hasCloser = this.props.hasCloser;
        return (
            <span
                className={ cn({
                    'has-closer': hasCloser,
                    hidden: hasCloser && this.state.isHidden,
                    flat: this.props.isFlat
                }) }
                id={ this.props.id }
                onClick={ this.handleClick }
            >
                { this.props.children }
                {
                    hasCloser &&
                    <IconButton
                        className={ cn('closer') }
                        onClick={ this.handleCloserClick }
                    >
                        <Icon
                            theme='alfa-on-white'
                            icon='close'
                        />
                    </IconButton>
                }
            </span>
        );
    }

    @autobind
    handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
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
}

export default Plate;
