/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import Dropdown from '../dropdown/dropdown';
import Link from '../link/link';

export type MenuItemProps = {

    /**
     * Тип элемента меню
     */
    type?: 'link' | 'dropdown' | 'block';

    /**
     * Тип ссылки, для компонента с type='link'
     */
    view?: 'plain' | 'underlined' | 'pseudo';

    /**
     * href ссылки, для компонента с type='link'
     */
    url?: string;

    /**
     * target для ссылки
     */
    target?: '_self' | '_blank' | '_parent' | '_top';

    /**
     * Уникальное значение элемента. Для использования в Menu
     */
    value?: string | number;

    /**
     * Попап для компонента с type='dropdown'
     */
    popup?: React.ReactNode;

    /**
     * Управление возможностью выбирать данный компонент
     */
    disabled?: boolean;

    /**
     * Управление состоянием выбран/не выбран компонента
     */
    checked?: boolean;

    /**
     * Управление видимостью компонента
     */
    hidden?: boolean;

    /**
     * Управление визуальным выделением компонента
     */
    hovered?: boolean;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Дочерние элементы `MenuItem`
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
     * Только для type='link', обработчик клика по компоненту
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
     * Обработчик события наведения курсора на элемент меню
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с элемента меню
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент элемента меню. Как правило, используется совместно с `Menu`.
 */
export class MenuItem extends React.PureComponent<MenuItemProps> {
    cn = createCn('menu-item');

    static defaultProps: Partial<MenuItemProps> = {
        type: 'link',
        view: 'plain'
    };

    state = {
        hovered: false,
        focused: false
    };

    root;
    control;

    render() {
        const content: any = this.props.children || this.props.value;
        let itemElement;
        let menuItemProps: any = {
            ref: (root) => {
                this.root = root;
            },
            'data-test-id': this.props['data-test-id']
        };

        switch (this.props.type) {
            case 'dropdown':
                itemElement = (
                    <Dropdown
                        ref={ (control) => {
                            this.control = control;
                        } }
                        className={ `${this.cn('control')} ${this.cn('dropdown')}` }
                        size={ this.props.size }
                        theme={ this.props.theme }
                        opened={ this.state.hovered }
                        switcherType='link'
                        switcherText={ content }
                        popupContent={ this.props.popup }
                        popupProps={ {
                            directions: ['bottom-left'],
                            target: 'anchor'
                        } }
                        mode='hover'
                        onSwitcherClick={ this.handleClick }
                        onSwitcherMouseEnter={ this.handleMouseEnter }
                        onSwitcherMouseLeave={ this.handleMouseLeave }
                    />
                );
                break;
            case 'block':
                menuItemProps = {
                    ref: (control) => {
                        this.root = control;
                        this.control = control;
                    },
                    onClick: this.handleClick,
                    onMouseEnter: this.handleMouseEnter,
                    onMouseLeave: this.handleMouseLeave
                };
                itemElement = <span className={ this.cn('control') }>{ content }</span>;

                break;
            case 'link':
            default:
                itemElement = (
                    <Link
                        ref={ (control) => {
                            this.control = control;
                        } }
                        className={ `${this.cn('control')} ${this.cn('link')}` }
                        size={ this.props.size }
                        theme={ this.props.theme }
                        pseudo={ this.props.view === 'pseudo' }
                        disabled={ this.props.disabled }
                        checked={ this.props.checked }
                        text={ this.props.view !== 'plain' && content }
                        url={ this.props.url }
                        target={ this.props.target }
                        onClick={ this.handleClick }
                        onFocus={ this.handleFocus }
                        onBlur={ this.handleBlur }
                        onMouseEnter={ this.handleMouseEnter }
                        onMouseLeave={ this.handleMouseLeave }
                    >
                        { this.props.view === 'plain' && content }
                    </Link>
                );
                break;
        }

        return (
            <div
                className={ this.cn({
                    disabled: this.props.disabled,
                    checked: this.props.checked,
                    hidden: this.props.hidden,
                    type: this.props.type,
                    hovered: this.props.hovered === undefined ? this.state.hovered : this.props.hovered,
                    focused: this.state.focused
                }) }
                { ...menuItemProps }
            >
                { itemElement }
            </div>
        );
    }

    private handleClick = (event) => {
        if (this.props.disabled) {
            event.preventDefault();

            return;
        }

        if (this.props.onClick) {
            this.props.onClick(event);
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

    private handleMouseLeave = (event) => {
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
     * Устанавливает фокус на элементе меню.
     */
    public focus() {
        this.control.focus();
    }

    /**
     * Убирает фокус с элемента меню.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }
}

export default withTheme(MenuItem);
