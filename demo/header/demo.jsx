import React from 'react';
import AppContent from '../../src/app-content';
import AppMenu from '../../src/app-menu';
import AppTitle from '../../src/app-title';
import Collapse from '../../src/collapse';
import Footer from '../../src/footer';
import Header from '../../src/header';
import Heading from '../../src/heading';
import Icon from '../../src/icon';
import { LOREM_IPSUM } from '../../src/vars';
import Menu from '../../src/menu';
import Page from '../../src/page';
import Paragraph from '../../src/paragraph';

import '../../src/main.css';
import './demo.css';

class Demo extends React.Component {
    state = {
        isTopContentClose: false
    };

    render() {
        return (
            <Page
                header={
                    <Header
                        topContent={ !this.state.isTopContentClose && this.renderTopContent() }
                        menu={
                            <Menu
                                view='horizontal'
                                content={ [
                                    { content: 'Раздел 1', value: 'section1' },
                                    { content: 'Раздел 2', value: 'section2' }
                                ] }
                            />
                        }
                        fixed={ true }
                    />
                }
                footer={ <Footer /> }
            >
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

    renderTopContent() {
        return (
            <div className='top-block'>
                <div className='top-block__inner'>
                    <div className='top-block__head'>
                        <Heading size='m'>Блок с произвольным контентом</Heading>
                        <Icon
                            className={ 'top-block__close' }
                            size='m'
                            icon='close'
                            onClick={ () => { this.setState({ isTopContentClose: true }); } }
                        />
                    </div>
                    <Collapse
                        collapsedLabel='Подробнее'
                        expandedLabel='Скрыть'
                    >
                        <Paragraph>
                            { LOREM_IPSUM.slice(0, 3) }
                        </Paragraph>
                    </Collapse>
                </div>
            </div>
        );
    }
}

export default Demo;
