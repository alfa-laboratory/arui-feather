import React from 'react';
import Type from 'prop-types';
import { autobind } from 'core-decorators';
import ThemeProvider from '../../../src/theme-provider/theme-provider';
import cn from '../../../src/cn';
import './index.css';

const lightTheme = 'alfa-on-white';
const darkTheme = 'alfa-on-color';

@cn('preview-with-theme-switcher')
class PreviewWithThemeSwitcher extends React.Component {
    static propTypes = {
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node])
    };
    state = {
        theme: lightTheme
    }
    render(cn) {
        const themes = [lightTheme, darkTheme];
        return (
            <div>
                <div className={ cn('button-group') } >
                    {themes.map(theme => (
                        <button
                            key={ theme }
                            className={ cn('button') }
                            onClick={ () => this.handleOnChange(theme) }
                        >
                            { this.renderThemeText(theme) }
                        </button>
                    ))}
                </div>
                <div className={ cn('layout', { theme: this.state.theme }) } >
                    <ThemeProvider theme={ this.state.theme } >
                        <div className={ cn('wrapper') }>
                            {this.props.children}
                        </div>
                    </ThemeProvider>
                </div>
            </div>
        );
    }

    renderThemeText(theme) {
        return theme === lightTheme ? 'светлая' : 'темная';
    }

    @autobind
    handleOnChange(theme) {
        this.setState({ theme });
    }
}
export default PreviewWithThemeSwitcher;
