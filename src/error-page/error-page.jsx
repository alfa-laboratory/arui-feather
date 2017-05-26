/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import AppContent from '../app-content/app-content';
import AppTitle from '../app-title/app-title';
import Heading from '../heading/heading';
import Link from '../link/link';
import Page from '../page/page';

import cn from '../cn';

/**
 * Компонент страницы ошибки.
 * Как правило является корневым компонентом страницы.
 * Используется вместо компонента Page.
 *
 * ```javascript
 * import ErrorPage from 'arui-feather/error-page';
 * import Header from 'arui-feather/header';
 *
 * <ErrorPage
 *      returnUrl='/login'
 *      header={ <Header /> }
 * />
 * ```
 */
@cn('error-page')
class ErrorPage extends React.Component {
    static propTypes = {
        /** Заголовок ошибки */
        title: Type.string,
        /** Сообщение ошибки */
        text: Type.string,
        /** Шапка страницы */
        header: Type.node,
        /** href для ссылки 'Вернуться в интернет-банк' */
        returnUrl: Type.string,
        /** Альтернативный текст для ссылки 'Вернуться в интернет-банк' */
        returnTitle: Type.string
    };

    static defaultProps = {
        title: 'Произошла ошибка',
        text: 'Пожалуйста, повторите операцию через некоторое время.',
        returnTitle: 'Вернуться в интернет-банк'
    };

    render(cn) {
        return (
            <Page
                header={ this.props.header }
                className={ cn }
            >
                <AppTitle>
                    <Heading>{ this.props.title }</Heading>
                </AppTitle>
                <AppContent>
                    <Heading size='m'>{ this.props.text }</Heading>
                    {
                        this.props.returnUrl &&
                        <Link
                            className={ cn('return-link') }
                            size='l'
                            text={ this.props.returnTitle }
                            url={ this.props.returnUrl }
                        />
                    }
                </AppContent>
            </Page>
        );
    }
}

export default ErrorPage;
