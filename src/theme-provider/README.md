```jsx
import ThemeProvider from 'arui-feather/theme-provider';
import Heading from 'arui-feather/heading';

<ThemeProvider theme='alfa-on-color'>
    <div style={ { background: 'black', height: '200px' } }>
        <Heading>Заголовок страницы</Heading>
        <div style={ { background: 'white' } }>
            <ThemeProvider theme='alfa-on-white'>
                <span>Врезка белого цвета на странице...</span>
            </ThemeProvider>
        </div>
    </div>
</ThemeProvider>
```
