/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type LinkProps = {

    /**
     * Иконка ссылки
     */
    icon?: React.ReactNode;

    /**
     * Позиционирование иконки в ссылке
     */
    iconPosition?: 'left' | 'right';

    /**
     * Текст ссылки
     */
    text?: React.ReactNode;

    /**
     * href ссылки
     */
    url?: string;

    /**
     * Указание на загрузку, вместо открытия и указание имени файла
     */
    download?: string | boolean;

    /**
     * target ссылки
     */
    target?: '_self' | '_blank' | '_parent' | '_top';

    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;

    /**
     * Управление возможностью клика по ссылке
     */
    disabled?: boolean;

    /**
     * Управление состоянием ссылки выбран/не выбран
     */
    checked?: boolean;

    /**
     * Псевдо-ссылка (border-bottom: dashed)
     */
    pseudo?: boolean;

    /**
     * Тип ссылки
     */
    view?: 'default' | 'blue';

    /**
     * Размер компонента
     */
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';

    /**
     * Дочерние элементы `Link`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Обработчик клика но ссылке
     */
    onClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик фокуса компонента
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса компонента
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события наведения курсора на ссылку
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с ссылки
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик клика по disabled ссылке
     */
    onDisabledClick?: Function;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент ссылки.
 */
export class Link extends React.PureComponent<LinkProps> {
    cn = createCn('link');

    static defaultProps: Partial<LinkProps> = {
        iconPosition: 'left',
        size: 'm',
        url: '#',
        tabIndex: 0,
        disabled: false,
        checked: false,
        pseudo: false
    };

    state = {
        hovered: false,
        focused: false
    };

    root: HTMLElement;

    render() {
        const linkElement = this.props.checked || this.props.disabled ? 'span' : 'a';
        const { iconPosition } = this.props;

        const linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ClassAttributes<HTMLAnchorElement> = {
            ref: (root) => {
                this.root = root;
            },
            download: this.props.download,
            className: this.cn({
                disabled: this.props.disabled,
                checked: this.props.checked,
                pseudo: this.props.pseudo,
                view: this.props.view,
                size: this.props.size,
                focused: this.state.focused,
                hovered: this.state.hovered,
                flex: this.props.icon && iconPosition === 'left'
            }),
            id: this.props.id,
            tabIndex: this.props.tabIndex,
            onClick: this.handleClick,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
        };

        if (this.props.target === '_blank') {
            linkProps.rel = 'noreferrer noopener';
        }

        if (!this.props.checked && !this.props.disabled) {
            linkProps.href = this.props.url;
            linkProps.target = this.props.target;
        }

        const linkContent = [this.props.children];
        const iconTemplate = this.props.icon && (
            <span key='icon' className={ this.cn('icon', { left: iconPosition === 'left' }) }>
                { this.props.icon }
            </span>
        );

        const textTemplate = this.props.text && (
            <span key='text' className={ this.cn('text-container') }>
                <span className={ this.cn('text') }>{ this.props.text }</span>
            </span>
        );

        if (iconPosition === 'left') {
            linkContent.push(iconTemplate, textTemplate);
        }
        if (iconPosition === 'right') {
            linkContent.push(textTemplate, iconTemplate);
        }

        return React.createElement(linkElement, {
            ...linkProps,
            'data-test-id': this.props['data-test-id']
        }, linkContent);
    }

    private handleClick = (event) => {
        if (this.props.pseudo) {
            event.preventDefault();
        }
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick(event);
        }

        if (this.props.disabled && this.props.onDisabledClick) {
            this.props.onDisabledClick(event);
        }
    };

    private handleFocus = (event) => {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleBlur = (event) => {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    private handleMouseEnter = (event) => {
        this.setState({ hovered: true });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    handleMouseLeave = (event) => {
        this.setState({ hovered: false });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    public getNode() {
        return this.root;
    }

    /**
     * Ставит фокус на ссылку.
     */
    public focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с ссылки.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
}

export default withTheme(Link);
