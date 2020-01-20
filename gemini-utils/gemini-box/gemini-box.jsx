import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../../src/cn';

import ThemeProvider from '../../src/theme-provider';

require('./gemini-box.css');

/**
 * Компонент-помощник для тестирования gemini сьютов. Инвертирует бэкграунд, добавляет отступы.
 */
class GeminiBox extends React.PureComponent {
    cn = createCn('gemini-box');
    static propTypes = {
        /** Дочерние компоненты */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Стиль компоненты */
        style: Type.object, // eslint-disable-line react/forbid-prop-types
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Управление шириной. При значении 'available' растягивает элемент на ширину родителя */
        width: Type.oneOf(['default', 'available'])
    }

    render() {
        return (
            <div
                className={ this.cn({ width: this.props.width }) }
                style={ this.props.style }
            >
                <ThemeProvider theme={ this.props.theme }>
                    { this.props.children }
                </ThemeProvider>
            </div>
        );
    }
}

export default withTheme(GeminiBox);
