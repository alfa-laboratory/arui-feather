/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент меню страницы.
 * Обычно используется совместно с компонентом `Page`.
 */
@cn('app')
@performance()
class AppMenu extends React.Component {
    static propTypes = {
        /** Дочерние элементы `AppMenu` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white'])
    };

    render(cn) {
        return (
            <div className={ cn('menu') }>
                <div className={ cn('menu-case') }>
                    <div className={ cn('menu-content') }>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default AppMenu;
