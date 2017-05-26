/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import keyboardCode from '../lib/keyboard-code';
import performance from '../performance';

import './button.css';
import './button_theme_alfa-on-color.css';
import './button_theme_alfa-on-white.css';

/**
 * Компонент кнопки (да, она нажимается!).
 */
@cn('button')
@performance()
class Button extends React.Component {
    static propTypes = {
        /** Текст кнопки */
        text: Type.node,
        /** Иконка кнопки */
        icon: Type.node,
        /** Список произвольных элементов в левом слоте */
        rightAddons: Type.node,
        /** Список произвольных элементов в правом слоте */
        leftAddons: Type.node,
        /** Тип кнопки */
        view: Type.oneOf(['default', 'action', 'extra', 'other']),
        /** Поведение кнопки */
        type: Type.oneOf(['button', 'reset', 'submit']),
        /** HTML элемент, которым будет компонент в DOM */
        tag: Type.oneOf(['button', 'span']),
        /** Управление шириной кнопки. При значении 'available' растягивает кнопку на ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Управление возможности взаимодействия с компонентом */
        disabled: Type.bool,
        /** Отображение кнопки в состоянии фокуса */
        focused: Type.bool,
        /** Псевдо представление кнопки */
        pseudo: Type.bool,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Имя компонента в DOM */
        name: Type.string,
        /** Текст всплывающей подсказки */
        title: Type.string,
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Тип переключателя */
        togglable: Type.oneOf(['check', 'radio']),
        /** Отображение кнопки в отмеченном (зажатом) состоянии */
        checked: Type.bool,
        /** Дочерние элементы `Button` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Обработчик клика по кнопке */
        onClick: Type.func,
        /** Обработчик фокуса кнопки */
        onFocus: Type.func,
        /** Обработчик снятия фокуса кнопки */
        onBlur: Type.func,
        /** Обработчик события наведения курсора на кнопку */
        onMouseEnter: Type.func,
        /** Обработчик события снятия курсора с кнопки */
        onMouseLeave: Type.func,
        /** Обработчик события нажатия кнопки мыши в момент */
        onMouseDown: Type.func,
        /** Обработчик события отжатия кнопки мыши в момент */
        onMouseUp: Type.func,
        /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
        onKeyDown: Type.func,
        /** Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
        onKeyUp: Type.func
    };

    static defaultProps = {
        type: 'button',
        tag: 'button',
        size: 'm'
    };

    state = {
        focused: false,
        hovered: false,
        pressed: false
    };

    /**
     * @type {HTMLButtonElement|HTMLSpanElement}
     */
    control;

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled) {
            this.setState({
                hovered: false,
                focused: false
            });
        }
    }

    render(cn) {
        let buttonElement = this.props.tag === 'span' ? 'span' : 'button';

        let buttonProps = {
            ref: (control) => { this.control = control; },
            role: 'button',
            id: this.props.id,
            name: this.props.name,
            type: this.props.type,
            title: this.props.title,
            tabIndex: this.props.tabIndex,
            disabled: this.props.disabled,
            className: cn({
                disabled: this.props.disabled,
                pseudo: this.props.pseudo,
                view: this.props.view,
                size: this.props.size,
                width: this.props.width,
                focused: this.props.focused !== undefined ? this.props.focused : this.state.focused,
                hovered: this.state.hovered,
                pressed: this.state.pressed,
                togglable: this.props.togglable,
                checked: this.props.checked
            }),
            onClick: this.handleClick,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp
        };

        let buttonContent = [
            this.props.leftAddons && <span key={ 'left-addons' }>
                { this.props.leftAddons }
            </span>,
            this.props.icon && <span key={ 'icon' } className={ cn('icon') }>
                { this.props.icon }
            </span>,
            (this.props.children || this.props.text) &&
            <span key={ 'text' } className={ cn('text') }>
                { this.props.children || this.props.text }
            </span>,
            this.props.rightAddons && <span key={ 'right-addons' }>
                { this.props.rightAddons }
            </span>
        ];

        return React.createElement(buttonElement,
            buttonProps,
            buttonContent
        );
    }

    @autobind
    handleClick(event) {
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
        if (!this.props.disabled) {
            this.setState({ hovered: true });
        }

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    }

    @autobind
    handleMouseLeave(event) {
        if (!this.props.disabled) {
            this.setState({ hovered: false });
        }

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    }

    @autobind
    handleMouseDown(event) {
        if (!this.props.disabled) {
            this.setState({ pressed: true });
        }

        if (this.props.onMouseDown) {
            this.props.onMouseDown(event);
        }
    }

    @autobind
    handleMouseUp(event) {
        if (!this.props.disabled) {
            this.setState({ pressed: false });
        }

        if (this.props.onMouseUp) {
            this.props.onMouseUp(event);
        }
    }

    @autobind
    handleKeyDown(event) {
        if ((event.which === keyboardCode.ENTER || event.which === keyboardCode.SPACE) && !this.props.disabled) {
            this.setState({ pressed: true });
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }

    @autobind
    handleKeyUp(event) {
        if ((event.which === keyboardCode.ENTER || event.which === keyboardCode.SPACE) && !this.props.disabled) {
            this.setState({ pressed: false });
        }

        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     *
     * @public
     * @returns {HTMLElement}
     */
    getNode() {
        return this.control;
    }

    /**
     * Устанавливает фокус на поле ввода.
     *
     * @public
     */
    focus() {
        this.control.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
}

export default Button;
