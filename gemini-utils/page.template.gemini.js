import Page from '../src/page';

import Header from '../src/header';
import Footer from '../src/footer';

import AppTitle from '../src/app-title';
import AppMenu from '../src/app-menu';
import AppContent from '../src/app-content';

import Heading from '../src/heading';
import Menu from '../src/menu';
import Paragraph from '../src/paragraph';

function createPageSuite(name) {
    geminiReact.suite(name, function (suite) {
        let props = { returnUrl: '/login', header: <Header />, footer: <Footer /> };
        let template = (
            <Page { ...props }>
                <AppTitle>
                    <Heading>Page title</Heading>
                </AppTitle>
                <AppMenu>
                    <Menu
                        view='horizontal'
                        content={ [
                            { content: 'Section 1', value: 'section1' },
                            { content: 'Section 2', value: 'section2' }
                        ] }
                    />
                </AppMenu>
                <AppContent>
                    <Paragraph>Page content</Paragraph>
                </AppContent>
            </Page>
        );

        suite
            .before(function (actions) {
                actions.executeJS(function () {
                    document.querySelector('[data-gemini-react]').id = 'react-app';
                });
            })
            .render(template)
            .capture('plain');
    });
}

export default createPageSuite;
