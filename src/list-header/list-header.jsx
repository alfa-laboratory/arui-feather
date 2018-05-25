/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент для разделения списка по датам или смысловым группам.
 */
@cn('list-header')
@performance()
class ListHeader extends React.Component {
    static propTypes = {
        /** Заголовок */
        title: Type.node,
        /** Комментарий */
        description: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string
    };

    render(cn) {
        return (
            <div className={ cn() }>
                <span className={ cn('title') }>
                    { this.props.title }
                </span>
                {
                    this.props.description &&
                    <span className={ cn('description') }>
                        , { this.props.description }
                    </span>
                }
            </div>
        );
    }
}

export default ListHeader;
