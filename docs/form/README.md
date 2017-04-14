# Form

Компонент формы.

```javascript
import Form from 'arui-feather/form';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| enctype | [EnctypeEnum](#EnctypeEnum) | `'application/x-www-form-urlencoded'`  |  | Способ кодирования данных формы при их отправке |
| action | String | `'/'`  |  | Адрес отправки данных на сервер |
| method | [MethodEnum](#MethodEnum) | `'post'`  |  | Метод запроса |
| view | [ViewEnum](#ViewEnum) |  |  | Тип формы |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| footer | Node |  |  | Футер для формы |
| noValidate | Boolean | `false`  |  | Управление встроенным в браузер механизмом валидации формы |
| autocomplete | Boolean | `true`  |  | Управление автозаполнением формы |
| children | Array.<Node>\|Node |  |  | Дочерние элементы формы |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| id | String |  |  | Идентификатор компонента в DOM |
| name | String |  |  | Имя компонента в DOM |
| onSubmit | Function |  |  | Обработчик отправки формы |







## Типы






### <a id="EnctypeEnum"></a>EnctypeEnum

 * `'application/x-www-form-urlencoded'`
 * `'multipart/form-data'`
 * `'text/plain'`


### <a id="MethodEnum"></a>MethodEnum

 * `'post'`
 * `'get'`


### <a id="ViewEnum"></a>ViewEnum

 * `'line'`
 * `'normal'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



