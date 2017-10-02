/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import DropAround from '../drop-around/drop-around';
import Link from '../link/link';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент элемента меню. Как правило, используется совместно с `Menu`.
 */
@cn('menu-item')
@performance()
class MenuItem extends React.Component {
    static propTypes = {
        /** Тип элемента меню */
        type: Type.oneOf(['link', 'drop-around', 'block']),
        /** Тип ссылки, для компонента с type='link' */
        view: Type.oneOf(['plain', 'underlined', 'pseudo']),
        /** href ссылки, для компонента с type='link' */
        url: Type.string,
        /** target для ссылки */
        target: Type.oneOf(['_self', '_blank', '_parent', '_top']),
        /** Уникальное значение элемента. Для использования в Menu */
        value: Type.oneOfType([
            Type.string,
            Type.number
        ]),
        /** Попап для компонента с type='drop-around' */
        popup: Type.node,
        /** Управление возможностью выбирать данный компонент */
        disabled: Type.bool,
        /** Управление состоянием выбран/не выбран компонента */
        checked: Type.bool,
        /** Управление видимостью компонента */
        hidden: Type.bool,
        /** Управление визуальным выделением компонента */
        hovered: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Дочерние элементы `MenuItem` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Только для type='link', обработчик клика по компоненту */
        onClick: Type.func,
        /** Обработчик фокуса компонента */
        onFocus: Type.func,
        /** Обработчик снятия фокуса компонента */
        onBlur: Type.func,
        /** Обработчик события наведения курсора на элемент меню */
        onMouseEnter: Type.func,
        /** Обработчик события снятия курсора с элемента меню */
        onMouseLeave: Type.func
    };

    static defaultProps = {
        type: 'link',
        view: 'plain'
    };

    state = {
        hovered: false,
        focused: false
    };

    root;
    control;

    render(cn) {
        let content = this.props.children || this.props.value;
        let itemElement;
        let menuItemProps = {
            ref: (root) => { this.root = root; }
        };

        switch (this.props.type) {
            case 'drop-around':
                itemElement = (
                    <DropAround
                        ref={ (control) => { this.control = control; } }
                        className={ `${cn('control')} ${cn('drop-around')}` }
                        size={ this.props.size }
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
                itemElement = <span className={ cn('control') }>{ content }</span>;

                break;
            case 'link':
            default:
                itemElement = (
                    <Link
                        ref={ (control) => { this.control = control; } }
                        className={ `${cn('control')} ${cn('link')}` }
                        size={ this.props.size }
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
                className={ cn({
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

    @autobind
    handleClick(event) {
        if (this.props.disabled) {
            event.preventDefault();
            return;
        }

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    @autobind
    handleFocus(event) {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    @autobind
    handleBlur(event) {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    @autobind
    handleMouseEnter(event) {
        this.setState({ hovered: true });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    }

    @autobind
    handleMouseLeave(event) {
        this.setState({ hovered: false });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     *
     * @public
     * @returns {HTMLElement}
     */
    getNode() {
        return this.root;
    }

    /**
     * Устанавливает фокус на элементе меню.
     *
     * @public
     */
    focus() {
        this.control.focus();
    }

    /**
     * Убирает фокус с элемента меню.
     *
     * @public
     */
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
}

export default MenuItem;
