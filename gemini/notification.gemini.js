import Icon from '../src/icon/fantasy';
import Notification from '../src/notification/fantasy';
import ThemeProvider from '../src/theme-provider';

const NAME = 'notification';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

const PROP_SETS = [
    {
        visible: true,
        status: 'ok',
        offset: 10,
        title: 'Notification title'
    },
    {
        visible: true,
        status: 'fail',
        offset: 100,
        stickTo: 'right'
    },
    {
        visible: true,
        status: 'error',
        offset: 190
    },
    {
        visible: true,
        icon: <Icon name='search' theme='alfa-on-color' size='m' />,
        status: 'ok',
        stickTo: 'right',
        offset: 10
    }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            let selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, function (suite) {
                let props = { theme, ...set };
                let template = (
                    <ThemeProvider theme={ theme }>
                        <Notification { ...props }>
                            Notification message
                        </Notification>
                    </ThemeProvider>
                );

                suite
                    .setExtraCaptureElements(['.notification'])
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
