/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

const HEADING_LEVEL = {
    xl: 1,
    l: 2,
    m: 3,
    s: 4,
    xs: 5
};

/**
 * Компонент заголовка.
 */
@cn('heading')
class Heading extends React.Component {
    cn = createCn('hoba');
    static propTypes = {
        /** Дочерние элементы `Heading` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Размер, определяющий какой тег заголовка будет использоваться */
        size: Type.oneOf(['xs', 's', 'm', 'l', 'xl']),
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
        size: 'xl'
    };

    render() {
        const headingProps = {
            className: this.cn({
                size: this.props.size
            }),
            id: this.props.id,
            'data-test-id': this.props['data-test-id']
        };

        return React.createElement(`h${HEADING_LEVEL[this.props.size]}`,
            headingProps,
            this.props.children
        );
    }
}

export default withTheme(Heading);
