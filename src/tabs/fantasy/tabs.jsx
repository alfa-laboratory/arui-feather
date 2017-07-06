/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../../cn';
import performance from '../../performance';


/**
 * Компонент навигации в виде табов. Как правило используется совместно с `TabItem`.
 */
@cn('tabs')
@performance()
export default class Tabs extends React.Component {
    static propTypes = {
        /** Дочерние компоненты */
        children: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    render(cn) {
        return (
            <div className={ cn }>
                { this.props.children }
            </div>
        );
    }
}
