/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import autobind from 'core-decorators/lib/autobind';
import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент группы радио-кнопок.
 */
@cn('radio-group')
@performance()
class RadioGroup extends React.Component {
    static propTypes = {
        /** Тип группы кнопок */
        type: Type.oneOf(['normal', 'button', 'line']),
        /** Значение выбранной радио-кнопки */
        value: Type.string,
        /** Отображение попапа с ошибкой в момент когда фокус находится на компоненте */
        error: Type.node,
        /** Размеры pub и sub */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /**
         * Управление шириной группы кнопок для типа 'button'. При значении
         * 'available' растягивает группу на ширину родителя
         */
        width: Type.oneOf(['default', 'available']),
        /** Уникальное имя блока */
        name: Type.string,
        /** Управление возможностью изменения состояния 'checked' дочерних компонентов `Radio` */
        disabled: Type.bool,
        /** Дочерние элементы `RadioGroup`, как правило, компоненты `Radio` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Лейбл для группы */
        label: Type.node,
        /** Подсказка под полем */
        hint: Type.node,
        /**
         * Обработчик фокуса радиогруппы
         * @param {React.FocusEvent} event
         */
        onFocus: Type.func,
        /**
         * Обработчик снятия фокуса с радиогруппы
         * @param {React.FocusEvent} event
         */
        onBlur: Type.func,
        /**
         * Обработчик изменения значения 'checked' одного из дочерних радио-кнопок
         * @param {string} value
         */
        onChange: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        type: 'normal',
        size: 'm'
    };

    state = {
        value: ''
    };

    render(cn) {
        let children = null;
        const { size, name } = this.props;
        let props = { name };
        const radioGroupParts = {};

        if (this.props.disabled !== undefined) {
            props.disabled = this.props.disabled;
        }

        if (this.props.children) {
            children = this.props.children.length ? this.props.children : [this.props.children];
        }

        if (this.props.type === 'button') {
            props = { ...props, width: this.props.width };
        }

        if (children) {
            this.radios = [];
            const value = this.props.value === undefined ? this.state.value : this.props.value;

            React.Children.forEach(children, (radio, index) => {
                radioGroupParts[`radio-${index}`] = React.cloneElement(radio, {
                    ref: radio => this.radios.push(radio),
                    error: radio.props.error === undefined ? Boolean(this.props.error) : radio.props.error,
                    checked: radio.props.checked === undefined ? (value === radio.props.value) : radio.props.checked,
                    onChange: radio.props.onChange === undefined ? this.handleRadioChange : radio.props.onChange,
                    ...props
                });
            });
        }

        return (
            <div
                className={
                    `${cn({
                        type: this.props.type,
                        invalid: !!this.props.error,
                        size,
                        ...props
                    })} control-group${this.props.error ? ' control-group_invalid' : ''}`
                }
                role='group'
                tabIndex='-1'
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                data-test-id={ this.props['data-test-id'] }
            >
                <div className={ cn('inner') }>
                    {
                        !!this.props.label &&
                        <div className={ cn('top') }>{ this.props.label }</div>
                    }
                    <div className={ cn('box') }>
                        { createFragment(radioGroupParts) }
                    </div>
                    {
                        (this.props.error || this.props.hint) &&
                        <span className={ cn('sub') }>
                            { this.props.error || this.props.hint }
                        </span>
                    }
                </div>
            </div>
        );
    }

    @autobind
    handleRadioChange(value) {
        if (this.state.value !== value) {
            this.setState({ value });
        }

        if (this.props.value !== value && this.props.onChange) {
            this.props.onChange(value);
        }
    }

    @autobind
    handleFocus(event) {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    @autobind
    handleBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    /**
     * Устанавливает фокус на первую радиокнопку в группе.
     *
     * @public
     */
    focus() {
        if (this.radios && this.radios[0]) {
            this.radios[0].focus();
        }
    }

    /**
     * Убирает фокус с группы радио-кнопок.
     *
     * @public
     */
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
}

export default RadioGroup;
