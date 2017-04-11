import Header from '../src/header/header';
import Menu from '../src/menu/menu';
import Page from '../src/page/page';

const NAME = 'header';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;
        let template = (
            <Page
                theme={ theme }
                header={
                    <Header
                        menu={
                            <Menu
                                view='horizontal'
                                content={ [
                                    { content: 'Section 1', value: 'section1' },
                                    { content: 'Section 2', value: 'section2' }
                                ] }
                            />
                        }
                        fixed={ true }
                    />
                }
            />
        );

        geminiReact.suite(selector, function (suite) {
            suite
                .before(function (actions) {
                    actions.executeJS(function () {
                        document.body.firstElementChild.id = 'react-app';
                    });
                })
                .setExtraCaptureElements(['body'])
                .render(template)
                .capture('plain');
        });
    });
});
