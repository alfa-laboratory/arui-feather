# ErrorPage

Компонент страницы ошибки.
Как правило является корневым компонентом страницы.
Используется вместо компонента Page.

```javascript
import ErrorPage from 'arui-feather/error-page';
import Header from 'arui-feather/header';

<ErrorPage
     returnUrl='/login'
     header={ <Header /> }
/>
```

```javascript
import ErrorPage from 'arui-feather/error-page';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| title | Type.string | `'Произошла ошибка'`  |  | Заголовок ошибки |
| text | Type.string | `'Пожалуйста, повторите операцию через некоторое время.'`  |  | Сообщение ошибки |
| header | Type.node |  |  | Шапка страницы |
| returnUrl | Type.string |  |  | href для ссылки 'Вернуться в интернет-банк' |
| returnTitle | Type.string | `'Вернуться в интернет-банк'`  |  | Альтернативный текст для ссылки 'Вернуться в интернет-банк' |











