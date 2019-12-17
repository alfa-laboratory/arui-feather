/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

/**
 * Компонент переключателя.
 */
class Toggle extends React.PureComponent {
    cn = createCn('toggle');
    static propTypes = {
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Имя компонента в DOM */
        name: Type.string,
        /** Текст подписи к чекбоксу */
        label: Type.node,
        /** Подсказка под полем */
        labelAlign: Type.oneOf(['left', 'right']),
        hint: Type.node,
        /** Значение чекбокса, которое будет отправлено на сервер, если он выбран */
        value: Type.string,
        /** Управление возможностью взаимодействия с компонентом */
        disabled: Type.bool,
        /** Управление состоянием вкл/выкл компонента */
        checked: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm']),
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
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
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

    handleChange = () => {
        if (!this.props.disabled) {
            const nextCheckedValue = !(this.props.checked === undefined ? this.state.checked : this.props.checked);

            this.setState({ checked: nextCheckedValue });

            if (this.props.onChange) {
                this.props.onChange(nextCheckedValue, this.props.value);
            }
        }
    };

    handleFocus = (event) => {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    handleUnfocus = () => setImmediate(() => this.setState({ focused: false }));

    handleBlur = (event) => {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }
}

export default withTheme(Toggle);
