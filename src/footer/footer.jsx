/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import Copyright from '../copyright/copyright';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент подвала сайта.
 * Обычно используется совместно с компонентом `Page`.
 *
 * @example
 * ```javascript
 * import Page from 'arui-feather/page';
 * import Header from 'arui-feather/header';
 * import Footer from 'arui-feather/footer';
 *
 * <Page header={ <Header /> } footer={ <Footer /> }>
 *     Контент страницы...
 * </Page>
 * ```
 */
@cn('footer')
@performance()
class Footer extends React.Component {
    static propTypes = {
        /** Меню в подвале */
        menu: Type.node,
        /** Дополнительный текст */
        additional: Type.node,
        /** Содержимое блока соц. сетей */
        social: Type.node,
        /** Отображение блока соц. сетей */
        showSocial: Type.bool,
        /** Содержимое блока копирайта */
        copyright: Type.node,
        /** Отображение годов в копирайте */
        showYears: Type.bool,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    static defaultProps = {
        additional: 'Сделано в Альфа-Лаборатории',
        showSocial: true,
        showYears: false,
        social: null
    };

    render(cn) {
        return (
            <div className={ cn }>
                <div className={ cn('inner') }>
                    {
                        this.props.menu && (
                            <div className={ cn('menu') }>
                                { this.props.menu }
                            </div>
                        )
                    }
                    <div className={ cn('additional') }>
                        { this.props.additional }
                    </div>
                    <div className={ cn('info') }>
                        <div className={ cn('social') }>
                            { this.props.social }
                        </div>
                        <div className={ cn('copyright') }>
                            { this.props.copyright || <Copyright showYears={ this.props.showYears } /> }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
