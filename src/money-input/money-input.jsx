/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/prop-types: 0 */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

import Input from '../input/input';
import Mask from '../masked-input/mask';

import cn from '../cn';
import performance from '../performance';
import { getCurrencySymbol } from '../lib/currency-codes';

const DEFAULT_FRACTION_SIZE = 2;
const DEFAULT_INTEGER_SIZE = 9;
const INTEGER_PART_SIZE = 3;

/**
 * Возвращает целую и дробную часть значения в виде массива.
 * Если дробная часть не равна `undefined`, значит введена дробная часть
 * или хотя бы запятая.
 *
 * @param {String} value Значение
 * @returns {Array.<String>}
 */
function getValueParts(value) {
    return value
        .replace(/[.бю]/g, ',') // Заменяем точки, `б` и `ю` на запятые.
        .replace(/[^\d,]/g, '') // Удаляем все, что не является цифрой или запятой.
        .split(',') // Разделяем по запятой.
        .slice(0, 2); // Отрезаем, если больше, чем один фрагмент после запятой.
}

/**
 * Сплитит интегер в группы по 3.
 *
 * @param {String} str Строка интегера
 * @returns {String}
 */
function splitInteger(str) {
    if (str.length <= INTEGER_PART_SIZE) {
        return [str];
    }

    let from = str.length - INTEGER_PART_SIZE;
    let to = str.length;

    return [str.slice(from, to)].concat(splitInteger(str.slice(0, from)));
}

/**
 * Компонент поля для ввода суммы. Может принимать в качестве значения либо число, либо число с сотой долей.
 *
 * @extends Input
 */
@cn('money-input', Input)
@performance()
class MoneyInput extends React.Component {
    static propTypes = {
        ...Input.propTypes,
        /** Максимально допустимая длина значения до запятой */
        integerLength: Type.number,
        /** Максимально допустимая длина значения после запятой */
        fractionLength: Type.number,
        /** Толщина шрифта */
        bold: Type.bool,
        /** Отображение символа валюты */
        showCurrency: Type.bool,
        /** Международный код валюты */
        currencyCode: Type.string
    };

    static defaultProps = {
        fractionLength: DEFAULT_FRACTION_SIZE,
        integerLength: DEFAULT_INTEGER_SIZE,
        bold: false,
        showCurrency: false,
        currencyCode: 'RUR'
    };

    state = {
        value: ''
    };

    /**
     * @type {String}
     */
    maskPattern;

    /**
     * @type {InputMask.Pattern}
     */
    mask;

    /**
     * @type {Input}
     */
    root;

    componentWillMount() {
        this.updateMaskByValue(this.getValue());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.updateMaskByValue(nextProps.value || '');
        }
    }

    render(cn, Input) {
        return (
            <div
                className={ cn({
                    currency: this.props.showCurrency,
                    bold: this.props.bold,
                    width: this.props.width
                }) }
            >
                <Input
                    { ...this.props }
                    ref={ (root) => {
                        this.root = root;
                    } }
                    formNoValidate={ true }
                    mask={ this.maskPattern }
                    maxLength={ this.getMaxLength() }
                    value={ this.getValue() }
                    leftAddons={
                        this.props.showCurrency ? (
                            <span className={ cn('currency') }>
                                <span className={ cn('value') }>{ this.getValue() }</span>
                                <span>{ getCurrencySymbol(this.props.currencyCode) }</span>
                            </span>
                        ) : (
                            this.props.leftAddons
                        )
                    }
                    onChange={ this.handleChange }
                    onProcessMaskInputEvent={ this.handleProcessMaskInputEvent }
                />
            </div>
        );
    }

    @autobind
    handleProcessMaskInputEvent(event) {
        let currentValue = this.mask.format(this.getValue());
        let newValue = event.target.value;

        // При удалении отрезаем запятую, если исчезла дробная часть.
        if (newValue.length < currentValue.length) {
            let fractionPart = getValueParts(newValue)[1]; // Берем значение после запятой

            // `fractionPart !== undefined` - значит запятая введена, но
            // `fractionPart.length === 0` - значит цифр после запятой нет.
            if (fractionPart !== undefined && fractionPart.length === 0) {
                newValue = newValue.substring(0, newValue.length - 1);
                event.target.value = newValue;
            }
        }

        this.updateMaskByValue(newValue);
    }

    @autobind
    handleChange(value) {
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value, Number(value.replace(/[^\d,]/g, '').replace(/,/g, '.')));
        }
    }

    /**
     * Устанавливает фокус на поле ввода.
     *
     * @public
     */
    focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        this.root.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     *
     * @public
     */
    scrollTo() {
        this.root.scrollTo();
    }

    /**
     * Обновляет маску по значению: группирует целую часть в блоки по три символа.
     *
     * @param {String} value Значение
     */
    updateMaskByValue(value) {
        let [integerPart, fractionPart] = getValueParts(value);

        let integerPartLength = Math.max(Math.min(integerPart.length || 1, this.props.integerLength));
        this.maskPattern = splitInteger(new Array(integerPartLength + 1).join('1'))
            .reverse()
            .join(' ');

        if (fractionPart !== undefined && this.props.fractionLength > 0) {
            this.maskPattern += `,${new Array(this.props.fractionLength + 1).join('1')}`;
        }

        this.mask = new Mask(this.maskPattern);

        if (this.root) {
            this.root.getMaskedInputInstance().setMask(this.maskPattern);
        }
    }

    /**
     * Расчитывает максимально допустимую длинну поля ввода.
     *
     * @returns {Number}
     */
    getMaxLength() {
        let maxLength = Math.floor((this.props.integerLength - 1) / INTEGER_PART_SIZE) + this.props.integerLength;

        if (this.props.fractionLength) {
            maxLength += 1 + this.props.fractionLength;
        }

        return maxLength;
    }

    /**
     * Возвращает актуальное значение для рендера.
     *
     * @returns {String}
     */
    getValue() {
        return this.props.value !== undefined ? this.props.value : this.state.value;
    }
}

export default MoneyInput;
