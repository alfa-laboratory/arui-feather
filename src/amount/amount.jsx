/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';
import Heading from '../heading/heading';
import Label from '../label/index';
import performance from '../performance';

import {
    formatAmount,
    THINSP,
    AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR
} from '../lib/format-amount';

const ZERO_MINOR_PART_REGEXP = /^0+$/;

/**
 * Компонент для отображения суммы, согласно следующему гайдлайну:
 * https://design.alfabank.ru/patterns/amount
 */
@performance(true)
class Amount extends React.Component {
    cn = createCn('amount');
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
        id: Type.string,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        size: 'm',
        showZeroMinorPart: true,
        bold: false,
        isHeading: false
    };

    render() {
        const { amount, size } = this.props;
        const { majorPart, minorPart, currencySymbol } = formatAmount(amount);

        const amountInner = (
            <span>
                <span className={ this.cn('major') }>{ majorPart }</span>
                { this.renderSeparatorAndMinorPart(minorPart) }
                { this.renderCurrencySymbol(currencySymbol) }
            </span>
        );

        return (
            <div
                className={ this.cn({ bold: this.props.bold }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.props.isHeading ? (
                    <Heading size={ size }>{ amountInner }</Heading>
                ) : (
                    <Label size={ size }>{ amountInner }</Label>
                ) }
            </div>
        );
    }

    renderSeparatorAndMinorPart(minorPart) {
        const { showZeroMinorPart } = this.props;

        let needMinorPart = false;

        if (minorPart) {
            needMinorPart = true;

            if (!showZeroMinorPart && ZERO_MINOR_PART_REGEXP.test(minorPart)) {
                needMinorPart = false;
            }
        }

        if (needMinorPart) {
            return (
                <div className={ this.cn('minor-container') }>
                    <span className={ this.cn('separator') }>{ AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR }</span>
                    <span className={ this.cn('minor') }>{ minorPart }</span>
                </div>
            );
        }

        return null;
    }

    // eslint-disable-next-line class-methods-use-this
    renderCurrencySymbol(currencySymbol) {
        return (
            <span className={ this.cn('currency') }>
                { THINSP }
                { currencySymbol }
            </span>
        );
    }
}

export default Amount;
