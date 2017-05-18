# Support

Компонент с информацией о поддержке для клиентов.
Включает в себя город и телефон.

```javascript
import Support from 'arui-feather/support';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| city | Type.string |  |  | Название города |
| phone | Type.string |  |  | Номер телефона |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onCityClick | Type.func |  |  | Обработчик клика по городу |
| onPhoneClick | Type.func |  |  | Обработчик клика по телефону |











