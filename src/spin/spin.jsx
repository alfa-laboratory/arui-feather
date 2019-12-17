/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

/**
 * Компонент показывающий крутящееся кольцо загрузки.
 */
class Spin extends React.PureComponent {
    cn = createCn('spin');
    static propTypes = {
        /** Управление видимостью компонента */
        visible: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
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
        visible: false,
        size: 'm'
    };

    render() {
        return (
            <span
                className={ this.cn({
                    size: this.props.size,
                    visible: this.props.visible
                }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            />
        );
    }
}

export default withTheme(Spin);
