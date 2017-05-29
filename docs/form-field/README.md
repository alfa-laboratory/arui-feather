# FormField

Компонент поля формы: cодержит заголовок контрола и сам контрол.
Контрол должен быть передан дочерним компонентов.

```javascript
import FormField from 'arui-feather/form-field';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Array.<Node>\|Node |  |  | Дочерние элементы `FormField` |
| label | Node |  |  | Заголовок для контрола |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| view | String |  |  | Расположение элемента label: 'line' |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы






### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



