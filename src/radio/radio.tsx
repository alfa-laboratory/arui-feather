/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import TagButton from '../tag-button/tag-button';
import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_CORRECTION } from '../vars';

export type RadioProps = ({
    /**
     * Тип
     */
    type?: 'normal';
    /**
     * Размер компонента
     */
    size?: 'm' | 'l';
} | {
    /**
     * Тип
     */
    type?: 'button';
    /**
     * Размер компонента
     */
    size?: 's'| 'm' | 'l' | 'xl';
}) & {

    /**
     * Управление состоянием вкл/выкл компонента
     */
    checked?: boolean;

    /**
     * Управление возможностью изменения состояние 'checked' компонента
     */
    disabled?: boolean;

    /**
     * Уникальный идентификатор блока
     */
    id?: string;

    /**
     * Уникальное имя блока
     */
    name?: string;

    /**
     * Значение радио-кнопки, которое будет отправлено на сервер, если она выбрана
     */
    value?: string;

    /**
     * Текст подписи к радио-кнопке
     */
    text?: React.ReactNode;

    /**
     * Управление шириной кнопки для типа 'button'. При значении 'available'
     * растягивает кнопку на ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Отображение в состоянии ошибки
     */
    error?: boolean;

    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;

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
    onChange?: (value?: string, isChecked?: boolean) => void;

    /**
     * Обработчик фокуса комнонента
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса с компонента
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события наведения курсора на радио-кнопку
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с радио-кнопки
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

type RadioState = {
    focused: boolean;
    hovered: boolean;
    checked: boolean;
    pressed?: boolean;
}

/**
 * Компонент радио-кнопки.
 */
export class Radio extends React.PureComponent<RadioProps, RadioState> {
    cn = createCn('radio');

    static defaultProps: Partial<RadioProps> = {
        size: 'm',
        tabIndex: 0
    };

    state: RadioState = {
        focused: false,
        hovered: false,
        checked: false
    };

    label;
    control;

    render() {
        const checked = this.props.checked === undefined ? this.state.checked : this.props.checked;

        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <label
                className={ this.cn({
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
                data-test-id={ this.props['data-test-id'] }
            >
                { this.props.type === 'button'
                    ? this.renderButtonRadio(checked, TagButton)
                    : this.renderNormalRadio(checked) }
            </label>
        );
    }

    renderNormalRadio(checked) {
        return [
            <span className={ this.cn('box') } key={ 0 }>
                <input
                    checked={ checked }
                    disabled={ this.props.disabled }
                    name={ this.props.name }
                    id={ this.props.id }
                    value={ this.props.value }
                    autoComplete='off'
                    tabIndex={ -1 }
                    type='radio'
                    className={ this.cn('control') }
                    ref={ (control) => {
                        this.control = control;
                    } }
                    onClick={ this.handleInputControlClick }
                    onChange={ this.handleChange }
                />
            </span>,
            this.props.text && (
                <span className={ this.cn('text') } role='presentation' key={ 1 }>
                    { this.props.text }
                </span>
            )
        ];
    }

    renderButtonRadio(checked, TagButton) {
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
                    className={ this.cn('control') }
                    onChange={ this.handleChange }
                    ref={ (control) => {
                        this.control = control;
                    } }
                />
            </div>
        );
    }

    private handleInputControlClick = (event) => {
        event.stopPropagation();
    };

    private handleChange = () => {
        if (!this.props.disabled) {
            const nextCheckedValue = !(this.props.checked === undefined ? this.state.checked : this.props.checked);

            this.setState({ checked: nextCheckedValue });

            if (this.props.onChange) {
                this.props.onChange(this.props.value, nextCheckedValue);
            }
        }
    };

    private handleFocus = (event) => {
        if (!this.props.disabled) {
            this.setState({ focused: true });
        }

        if (this.props.type !== 'button') {
            event.target.value = this.props.value;
        }

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleUnfocus = () => setImmediate(() => this.setState({ focused: false }));

    private handleBlur = (event) => {
        if (!this.props.disabled) {
            this.setState({ focused: false });
        }

        if (this.props.type !== 'button') {
            event.target.value = this.props.value;
        }

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
     * Устанавливает фокус на радио-кнопку.
     */
    public focus() {
        this.control.focus();
    }

    /**
     * Убирает фокус с радио-кнопки.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }

    /**
     * Скроллит страницу до радио-кнопки.
     */
    public scrollTo() {
        const elementRect = this.label.getBoundingClientRect();

        scrollTo({
            // eslint-disable-next-line no-mixed-operators
            targetY: elementRect.top + window.pageYOffset - SCROLL_TO_CORRECTION
        });
    }
}

export default withTheme(Radio);
