/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент формы.
 */
@cn('form')
@performance()
class Form extends React.Component {
    static propTypes = {
        /** Способ кодирования данных формы при их отправке */
        enctype: Type.oneOf(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']),
        /** Адрес отправки данных на сервер */
        action: Type.string,
        /** Метод запроса */
        method: Type.oneOf(['post', 'get']),
        /** Тип формы */
        view: Type.oneOf(['line', 'normal']),
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Футер для формы */
        footer: Type.node,
        /** Управление встроенным в браузер механизмом валидации формы */
        noValidate: Type.bool,
        /** Управление автозаполнением формы */
        autocomplete: Type.bool,
        /** Дочерние элементы формы */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Имя компонента в DOM */
        name: Type.string,
        /** Обработчик отправки формы */
        onSubmit: Type.func
    };

    static defaultProps = {
        action: '/',
        enctype: 'application/x-www-form-urlencoded',
        method: 'post',
        size: 'm',
        noValidate: false,
        autocomplete: true
    };

    render(cn) {
        return (
            <form
                action={ this.props.action }
                encType={ this.props.enctype }
                method={ this.props.method }
                noValidate={ this.props.noValidate }
                autoComplete={ this.props.autocomplete === false ? 'off' : 'on' }
                className={ cn({
                    size: this.props.size,
                    view: this.props.view
                }) }
                id={ this.props.id }
                name={ this.props.name }
                onSubmit={ this.handleSubmit }
            >
                { this.props.children }
                {
                    this.props.footer &&
                        <div className={ cn('footer') }>
                            { this.props.footer }
                        </div>
                }
            </form>
        );
    }

    @autobind
    handleSubmit(event) {
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(event);
        }
    }
}

export default Form;
