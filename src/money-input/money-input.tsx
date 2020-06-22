/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

/* eslint react/prop-types: 0 */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import Input, { InputProps } from '../input/input';
import Mask from '../masked-input/mask';
import { getAndroidVersion } from '../masked-input';

import { getCurrencySymbol } from '../lib/currency-codes';

const DEFAULT_FRACTION_SIZE = 2;
const DEFAULT_INTEGER_SIZE = 9;
const INTEGER_PART_SIZE = 3;

const IS_ANDROID = typeof window !== 'undefined' && /(android)/i.test(window.navigator.userAgent);

/**
 * Возвращает целую и дробную часть значения в виде массива.
 * Если дробная часть не равна `undefined`, значит введена дробная часть
 * или хотя бы запятая.
 *
 * @param value Значение
 */
function getValueParts(value: string) {
    return value
        .replace(/[.бю]/g, ',') // Заменяем точки, `б` и `ю` на запятые.
        .replace(/[^\d,]/g, '') // Удаляем все, что не является цифрой или запятой.
        .split(',') // Разделяем по запятой.
        .slice(0, 2); // Отрезаем, если больше, чем один фрагмент после запятой.
}

/**
 * Сплитит интегер в группы по 3.
 *
 * @param str Строка интегера
 */
function splitInteger(str: string): string {
    if (str.length <= INTEGER_PART_SIZE) {
        return [str];
    }

    const from = str.length - INTEGER_PART_SIZE;
    const to = str.length;

    return [str.slice(from, to)].concat(splitInteger(str.slice(0, from)));
}

type MoneyInputProps = InputProps & {
    /**
     * Максимально допустимая длина значения до запятой
     */
    integerLength?: number;
    /**
     * Максимально допустимая длина значения после запятой
     */
    fractionLength?: number;
    /**
     * Толщина шрифта
     */
    bold?: boolean;
    /**
     * Отображение символа валюты
     */
    showCurrency?: boolean;
    /**
     * Международный код валюты
     */
    currencyCode?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     * */
    'data-test-id'?: string;
    /**
     * Обработчик события, вызываемый при событии 'change'
     * */
    onChange?: (value?: string, amount?: number) => void;
};

type MoneyInputState = {
    value: string;
}

/**
 * Компонент поля для ввода суммы. Может принимать в качестве значения либо число, либо число с сотой долей.
 */
export class MoneyInput extends React.PureComponent<MoneyInputProps, MoneyInputState> {
    protected cn = createCn('money-input');

    static defaultProps: Partial<MoneyInputProps> = {
        fractionLength: DEFAULT_FRACTION_SIZE,
        integerLength: DEFAULT_INTEGER_SIZE,
        bold: false,
        showCurrency: false,
        currencyCode: 'RUR',
    };

    state = {
        value: '',
    };

    private maskPattern: string;

    private mask: Mask;

    root: HTMLInputElement;

    private caretFixTimeout: ReturnType<typeof setTimeout> = null;

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        this.updateMaskByValue(this.getValue());
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.updateMaskByValue(nextProps.value || '');
        }
    }

    componentWillUnmount() {
        clearTimeout(this.caretFixTimeout);
    }

    render() {
        return (
            <div
                className={ this.cn({
                    currency: this.props.showCurrency,
                    bold: this.props.bold,
                    width: this.props.width,
                }) }
                data-test-id={ this.props['data-test-id'] }
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
                            <span className={ this.cn('currency') }>
                                <span className={ this.cn('value') }>{ this.getCurrencySpacer() }</span>
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

    private handleProcessMaskInputEvent = (event) => {
        const currentValue = this.getValue();
        const currentFormattedValue = this.mask.format(this.getValue());
        let newValue = event.target.value;
        const currentSelection = this.root.control.input.selectionStart;

        // При удалении отрезаем запятую, если исчезла дробная часть.
        if (newValue.length < currentFormattedValue.length) {
            const fractionPart = getValueParts(newValue)[1]; // Берем значение после запятой

            // `fractionPart !== undefined` - значит запятая введена, но
            // `fractionPart.length === 0` - значит цифр после запятой нет.
            if (fractionPart !== undefined && fractionPart.length === 0) {
                newValue = newValue.substring(0, newValue.length - 1);
                // eslint-disable-next-line no-param-reassign
                event.target.value = newValue;
            }
        }

        this.updateMaskByValue(newValue);

        // При добавлении последней цифры целой части каретка должна
        // оставаться перед запятой
        if (newValue.length > currentValue.length && newValue[currentSelection] === ',') {
            setTimeout((() => {
                // Фикс бага смещения каретки в браузере на андроидах Jelly Bean (c 4.1 по 4.3)
                const offsetSection = IS_ANDROID && parseFloat(getAndroidVersion() as string) < 4.4 ? 1 : 0;
                const newSelectionStart = this.root.control.input.selectionStart - 1;

                this.setInputSelection(newSelectionStart + offsetSection);
            }), 0);
        }
    };

    private handleChange = (value) => {
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value, Number(value.replace(/[^\d,]/g, '').replace(/,/g, '.')));
        }
    };

    /**
     * Устанавливает фокус на поле ввода.
     */
    public focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     */
    public blur() {
        this.root.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     */
    public scrollTo() {
        this.root.scrollTo();
    }

    /**
     * Обновляет маску по значению: группирует целую часть в блоки по три символа.
     *
     * @param value Значение
     */
    private updateMaskByValue(value: string) {
        const [integerPart, fractionPart] = getValueParts(value);

        const integerPartLength = Math.max(Math.min(integerPart.length || 1, this.props.integerLength));

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
     */
    private getMaxLength() {
        let maxLength = Math.floor((this.props.integerLength - 1) / INTEGER_PART_SIZE) + this.props.integerLength;

        if (this.props.fractionLength) {
            maxLength += 1 + this.props.fractionLength;
        }

        return maxLength;
    }

    /**
     * Возвращает актуальное значение для рендера.
     */
    private getValue() {
        return this.props.value === undefined ? this.state.value : this.props.value;
    }

    /**
     * Устанавливает каретку поля ввода в новую позицию.
     *
     * @param selection Новое положение каретки
     */
    private setInputSelection(selection: number) {
        this.root.control.input.selectionStart = selection;
        this.root.control.input.selectionEnd = selection;
        // Android chrome имеет дефект с автоматической установкой каретки
        // при использовании клавиатуры отличной от type="text".
        if (IS_ANDROID) {
            this.setInputSelectionByTimeout(selection);
        }
    }

    /**
     * Устанавливает каретку поля ввода в заданную позицию асинхронно.
     *
     * Во-избежание дефекта с установкой каретки, наблюдаемом в мобильных браузерах,
     * установка происходит асинхронно, с минимальной задержкой,
     * с помощью [setTimeout] обертки.
     *
     * @param selection Положение каретки
     */
    private setInputSelectionByTimeout(selection: number) {
        clearTimeout(this.caretFixTimeout);

        this.caretFixTimeout = setTimeout(() => {
            this.root.control.input.selectionStart = selection;
            this.root.control.input.selectionEnd = selection;
        }, 0);
    }

    /**
     * Возвращает значение (невидимый текст) для корректного отображения значка валюты.
     */
    private getCurrencySpacer() {
        return this.mask.format(this.getValue()) || this.props.placeholder;
    }
}

class ThemedMoneyInput extends MoneyInput {}
(ThemedMoneyInput as any) = withTheme(MoneyInput);
export default ThemedMoneyInput;
