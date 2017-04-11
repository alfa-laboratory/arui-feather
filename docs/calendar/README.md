# Calendar

Компонент календаря.

```javascript
import Calendar from 'arui-feather/calendar';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| value | Type.number |  |  | Выбранная дата, в формате unix timestamp |
| selectedFrom | Type.number | `null`  |  | Левая граница диапазона дат, в формате unix timestamp |
| selectedTo | Type.number | `null`  |  | Правая граница диапазона дат, в формате unix timestamp |
| earlierLimit | Type.number |  |  | Левая граница дат, возможных для выбора, в формате unix timestamp |
| laterLimit | Type.number |  |  | Правая граница дат, возможных для выбора, в формате unix timestamp |
| month | Type.number |  |  | Месяц, в формате unix timestamp |
| onValueChange | Type.func |  |  | Обработчик смены даты |
| onMonthChange | Type.func |  |  | Обработчик смены месяца |
| outputFormat | Type.string | `'DD.MM.YYYY'`  |  | Тип форматирования даты при выводе |
| months | Type.arrayOf(Type.string) | `['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',<br>    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']`  |  | Список названий месяцев |
| weekdays | Type.arrayOf(Type.string) | `['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']`  |  | Список названий дней недели |
| offDays | Type.arrayOf(Type.number) | `[]`  |  | Список выходных дней в виде unix timestamp, отсортированный по возрастанию |
| showArrows | Type.bool | `true`  |  | Отображение стрелок навигации по месяцам |
| isKeyboard | Type.bool | `true`  |  | Возможность управления календарём с клавиатуры |
| error | Type.node |  |  | Сообщение об ошибке |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onKeyDown | Type.func |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onKeyUp | Type.func |  |  | Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onFocus | Type.func |  |  | Обработчик фокуса |
| onBlur | Type.func |  |  | Обработчик снятия фокуса |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на календарь. |
| blur() | Убирает фокус с календаря. |









