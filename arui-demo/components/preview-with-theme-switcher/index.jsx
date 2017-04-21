import React from 'react';
import Type from 'prop-types';
import ThemeProvider from '../../../src/theme-provider/theme-provider';
import cn from '../../../src/cn';
import './index.css';

@cn('preview-with-theme-switcher')
class PreviewWithThemeSwitcher extends React.Component {
    static propTypes = {
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node])
    };

    state = {
        theme: 'alfa-on-white'
    }

    handleOnChange = (theme) => {
        this.setState({ theme });
    }

    render(cn) {
        const themes = [
            {
                text: 'Светлая',
                value: 'alfa-on-white',
                demoSectionPrefix: 'alfa-on-color',
                themeProviderPrefix: 'alfa-on-white'
            }, {
                text: 'Темная',
                value: 'alfa-on-color',
                demoSectionPrefix: 'alfa-on-white',
                themeProviderPrefix: 'alfa-on-color'
            }
        ];
        const activeTheme = themes.filter(theme => theme.value === this.state.theme)[0];
        return (
            <div className={ cn('') }>
                <div className={ cn(activeTheme.demoSectionPrefix) }>
                    <ThemeProvider theme={ activeTheme.themeProviderPrefix }>
                        <div>
                            <div className={ cn('button-group') } >
                                {themes.map(({ value: theme, text }) => (
                                    <button
                                        key={ theme }
                                        className={ cn('button') }
                                        onClick={ () => this.handleOnChange(theme) }
                                    >
                                        { text }
                                    </button>
                                ))}
                            </div>
                            {this.props.children}
                        </div>
                    </ThemeProvider>
                </div>
            </div>
        );
    }
}
export default PreviewWithThemeSwitcher;
