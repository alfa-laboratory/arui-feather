# Footer

Компонент подвала сайта.
Обычно используется совместно с компонентом `Page`.

```javascript
import Footer from 'arui-feather/footer';
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


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| menu | Node |  |  | Меню в подвале |
| additional | Node | `'Сделано в Альфа-Лаборатории'`  |  | Дополнительный текст |
| social | Node | `null`  |  | Содержимое блока соц. сетей |
| showSocial | Boolean | `true`  |  | Отображение блока соц. сетей |
| copyright | Node |  |  | Содержимое блока копирайта |
| showYears | Boolean | `false`  |  | Отображение годов в копирайте |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы






### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



