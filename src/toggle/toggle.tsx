/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type ToggleProps = {
    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Имя компонента в DOM
     */
    name?: string;

    /**
     * Текст подписи к чекбоксу
     */
    label?: React.ReactNode;

    /**
     * Выравнивание подписи
     */
    labelAlign?: 'left' | 'right';

    /**
     * Подсказка под полем
     */
    hint?: React.ReactNode;

    /**
     * Значение чекбокса, которое будет отправлено на сервер, если он выбран
     */
    value?: string;

    /**
     * Управление возможностью взаимодействия с компонентом
     */
    disabled?: boolean;

    /**
     * Управление состоянием вкл/выкл компонента
     */
    checked?: boolean;

    /**
     * Размер компонента
     */
    size?: 's' | 'm';

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
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент переключателя.
 */
export class Toggle extends React.PureComponent<ToggleProps> {
    cn = createCn('toggle');

    static defaultProps: Partial<ToggleProps> = {
        size: 'm',
        labelAlign: 'right'
    };

    state = {
        checked: false,
        focused: false
    };

    render() {
        const checked = this.props.checked === undefined ? this.state.checked : this.props.checked;

        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <label
                className={ this.cn({
                    checked,
                    focused: this.state.focused,
                    disabled: this.props.disabled,
                    size: this.props.size
                }) }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                onMouseDown={ this.handleUnfocus }
                onMouseUp={ this.handleUnfocus }
                htmlFor={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                <span className={ this.cn('wrapper') }>
                    <input
                        className={ this.cn('control') }
                        type='checkbox'
                        autoComplete='off'
                        id={ this.props.id }
                        name={ this.props.name }
                        value={ this.props.value }
                        checked={ checked }
                        disabled={ this.props.disabled }
                        onClick={ Toggle.handleClick }
                        onChange={ this.handleChange }
                    />
                    <span className={ this.cn('switch') } />
                    { this.props.label && (
                        <span className={ this.cn('label', { align: this.props.labelAlign }) }>
                            { this.props.label }
                        </span>
                    ) }
                </span>
                { this.props.hint && (
                    <span className={ this.cn('hint') }>{ this.props.hint }</span>
                ) }
            </label>
        );
    }

    static handleClick(event) {
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
    }
}

export default withTheme(Toggle);
