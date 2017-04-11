import React from 'react';
import AppContent from '../../src/app-content/app-content';
import AppMenu from '../../src/app-menu/app-menu';
import AppTitle from '../../src/app-title/app-title';
import Footer from '../../src/footer/footer';
import Header from '../../src/header/header';
import Heading from '../../src/heading/heading';
import Menu from '../../src/menu/menu';
import Page from '../../src/page/page';
import Paragraph from '../../src/paragraph/paragraph';

import '../../src/main.css';

class Demo extends React.Component {
    render() {
        return (
            <Page header={ <Header /> } footer={ <Footer /> }>
                <AppTitle>
                    <Heading>Заголовок страницы</Heading>
                </AppTitle>
                <AppMenu>
                    <Menu
                        view='horizontal'
                        content={ [
                            { content: 'Раздел 1', value: 'section1' },
                            { content: 'Раздел 2', value: 'section2' },
                            { content: 'Раздел 3', value: 'section3' },
                            { content: 'Раздел 4', value: 'section4' },
                            { content: 'Раздел 5', value: 'section5' },
                            { content: 'Раздел 6', value: 'section6' }
                        ] }
                    />
                </AppMenu>
                <AppContent>
                    <Paragraph>Контент страницы...</Paragraph>
                </AppContent>
            </Page>
        );
    }
}

export default Demo;
