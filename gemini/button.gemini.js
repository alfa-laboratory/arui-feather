import React from 'react';
import Button from '../src/button';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import { OkIcon } from '../gemini-utils/ok-icon';

const NAME = 'button';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {},
    { view: 'action' },
    { view: 'extra' },
    { pseudo: true },
    { disabled: true },
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS
                .concat([{ icon: <OkIcon size={ size } /> }])
                .forEach((set, index) => {
                    const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                    geminiReact.suite(selector, (suite) => {
                        const props = { theme, size, ...set };
                        const template = (
                            <GeminiBox theme={ theme }>
                                <Button { ...props }>
                                    Button
                                </Button>
                            </GeminiBox>
                        );

                        if (set.disabled) {
                            suite
                                .render(template)
                                .capture('plain');
                        } else {
                            suite
                                .render(template)
                                .capture('plain')
                                .capture('hovered', function (actions) {
                                    actions.mouseMove(this.renderedComponent);
                                })
                                .capture('pressed', function (actions) {
                                    actions.mouseDown(this.renderedComponent);
                                });
                        }
                    });
                });
        });
    });
});
