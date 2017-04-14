# AppMenu

Компонент меню страницы.
Обычно используется совместно с компонентом `Page`.

```javascript
import AppMenu from 'arui-feather/app-menu';
```

## Примеры


```javascript
import Page from 'arui-feather/page';
import Header from 'arui-feather/header';
import Footer from 'arui-feather/footer';

import AppTitle from 'arui-feather/app-title';
import AppMenu from 'arui-feather/app-menu';
import AppContent from 'arui-feather/app-content';

import Heading from 'arui-feather/heading';
import Menu from 'arui-feather/menu';
import Paragraph from 'arui-feather/paragraph';

<Page header={ <Header /> } footer={ <Footer /> }>
    <AppTitle>
        <Heading>Заголовок страницы</Heading>
    </AppTitle>
    <AppMenu>
        <Menu />
    </AppMenu>
    <AppContent>
        <Paragraph>Контент страницы...</Paragraph>
    </AppContent>
</Page>
```



## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Array.<Node>\|Node |  |  | Дочерние элементы `AppMenu` |
| className | Function\|String |  |  | Дополнительный класс |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |







## Типы






### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



