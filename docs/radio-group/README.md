# RadioGroup

Компонент группы радио-кнопок.

```javascript
import RadioGroup from 'arui-feather/radio-group';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| type | Type.oneOf(['normal', 'button', 'line']) | `'normal'`  |  | Тип группы кнопок |
| value | Type.string |  |  | Значение выбранной радио-кнопки |
| error | Type.node |  |  | Отображение попапа с ошибкой в момент когда фокус находится на компоненте |
| errorDirections | Type.arrayOf(Type.string) | `['right-center', 'right-top', 'right-bottom', 'bottom-left']`  |  | Расположение попапа с ошибкой (в порядке приоритета) относительно точки открытия |
| width | Type.oneOf(['default', 'available']) |  |  | Управление шириной группы кнопок для типа 'button'. При значении 'available' растягивает группу на ширину родителя |
| name | Type.string |  |  | Уникальное имя блока |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `RadioGroup`, как правило, компоненты `Radio` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onFocus | Type.func |  |  | Обработчик фокуса радиогруппы |
| onBlur | Type.func |  |  | Обработчик снятия фокуса с радиогруппы |
| onChange | Type.func |  |  | Обработчик изменения значения 'checked' одного из дочерних радио-кнопок |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на первую радиокнопку в группе. |
| blur() | Убирает фокус с группы радио-кнопок. |









