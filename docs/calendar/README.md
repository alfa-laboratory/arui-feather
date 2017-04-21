# Calendar

Компонент календаря.

```javascript
import Calendar from 'arui-feather/calendar';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| value | Number |  |  | Выбранная дата, в формате unix timestamp |
| selectedFrom | Number | `null`  |  | Левая граница диапазона дат, в формате unix timestamp |
| selectedTo | Number | `null`  |  | Правая граница диапазона дат, в формате unix timestamp |
| earlierLimit | Number |  |  | Левая граница дат, возможных для выбора, в формате unix timestamp |
| laterLimit | Number |  |  | Правая граница дат, возможных для выбора, в формате unix timestamp |
| month | Number |  |  | Месяц, в формате unix timestamp |
| onValueChange | Function |  |  | Обработчик смены даты |
| onMonthChange | Function |  |  | Обработчик смены месяца |
| outputFormat | String | `'DD.MM.YYYY'`  |  | Тип форматирования даты при выводе |
| months | Array.<String> | `['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',<br>    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']`  |  | Список названий месяцев |
| weekdays | Array.<String> | `['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']`  |  | Список названий дней недели |
| offDays | Array.<Number> | `[]`  |  | Список выходных дней в виде unix timestamp, отсортированный по возрастанию |
| showArrows | Boolean | `true`  |  | Отображение стрелок навигации по месяцам |
| isKeyboard | Boolean | `true`  |  | Возможность управления календарём с клавиатуры |
| error | Node |  |  | Сообщение об ошибке |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onKeyDown | Function |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onKeyUp | Function |  |  | Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onFocus | Function |  |  | Обработчик фокуса |
| onBlur | Function |  |  | Обработчик снятия фокуса |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на календарь. |
| blur() | Убирает фокус с календаря. |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |





## Типы






### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



