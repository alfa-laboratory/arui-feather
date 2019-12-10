/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

import IconCheck from '../icon/ui/tick';
import IconIndeterminate from '../icon/ui/check-indeterminate';
import TagButton from '../tag-button/tag-button';

import cn from '../cn';
import performance from '../performance';
import scrollTo from '../lib/scroll-to';
import { createMappingPropValidator } from '../lib/prop-types';
import { SCROLL_TO_CORRECTION } from '../vars';

const TYPE_SIZE_MAPPING = {
    button: ['s', 'm', 'l', 'xl'],
    normal: ['m', 'l']
};

const validateSizeProp = createMappingPropValidator(TYPE_SIZE_MAPPING, 'type');

/**
 * Компонент чекбокса.
 */
@cn('checkbox', TagButton)
@performance()
class CheckBox extends React.Component {
    static propTypes = {
        /** Текст подписи к чекбоксу */
        text: Type.node,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Имя компонента в DOM */
        name: Type.string,
        /** Текст всплывающей подсказки */
        title: Type.string,
        /** Значение чекбокса, которое будет отправлено на сервер, если он выбран */
        value: Type.string,
        /** Размер компонента */
        size: validateSizeProp,
        /**
         * Управление шириной кнопки для типа 'button'. При значении
         * 'available' растягивает кнопку на ширину родителя
         */
        width: Type.oneOf(['default', 'available']),
        /** Тип чекбокса */
        type: Type.oneOf(['normal', 'button']),
        /** Управление возможностью изменять состояние 'checked' компонента */
        disabled: Type.bool,
        /** Управление состоянием вкл/выкл компонента */
        checked: Type.bool,
        /** Управление неопределенным состоянием чекбокса */
        indeterminate: Type.bool,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /**
         * Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента
         * @param {boolean} isChecked
         * @param {string} value
         */
        onChange: Type.func,
        /**
         * Обработчик фокуса комнонента
         * @param {React.FocusEvent} event
         */
        onFocus: Type.func,
        /**
         * Обработчик снятия фокуса компонента
         * @param {React.FocusEvent} event
         */
        onBlur: Type.func,
        /**
         * Обработчик события наведения курсора на чекбокс
         * @param {React.MouseEvent} event
         */
        onMouseEnter: Type.func,
        /**
         * Обработчик события снятия курсора с чекбокса
         * @param {React.MouseEvent} event
         */
        onMouseLeave: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        type: 'normal',
        size: 'm'
    };

    state = {
        focused: false,
        hovered: false,
        checked: false
    };

    root;

    render(cn, TagButton) {
        const checked = this.props.checked === undefined ? this.state.checked : this.props.checked;

        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <label
                className={ cn({
                    size: this.props.size,
                    disabled: this.props.disabled,
                    checked: checked || this.props.indeterminate,
                    indeterminate: this.props.indeterminate,
                    focused: this.state.focused,
                    hovered: this.state.hovered,
                    width: this.props.type === 'button' ? this.props.width : null
                }) }
                htmlFor={ this.props.id }
                onBlur={ this.handleBlur }
                onFocus={ this.handleFocus }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                onMouseDown={ this.handleUnfocus }
                onMouseUp={ this.handleUnfocus }
                ref={ (root) => {
                    this.root = root;
                } }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.props.type === 'button'
                    ? this.renderButtonCheckbox(cn, checked, TagButton)
                    : this.renderNormalCheckbox(cn, checked) }
            </label>
        );
    }

    renderNormalCheckbox(cn, checked) {
        return [
            <span className={ cn('box') } key='box'>
                <input
                    className={ cn('control') }
                    type='checkbox'
                    autoComplete='off'
                    name={ this.props.name }
                    id={ this.props.id }
                    value={ this.props.value }
                    checked={ checked }
                    disabled={ this.props.disabled }
                    onClick={ this.handleInputControlClick }
                    onChange={ this.handleChange }
                />
                { !this.props.indeterminate && (
                    <IconCheck
                        className={ cn('icon') }
                        size={ this.props.size === 'l' ? 's' : 'xs' }
                        theme='alfa-on-color'
                    />
                ) }
                { !checked && this.props.indeterminate && (
                    <IconIndeterminate
                        className={ cn('icon') }
                        size={ this.props.size === 'l' ? 'm' : 's' }
                        theme='alfa-on-color'
                    />
                ) }
                { checked && this.props.indeterminate && (
                    <IconCheck
                        className={ cn('icon') }
                        size={ this.props.size === 'l' ? 's' : 'xs' }
                        theme='alfa-on-color'
                    />
                ) }
            </span>,
            this.props.text && (
                <span className={ cn('text') } key='text' role='presentation'>
                    { this.props.text }
                </span>
            )
        ];
    }

    renderButtonCheckbox(cn, checked, TagButton) {
        return [
            <TagButton
                key='button'
                togglable='check'
                checked={ checked }
                title={ this.props.title }
                disabled={ this.props.disabled }
                size={ this.props.size || 'm' }
                width={ this.props.width }
                focused={ this.state.focused }
                hovered={ this.state.hovered }
                onClick={ this.handleChange }
            >
                { this.props.text ? this.props.text : '' }
            </TagButton>,
            <input
                className={ cn('control') }
                key='control'
                type='checkbox'
                tabIndex={ -1 }
                autoComplete='off'
                name={ this.props.name }
                id={ this.props.id }
                value={ this.props.value }
                checked={ checked }
                disabled={ this.props.disabled }
                onChange={ this.handleChange }
            />
        ];
    }

    @autobind
    // eslint-disable-next-line class-methods-use-this-regexp/class-methods-use-this
    handleInputControlClick(event) {
        event.stopPropagation();
    }

    @autobind
    handleChange() {
        if (!this.props.disabled) {
            const nextCheckedValue = !(this.props.checked === undefined ? this.state.checked : this.props.checked);

            this.setState({ checked: nextCheckedValue });

            if (this.props.onChange) {
                this.props.onChange(nextCheckedValue, this.props.value);
            }
        }
    }

    @autobind
    handleFocus(event) {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    handleUnfocus = () => setImmediate(() => this.setState({ focused: false }));

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

    /**
     * Устанавливает фокус на чекбокс.
     *
     * @public
     */
    focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с чекбокса.
     *
     * @public
     */
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }

    /**
     * Скроллит страницу до чекбокса.
     *
     * @public
     */
    scrollTo() {
        const elementRect = this.root.getBoundingClientRect();

        scrollTo({
            // eslint-disable-next-line no-mixed-operators
            targetY: elementRect.top + window.pageYOffset - SCROLL_TO_CORRECTION
        });
    }
}

export default CheckBox;
