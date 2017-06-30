import React from 'react';
import Heading from '../src/heading';
import Label from '../src/label';
import Select from '../src/select';
import ThemeProvider from '../src/theme-provider';

import cn from '../src/cn';
import './demo.css';

@cn('demo')
class Demo extends React.Component {
    state = {
        component: window.location.hash && window.location.hash.substring(1),
        componentsList: process.COMPONENTS || []
    };

    render(cn) {
        return (
            <div className={ cn }>
                <div className={ cn('layout') }>
                    {
                        this.state.component &&
                        <iframe
                            className={ cn('iframe') }
                            src={ `${this.state.component}/index.html` }
                            width='100%'
                            height='100%'
                            frameBorder='0'
                        />
                    }
                </div>
                <div className={ cn('menu') }>
                    <div className={ cn('menu-desktop') }>
                        <ThemeProvider theme='alfa-on-white'>
                            <div>
                                <Heading size='l'>ARUI Feather</Heading>
                                <ul className={ cn('menu-items') }>
                                    { this.state.componentsList.map(component =>
                                        <li
                                            key={ component }
                                            className={ cn('menu-item') }
                                        >
                                            <a
                                                href={ `#${component}` }
                                                onClick={ (event) => {
                                                    event.preventDefault();
                                                    this.setState({ component });
                                                } }
                                            >
                                                { component }
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </ThemeProvider>
                    </div>
                    <div className={ cn('menu-mobile') }>
                        <ThemeProvider theme='alfa-on-white'>
                            <div>
                                <div className={ cn('menu-mobile-item') }>
                                    <Label size='m'>ARUI Feather</Label>
                                </div>
                                <div className={ cn('menu-mobile-item') }>
                                    <Select
                                        size='s'
                                        mode='radio-check'
                                        placeholder='Выберите компонент'
                                        checkedItems={ [this.state.component] }
                                        options={
                                            this.state.componentsList.map(component =>
                                                ({
                                                    value: component,
                                                    text: component
                                                })
                                            )
                                        }
                                        onOptionCheck={ (items) => {
                                            this.setState({ component: items[0] });
                                            window.location.href = `#${items[0]}`;
                                        } }
                                    />
                                </div>
                            </div>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default Demo;
