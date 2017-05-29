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
 *
 * @example
 * ```javascript
 * import Page from 'arui-feather/page';
 * import Header from 'arui-feather/header';
 * import Footer from 'arui-feather/footer';
 *
 * import AppTitle from 'arui-feather/app-title';
 * import AppMenu from 'arui-feather/app-menu';
 * import AppContent from 'arui-feather/app-content';
 *
 * import Heading from 'arui-feather/heading';
 * import Menu from 'arui-feather/menu';
 * import Paragraph from 'arui-feather/paragraph';
 *
 * <Page header={ <Header /> } footer={ <Footer /> }>
 *     <AppTitle>
 *         <Heading>Заголовок страницы</Heading>
 *     </AppTitle>
 *     <AppMenu>
 *         <Menu />
 *     </AppMenu>
 *     <AppContent>
 *         <Paragraph>Контент страницы...</Paragraph>
 *     </AppContent>
 * </Page>
 * ```
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
