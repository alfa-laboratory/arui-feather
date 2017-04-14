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
| title | String | `'Произошла ошибка'`  |  | Заголовок ошибки |
| text | String | `'Пожалуйста, повторите операцию через некоторое время.'`  |  | Сообщение ошибки |
| header | Node |  |  | Шапка страницы |
| returnUrl | String |  |  | href для ссылки 'Вернуться в интернет-банк' |
| returnTitle | String | `'Вернуться в интернет-банк'`  |  | Альтернативный текст для ссылки 'Вернуться в интернет-банк' |











