/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';
import { ThemeProvider as NewThemeProvider } from '../cn';

export type ThemeProviderProps = {
    /**
     * Дочерний элемент `ThemeProvider`
     */
    children?: React.ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';
};

/**
 * Компонент задающий тему для своих дочерних компонентов.
 * Важно! Может содержать в себе строго один дочерний компонент.
 */
class ThemeProvider extends React.Component<ThemeProviderProps> {
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
        return (
            <NewThemeProvider value={ this.props.theme }>
                { React.Children.only(this.props.children) }
            </NewThemeProvider>
        );
    }
}

export default ThemeProvider;
