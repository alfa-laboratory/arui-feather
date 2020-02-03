/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type CheckBoxGroupThemeFieldType = 'alfa-on-color' | 'alfa-on-white';

export type CheckBoxGroupProps = ({
    /**
     * Тип компонента
     */
    type: 'button';
    /**
     * Управление шириной группы кнопок для типа 'button'. При значении
     * 'available' растягивает группу на ширину родителя
     */
    width?: 'default' | 'available';
} | {
    /**
     * Тип компонента
     */
    type?: 'normal' | 'line';
}) & {

    /**
     * Выбранные чекбокс-кнопки
     */
    value?: ReadonlyArray<string | number>;

    /**
     * Уникальное имя блока
     */
    name?: string;

    /**
     * Управление возможностью изменения состояния 'checked' дочерних компонентов `CheckBox`
     */
    disabled?: boolean;

    /**
     * Дочерние элементы `CheckBoxGroup`, как правило, компоненты `CheckBox`
     */
    children?: React.ReactNode;

    /**
     * Тема компонента
     */
    theme?: CheckBoxGroupThemeFieldType;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Лейбл для группы
     */
    label?: React.ReactNode;

    /**
     * Обработчик фокуса радиогруппы
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса с радиогруппы
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик изменения значения 'checked' одного из дочерних радио-кнопок
     */
    onChange?: (value?: any[]) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Компонент группы чекбоксов.
 */
export class CheckBoxGroup extends React.PureComponent<CheckBoxGroupProps> {
    cn = createCn('checkbox-group');

    static defaultProps: Partial<CheckBoxGroupProps> = {
        type: 'normal'
    };

    state = {
        value: []
    };

    checkboxes: any[];

    render() {
        let children = null;
        let props: { name: string; disabled?: boolean; width?: 'default' | 'available' } = { name: this.props.name };
        const checkboxGroupParts = {};

        if (this.props.disabled !== undefined) {
            props.disabled = this.props.disabled;
        }

        if (this.props.children) {
            children = (
                this.props.children as Array<React.ReactNode>).length
                ? this.props.children : [this.props.children];
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
                        ? checked => this.handleCheckboxChange(checkbox.props.value, checked)
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
                tabIndex={ -1 }
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

    private handleCheckboxChange = (value, checked) => {
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
            this.props.onChange(newValue);
        }
    };

    private handleFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleBlur = (event) => {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    /**
     * Устанавливает фокус на первую чекбокс-кнопку в группе.
     */
    public focus() {
        if (this.checkboxes && this.checkboxes[0]) {
            this.checkboxes[0].focus();
        }
    }

    /**
     * Убирает фокус с группы чекбокс-кнопок.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
}

export default withTheme(CheckBoxGroup);
