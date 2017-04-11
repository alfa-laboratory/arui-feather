/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Link from '../link/link';

import cn from '../cn';
import performance from '../performance';

import './support.css';

/**
 * Компонент с информацией о поддержке для клиентов.
 * Включает в себя город и телефон.
 */
@cn('support')
@performance()
class Support extends React.Component {
    static propTypes = {
        /** Название города */
        city: Type.string,
        /** Номер телефона */
        phone: Type.string,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Обработчик клика по городу */
        onCityClick: Type.func,
        /** Обработчик клика по телефону */
        onPhoneClick: Type.func
    };

    static defaultProps = {
        size: 'm'
    };

    render(cn) {
        return (
            <div className={ cn }>
                <div className={ cn('city') }>
                    <Link
                        size={ this.props.size }
                        pseudo={ true }
                        text={ this.props.city }
                        onClick={ this.handleCityClick }
                    />
                </div>
                <div className={ cn('phone') }>
                    <Link
                        size={ this.props.size }
                        pseudo={ true }
                        text={ this.props.phone }
                        onClick={ this.handlePhoneClick }
                    />
                </div>
            </div>
        );
    }

    @autobind
    handleCityClick() {
        if (this.props.onCityClick) {
            this.props.onCityClick();
        }
    }

    @autobind
    handlePhoneClick() {
        if (this.props.onPhoneClick) {
            this.props.onPhoneClick();
        }
    }
}

export default Support;
