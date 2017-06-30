import React from 'react';
import DemoSection from '../demo-section';
import Link from '../../src/link';
import ThemeProvider from '../../src/theme-provider';

import Icon from '../../src/icon';

import './demo.css';

const SIZES = ['s', 'm', 'l', 'xl'];

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div>
                                { this.renderLinks('Link') }
                            </div>
                            <div>
                                { this.renderLinks('Disabled link', 'disabled') }
                            </div>
                            <div>
                                { this.renderLinks('Checked link', 'checked') }
                            </div>
                            <div>
                                { this.renderLinks('Pseudo link', 'pseudo') }
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div>
                                { this.renderLinksIcon('Link') }
                            </div>
                            <div>
                                { this.renderLinksIcon('Disabled link', 'disabled') }
                            </div>
                            <div>
                                { this.renderLinks('Checked link', 'checked') }
                            </div>
                            <div>
                                { this.renderLinksIcon('Pseudo link', 'pseudo') }
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div>
                                { this.renderLinks('Link') }
                            </div>
                            <div>
                                { this.renderLinks('Disabled link', 'disabled') }
                            </div>
                            <div>
                                { this.renderLinks('Checked link', 'checked') }
                            </div>
                            <div>
                                { this.renderLinks('Pseudo link', 'pseudo') }
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div>
                                { this.renderLinksIcon('Link') }
                            </div>
                            <div>
                                { this.renderLinksIcon('Disabled link', 'disabled') }
                            </div>
                            <div>
                                { this.renderLinks('Checked link', 'checked') }
                            </div>
                            <div>
                                { this.renderLinksIcon('Pseudo link', 'pseudo') }
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    renderLinks(text, mod = '') {
        return (
            SIZES.map((size) => {
                let props = {
                    size,
                    text,
                    [mod]: true
                };

                return (
                    <span className='layout'>
                        <Link { ...props } />
                    </span>
                );
            })
        );
    }

    renderLinksIcon(text, mod = '') {
        return (
            SIZES.map((size) => {
                let props = {
                    size,
                    text,
                    [mod]: true
                };

                return (
                    <span className='layout'>
                        <Link { ...props } >
                            <Icon { ...props } icon='ok' className='icon_link-demo' />
                        </Link>
                    </span>
                );
            })
        );
    }
}

export default Demo;
