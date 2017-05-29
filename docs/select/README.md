# Select

Компонент выпадающего списка.

```javascript
import Select from 'arui-feather/select';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| className | Function\|String |  |  | Дополнительный класс |
| mode | [ModeEnum](#ModeEnum) | `'check'`  |  | Тип выпадающего списка |
| width | [WidthEnum](#WidthEnum) | `'default'`  |  | Управление возможностью компонента занимать всю ширину родителя |
| directions | Array.<[DirectionsEnum](#DirectionsEnum)> | `['bottom-left', 'bottom-right', 'top-left', 'top-right']`  |  | Направления, в которые может открываться попап компонента |
| placeholder | String | `'Выберите:'`  |  | Подсказка, которая отображается в кнопке раскрывающегося списка, в случае, если ни один из пунктов выбран |
| disabled | Boolean | `false`  |  | Управление возможностью редактирования значения |
| opened | Boolean |  |  | Управление видимостью выпадающего списка |
| equalPopupWidth | Boolean | `false`  |  | Ширинa выпадающего списка равна ширине кнопки |
| value | Array.<String\|Number> |  |  | Список выбранных значений |
| options | Array.<[OptionsType](#OptionsType)> | `[]`  |  | Список вариантов выбора |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| id | String |  |  | Уникальный идентификатор блока |
| name | String |  |  | Уникальное имя блока |
| error | Node |  |  | Содержание попапа с ошибкой |
| errorDirections | Array.<[ErrorDirectionsEnum](#ErrorDirectionsEnum)> | `['right-center', 'right-top', 'right-bottom', 'bottom-left']`  |  | Расположение попапа с ошибкой (в порядке приоритета) относительно точки открытия |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| onFocus | Function |  |  | Обработчик фокуса на компоненте |
| onBlur | Function |  |  | Обработчик потери фокуса компонентом |
| onButtonFocus | Function |  |  | Обработчик фокуса на кнопке |
| onButtonBlur | Function |  |  | Обработчик потери у кнопки |
| onMenuFocus | Function |  |  | Обработчик фокуса на меню |
| onMenuBlur | Function |  |  | Обработчик потери фокуса у меню |
| onClick | Function |  |  | Обработчик клика по кнопке компонента |
| onClickOutside | Function |  |  | Обработчик клика вне компонента |
| onChange | Function |  |  | Обработчик изменения значения |
| onKeyDown | Function |  |  | Обработчик нажатия на клавишу |
| renderButtonContent | Function |  |  | Кастомный метод рендера содержимого кнопки, принимает на вход: массив элементов типа [CheckedOption](#CheckedOption) |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на компонент. |
| blur() | Убирает фокус с компонента. |
| scrollTo() | Скроллит страницу до компонента. |





## Типы




### <a id="OptionsType"></a>OptionsType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| type | [TypeEnum](#TypeEnum) | Тип списка вариантов |
| value | String\|Number | Уникальное значение, которое будет отправлено на сервер, если вариант выбран |
| text | Node | Текст варианта |
| nativeText | String | Текст варианта для нативного режима |
| description | Node | Отображение варианта |
| checkedText | String | Текст, который будет отображаться при выборе |
| icon | Node | Иконка варианта |
| content | Array | Список вариантов, только для type='group' |







### <a id="ModeEnum"></a>ModeEnum

 * `'check'`
 * `'radio'`
 * `'radio-check'`


### <a id="WidthEnum"></a>WidthEnum

 * `'default'`
 * `'available'`


### <a id="DirectionsEnum"></a>DirectionsEnum

 * `'top-left'`
 * `'top-center'`
 * `'top-right'`
 * `'left-top'`
 * `'left-center'`
 * `'left-bottom'`
 * `'right-top'`
 * `'right-center'`
 * `'right-bottom'`
 * `'bottom-left'`
 * `'bottom-center'`
 * `'bottom-right'`


### <a id="TypeEnum"></a>TypeEnum

 * `'item'`
 * `'group'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ErrorDirectionsEnum"></a>ErrorDirectionsEnum

 * `'anchor'`
 * `'top-left'`
 * `'top-center'`
 * `'top-right'`
 * `'left-top'`
 * `'left-center'`
 * `'left-bottom'`
 * `'right-top'`
 * `'right-center'`
 * `'right-bottom'`
 * `'bottom-left'`
 * `'bottom-center'`
 * `'bottom-right'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



