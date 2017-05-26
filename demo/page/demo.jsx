import React from 'react';
import AppContent from '../../src/app-content';
import AppMenu from '../../src/app-menu';
import AppTitle from '../../src/app-title';
import Footer from '../../src/footer';
import Header from '../../src/header';
import Heading from '../../src/heading';
import Menu from '../../src/menu';
import Page from '../../src/page';
import Paragraph from '../../src/paragraph';

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
                            { content: 'Раздел 2', value: 'section2' }
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
