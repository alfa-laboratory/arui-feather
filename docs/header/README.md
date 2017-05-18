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
| root | String | `'/'`  |  |  |
| logo | Node | `null`  |  | Содержимое кастомного логотипа в шапке |
| menu | Node |  |  | Содержимое меню в шапке |
| user | Node |  |  | Содержимое блока пользователя |
| support | Node |  |  | Содержимое блока контактов поддержки |
| topContent | Node |  |  | Произвольный контент над логотипом и меню |
| fixed | Boolean | `false`  |  | Управление возможностью фиксирования шапки к верхнему краю окна |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onResize | Function |  |  | Обработчик события изменение размера шапки |
| onLogoClick | Function |  |  | Обработчик события клика по логотипу Альфа-Банк |







## Типы






### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



