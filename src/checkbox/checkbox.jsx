/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Button from '../button/button';

import cn from '../cn';
import performance from '../performance';
import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_CORRECTION } from '../vars';

import './checkbox.css';
import './checkbox_theme_alfa-on-color.css';
import './checkbox_theme_alfa-on-white.css';

/**
 * Компонент чекбокса.
 */
@cn('checkbox')
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
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тип чекбокса */
        type: Type.oneOf(['normal', 'button']),
        /** Управление возможностью изменять состояние 'checked' компонента */
        disabled: Type.bool,
        /** Управление состоянием вкл/выкл компонента */
        checked: Type.bool,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента */
        onChange: Type.func,
        /** Обработчик фокуса комнонента */
        onFocus: Type.func,
        /** Обработчик снятия фокуса компонента */
        onBlur: Type.func,
        /** Обработчик события наведения курсора на чекбокс */
        onMouseEnter: Type.func,
        /** Обработчик события снятия курсора с чекбокса */
        onMouseLeave: Type.func
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

    render(cn) {
        let checked = this.props.checked !== undefined
            ? this.props.checked
            : this.state.checked;

        return (
            <label
                className={ cn({
                    size: this.props.size,
                    disabled: this.props.disabled,
                    checked,
                    focused: this.state.focused,
                    hovered: this.state.hovered
                }) }
                htmlFor={ this.props.id }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                ref={ (root) => { this.root = root; } }
            >
                {
                    this.props.type === 'button'
                        ? this.renderButtonCheckbox(cn, checked)
                        : this.renderNormalCheckbox(cn, checked)
                }
            </label>
        );
    }

    renderNormalCheckbox(cn, checked) {
        return (
            <div>
                <span className={ cn('box') }>
                    <input
                        className={ cn('control') }
                        type='checkbox'
                        autoComplete='off'
                        name={ this.props.name }
                        id={ this.props.id }
                        value={ this.props.value }
                        checked={ checked }
                        disabled={ this.props.disabled }
                        onChange={ this.handleChange }
                    />
                </span>
                {
                    this.props.text &&
                    <span
                        className={ cn('text') }
                        role='presentation'
                    >
                        { this.props.text }
                    </span>
                }
            </div>
        );
    }

    renderButtonCheckbox(cn, checked) {
        return (
            <div>
                <Button
                    togglable='check'
                    checked={ checked }
                    title={ this.props.title }
                    disabled={ this.props.disabled }
                    size={ this.props.size || 'm' }
                    focused={ this.state.focused }
                    hovered={ this.state.hovered }
                    view={ checked ? 'action' : null }
                    onClick={ this.handleChange }
                >
                    {
                        this.props.text
                            ? this.props.text
                            : ''
                    }
                </Button>
                <input
                    className={ cn('control') }
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
            </div>
        );
    }

    @autobind
    handleChange() {
        if (!this.props.disabled) {
            let nextCheckedValue = !(
                this.props.checked !== undefined
                    ? this.props.checked
                    : this.state.checked
            );

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
        let elementRect = this.root.getBoundingClientRect();

        scrollTo({
            targetY: (elementRect.top + window.pageYOffset) - SCROLL_TO_CORRECTION
        });
    }
}

export default CheckBox;
