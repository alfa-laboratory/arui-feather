/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

import TagButton from '../tag-button/tag-button';

import cn from '../cn';
import scrollTo from '../lib/scroll-to';
import { createMappingPropValidator } from '../lib/prop-types';
import { SCROLL_TO_CORRECTION } from '../vars';

const TYPE_SIZE_MAPPING = {
    button: ['s', 'm', 'l', 'xl'],
    normal: ['m', 'l']
};

const validateSizeProp = createMappingPropValidator(TYPE_SIZE_MAPPING, 'type');

/**
 * Компонент радио-кнопки.
 */
@cn('radio', TagButton)
class Radio extends React.PureComponent {
    static propTypes = {
        /** Тип */
        type: Type.oneOf(['normal', 'button']),
        /** Управление состоянием вкл/выкл компонента */
        checked: Type.bool,
        /** Управление возможностью изменения состояние 'checked' компонента */
        disabled: Type.bool,
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Уникальное имя блока */
        name: Type.string,
        /** Значение радио-кнопки, которое будет отправлено на сервер, если она выбрана */
        value: Type.string,
        /** Текст подписи к радио-кнопке */
        text: Type.node,
        /**
         * Управление шириной кнопки для типа 'button'. При значении 'available'
         * растягивает кнопку на ширину родителя
         */
        width: Type.oneOf(['default', 'available']),
        /** Размер компонента */
        size: validateSizeProp,
        /** Отображение в состоянии ошибки */
        error: Type.bool,
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /**
         * Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента
         * @param {string} value
         * @param {boolean} isChecked
         */
        onChange: Type.func,
        /**
         * Обработчик фокуса комнонента
         * @param {React.FocusEvent} event
         */
        onFocus: Type.func,
        /**
         * Обработчик снятия фокуса с компонента
         * @param {React.FocusEvent} event
         */
        onBlur: Type.func,
        /**
         * Обработчик события наведения курсора на радио-кнопку
         * @param {React.MouseEvent} event
         */
        onMouseEnter: Type.func,
        /**
         * Обработчик события снятия курсора с радио-кнопки
         * @param {React.MouseEvent} event
         */
        onMouseLeave: Type.func
    };

    static defaultProps = {
        size: 'm',
        tabIndex: 0
    };

    state = {
        focused: false,
        hovered: false,
        checked: false
    };

    label;
    control;

    render(cn, TagButton) {
        let checked = this.props.checked !== undefined ? this.props.checked : this.state.checked;

        return (
            // eslint-disable-next-line
            <label
                className={ cn({
                    size: this.props.size,
                    disabled: this.props.disabled,
                    checked,
                    focused: this.state.focused,
                    hovered: this.state.hovered,
                    pressed: this.state.pressed,
                    invalid: !!this.props.error,
                    width: this.props.type === 'button' ? this.props.width : null
                }) }
                htmlFor={ this.props.id }
                tabIndex={ this.props.tabIndex }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                onMouseDown={ this.handleUnfocus }
                onMouseUp={ this.handleUnfocus }
                ref={ (label) => {
                    this.label = label;
                } }
            >
                { this.props.type === 'button'
                    ? this.renderButtonRadio(cn, checked, TagButton)
                    : this.renderNormalRadio(cn, checked) }
            </label>
        );
    }

    renderNormalRadio(cn, checked) {
        return [
            <span className={ cn('box') }>
                <input
                    checked={ checked }
                    disabled={ this.props.disabled }
                    name={ this.props.name }
                    id={ this.props.id }
                    value={ this.props.value }
                    autoComplete='off'
                    tabIndex='-1'
                    type='radio'
                    className={ cn('control') }
                    ref={ (control) => {
                        this.control = control;
                    } }
                    onClick={ this.handleInputControlClick }
                    onChange={ this.handleChange }
                />
            </span>,
            this.props.text && (
                <span className={ cn('text') } role='presentation'>
                    { this.props.text }
                </span>
            )
        ];
    }

    renderButtonRadio(cn, checked, TagButton) {
        return (
            <div>
                <TagButton
                    togglable='check'
                    checked={ checked }
                    disabled={ this.props.disabled }
                    size={ this.props.size }
                    width={ this.props.width }
                    focused={ this.state.focused }
                    hovered={ this.state.hovered }
                    tabIndex={ -1 }
                    onClick={ this.handleChange }
                >
                    { this.props.text ? this.props.text : '' }
                </TagButton>
                <input
                    checked={ checked }
                    disabled={ this.props.disabled }
                    name={ this.props.name }
                    id={ this.props.id }
                    value={ this.props.value }
                    autoComplete='off'
                    tabIndex={ -1 }
                    type='radio'
                    className={ cn('control') }
                    onChange={ this.handleChange }
                    ref={ (control) => {
                        this.control = control;
                    } }
                />
            </div>
        );
    }

    @autobind
    // eslint-disable-next-line class-methods-use-this-regexp/class-methods-use-this
    handleInputControlClick(event) {
        event.stopPropagation();
    }

    @autobind
    handleChange() {
        if (!this.props.disabled) {
            let nextCheckedValue = !(this.props.checked !== undefined ? this.props.checked : this.state.checked);

            this.setState({ checked: nextCheckedValue });

            if (this.props.onChange) {
                this.props.onChange(this.props.value, nextCheckedValue);
            }
        }
    }

    @autobind
    handleFocus(event) {
        if (!this.props.disabled) {
            this.setState({ focused: true });
        }

        if (this.props.type !== 'button') {
            event.target.value = this.props.value;
        }

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    handleUnfocus = () => setImmediate(() => this.setState({ focused: false }));

    @autobind
    handleBlur(event) {
        if (!this.props.disabled) {
            this.setState({ focused: false });
        }

        if (this.props.type !== 'button') {
            event.target.value = this.props.value;
        }

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

    /**
     * Устанавливает фокус на радио-кнопку.
     *
     * @public
     */
    focus() {
        this.control.focus();
    }

    /**
     * Убирает фокус с радио-кнопки.
     *
     * @public
     */
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }

    /**
     * Скроллит страницу до радио-кнопки.
     *
     * @public
     */
    scrollTo() {
        let elementRect = this.label.getBoundingClientRect();

        scrollTo({
            // eslint-disable-next-line
            targetY: elementRect.top + window.pageYOffset - SCROLL_TO_CORRECTION
        });
    }
}

export default Radio;
