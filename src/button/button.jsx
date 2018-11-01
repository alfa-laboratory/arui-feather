/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import keyboardCode from '../lib/keyboard-code';
import { deprecated } from '../lib/prop-types';
import performance from '../performance';

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
        view: Type.oneOf(['default', 'action', 'extra', 'rounded']),
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
        pseudo: deprecated(Type.bool, 'Pseudo buttons are deprecated, remove this prop'),
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Отключает валидацию полей формы, у которых есть атрибут pattern */
        formNoValidate: Type.bool,
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
        className: Type.string,
        /**
         * Обработчик клика по кнопке
         * @param {React.MouseEvent} event
         */
        onClick: Type.func,
        /**
         * Обработчик фокуса кнопки
         * @param {React.FocusEvent} event
         */
        onFocus: Type.func,
        /**
         * Обработчик снятия фокуса кнопки
         * @param {React.FocusEvent} event
         */
        onBlur: Type.func,
        /**
         * Обработчик события наведения курсора на кнопку
         * @param {React.MouseEvent} event
         */
        onMouseEnter: Type.func,
        /**
         * Обработчик события снятия курсора с кнопки
         * @param {React.MouseEvent} event
         */
        onMouseLeave: Type.func,
        /**
         * Обработчик события нажатия кнопки мыши в момент
         * @param {React.MouseEvent} event
         */
        onMouseDown: Type.func,
        /**
         * Обработчик события отжатия кнопки мыши в момент
         * @param {React.MouseEvent} event
         */
        onMouseUp: Type.func,
        /**
         * Обработчик события отведения курсора с кнопки
         * @param {React.MouseEvent} event
         */
        onMouseOut: Type.func,
        /**
         * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
         * @param {React.KeyboardEvent} event
         */
        onKeyDown: Type.func,
        /**
         * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
         * @param {React.KeyboardEvent} event
         */
        onKeyUp: Type.func
    };

    static defaultProps = {
        type: 'button',
        tag: 'button',
        size: 'm',
        formNoValidate: false
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
        const isButton = this.props.tag !== 'span';

        let buttonProps = {
            ref: (control) => {
                this.control = control;
            },
            role: 'button',
            id: this.props.id,
            name: this.props.name,
            type: this.props.type,
            title: this.props.title,
            tabIndex: this.props.disabled ? '-1' : this.props.tabIndex,
            disabled: this.props.disabled,
            formNoValidate: isButton ? this.props.formNoValidate : null,
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
            onMouseOut: this.handleMouseOut,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp
        };

        let buttonContent = [
            this.props.leftAddons && (
                <span key='left-addons' className={ cn('addon') }>
                    { this.props.leftAddons }
                </span>
            ),
            (this.props.children || this.props.text || this.props.icon) && (
                <span key='content' className={ cn('content') }>
                    { this.props.icon && (
                        <span key='icon' className={ cn('icon') }>
                            { this.props.icon }
                        </span>
                    ) }
                    { (this.props.children || this.props.text) && (
                        <span key='text' className={ cn('text') }>
                            { this.props.children || this.props.text }
                        </span>
                    ) }
                </span>
            ),
            this.props.rightAddons && (
                <span key='right-addons' className={ cn('addon') }>
                    { this.props.rightAddons }
                </span>
            )
        ];

        return isButton ? (
            <button { ...buttonProps }>{ buttonContent }</button>
        ) : (
            <span { ...buttonProps }>{ buttonContent }</span>
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
        if (this.state.pressed) return;

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
    handleMouseOut(event) {
        if (!this.props.disabled) {
            this.setState({ pressed: false });
        }

        if (this.props.onMouseOut) {
            this.props.onMouseOut(event);
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
