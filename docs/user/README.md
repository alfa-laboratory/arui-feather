# User

Компонент доступа к пользовательскому профилю: cодержит имя пользователя и кнопку "Выйти".

```javascript
import User from 'arui-feather/user';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| icon | Type.node |  |  | Иконка пользователя |
| text | Type.string |  |  | Имя пользователя |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| url | Type.string | `'#'`  |  | href ссылки с именем пользователя |
| onClick | Type.func |  |  | Обработчик клика по пользователю |











