import React from 'react';
import Type from 'prop-types';

import ThemeProvider from '../../src/theme-provider/theme-provider';
import cn from '../../src/cn';

require('./gemini-box.css');

/**
 * Компонент-помощник для тестирования gemini сьютов. Инвертирует бэкграунд, добавляет отступы.
 */
@cn('gemini-box')
class GeminiBox extends React.Component {
    static propTypes = {
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Управление шириной. При значении 'available' растягивает элемент на ширину родителя */
        width: Type.oneOf(['default', 'available'])
    }

    render(cn) {
        return (
            <div
                className={ cn({ width: this.props.width }) }
                style={ this.props.style }
            >
                <ThemeProvider theme={ this.props.theme }>
                    { this.props.children }
                </ThemeProvider>
            </div>
        );
    }
}

export default GeminiBox;
