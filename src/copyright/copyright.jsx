/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import Link from '../link/link';

import cn from '../cn';
import performance from '../performance';

import './copyright.css';

/**
 * Компонент копирайта: отображает данные о лицензии Альфа-Банка.
 */
@cn('copyright')
@performance()
class Copyright extends React.Component {
    static propTypes = {
        /** Дочерние элементы `Copyright`, заменяют собой стандартный текст copyright'а */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Отображение годов */
        showYears: Type.bool,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white'])
    };

    static defaultProps = {
        showYears: false
    };

    render(cn) {
        return (
            <div className={ cn }>
                { this.props.children || this.renderDefaultCopyright(cn) }
            </div>
        );
    }

    renderDefaultCopyright(cn) {
        return (
            <span>
                {
                    this.props.showYears &&
                    <span className={ cn('years') }>
                        © 2001—2017 <Link size='xs' url='https://alfabank.ru/' text='Альфа-Банк' />
                        <br />
                    </span>
                }
                Генеральная лицензия <nobr>Банка России</nobr>
                { ' ' }
                №1326, <nobr>от 16 января 2015 г.</nobr>
            </span>
        );
    }
}

export default Copyright;
