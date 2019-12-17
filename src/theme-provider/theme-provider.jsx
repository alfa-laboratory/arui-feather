/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';
import { ThemeProvider as TrueThemeProvider } from '../cn';

/**
 * Компонент задающий тему для своих дочерних компонентов.
 * Важно! Может содержать в себе строго один дочерний компонент.
 */
class ThemeProvider extends React.PureComponent {
    static propTypes = {
        /** Дочерний элемент `ThemeProvider` */
        children: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white'])
    };

    render() {

        return (
            <TrueThemeProvider value={ this.props.theme }>
                { this.props.children }
            </TrueThemeProvider>
        );
    }
}

export default ThemeProvider;
