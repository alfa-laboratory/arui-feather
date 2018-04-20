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

const DEFAULT_INTEGER_SIZE = 9;
const DEFAULT_MINORITY_UNITS = 100;
const INTEGER_PART_SIZE = 3;
const DEFAULT_CURRENCY = {
    minority: DEFAULT_MINORITY_UNITS,
    code: 'RUR'
};

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
        /** Валюта */
        currency: Type.shape({
            /** Международный код валюты */
            code: Type.string,
            /** Количество минорных единиц валюты */
            minority: Type.number
        })
    };

    static defaultProps = {
        integerLength: DEFAULT_INTEGER_SIZE,
        currency: DEFAULT_CURRENCY
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
            <Input
                { ...this.props }
                ref={ (root) => { this.root = root; } }
                className={ cn() }
                formNoValidate={ true }
                mask={ this.maskPattern }
                maxLength={ this.getMaxLength() }
                value={ this.getValue() }
                onChange={ this.handleChange }
                onProcessMaskInputEvent={ this.handleProcessMaskInputEvent }
            />
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
            this.props.onChange(
                value,
                {
                    value: Math.round(
                        Number(value.replace(/[^\d,]/g, '').replace(/,/g, '.')) * this.props.currency.minority
                    ),
                    currency: this.props.currency
                }
            );
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
        let fractionLength = this.getFractionLength();
        let [integerPart, fractionPart] = getValueParts(value);

        let integerPartLength = Math.max(Math.min(integerPart.length || 1, this.props.integerLength));
        this.maskPattern = splitInteger((new Array(integerPartLength + 1)).join('1')).reverse().join(' ');

        if (fractionPart !== undefined && fractionLength > 0) {
            this.maskPattern += `,${(new Array(fractionLength + 1)).join('1')}`;
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
        let fractionLength = this.getFractionLength();
        if (fractionLength) {
            maxLength += 1 + fractionLength;
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

    /**
     * Возвращает количество знаков после запятой из минорности валюты.
     *
     * @returns {Number}
     */
    getFractionLength() {
        return this.props.currency.minority.toString().length - 1;
    }
}

export default MoneyInput;
