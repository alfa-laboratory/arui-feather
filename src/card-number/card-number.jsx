/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

import './card-number.css';

/**
 * Компонент для отображения номера банковской карты.
 * Маскирует карту, если передать все 16 цифр номера карты.
 */
@cn('card-number')
@performance()
class CardNumber extends React.Component {
    static propTypes = {
        /** Номер карты */
        children: Type.oneOfType([Type.string, Type.number]),
        /** Номер карты */
        value: Type.oneOfType([Type.string, Type.number]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    render(cn) {
        return (
            <span className={ cn }>
                { this.renderNumber(cn) }
            </span>
        );
    }

    renderNumber(cn) {
        let value = this.props.children || this.props.value;
        if (value) {
            let splittedValue = value.replace(/ /g, '').split(/\*+/);

            if (splittedValue.length === 1) {
                // not masked value
                let number = splittedValue[0];

                if (number.length >= 16) {
                    let numberBlockList = [];

                    for (let i = 0; i < 3; i++) {
                        numberBlockList.push(number.substring(4 * i, 4 * (i + 1)));
                    }
                    numberBlockList.push(number.substring(12, number.length));

                    return numberBlockList.join(' ');
                }

                // to short for card number
                return number;
            }

            // masked value
            if (splittedValue[0]) {
                splittedValue[0] = splittedValue[0].trim().substring(0, 4);
            }

            if (splittedValue[1]) {
                splittedValue[1] = splittedValue[1].trim().substring(0, 4);
            }

            let dot = this.renderDot(cn);
            return createFragment({
                cardNumberStart: <span className={ cn('card-number-start') }>{ splittedValue[0] }</span>,
                dot1: dot,
                dot2: dot,
                dot3: dot,
                dot4: dot,
                cardNumberEnd: <span className={ cn('card-number-end') }>{ splittedValue[1] }</span>
            });
        }

        return undefined;
    }

    renderDot(cn) {
        return (
            <span className={ cn('dot') } />
        );
    }
}

export default CardNumber;
