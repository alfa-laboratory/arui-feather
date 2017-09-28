/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

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
        /** Управление цветностью иконки */
        colored: Type.bool,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Название иконки */
        name: Type.string,
        /** Размер иконки */
        size: Type.oneOf(['s', 'm', 'l', 'xl', 'xxl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Обработчик клика по иконке */
        onClick: Type.func
    };

    static defaultProps = {
        size: 'm'
    };

    static contextTypes = {
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white'])
    };

    render(cn) {
        let mods = {
            size: this.props.size
        };

        if (this.props.name) {
            mods[this.props.name] = true;
        } else {
            return null;
        }

        return (
            <span
                className={ cn(mods) }
                id={ this.props.id }
                style={ { backgroundImage: `url(${require(`alfa-ui-icons/${this.getIconFileName()}.svg`)})` } }
            />
        );
    }

    @autobind
    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    getIconFileName() {
        let cnTheme = this.props.theme || this.context.theme;
        let iconColor = cnTheme === 'alfa-on-white' ? 'black' : 'white';

        if (this.props.colored) {
            iconColor = 'color';
        }

        return `icon_${this.props.name}_${this.props.size}_${iconColor}`;
    }
}

export default Icon;
