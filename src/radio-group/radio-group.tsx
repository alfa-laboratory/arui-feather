/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';
import { Radio } from '../radio/radio';

export type RadioGroupProps = {

    /**
     * Тип группы кнопок
     */
    type?: 'normal' | 'button' | 'line';

    /**
     * Значение выбранной радио-кнопки
     */
    value?: string;

    /**
     * Отображение попапа с ошибкой в момент когда фокус находится на компоненте
     */
    error?: React.ReactNode;

    /**
     * Размеры pub и sub
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Управление шириной группы кнопок для типа 'button'. При значении
'available' растягивает группу на ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Уникальное имя блока
     */
    name?: string;

    /**
     * Управление возможностью изменения состояния 'checked' дочерних компонентов `Radio`
     */
    disabled?: boolean;

    /**
     * Дочерние элементы `RadioGroup`, как правило, компоненты `Radio`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Лейбл для группы
     */
    label?: React.ReactNode;

    /**
     * Подсказка под полем
     */
    hint?: React.ReactNode;

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
    onChange?: (value?: string) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент группы радио-кнопок.
 */
export class RadioGroup extends React.PureComponent<RadioGroupProps> {
    cn = createCn('radio-group');

    static defaultProps: Partial<RadioGroupProps> = {
        type: 'normal',
        size: 'm'
    };

    state = {
        value: ''
    };

    radios: Radio[];

    render() {
        let children = null;
        const { size, name } = this.props;
        let props: { name: string; disabled?: boolean; width?: 'default' | 'available' } = { name };
        const radioGroupParts = {};

        if (this.props.disabled !== undefined) {
            props.disabled = this.props.disabled;
        }

        if (this.props.children) {
            children = (
                this.props.children as Array<React.ReactNode>
            ).length ? this.props.children : [this.props.children];
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
                    `${this.cn({
                        type: this.props.type,
                        invalid: !!this.props.error,
                        size,
                        ...props
                    })} control-group${this.props.error ? ' control-group_invalid' : ''}`
                }
                role='group'
                tabIndex={ -1 }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                data-test-id={ this.props['data-test-id'] }
            >
                <div className={ this.cn('inner') }>
                    {
                        !!this.props.label &&
                        <div className={ this.cn('top') }>{ this.props.label }</div>
                    }
                    <div className={ this.cn('box') }>
                        { createFragment(radioGroupParts) }
                    </div>
                    {
                        (this.props.error || this.props.hint) &&
                        <span className={ this.cn('sub') }>
                            { this.props.error || this.props.hint }
                        </span>
                    }
                </div>
            </div>
        );
    }

    private handleRadioChange = (value) => {
        if (this.state.value !== value) {
            this.setState({ value });
        }

        if (this.props.value !== value && this.props.onChange) {
            this.props.onChange(value);
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
     * Устанавливает фокус на первую радиокнопку в группе.
     */
    public focus() {
        if (this.radios && this.radios[0]) {
            this.radios[0].focus();
        }
    }

    /**
     * Убирает фокус с группы радио-кнопок.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
}

export default withTheme(RadioGroup);
