/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import deprecated from 'deprecated-decorator';
import React from 'react';
import Type from 'prop-types';

import Icon from '../icon/icon';
import Link from '../link/link';

import cn from '../cn';
import performance from '../performance';

/**
 * @deprecated since v9.5.0
 *
 * Компонент доступа к пользовательскому профилю: cодержит имя пользователя и кнопку "Выйти".
 */
@deprecated('arui-private')
@cn('user')
@performance()
class User extends React.Component {
    static propTypes = {
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Иконка пользователя */
        icon: Type.node,
        /** Имя пользователя */
        text: Type.string,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** href ссылки с именем пользователя */
        url: Type.string,
        /** Обработчик клика по пользователю */
        onClick: Type.func
    };

    static defaultProps = {
        url: '#'
    };

    render(cn) {
        let icon = this.props.icon !== undefined
            ? this.props.icon
            : <Icon className={ cn('icon') } size='s' name='user' />;

        return (
            <Link
                className={ cn }
                id={ this.props.id }
                icon={ icon }
                text={ this.props.text }
                url={ this.props.url }
                onClick={ this.handleClick }
            />
        );
    }

    @autobind
    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }
}

export default User;
