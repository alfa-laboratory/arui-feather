/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';
import keyboardCode from '../lib/keyboard-code';

export type ButtonProps = {

    /**
     * Текст кнопки
     */
    text?: React.ReactNode;

    /**
     * Иконка кнопки
     */
    icon?: React.ReactNode;

    /**
     * Список произвольных элементов в левом слоте
     */
    rightAddons?: React.ReactNode;

    /**
     * Список произвольных элементов в правом слоте
     */
    leftAddons?: React.ReactNode;

    /**
     * Тип кнопки
     */
    view?: 'default' | 'action' | 'extra' | 'rounded';

    /**
     * Поведение кнопки
     */
    type?: 'button' | 'reset' | 'submit';

    /**
     * HTML элемент, которым будет компонент в DOM
     */
    tag?: 'button' | 'span';

    /**
     * Управление шириной кнопки. При значении 'available' растягивает кнопку на ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Управление возможности взаимодействия с компонентом
     */
    disabled?: boolean;

    /**
     * Отображение кнопки в состоянии фокуса
     */
    focused?: boolean;

    /**
     * Псевдо представление кнопки
     */
    pseudo?: boolean;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Отключает валидацию полей формы, у которых есть атрибут pattern
     */
    formNoValidate?: boolean;

    /**
     * Имя компонента в DOM
     */
    name?: string;

    /**
     * Текст всплывающей подсказки
     */
    title?: string;

    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;

    /**
     * Тип переключателя
     */
    togglable?: 'check' | 'radio';

    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean;

    /**
     * Дочерние элементы `Button`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Обработчик клика по кнопке
     */
    onClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик фокуса кнопки
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса кнопки
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события наведения курсора на кнопку
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с кнопки
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события нажатия кнопки мыши в момент
     */
    onMouseDown?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события отжатия кнопки мыши в момент
     */
    onMouseUp?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события отведения курсора с кнопки
     */
    onMouseOut?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyUp?: (event?: React.KeyboardEvent<any>) => void;

};

/**
 * Компонент кнопки (да, она нажимается!).
 */
export class Button extends React.PureComponent<ButtonProps> {
    cn = createCn('button');

    static defaultProps: Partial<ButtonProps> = {
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

    control: HTMLButtonElement | HTMLSpanElement;

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.disabled) {
            this.setState({
                hovered: false,
                focused: false
            });
        }
    }

    render() {
        const isButton = this.props.tag !== 'span';

        const buttonProps = {
            ref: (control) => {
                this.control = control;
            },
            role: 'button',
            id: this.props.id,
            name: this.props.name,
            type: this.props.type,
            title: this.props.title,
            tabIndex: this.props.disabled ? -1 : this.props.tabIndex,
            disabled: this.props.disabled,
            formNoValidate: isButton ? this.props.formNoValidate : null,
            className: this.cn({
                disabled: this.props.disabled,
                pseudo: this.props.pseudo,
                view: this.props.view,
                size: this.props.size,
                width: this.props.width,
                focused: this.props.focused === undefined ? this.state.focused : this.props.focused,
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
            onKeyUp: this.handleKeyUp,
            'data-test-id': this.props['data-test-id']
        };

        const buttonContent = [
            this.props.leftAddons && (
                <span key='left-addons' className={ this.cn('addon') }>
                    { this.props.leftAddons }
                </span>
            ),
            (this.props.children || this.props.text || this.props.icon) && (
                <span key='content' className={ this.cn('content') }>
                    { this.props.icon && (
                        <span key='icon' className={ this.cn('icon') }>
                            { this.props.icon }
                        </span>
                    ) }
                    { (this.props.children || this.props.text) && (
                        <span key='text' className={ this.cn('text') }>
                            { this.props.children || this.props.text }
                        </span>
                    ) }
                </span>
            ),
            this.props.rightAddons && (
                <span key='right-addons' className={ this.cn('addon') }>
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

    private handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    private handleFocus = (event) => {
        if (this.state.pressed) {
            return;
        }

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
        if (!this.props.disabled) {
            this.setState({ hovered: true });
        }

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    private handleMouseLeave = (event) => {
        if (!this.props.disabled) {
            this.setState({ hovered: false });
        }

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    private handleMouseDown = (event) => {
        if (!this.props.disabled) {
            this.setState({ pressed: true });
        }

        if (this.props.onMouseDown) {
            this.props.onMouseDown(event);
        }
    };

    private handleMouseUp = (event) => {
        if (!this.props.disabled) {
            this.setState({ pressed: false });
        }

        if (this.props.onMouseUp) {
            this.props.onMouseUp(event);
        }
    };

    private handleMouseOut = (event) => {
        if (!this.props.disabled) {
            this.setState({ pressed: false });
        }

        if (this.props.onMouseOut) {
            this.props.onMouseOut(event);
        }
    };

    private handleKeyDown = (event) => {
        if ((event.which === keyboardCode.ENTER || event.which === keyboardCode.SPACE) && !this.props.disabled) {
            this.setState({ pressed: true });
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    private handleKeyUp = (event) => {
        if ((event.which === keyboardCode.ENTER || event.which === keyboardCode.SPACE) && !this.props.disabled) {
            this.setState({ pressed: false });
        }

        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    };

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    public getNode() {
        return this.control;
    }

    /**
     * Устанавливает фокус на поле ввода.
     */
    public focus() {
        this.control.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }
}

export default withTheme(Button);
