import React from 'react';
import DemoSection from '../demo-section';
import Footer from '../../src/footer/footer';
import Menu from '../../src/menu/menu';
import ThemeProvider from '../../src/theme-provider/theme-provider';

const MENU_ITEMS = [
    {
        type: 'item',
        content: 'Сайт Альфа-Банка',
        value: 'MAIN',
        props: {
            url: '#',
            type: 'link',
            target: '_blank'
        }
    },
    {
        type: 'item',
        content: 'Обратная связь',
        value: 'FEEDBACK',
        props: {
            url: '#',
            type: 'link',
            target: '_blank'
        }
    },
    {
        type: 'item',
        content: 'Справка',
        value: 'HELP',
        props: {
            url: '#',
            type: 'link',
            target: '_blank'
        }
    },
    {
        type: 'item',
        content: 'Мобильный банк',
        value: 'MOBILE',
        props: {
            url: '#',
            type: 'link',
            target: '_blank'
        }
    }
];

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <Footer />
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <Footer showYears={ true } />
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <Footer showSocial={ false } showYears={ true } />
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <Footer
                            additional={ <div>Сделано в Альфа-Лаборатории</div> }
                            showSocial={ false }
                            showYears={ true }
                            menu={
                                <Menu
                                    view='horizontal'
                                    size='m'
                                    content={ MENU_ITEMS }
                                />
                            }
                        />
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <Footer
                            additional={ <div>Сделано в Альфа-Лаборатории</div> }
                            menu={
                                <Menu
                                    view='horizontal'
                                    size='m'
                                    content={ MENU_ITEMS }
                                />
                            }
                        />
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <Footer
                            additional={ <div>Сделано в Альфа-Лаборатории</div> }
                            showYears={ true }
                            menu={
                                <Menu
                                    view='horizontal'
                                    size='m'
                                    content={ MENU_ITEMS }
                                />
                            }
                        />
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
