# Header

Компонент шапки сайта: лого, меню и пользовательский профиль.
Обычно используется совместно с компонентом `Page`.

```javascript
import Header from 'arui-feather/header';
```

## Примеры


```javascript
import Page from 'arui-feather/page';
import Header from 'arui-feather/header';
import Footer from 'arui-feather/footer';

<Page header={ <Header /> } footer={ <Footer /> }>
    Контент страницы...
</Page>
```



## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| root | Type.string | `'/'`  |  |  |
| logo | Type.node | `null`  |  | Содержимое кастомного логотипа в шапке |
| menu | Type.node |  |  | Содержимое меню в шапке |
| user | Type.node |  |  | Содержимое блока пользователя |
| support | Type.node |  |  | Содержимое блока контактов поддержки |
| topContent | Type.node |  |  | Произвольный контент над логотипом и меню |
| fixed | Type.bool | `false`  |  | Управление возможностью фиксирования шапки к верхнему краю окна |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onResize | Type.func |  |  | Обработчик события изменение размера шапки |
| onLogoClick | Type.func |  |  | Обработчик события клика по логотипу Альфа-Банк |











