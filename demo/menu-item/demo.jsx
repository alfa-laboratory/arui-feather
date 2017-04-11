import React from 'react';
import DemoSection from '../demo-section';
import MenuItem from '../../src/menu-item/menu-item';
import ThemeProvider from '../../src/theme-provider/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div>
                                <MenuItem size='s' link='#1'>MenuItem</MenuItem>
                                <MenuItem size='m' link='#2'>MenuItem</MenuItem>
                                <MenuItem size='l' link='#3'>MenuItem</MenuItem>
                                <MenuItem size='xl' link='#4'>MenuItem</MenuItem>
                            </div>
                            <div>
                                <MenuItem size='s' checked={ true }>MenuItem checked</MenuItem>
                                <MenuItem size='m' checked={ true }>MenuItem checked</MenuItem>
                                <MenuItem size='l' checked={ true }>MenuItem checked</MenuItem>
                                <MenuItem size='xl' checked={ true }>MenuItem checked</MenuItem>
                            </div>
                            <div>
                                <MenuItem size='s' disabled={ true }>MenuItem disabled</MenuItem>
                                <MenuItem size='m' disabled={ true }>MenuItem disabled</MenuItem>
                                <MenuItem size='l' disabled={ true }>MenuItem disabled</MenuItem>
                                <MenuItem size='xl' disabled={ true }>MenuItem disabled</MenuItem>
                            </div>
                            <div>
                                <MenuItem size='s' view='pseudo'>MenuItem pseudo</MenuItem>
                                <MenuItem size='m' view='pseudo'>MenuItem pseudo</MenuItem>
                                <MenuItem size='l' view='pseudo'>MenuItem pseudo</MenuItem>
                                <MenuItem size='xl' view='pseudo'>MenuItem pseudo</MenuItem>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div>
                                <MenuItem
                                    type='dropdown'
                                    size='s'
                                    popup='Popup'
                                >
                                    MenuItem Dropdown
                                </MenuItem>
                                <MenuItem
                                    type='dropdown'
                                    size='m'
                                    popup='Popup'
                                >
                                    MenuItem Dropdown
                                </MenuItem>
                                <MenuItem
                                    type='dropdown'
                                    size='l'
                                    popup='Popup'
                                >
                                    MenuItem Dropdown
                                </MenuItem>
                                <MenuItem
                                    type='dropdown'
                                    size='xl'
                                    popup='Popup'
                                >
                                    MenuItem Dropdown
                                </MenuItem>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
