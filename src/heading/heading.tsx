/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

const HEADING_LEVEL = {
    xl: 1,
    l: 2,
    m: 3,
    s: 4,
    xs: 5
};

export type HeadingProps = {

    /**
     * Дочерние элементы `Heading`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Размер, определяющий какой тег заголовка будет использоваться
     */
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';

    /**
     * Дефолтные отступы
     */
    hasDefaultMargins?: boolean;

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
 * Компонент заголовка.
 */
export class Heading extends React.PureComponent<HeadingProps> {
    cn = createCn('heading');

    static defaultProps: Partial<HeadingProps> = {
        size: 'xl',
        hasDefaultMargins: true
    };

    render() {
        const headingProps = {
            className: this.cn({
                size: this.props.size,
                [`margins_${this.props.size}`]: this.props.hasDefaultMargins
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
