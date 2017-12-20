import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import SlideDown from '../src/slide-down';

const NAME = 'slide-down';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

const PROP_SETS = [
    {
        isExpanded: true
    },
    {
        isExpanded: false,
        minCollapsedHeight: 15
    },
    {
        isExpanded: false,
        minCollapsedHeight: 15,
        snapSide: 'top'
    },
    {
        isExpanded: false,
        minCollapsedHeight: 15,
        snapSide: 'bottom'
    }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            let selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, (suite) => {
                let props = { theme, ...set };
                let template = (
                    <GeminiBox theme={ theme }>
                        <SlideDown { ...props }>
                            <div style={ { fontSize: 16, lineHeight: 20 } }>
                                <span>Test top</span>
                                <br />
                                <span>Test</span>
                                <br />
                                <span>Test bottom</span>
                            </div>
                        </SlideDown>
                    </GeminiBox>
                );

                suite.render(template).capture('plain');
            });
        });
    });
});
