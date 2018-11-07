/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import Heading from '../heading/heading';
import Label from '../label/label';

import cn from '../cn';
import { getCurrencySymbol } from '../lib/currency-codes';

const THINSP = String.fromCharCode(8201); // &thinsp;
const AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR = ',';
const AMOUNT_MAJOR_PARTS_SPLITTER = THINSP;
const AMOUNT_MAJOR_PART_SIZE = 3;
const AMOUNT_SPLIT_CODE_FROM = 4;
const ZERO_MINOR_PART_REGEXP = /^0+$/;
const NEGATIVE_AMOUNT_SYMBOL = '−';

/**
 * Дробит мажорную часть суммы на части по указанному символу.
 *
 * @param {String} amount Сумма для разбивки на части
 * @param {Number} [partSize=3] Размер частей суммы
 * @param {String} [splitter=THINSP] Символ, разбивающий части суммы
 * @param {String} [splitFrom=5] Длинна суммы, начиная с которой необходимо осуществлять разбивку. По-умолчанию длинна
 * равняется пяти по требованию гайдлайнов: https://design.alfabank.ru/patterns/amount. Пример: 2900 — не разбивается,
 * 29 000 — разбивается.
 * @returns {String}
 */
function splitAmount(amount, partSize = 3, splitter = THINSP, splitFrom = 5) {
    const len = amount.length;

    // Если длина суммы меньше требуемой, не форматируем сумму
    if (len < splitFrom) {
        return amount;
    }

    return amount
        .split('')
        .reduce((acc, item, i) => {
            const isLastItem = i !== len - 1;
            // eslint-disable-next-line no-mixed-operators
            const isStartOfPart = (i - (len % partSize) + 1) % partSize === 0;

            return isLastItem && isStartOfPart ? [...acc, item, splitter] : [...acc, item];
        }, [])
        .join('');
}

/**
 * Форматирует значение суммы.
 *
 * @typedef {Object} AmountProps Параметры суммы
 * @property {Number} amount.value Абсолютное значение суммы
 * @property {Object} amount.currency Параметры валюты
 * @property {String} amount.currency.code Код валюты
 * @property {Number} amount.currency.minority Количество минорных единиц валюты
 *
 * @typedef {Object} FormattedAmountProps Параметры форматированной суммы
 * @property {String} majorPart Мажорная часть суммы
 * @property {String} minorPart Минорная часть суммы
 * @property {String} value Валюта целиком
 * @property {String} currencySymbol Символ валюты
 *
 * @param {AmountProps} amount Параметры суммы
 * @returns {FormattedAmountProps}
 */
function formatAmount(amount) {
    const {
        value,
        currency: { minority, code }
    } = amount;

    const fractionDigits = Math.log(minority) * Math.LOG10E;
    const valueAbsStr = (Math.abs(value) / minority).toFixed(fractionDigits);

    const [majorPart, minorPart] = valueAbsStr.split('.');

    const majorPartSplitted = splitAmount(
        majorPart,
        AMOUNT_MAJOR_PART_SIZE,
        AMOUNT_MAJOR_PARTS_SPLITTER,
        AMOUNT_SPLIT_CODE_FROM
    );

    const majorPartFormatted = value < 0 ? NEGATIVE_AMOUNT_SYMBOL + majorPartSplitted : majorPartSplitted;

    const formattedValueStr = minorPart
        ? majorPartFormatted + AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR + minorPart
        : majorPartFormatted;

    return {
        majorPart: majorPartFormatted,
        minorPart,
        value: formattedValueStr,
        currencySymbol: getCurrencySymbol(code)
    };
}

/**
 * Компонент для отображения суммы, согласно следующему гайдлайну:
 * https://design.alfabank.ru/patterns/amount
 */
@cn('amount')
class Amount extends React.PureComponent {
    static propTypes = {
        amount: Type.shape({
            /** Абсолютное значение суммы */
            value: Type.number,
            /** Валюта */
            currency: Type.shape({
                /** Международный код валюты */
                code: Type.string,
                /** Количество минорных единиц валюты */
                minority: Type.number
            })
        }).isRequired,
        /** Отображение минорной части, если она нулевая */
        showZeroMinorPart: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Толщина шрифта */
        bold: Type.bool,
        /** Использовать компонент `Heading` для вывода числа */
        isHeading: Type.bool,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string
    };

    static defaultProps = {
        size: 'm',
        showZeroMinorPart: true,
        bold: false,
        isHeading: false
    };

    render(cn) {
        let { amount, size } = this.props;
        let { majorPart, minorPart, currencySymbol } = formatAmount(amount);

        let amountInner = (
            <span>
                <span className={ cn('major') }>{ majorPart }</span>
                { this.renderSeparatorAndMinorPart(cn, minorPart) }
                { this.renderCurrencySymbol(cn, currencySymbol) }
            </span>
        );

        return (
            <div className={ cn({ bold: this.props.bold }) } id={ this.props.id }>
                { this.props.isHeading ? (
                    <Heading size={ size }>{ amountInner }</Heading>
                ) : (
                    <Label size={ size }>{ amountInner }</Label>
                ) }
            </div>
        );
    }

    renderSeparatorAndMinorPart(cn, minorPart) {
        let { showZeroMinorPart } = this.props;

        let needMinorPart = false;

        if (minorPart) {
            needMinorPart = true;

            if (!showZeroMinorPart && ZERO_MINOR_PART_REGEXP.test(minorPart)) {
                needMinorPart = false;
            }
        }

        if (needMinorPart) {
            return (
                <div className={ cn('minor-container') }>
                    <span className={ cn('separator') }>{ AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR }</span>
                    <span className={ cn('minor') }>{ minorPart }</span>
                </div>
            );
        }
        return null;
    }

    renderCurrencySymbol(cn, currencySymbol) {
        return (
            <span className={ cn('currency') }>
                { THINSP }
                { currencySymbol }
            </span>
        );
    }
}

export default Amount;
