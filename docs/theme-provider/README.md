# ThemeProvider

Компонент задающий тему для своих дочерних компонентов.
Важно! Может содержать в себе строго один дочерний компонент.

```javascript
import ThemeProvider from 'arui-feather/theme-provider';
```

## Примеры


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



## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Type.node |  |  | Дочерний элемент `ThemeProvider` |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-colored', 'alfa-on-white']) |  |  | Тема компонента |











