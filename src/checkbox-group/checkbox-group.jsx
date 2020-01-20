/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';

/**
 * Компонент группы чекбоксов.
 */
class CheckBoxGroup extends React.PureComponent {
    cn = createCn('checkbox-group');
    static propTypes = {
        /** Тип компонента */
        type: Type.oneOf(['normal', 'button', 'line']),
        /** Выбранные чекбокс-кнопки */
        value: Type.arrayOf(Type.oneOfType([Type.string, Type.number])),
        /**
         * Управление шириной группы кнопок для типа 'button'. При значении
         * 'available' растягивает группу на ширину родителя
         */
        width: Type.oneOf(['default', 'available']),
        /** Уникальное имя блока */
        name: Type.string,
        /** Управление возможностью изменения состояния 'checked' дочерних компонентов `CheckBox` */
        disabled: Type.bool,
        /** Дочерние элементы `CheckBoxGroup`, как правило, компоненты `CheckBox` */
        children: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Лейбл для группы */
        label: Type.node,
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
         * @param {string[]} value
         * @param {React.ChangeEvent} event
         */
        onChange: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        type: 'normal'
    };

    state = {
        value: []
    };

    render() {
        let children = null;
        let props = { name: this.props.name };
        const checkboxGroupParts = {};

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
            this.checkboxes = [];
            const value = this.props.value === undefined ? this.state.value : this.props.value;

            React.Children.forEach(children, (checkbox, index) => {
                const checkboxNode = React.cloneElement(checkbox, {
                    ref: checkbox => this.checkboxes.push(checkbox),
                    checked: checkbox.props.checked === undefined
                        ? value.some(groupValue => groupValue === checkbox.props.value)
                        : checkbox.props.checked,
                    onChange: checkbox.props.onChange === undefined
                        ? (checked, text, event) => this.handleCheckboxChange(checkbox.props.value, checked, event)
                        : checkbox.props.onChange,
                    ...props
                });

                checkboxGroupParts[`checkbox-${index}`] = (this.props.type !== 'button' && this.props.type !== 'line')
                    ? <div>{ checkboxNode }</div>
                    : checkboxNode;
            });
        }

        return (
            <span
                className={
                    `${this.cn({
                        type: this.props.type,
                        disabled: props.disabled,
                        width: props.width ? props.width : null
                    })} control-group`
                }
                id={ this.props.id }
                role='group'
                tabIndex='-1'
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                data-test-id={ this.props['data-test-id'] }
            >
                {
                    !!this.props.label &&
                    <div className={ this.cn('label') }>
                        { this.props.label }
                    </div>
                }
                <div className={ this.cn('box') }>
                    { createFragment(checkboxGroupParts) }
                </div>
            </span>
        );
    }

    handleCheckboxChange = (value, checked, event) => {
        const newValue = this.props.value ? this.props.value.slice() : this.state.value.slice();
        const changedValueIndex = newValue.findIndex(stateValue => stateValue === value);

        if (checked) {
            newValue.push(value);
        } else {
            newValue.splice(changedValueIndex, 1);
        }

        this.setState({
            value: newValue
        });

        if (this.props.onChange) {
            this.props.onChange(newValue, event);
        }
    };

    handleFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    handleBlur = (event) => {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    /**
     * Устанавливает фокус на первую чекбокс-кнопку в группе.
     *
     * @public
     */
    focus() {
        if (this.checkboxes && this.checkboxes[0]) {
            this.checkboxes[0].focus();
        }
    }

    /**
     * Убирает фокус с группы чекбокс-кнопок.
     *
     * @public
     */
    // eslint-disable-next-line class-methods-use-this
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
}

export default CheckBoxGroup;
