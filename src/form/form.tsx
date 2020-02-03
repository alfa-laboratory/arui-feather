/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type FormProps = {

    /**
     * Способ кодирования данных формы при их отправке
     */
    enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

    /**
     * Адрес отправки данных на сервер
     */
    action?: string;

    /**
     * Метод запроса
     */
    method?: 'post' | 'get';

    /**
     * Тип формы
     */
    view?: 'line' | 'normal';

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Футер для формы
     */
    footer?: React.ReactNode;

    /**
     * Управление встроенным в браузер механизмом валидации формы
     */
    noValidate?: boolean;

    /**
     * Управление автозаполнением формы
     */
    autocomplete?: boolean;

    /**
     * Дочерние элементы формы
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
     * Имя компонента в DOM
     */
    name?: string;

    /**
     * Обработчик отправки формы
     */
    onSubmit?: (event?: React.FormEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Компонент формы.
 */
export class Form extends React.PureComponent<FormProps> {
    cn = createCn('form');

    static defaultProps: Partial<FormProps> = {
        action: '/',
        enctype: 'application/x-www-form-urlencoded',
        method: 'post',
        size: 'm',
        noValidate: false,
        autocomplete: true
    };

    render() {
        return (
            <form
                action={ this.props.action }
                encType={ this.props.enctype }
                method={ this.props.method }
                noValidate={ this.props.noValidate }
                autoComplete={ this.props.autocomplete === false ? 'off' : 'on' }
                className={ this.cn({
                    size: this.props.size,
                    view: this.props.view
                }) }
                id={ this.props.id }
                name={ this.props.name }
                onSubmit={ this.handleSubmit }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.props.children }
                {
                    this.props.footer &&
                        <div className={ this.cn('footer') }>
                            { this.props.footer }
                        </div>
                }
            </form>
        );
    }

    private handleSubmit = (event) => {
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(event);
        }
    }
}

export default withTheme(Form);
