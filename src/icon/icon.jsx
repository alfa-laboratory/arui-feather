/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

const VIEW_BOX_SIZES = {
    s: 18,
    m: 24,
    l: 30,
    xl: 36,
    xxl: 48
};

/**
 * Компонент иконки. Содержит в себе только неодходимые для компонентов иконки.
 * Все иконки доступны в двух цветовых темах `alfa-on-color` и `alfa-on-white`.
 *
 * Для иконок `error` и `ок` также есть цветной вариант,
 * реализуемый темой `alfa-on-colored`.
 */
@cn('icon')
@performance()
class Icon extends React.Component {
    static propTypes = {
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Название иконки */
        name: Type.string,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl', 'xxl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white', 'alfa-on-colored'])
    };

    static defaultProps = {
        size: 'm'
    };

    componentWillMount() {
        this.requireIcon();
    }

    componentWillReceiveProps() {
        this.requireIcon();
    }

    componentWillUnmount() {
        // TODO @teryaew: how about removing not needed anymore symbol here?
    }

    render(cn) {
        let mods = {
            size: this.props.size
        };

        if (this.props.name) {
            mods[this.props.name] = true;
        } else if (this.props.name === undefined) {
            return null;
        }

        return (
            <svg
                className={ cn(mods) }
                id={ this.props.id }
                viewBox={ `0 0 ${VIEW_BOX_SIZES[this.props.size]} ${VIEW_BOX_SIZES[this.props.size]}` }
            >
                <use xlinkHref={ `#${this.getSymbolId()}` } />
            </svg>
        );
    }

    getSymbolId() {
        // TODO @teryaew: we must think about better theme naming convention for icon file names
        let theme = (this.props.theme || this.context.theme).replace('alfa-on-', '');

        return `icon_${this.props.name}__${this.props.size}__${theme}`;
    }

    requireIcon() {
        if (this.props.name === undefined) {
            return null;
        }

        require(`./images/${this.getSymbolId()}.svg`);
    }
}

export default Icon;
