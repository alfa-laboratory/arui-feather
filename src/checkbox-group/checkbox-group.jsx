/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент группы чекбоксов.
 */
@cn('checkbox-group')
@performance()
class CheckBoxGroup extends React.Component {
    static propTypes = {
        /** Тип компонента */
        type: Type.oneOf(['normal', 'button', 'line']),
        /** Выбранные чекбокс-кнопки */
        value: Type.arrayOf(Type.oneOfType([Type.string, Type.number])),
        /** Отображение попапа с ошибкой в момент когда фокус находится на компоненте */
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
        className: Type.oneOfType([Type.func, Type.string]),
        /** Лейбл для группы */
        label: Type.node,
        /** Обработчик фокуса радиогруппы */
        onFocus: Type.func,
        /** Обработчик снятия фокуса с радиогруппы */
        onBlur: Type.func,
        /** Обработчик изменения значения 'checked' одного из дочерних радио-кнопок */
        onChange: Type.func
    };

    static defaultProps = {
        type: 'normal'
    };

    state = {
        value: [],
        focused: false
    };

    render(cn) {
        let children = null;
        let props = { name: this.props.name };
        let checkboxGroupParts = {};

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

            let value = this.props.value !== undefined
                ? this.props.value
                : this.state.value;

            React.Children.forEach(children, (checkbox, index) => {
                let checkboxNode = React.cloneElement(checkbox, {
                    ref: checkbox => this.checkboxes.push(checkbox),
                    checked: checkbox.props.checked !== undefined
                        ? checkbox.props.checked : value.some(groupValue => groupValue === checkbox.props.value),
                    onChange: checkbox.props.onChange !== undefined
                        ? checkbox.props.onChange : checked => this.handleCheckboxChange(checkbox.props.value, checked),
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
                    `${cn({
                        type: this.props.type,
                        disabled: props.disabled,
                        width: props.width ? props.width : null
                    })} control-group`
                }
                role='group'
                tabIndex='-1'
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
            >
                {
                    !!this.props.label &&
                    <div className={ cn('label') }>
                        { this.props.label }
                    </div>
                }
                { createFragment(checkboxGroupParts) }
            </span>
        );
    }

    @autobind
    handleCheckboxChange(value, checked) {
        let newValue = this.props.value ? this.props.value.slice() : this.state.value.slice();
        let changedValueIndex = newValue.findIndex(stateValue => stateValue === value);

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
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
}

export default CheckBoxGroup;
