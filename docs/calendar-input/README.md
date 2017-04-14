# CalendarInput

Компонент поля ввода даты.

```javascript
import CalendarInput from 'arui-feather/calendar-input';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| value | String |  |  | Содержимое поля ввода, указанное по умолчанию |
| error | Node |  |  | Отображение попапа с ошибкой в момент когда фокус находится в поле ввода |
| calendar | [CalendarType](#CalendarType) |  |  | Свойства компонента [Calendar](../calendar/) |
| opened | Boolean |  |  | Управление возможностью раскрытия календаря |
| width | [WidthEnum](#WidthEnum) |  |  | Управление возможностью компонента занимать всю ширину родителя |
| directions | Array.<[DirectionsEnum](#DirectionsEnum)> | `['bottom-left', 'bottom-right', 'top-left', 'top-right']`  |  | Направления, в которые может открываться попап компонента |
| disabled | Boolean |  |  | Управление возможностью изменения значения компонента |
| size | [SizeEnum](#SizeEnum) |  |  | Размер компонента |
| tabIndex | Number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| withIcon | Boolean | `true`  |  | Показывать иконку календаря в инпуте |
| placeholder | String | `'00.00.0000'`  |  | Подсказка в текстовом поле |
| id | String |  |  | Идентификатор компонента в DOM |
| name | String |  |  | Имя компонента в DOM |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| onFocus | Function |  |  | Обработчик установки фокуса на компонент |
| onBlur | Function |  |  | Обработчик снятия фокуса с компонента |
| onInputFocus | Function |  |  | Обработчик установки фокуса на поле ввода |
| onInputBlur | Function |  |  | Обработчик снятия фокуса с поля ввода |
| onInputChange | Function |  |  | Обработчик ввода даты в текстовом поле |
| onCalendarChange | Function |  |  | Обработчик выбора даты в календаре |
| onChange | Function |  |  | Обрабочик изменения даты в календаре |
| onKeyDown | Function |  |  | Обработчик события нажатия на клавишу в момент, когда фокус находится на компоненте |
| onCalendarKeyDown | Function |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится в календаре |
| onInputKeyDown | Function |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на текстовом поле |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на поле ввода, открывает календарь. |
| blur() | Убирает фокус с поля ввода. |
| scrollTo() | Скроллит страницу до поля ввода. |





## Типы




### <a id="CalendarType"></a>CalendarType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| value | Number |  |
| selectedFrom | Number |  |
| selectedTo | Number |  |
| earlierLimit | Number |  |
| laterLimit | Number |  |
| month | Number |  |
| onValueChange | Function |  |
| onMonthChange | Function |  |
| outputFormat | String |  |
| months | Array.<String> |  |
| weekdays | Array.<String> |  |
| offDays | Array.<Number> |  |
| showArrows | Boolean |  |
| isKeyboard | Boolean |  |
| error | Node |  |
| theme | [ThemeEnum](#ThemeEnum) |  |
| className | Function\|String |  |
| onKeyDown | Function |  |
| onKeyUp | Function |  |
| onFocus | Function |  |
| onBlur | Function |  |







### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`


### <a id="WidthEnum"></a>WidthEnum

 * `'default'`
 * `'available'`


### <a id="DirectionsEnum"></a>DirectionsEnum

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


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



