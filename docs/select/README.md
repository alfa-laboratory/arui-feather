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
| groupView | [GroupViewEnum](#GroupViewEnum) | `'default'`  |  | Размещение заголовка групп: обычное или в одну строку с первым элементом группы |
| width | [WidthEnum](#WidthEnum) | `'default'`  |  | Управление возможностью компонента занимать всю ширину родителя |
| directions | Array.<[DirectionsEnum](#DirectionsEnum)> | `['bottom-left', 'bottom-right', 'top-left', 'top-right']`  |  | Направления, в которые может открываться попап компонента |
| disabled | Boolean | `false`  |  | Управление возможностью редактирования значения |
| opened | Boolean |  |  | Управление видимостью выпадающего списка |
| equalPopupWidth | Boolean | `false`  |  | Ширинa выпадающего списка равна ширине кнопки |
| value | Array.<String\|Number> |  |  | Список выбранных значений |
| options | Array.<[OptionsType](#OptionsType)> | `[]`  |  | Список вариантов выбора |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| id | String |  |  | Уникальный идентификатор блока |
| name | String |  |  | Уникальное имя блока |
| label | Node |  |  | Лейбл для поля |
| placeholder | String | `'Выберите:'`  |  | Подсказка в поле |
| hint | Node |  |  | Подсказка под полем |
| error | Node |  |  | Отображение ошибки |
| mobileMenuMode | [MobileMenuModeEnum](#MobileMenuModeEnum) | `'native'`  |  | Управление нативным режимом на мобильных устройствах |
| mobileTitle | Node |  |  | Подсказка над меню в мобильном режиме |
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


### <a id="GroupViewEnum"></a>GroupViewEnum

 * `'default'`
 * `'line'`


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


### <a id="MobileMenuModeEnum"></a>MobileMenuModeEnum

 * `'native'`
 * `'popup'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



