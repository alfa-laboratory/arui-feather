/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import Heading from '../heading/heading';
import Label from '../label/label';

import cn from '../cn';
import { getCurrencySymbol } from '../lib/currency-codes';
import performance from '../performance';

const AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR = ',';
const AMOUNT_MAJOR_PART_SIZE = 3;
const ZERO_MINOR_PART_REGEXP = /^0+$/;
const MINUS_SIGN_HTML_CODE = '\u2212';

function createSplitter(partSize) {
    let parts = function (str) {
        let length = str.length;

        if (length <= partSize) {
            return [str];
        }

        let from = length - partSize;
        let to = length;

        return [str.slice(from, to)].concat(parts(str.slice(0, from)));
    };
    return parts;
}

function formatAmount(amount) {
    let {
        value,
        currency: {
            minority,
            code
        }
    } = amount;
    let fractionDigits = Math.log(minority) / Math.LN10;

    let isNegative = value < 0;

    let valueAbs = Math.abs(value);

    let valueAbsStr = (valueAbs / minority).toFixed(fractionDigits);

    let numberParts = valueAbsStr.split('.');
    let majorPart = numberParts[0];
    let minorPart = numberParts[1];

    let amountSplitter = createSplitter(AMOUNT_MAJOR_PART_SIZE);

    let majorPartFormatted = amountSplitter(majorPart).reverse().join(' ');
    let formattedValueStr = majorPartFormatted + (minorPart ? `,${minorPart}` : '');

    return {
        majorPart: majorPartFormatted,
        minorPart,
        value: formattedValueStr,
        isNegative,
        currencySymbol: getCurrencySymbol(code)
    };
}

/**
 * Компонент для отображения суммы.
 */
@cn('amount')
@performance(true)
class Amount extends React.Component {
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
        /** Использовать компонент `Heading` для вывода числа */
        isHeading: Type.bool,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string
    };

    static defaultProps = {
        size: 'm',
        showZeroMinorPart: true,
        isHeading: false
    };

    render(cn) {
        let { amount, size } = this.props;
        let { majorPart, minorPart, isNegative, currencySymbol } = formatAmount(amount);
        let amountInner = (
            <span>
                <span className={ cn('major') }>
                    { isNegative && MINUS_SIGN_HTML_CODE }
                    { majorPart }
                </span>
                { this.renderSeparatorAndMinorPart(cn, minorPart) }
                { this.renderCurrencySymbol(cn, currencySymbol) }
            </span>
        );

        return (
            <div className={ cn() } id={ this.props.id }>
                {
                    this.props.isHeading
                        ? <Heading size={ size }>
                            { amountInner }
                        </Heading>
                        : <Label size={ size }>
                            { amountInner }
                        </Label>
                }
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
                    <span className={ cn('separator') } >{ AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR }</span>
                    <span className={ cn('minor') } >{ minorPart }</span>
                </div>
            );
        }
        return null;
    }

    renderCurrencySymbol(cn, currencySymbol) {
        return (
            <span className={ cn('currency') } >
                { ` ${currencySymbol}` }
            </span>
        );
    }
}

export default Amount;
