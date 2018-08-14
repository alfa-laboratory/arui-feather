/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import ThemeProvider from './theme-provider';
import Button from '../button/button';
import Heading from '../heading/heading';
import Paragraph from '../paragraph/paragraph';

describe('theme-provider', () => {
    it('should render without problems', () => {
        let themeProvider = mount(<ThemeProvider><div>Render-test</div></ThemeProvider>);

        expect(themeProvider).toMatchSnapshot();
    });

    it('should render child', () => {
        let themeProvider = mount(<ThemeProvider><div>Render-test</div></ThemeProvider>);

        expect(themeProvider.text()).toContain('Render-test');
    });

    it('should render Button with `alfa-on-color` theme', () => {
        let themeProvider = mount(
            <ThemeProvider theme='alfa-on-color'>
                <Button>Render-test</Button>
            </ThemeProvider>
        );

        expect(themeProvider.find('button_theme_alfa-on-color')).toBeTruthy();
    });

    it('should render children with redefinition theme', () => {
        let themeProvider = mount(
            <ThemeProvider theme='alfa-on-color'>
                <div>
                    <Heading>Title-test</Heading>
                    <div style={ { background: 'white' } }>
                        <ThemeProvider theme='alfa-on-white'>
                            <Paragraph>Paragraph-test</Paragraph>
                        </ThemeProvider>
                    </div>
                </div>
            </ThemeProvider>
        );
        let headingNode = themeProvider.find('.heading');
        let paragraphNode = themeProvider.find('.paragraph');

        expect(headingNode.getDOMNode().className).toContain('heading_theme_alfa-on-color');
        expect(paragraphNode.getDOMNode().className).toContain('paragraph_theme_alfa-on-white');
    });
});
