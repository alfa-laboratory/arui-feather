# CalendarInput

Компонент поля ввода даты.

```javascript
import CalendarInput from 'arui-feather/calendar-input';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| value | Type.string |  |  | Содержимое поля ввода, указанное по умолчанию |
| error | Type.node |  |  | Отображение попапа с ошибкой в момент когда фокус находится в поле ввода |
| calendar | Type.shape({ value: Type.number, selectedFrom: Type.number, selectedTo: Type.number, earlierLimit: Type.number, laterLimit: Type.number, month: Type.number, onValueChange: Type.func, onMonthChange: Type.func, outputFormat: Type.string, months: Type.arrayOf(Type.string), weekdays: Type.arrayOf(Type.string), offDays: Type.arrayOf(Type.number), showArrows: Type.bool, isKeyboard: Type.bool, error: Type.node, theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']), className: Type.oneOfType([Type.func, Type.string]), onKeyDown: Type.func, onKeyUp: Type.func, onFocus: Type.func, onBlur: Type.func }) |  |  | Свойства компонента [Calendar](../calendar/) |
| opened | Type.bool |  |  | Управление возможностью раскрытия календаря |
| width | Type.oneOf(['default', 'available']) |  |  | Управление возможностью компонента занимать всю ширину родителя |
| directions | Type.arrayOf(Type.oneOf([ 'anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right' ])) | `['bottom-left', 'bottom-right', 'top-left', 'top-right']`  |  | Направления, в которые может открываться попап компонента |
| disabled | Type.bool |  |  | Управление возможностью изменения значения компонента |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) |  |  | Размер компонента |
| tabIndex | Type.number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| withIcon | Type.bool | `true`  |  | Показывать иконку календаря в инпуте |
| placeholder | Type.string | `'00.00.0000'`  |  | Подсказка в текстовом поле |
| id | Type.string |  |  | Идентификатор компонента в DOM |
| name | Type.string |  |  | Имя компонента в DOM |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| onFocus | Type.func |  |  | Обработчик установки фокуса на компонент |
| onBlur | Type.func |  |  | Обработчик снятия фокуса с компонента |
| onInputFocus | Type.func |  |  | Обработчик установки фокуса на поле ввода |
| onInputBlur | Type.func |  |  | Обработчик снятия фокуса с поля ввода |
| onInputChange | Type.func |  |  | Обработчик ввода даты в текстовом поле |
| onCalendarChange | Type.func |  |  | Обработчик выбора даты в календаре |
| onChange | Type.func |  |  | Обрабочик изменения даты в календаре |
| onKeyDown | Type.func |  |  | Обработчик события нажатия на клавишу в момент, когда фокус находится на компоненте |
| onCalendarKeyDown | Type.func |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится в календаре |
| onInputKeyDown | Type.func |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на текстовом поле |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на поле ввода, открывает календарь. |
| blur() | Убирает фокус с поля ввода. |
| scrollTo() | Скроллит страницу до поля ввода. |









