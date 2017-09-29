/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import ThemeProvider from './theme-provider';
import Button from '../button/button';
import Heading from '../heading/heading';
import Paragraph from '../paragraph/paragraph';

describe('theme-provider', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let themeProvider = render(<ThemeProvider><div>Render-test</div></ThemeProvider>);

        expect(themeProvider.node).to.exist;
    });

    it('should render child', () => {
        let themeProvider = render(<ThemeProvider><div>Render-test</div></ThemeProvider>);

        expect(themeProvider.node.tagName).to.equal('DIV');
        expect(themeProvider.node).to.have.text('Render-test');
    });

    it('should render Button with `alfa-on-color` theme', () => {
        let themeProvider = render(
            <ThemeProvider theme='alfa-on-color'>
                <Button>Render-test</Button>
            </ThemeProvider>
        );

        expect(themeProvider.node).to.have.class('button_theme_alfa-on-color');
    });

    it('should render children with redefinition theme', () => {
        let themeProvider = render(
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
        let headingNode = themeProvider.node.querySelector('.heading');
        let paragraphNode = themeProvider.node.querySelector('.paragraph');

        expect(themeProvider.node).to.have.class('page_theme_alfa-on-color');
        expect(headingNode).to.have.class('heading_theme_alfa-on-color');
        expect(paragraphNode).to.have.class('paragraph_theme_alfa-on-white');
    });
});
