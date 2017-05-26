/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Type from 'prop-types';

import Popup from '../popup/popup';

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
        /** Расположение попапа с ошибкой (в порядке приоритета) относительно точки открытия */
        errorDirections: Type.arrayOf(Type.string),
        /** Управление шириной группы кнопок для типа 'button'. При значении 'available' растягивает группу на ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Уникальное имя блока */
        name: Type.string,
        /** Дочерние элементы `RadioGroup`, как правило, компоненты `Radio` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Обработчик фокуса радиогруппы */
        onFocus: Type.func,
        /** Обработчик снятия фокуса с радиогруппы */
        onBlur: Type.func,
        /** Обработчик изменения значения 'checked' одного из дочерних радио-кнопок */
        onChange: Type.func
    };

    static defaultProps = {
        type: 'normal',
        errorDirections: ['right-center', 'right-top', 'right-bottom', 'bottom-left']
    };

    state = {
        value: '',
        focused: false
    };

    root;

    componentDidMount() {
        this.ensureErrorPopupTarget();
    }

    componentDidUpdate() {
        this.ensureErrorPopupTarget();
    }

    render(cn) {
        let children = null;
        let props = { name: this.props.name };
        let radioGroupParts = {};

        if (this.props.children) {
            children = this.props.children.length ? this.props.children : [this.props.children];
        }

        if (this.props.type === 'button') {
            props = { ...props, width: this.props.width };
        }

        if (children) {
            this.radios = [];

            let value = this.props.value !== undefined
                ? this.props.value
                : this.state.value;

            React.Children.forEach(children, (radio, index) => {
                radioGroupParts[`radio-${index}`] = React.cloneElement(radio, {
                    ref: radio => this.radios.push(radio),
                    error: radio.props.error !== undefined
                        ? radio.props.error : Boolean(this.props.error),
                    checked: radio.props.checked !== undefined
                        ? radio.props.checked : (value === radio.props.value),
                    onChange: radio.props.onChange !== undefined
                        ? radio.props.onChange : this.handleRadioChange,
                    ...props
                });
            });
        }
        return (
            <span
                className={ `${cn({
                    type: this.props.type,
                    invalid: !!this.props.error,
                    ...props
                })} control-group` }
                role='group'
                tabIndex='-1'
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                ref={ (root) => { this.root = root; } }
            >
                { createFragment(radioGroupParts) }
                { this.renderErrorPopup() }
            </span>
        );
    }

    renderErrorPopup() {
        return (
            this.props.error && this.state.focused &&
            <Popup
                directions={ this.props.errorDirections }
                ref={ (popup) => { this.errorPopup = popup; } }
                type='tooltip'
                mainOffset={ 13 }
                visible={ true }
                invalid={ true }
            >
                { this.props.error }
            </Popup>
        );
    }

    @autobind
    handleRadioChange(value) {
        if (this.state.value !== value) {
            this.setState({ value });

            if (this.props.onChange) {
                this.props.onChange(value);
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

    ensureErrorPopupTarget() {
        if (this.props.error && this.state.focused) {
            this.errorPopup.setTarget(this.root);
        }
    }
}

export default RadioGroup;
