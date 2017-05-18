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


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| menu | Type.node |  |  | Меню в подвале |
| additional | Type.node | `'Сделано в Альфа-Лаборатории'`  |  | Дополнительный текст |
| social | Type.node | `null`  |  | Содержимое блока соц. сетей |
| showSocial | Type.bool | `true`  |  | Отображение блока соц. сетей |
| copyright | Type.node |  |  | Содержимое блока копирайта |
| showYears | Type.bool | `false`  |  | Отображение годов в копирайте |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |











