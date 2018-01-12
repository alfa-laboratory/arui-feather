/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

/**
 * Компонент задающий тему для своих дочерних компонентов.
 * Важно! Может содержать в себе строго один дочерний компонент.
 *
 * @example
 * ```javascript
 * import ThemeProvider from 'arui-feather/theme-provider';
 * import Page from 'arui-feather/page';
 * import Heading from 'arui-feather/heading';
 *
 * <ThemeProvider theme="alfa-on-color">
 *    <Page>
 *       <Heading>Заголовок страницы</Heading>
 *       <div style={{ background: "white" }}>
 *           <ThemeProvider theme="alfa-on-white">
 *               Врезка белого цвета на странице...
 *           </ThemeProvider>
 *       </div>
 *    </Page>
 * </ThemeProvider>
 * ```
 */
class ThemeProvider extends React.Component {
    static propTypes = {
        /** Дочерний элемент `ThemeProvider` */
        children: Type.node,
        /** Дополнительный класс */
        className: Type.string,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white'])
    };

    static contextTypes = {
        theme: Type.string
    };

    static childContextTypes = {
        theme: Type.string
    };

    getChildContext() {
        return {
            theme: this.props.theme
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

export default ThemeProvider;
