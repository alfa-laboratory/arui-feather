import React from 'react';
import { createCn } from 'bem-react-classname';

import { withTheme } from '../../src/cn';
import ThemeProvider from '../../src/theme-provider';

import './gemini-box.css';

type GeminiBoxProps = {
    /**
     * Управление шириной. При значении 'available' растягивает элемент на ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Стиль компонента
     */
    style?: React.CSSProperties;

    /**
     * Дочерние компоненты
     */
    children: React.ReactNode;
}

/**
 * Компонент-помощник для тестирования gemini сьютов. Инвертирует бэкграунд, добавляет отступы.
 */
class GeminiBox extends React.PureComponent<GeminiBoxProps> {
    protected cn = createCn('gemini-box');

    render() {
        const { width, style, theme, children } = this.props;

        return (
            <div
                className={ this.cn({ width }) }
                style={ style }
            >
                <ThemeProvider theme={ theme }>
                    { children }
                </ThemeProvider>
            </div>
        );
    }
}

export default withTheme<GeminiBoxProps, GeminiBox>(GeminiBox);
