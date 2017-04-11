# Form

Компонент формы.

```javascript
import Form from 'arui-feather/form';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| enctype | Type.oneOf(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']) | `'application/x-www-form-urlencoded'`  |  | Способ кодирования данных формы при их отправке |
| action | Type.string | `'/'`  |  | Адрес отправки данных на сервер |
| method | Type.oneOf(['post', 'get']) | `'post'`  |  | Метод запроса |
| view | Type.oneOf(['line', 'normal']) |  |  | Тип формы |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| footer | Type.node |  |  | Футер для формы |
| noValidate | Type.bool | `false`  |  | Управление встроенным в браузер механизмом валидации формы |
| autocomplete | Type.bool | `true`  |  | Управление автозаполнением формы |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы формы |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| id | Type.string |  |  | Идентификатор компонента в DOM |
| name | Type.string |  |  | Имя компонента в DOM |
| onSubmit | Type.func |  |  | Обработчик отправки формы |











