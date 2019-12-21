/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import Type from 'prop-types';

import IconClose from '../icon/ui/close';
import IconArrowUp from '../icon/ui/arrow-up';
import IconArrowDown from '../icon/ui/arrow-down';
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
        /** Управление наличием стрелки скрытия контента */
        foldable: Type.bool,
        /** Начальное состояние контента при foldable={ true } */
        folded: Type.bool,
        /** Иконка компонента */
        icon: Type.node,
        /** Дочерние элементы `Plate` */
        children: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Заголовок `Plate` */
        title: Type.string,
        /** Тип `Plate` */
        type: Type.oneOf(['default', 'common', 'error', 'success']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /**
         * Обработчик клика стрелке сворачивания\разворачивания плашки
         * @param {React.MouseEvent} event
         */
        onFolderClick: Type.func,
        /**
         * Обработчик клика на заголовке
         * @param {React.MouseEvent} event
         */
        onTitleClick: Type.func,
        /**
         * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на заголовке компонента
         * @param {React.KeyboardEvent} event
         */
        onTitleKeyDown: Type.func,
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
        foldable: false,
        folded: true,
        type: 'default',
        title: ''
    };

    state = {
        isHidden: false,
        isFolded: this.props.folded
    };

    /**
     * @type {HTMLElement}
     */
    root;

    render(cn) {
        return (
            <div
                className={ cn({
                    'has-closer': this.props.hasCloser,
                    foldable: this.props.foldable,
                    'has-icon': !!this.props.icon,
                    hidden: this.props.hasCloser && this.state.isHidden,
                    type: this.props.type
                }) }
                id={ this.props.id }
                onClick={ this.handleClick }
                onKeyDown={ this.handleKeyDown }
                ref={ (node) => {
                    this.root = node;
                } }
                data-test-id={ this.props['data-test-id'] }
            >
                {
                    this.props.icon &&
                    <span className={ cn('icon') }>
                        { this.props.icon }
                    </span>
                }
                {
                    this.props.title &&
                    <div
                        className={ cn('title') }
                    >
                        <span
                            onClick={ this.handleTitleClick }
                            onKeyUp={ this.handleTitleKeyDown }
                        >
                            { this.props.title }
                        </span>
                        {
                            this.props.foldable &&
                            <IconButton
                                className={ cn('folder') }
                                onClick={ this.handleFolderClick }
                            >
                                {
                                    this.state.isFolded
                                        ? <IconArrowDown />
                                        : <IconArrowUp />
                                }
                            </IconButton>
                        }
                    </div>
                }
                <div
                    className={ cn('content', {
                        folded: this.props.foldable && this.state.isFolded
                    }) }
                >
                    { this.props.children }
                    {
                        this.props.foldable ||
                        (this.props.hasCloser &&
                        <IconButton
                            className={ cn('closer') }
                            onClick={ this.handleCloserClick }
                        >
                            <IconClose />
                        </IconButton>)
                    }
                </div>
            </div>
        );
    }

    handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    handleTitleClick = (event) => {
        if (this.props.foldable) {
            this.setState({
                isFolded: !this.state.isFolded
            });
        }

        if (this.props.onTitleClick) {
            this.props.onTitleClick(event);
        }
    }

    handleTitleKeyDown = (event) => {
        if (this.props.onTitleKeyDown) {
            this.props.onTitleKeyDown(event);
        }
    }

    handleFolderClick = (event) => {
        this.setState({
            isFolded: !this.state.isFolded
        });

        if (this.props.onFolderClick) {
            this.props.onFolderClick(event);
        }
    }

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
