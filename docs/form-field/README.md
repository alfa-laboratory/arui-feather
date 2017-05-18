# FormField

Компонент поля формы: cодержит заголовок контрола и сам контрол.
Контрол должен быть передан дочерним компонентов.

```javascript
import FormField from 'arui-feather/form-field';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `FormField` |
| label | Type.node |  |  | Заголовок для контрола |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| view | Type.string |  |  | Расположение элемента label: 'line' |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |











