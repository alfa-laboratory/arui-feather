# RadioGroup

Компонент группы радио-кнопок.

```javascript
import RadioGroup from 'arui-feather/radio-group';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| type | [TypeEnum](#TypeEnum) | `'normal'`  |  | Тип группы кнопок |
| value | String |  |  | Значение выбранной радио-кнопки |
| error | Node |  |  | Отображение попапа с ошибкой в момент когда фокус находится на компоненте |
| width | [WidthEnum](#WidthEnum) |  |  | Управление шириной группы кнопок для типа 'button'. При значении 'available' растягивает группу на ширину родителя |
| name | String |  |  | Уникальное имя блока |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `RadioGroup`, как правило, компоненты `Radio` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onFocus | Function |  |  | Обработчик фокуса радиогруппы |
| onBlur | Function |  |  | Обработчик снятия фокуса с радиогруппы |
| onChange | Function |  |  | Обработчик изменения значения 'checked' одного из дочерних радио-кнопок |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на первую радиокнопку в группе. |
| blur() | Убирает фокус с группы радио-кнопок. |





## Типы






### <a id="TypeEnum"></a>TypeEnum

 * `'normal'`
 * `'button'`
 * `'line'`


### <a id="WidthEnum"></a>WidthEnum

 * `'default'`
 * `'available'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



