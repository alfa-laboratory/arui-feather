/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import ThemeProvider from './theme-provider';
import Button from '../button';
import Paragraph from '../paragraph';

describe('theme-provider', () => {
    it('should render without problems', () => {
        const themeProvider = mount(<ThemeProvider><div>Render-test</div></ThemeProvider>);

        expect(themeProvider).toMatchSnapshot();
    });

    it('should render child', () => {
        const themeProvider = mount(<ThemeProvider><div>Render-test</div></ThemeProvider>);

        expect(themeProvider.text()).toContain('Render-test');
    });

    it('should render Button with `alfa-on-color` theme', () => {
        const themeProvider = mount(
            <ThemeProvider theme='alfa-on-color'>
                <Button>Render-test</Button>
            </ThemeProvider>
        );

        expect(themeProvider.find('button_theme_alfa-on-color')).toBeTruthy();
    });

    it('should render children with redefinition theme', () => {
        const themeProvider = mount(
            <ThemeProvider theme='alfa-on-color'>
                <div>
                    <div style={ { background: 'white' } }>
                        <ThemeProvider theme='alfa-on-white'>
                            <Paragraph>Paragraph-test</Paragraph>
                        </ThemeProvider>
                    </div>
                </div>
            </ThemeProvider>
        );
        const paragraphNode = themeProvider.find('.paragraph');

        expect(paragraphNode.getDOMNode().className).toContain('paragraph_theme_alfa-on-white');
    });
});
