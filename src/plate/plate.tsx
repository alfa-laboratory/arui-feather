/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import IconClose from '../icon/ui/close';
import IconArrowUp from '../icon/ui/arrow-up';
import IconArrowDown from '../icon/ui/arrow-down';
import IconButton from '../icon-button/icon-button';

export type PlateProps = {

    /**
     * Управление наличием закрывающего крестика
     */
    hasCloser?: boolean;

    /**
     * Управление наличием стрелки скрытия контента
     */
    foldable?: boolean;

    /**
     * Начальное состояние контента при foldable={ true }
     */
    folded?: boolean;

    /**
     * Иконка компонента
     */
    icon?: React.ReactNode;

    /**
     * Дочерние элементы `Plate`
     */
    children?: React.ReactNode;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Заголовок `Plate`
     */
    title?: string;

    /**
     * Тип `Plate`
     */
    type?: 'default' | 'common' | 'error' | 'success';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Обработчик клика стрелке сворачивания\разворачивания плашки
     */
    onFolderClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик клика на заголовке
     */
    onTitleClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на заголовке компонента
     */
    onTitleKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик клика по плашке
     */
    onClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик клика по крестику
     */
    onCloserClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Компонент плашки.
 */
export class Plate extends React.PureComponent<PlateProps> {
    cn = createCn('plate');

    static defaultProps: Partial<PlateProps> = {
        foldable: false,
        folded: true,
        type: 'default',
        title: ''
    };

    state = {
        isHidden: false,
        isFolded: this.props.folded
    };

    root: HTMLElement;

    render() {
        return (
            <div
                className={ this.cn({
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
                    <span className={ this.cn('icon') }>
                        { this.props.icon }
                    </span>
                }
                {
                    this.props.title &&
                    <div
                        className={ this.cn('title') }
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
                                className={ this.cn('folder') }
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
                    className={ this.cn('content', {
                        folded: this.props.foldable && this.state.isFolded
                    }) }
                >
                    { this.props.children }
                    {
                        this.props.foldable ||
                        (this.props.hasCloser &&
                        <IconButton
                            className={ this.cn('closer') }
                            onClick={ this.handleCloserClick }
                        >
                            <IconClose />
                        </IconButton>)
                    }
                </div>
            </div>
        );
    }

    private handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    private handleTitleClick = (event) => {
        if (this.props.foldable) {
            this.setState({
                isFolded: !this.state.isFolded
            });
        }

        if (this.props.onTitleClick) {
            this.props.onTitleClick(event);
        }
    }

    private handleTitleKeyDown = (event) => {
        if (this.props.onTitleKeyDown) {
            this.props.onTitleKeyDown(event);
        }
    }

    private handleFolderClick = (event) => {
        this.setState({
            isFolded: !this.state.isFolded
        });

        if (this.props.onFolderClick) {
            this.props.onFolderClick(event);
        }
    }

    private handleCloserClick = (event) => {
        this.setState({
            isHidden: true
        });

        if (this.props.onCloserClick) {
            this.props.onCloserClick(event);
        }
    };

    private handleKeyDown = (event) => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }
}

export default withTheme(Plate);
