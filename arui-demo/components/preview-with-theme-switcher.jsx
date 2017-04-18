import React from 'react';
import DemoSection from '../../demo/demo-section';
import ThemeProvider from '../../src/theme-provider/theme-provider';
import Radio from '../../src/radio/radio';
import RadioGroup from '../../src/radio-group/radio-group';
import FeatherComponent from '../../src/feather/feather';


class PreviewWithThemeSwitcher extends FeatherComponent {
    state = {
        theme: 'alfa-on-white'
    }
    render() {
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
            }, {
                text: 'Цветная',
                value: 'alfa-on-colored',
                demoSectionPrefix: 'alfa-on-white',
                themeProviderPrefix: 'alfa-on-colored'
            }
        ];
        const activeTheme = themes.filter(theme => theme.value === this.state.theme)[0];
        return (
            <div>
                <DemoSection theme={ activeTheme.demoSectionPrefix }>
                    <ThemeProvider theme={ activeTheme.themeProviderPrefix }>
                        <div>
                            <div
                                style={ {
                                    position: 'absolute',
                                    top: '15px'
                                } }
                            >
                                <RadioGroup type='button' value={ this.state.theme }>
                                    {themes.map(radio => (
                                        <Radio
                                            text={ radio.text }
                                            key={ radio.value }
                                            value={ radio.value }
                                            size={ 's' }
                                            type='button'
                                            onChange={ (theme) => {
                                                this.setState({ theme });
                                            } }
                                        />
                                        ))}
                                </RadioGroup>
                            </div>
                            {this.props.children}
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}
export default PreviewWithThemeSwitcher;
