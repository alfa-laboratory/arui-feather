import React from 'react';
import DemoSection from '../demo-section';
import Label from '../../src/label/label';
import ThemeProvider from '../../src/theme-provider/theme-provider';

import cn from '../../src/cn';
import './demo.css';

@cn('demo')
class Demo extends React.Component {
    render(cn) {
        return (
            <div className={ cn }>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div>
                                <Label size='s'>Лейбл</Label>
                                <div className={ cn('ellipsis-box') }>
                                    <Label size='s' isNoWrap={ true }>
                                        Очень длинная срока, которую необходимо скыть за тремя точками
                                    </Label>
                                </div>
                            </div>
                            <div>
                                <Label size='m'>Лейбл</Label>
                                <div className={ cn('ellipsis-box') }>
                                    <Label size='m' isNoWrap={ true }>
                                        Очень длинная срока, которую необходимо скыть за тремя точками
                                    </Label>
                                </div>
                            </div>
                            <div>
                                <Label size='l'>Лейбл</Label>
                                <div className={ cn('ellipsis-box') }>
                                    <Label size='l' isNoWrap={ true }>
                                        Очень длинная срока, которую необходимо скыть за тремя точками
                                    </Label>
                                </div>
                            </div>
                            <div>
                                <Label size='xl'>Лейбл</Label>
                                <div className={ cn('ellipsis-box') }>
                                    <Label size='xl' isNoWrap={ true }>
                                        Очень длинная срока, которую необходимо скыть за тремя точками
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div>
                                <Label size='s'>Лейбл</Label>
                                <div className={ cn('ellipsis-box') }>
                                    <Label size='s' isNoWrap={ true }>
                                        Очень длинная срока, которую необходимо скыть за тремя точками
                                    </Label>
                                </div>
                            </div>
                            <div>
                                <Label size='m'>Лейбл</Label>
                                <div className={ cn('ellipsis-box') }>
                                    <Label size='m' isNoWrap={ true }>
                                        Очень длинная срока, которую необходимо скыть за тремя точками
                                    </Label>
                                </div>
                            </div>
                            <div>
                                <Label size='l'>Лейбл</Label>
                                <div className={ cn('ellipsis-box') }>
                                    <Label size='l' isNoWrap={ true }>
                                        Очень длинная срока, которую необходимо скыть за тремя точками
                                    </Label>
                                </div>
                            </div>
                            <div>
                                <Label size='xl'>Лейбл</Label>
                                <div className={ cn('ellipsis-box') }>
                                    <Label size='xl' isNoWrap={ true }>
                                        Очень длинная срока, которую необходимо скыть за тремя точками
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
