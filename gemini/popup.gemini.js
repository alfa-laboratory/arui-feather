import React from 'react';
import Type from 'prop-types';

import Button from '../src/button';
import Paragraph from '../src/paragraph';
import Popup from '../src/popup';
import PopupContainerProvider from '../src/popup-container-provider';
import ThemeProvider from '../src/theme-provider';
import { LOREM_IPSUM } from '../src/vars';

const NAME = 'popup';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {
        directions: ['top-center', 'bottom-left'],
        type: 'tooltip'
    },
    {
        directions: ['right-center', 'right-top', 'right-bottom'],
        type: 'tooltip',
        mainOffset: 13
    },
    {
        target: 'position'
    }
];

class TestButtonPopup extends React.Component {
    static propTypes = {
        target: Type.oneOf(['anchor', 'position']),
        size: Type.oneOf(['s', 'm', 'l', 'xl'])
    };

    target;
    popup;

    componentDidMount() {
        if (this.props.target === 'position') {
            this.popup.setPosition(100, 100);
        } else {
            this.popup.setTarget(this.target.getNode());
        }
    }

    render() {
        return (
            <div style={ { display: 'inline-block' } }>
                <Button
                    ref={ (target) => {
                        this.target = target;
                    } }
                    size={ this.props.size }
                    theme='alfa-on-white'
                >
                    Button
                </Button>
                <Popup
                    ref={ (popup) => {
                        this.popup = popup;
                    } }
                    visible={ true }
                    { ...this.props }
                >
                    { `Popup ${
                        this.props.target === 'position'
                            ? 'with position 100px 100px'
                            : ''
                    }` }
                </Popup>
            </div>
        );
    }
}

// eslint-disable-next-line react/no-multi-comp
class TestButtonPopupContainer extends React.Component {
    render() {
        return (
            <PopupContainerProvider style={ { width: 500, background: '#efefef' } }>
                <Paragraph>
                    { LOREM_IPSUM.slice(0, 3) }
                </Paragraph>
            </PopupContainerProvider>
        );
    }
}

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;
        const providerSelector = `${themeSelector}.${NAME}_container-provider`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, (suite) => {
                    const props = { theme, size, ...set };
                    const template = (
                        <ThemeProvider theme={ theme }>
                            <TestButtonPopup { ...props } />
                        </ThemeProvider>
                    );

                    suite
                        .setExtraCaptureElements([`.${NAME}`])
                        .render(template)
                        .capture('plain');
                });
            });
        });

        geminiReact.suite(providerSelector, (suite) => {
            const template = (
                <ThemeProvider theme={ theme }>
                    <TestButtonPopupContainer />
                </ThemeProvider>
            );

            suite
                .render(template)
                .capture('plain');
        });
    });
});
