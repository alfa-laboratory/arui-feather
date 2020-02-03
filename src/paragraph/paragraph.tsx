/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type ParagraphProps = {

    /**
     * Тип параграфа
     */
    view?: 'lead' | 'normal' | 'small';

    /**
     * Маркер параграфа
     */
    mark?: React.ReactNode;

    /**
     * Дочерние элементы `Paragraph`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

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
 * Компонент параграфа текста.
 */
export class Paragraph extends React.PureComponent<ParagraphProps> {
    cn = createCn('paragraph');

    render() {
        return (
            <p
                className={ this.cn({ view: this.props.view }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.props.mark &&
                    <span className={ this.cn('marker') }>{ this.props.mark }</span>
                }
                { this.props.children }
            </p>
        );
    }
}

export default withTheme(Paragraph);
