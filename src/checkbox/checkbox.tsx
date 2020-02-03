/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import IconCheck from '../icon/ui/tick';
import IconIndeterminate from '../icon/ui/check-indeterminate';
import TagButton from '../tag-button/tag-button';

import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_CORRECTION } from '../vars';

export type CheckboxProps = ({
    /**
     * Тип чекбокса
     */
    type?: 'normal';

    /**
     * Размер компонента
     */
    size?: 'm' | 'l';

} | {
    /**
     * Тип чекбокса
     */
    type?: 'button';

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Управление шириной кнопки для типа 'button'. При значении
     'available' растягивает кнопку на ширину родителя
     */
    width?: 'default' | 'available';
}) & {
    /**
     * Текст подписи к чекбоксу
     */
    text?: React.ReactNode;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Имя компонента в DOM
     */
    name?: string;

    /**
     * Текст всплывающей подсказки
     */
    title?: string;

    /**
     * Значение чекбокса, которое будет отправлено на сервер, если он выбран
     */
    value?: string;

    /**
     * Управление возможностью изменять состояние 'checked' компонента
     */
    disabled?: boolean;

    /**
     * Управление состоянием вкл/выкл компонента
     */
    checked?: boolean;

    /**
     * Управление неопределенным состоянием чекбокса
     */
    indeterminate?: boolean;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента
     */
    onChange?: (isChecked?: boolean, value?: string) => void;

    /**
     * Обработчик фокуса комнонента
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса компонента
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события наведения курсора на чекбокс
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с чекбокса
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент чекбокса.
 */
export class CheckBox extends React.PureComponent<CheckboxProps> {
    cn = createCn('checkbox');

    static defaultProps: Partial<CheckboxProps> = {
        type: 'normal',
        size: 'm'
    };

    state = {
        focused: false,
        hovered: false,
        checked: false
    };

    root;

    render() {
        const checked = this.props.checked === undefined ? this.state.checked : this.props.checked;

        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <label
                className={ this.cn({
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
                    ? this.renderButtonCheckbox(checked)
                    : this.renderNormalCheckbox(checked) }
            </label>
        );
    }

    renderNormalCheckbox(checked) {
        return [
            <span className={ this.cn('box') } key='box'>
                <input
                    className={ this.cn('control') }
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
                        className={ this.cn('icon') }
                        size={ this.props.size === 'l' ? 's' : 'xs' }
                        theme='alfa-on-color'
                    />
                ) }
                { !checked && this.props.indeterminate && (
                    <IconIndeterminate
                        className={ this.cn('icon') }
                        size={ this.props.size === 'l' ? 'm' : 's' }
                        theme='alfa-on-color'
                    />
                ) }
                { checked && this.props.indeterminate && (
                    <IconCheck
                        className={ this.cn('icon') }
                        size={ this.props.size === 'l' ? 's' : 'xs' }
                        theme='alfa-on-color'
                    />
                ) }
            </span>,
            this.props.text && (
                <span className={ this.cn('text') } key='text' role='presentation'>
                    { this.props.text }
                </span>
            )
        ];
    }

    renderButtonCheckbox(checked) {
        return [
            <TagButton
                key='button'
                togglable='check'
                checked={ checked }
                title={ this.props.title }
                disabled={ this.props.disabled }
                size={ this.props.size || 'm' }
                width={ this.props.type === 'button' ? this.props.width : undefined }
                focused={ this.state.focused }
                onClick={ this.handleChange }
            >
                { this.props.text ? this.props.text : '' }
            </TagButton>,
            <input
                className={ this.cn('control') }
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

    // eslint-disable-next-line class-methods-use-this
    private handleInputControlClick(event) {
        event.stopPropagation();
    }

    private handleChange = () => {
        if (!this.props.disabled) {
            const nextCheckedValue = !(this.props.checked === undefined ? this.state.checked : this.props.checked);

            this.setState({ checked: nextCheckedValue });

            if (this.props.onChange) {
                this.props.onChange(nextCheckedValue, this.props.value);
            }
        }
    };

    private handleFocus = (event) => {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleUnfocus = () => setImmediate(() => this.setState({ focused: false }));

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

    /**
     * Устанавливает фокус на чекбокс.
     */
    public focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с чекбокса.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }

    /**
     * Скроллит страницу до чекбокса.
     */
    public scrollTo() {
        const elementRect = this.root.getBoundingClientRect();

        scrollTo({
            // eslint-disable-next-line no-mixed-operators
            targetY: elementRect.top + window.pageYOffset - SCROLL_TO_CORRECTION
        });
    }
}

export default withTheme(CheckBox);
