/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

const HEADING_LEVEL = {
    xl: 1,
    l: 2,
    m: 3,
    s: 4
};

/**
 * Компонент заголовка.
 */
@cn('heading')
@performance()
class Heading extends React.Component {
    static propTypes = {
        /** Выравнивание контента */
        align: Type.oneOf(['left', 'center', 'right', 'justify']),
        /** Дочерние элементы `Heading` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Размер, определяющий какой тег заголовка будет использоваться */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Вес шрифта */
        weight: Type.oneOf(['light', 'bold', 'black']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    static defaultProps = {
        size: 'xl',
        weight: 'bold'
    };

    render(cn) {
        let { align, size, weight } = this.props;
        let headingProps = {
            className: cn({
                align,
                size,
                weight
            })
        };

        return React.createElement(`h${HEADING_LEVEL[size]}`,
            headingProps,
            this.props.children
        );
    }
}

export default Heading;
