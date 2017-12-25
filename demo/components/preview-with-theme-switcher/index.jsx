/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Component } from 'react';
import Type from 'prop-types';
import { autobind } from 'core-decorators';
import ThemeProvider from '../../../src/theme-provider';
import cn from '../../../src/cn';
import './index.css';

const LIGHT_THEME = 'alfa-on-white';
const DARK_THEME = 'alfa-on-color';

@cn('preview-with-theme-switcher')
class PreviewWithThemeSwitcher extends Component {
    static propTypes = {
        children: Type.node
    };

    state = {
        theme: LIGHT_THEME
    }

    render(cn) {
        const themes = [LIGHT_THEME, DARK_THEME];
        return (
            <ThemeProvider theme={ this.state.theme } >
                <div>
                    <div className={ cn('button-group') } >
                        {
                            themes.map(theme => (
                                <button
                                    key={ theme }
                                    className={ cn('button', { theme, selected: theme === this.state.theme }) }
                                    onClick={ () => this.handleOnChange(theme) }
                                />
                            ))
                        }
                    </div>
                    <div className={ cn('layout', { theme: this.state.theme }) } >
                        <div className={ cn('wrapper') }>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        );
    }

    @autobind
    handleOnChange(theme) {
        this.setState({ theme });
    }
}
export default PreviewWithThemeSwitcher;
