# Page

Компонент страницы.
Как правило является корневым компонентов страницы.
Обычно используется совместно с компонентами `Header`, `Footer`
и компонентами `AppTitle`, `AppMenu` и `AppContent`.

```javascript
import Page from 'arui-feather/page';
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
| header | Type.node |  |  | Шапка страницы |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `Page` |
| footer | Type.node |  |  | Футер страницы |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |











