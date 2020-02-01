/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';
import Heading from '../heading/heading';
import Label from '../label/label';
import performance from '../performance';

import {
    formatAmount,
    THINSP,
    AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR
} from '../lib/format-amount';

const ZERO_MINOR_PART_REGEXP = /^0+$/;

export type AmountProps = {
    amount: {

        /**
         * Абсолютное значение суммы
         */
        value: number;

        /**
         * Валюта
         */
        currency: {

            /**
             * Международный код валюты
             */
            code: string;

            /**
             * Количество минорных единиц валюты
             */
            minority: number;
        };
    };

    /**
     * Отображение минорной части, если она нулевая
     */
    showZeroMinorPart?: boolean;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Толщина шрифта
     */
    bold?: boolean;

    /**
     * Использовать компонент `Heading` для вывода числа
     */
    isHeading?: boolean;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент для отображения суммы, согласно следующему гайдлайну:
 * https://design.alfabank.ru/patterns/amount
 */
@performance(true)
export class Amount extends React.Component<AmountProps> {
    cn = createCn('amount');

    static defaultProps: Partial<AmountProps> = {
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

    private renderSeparatorAndMinorPart(minorPart) {
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

    private renderCurrencySymbol(currencySymbol) {
        return (
            <span className={ this.cn('currency') }>
                { THINSP }
                { currencySymbol }
            </span>
        );
    }
}

export default withTheme(Amount);
