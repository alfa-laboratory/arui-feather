
import { Component, ReactNode } from 'react';

export type ThemeProviderClassNameFieldType = Function | string;
export type ThemeProviderThemeFieldType = 'alfa-on-color' | 'alfa-on-colored' | 'alfa-on-white';


export interface ThemeProviderProps {

    /**
     * Дочерний элемент `ThemeProvider`
     */
    children?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: ThemeProviderClassNameFieldType;
    /**
     * Тема компонента
     */
    theme?: ThemeProviderThemeFieldType;
}



/**
 * Компонент задающий тему для своих дочерних компонентов.
Важно! Может содержать в себе строго один дочерний компонент.

@example
```javascript
import ThemeProvider from 'arui-feather/theme-provider';
import Page from 'arui-feather/page';
import Heading from 'arui-feather/heading';

<ThemeProvider theme="alfa-on-color">
<Page>
  <Heading>Заголовок страницы</Heading>
  <div style={{ background: "white" }}>
      <ThemeProvider theme="alfa-on-white">
          Врезка белого цвета на странице...
      </ThemeProvider>
  </div>
</Page>
</ThemeProvider>
```
 */

export default class ThemeProvider extends Component<ThemeProviderProps, any> {

}
