Календарь используется для выбора дат и временных периодов.

### Выбор даты
Позволяет выбрать произвольную дату с минимальными ограничениями. Например, дату выдачи паспорта или день рождения.
```jsx
initialState = {
    date: Date.now()
};
<Calendar
    value={ state.date }
    onValueChange={ (newDate) => {
        setState({
            date: newDate
        });
    } }
/>
```
### Выбор даты из ограниченного интервала
Календарь с заданными левой и правой границей. Позволяет выбрать дату из заданного диапазона. Например, дату встречи с банком для заключения кредитного договора.
```jsx
const addDays = require('date-fns/add_days');
const subtractDays = require('date-fns/sub_days');

initialState = {
    date: Date.now(),
    earlierLimit: subtractDays(new Date(), 3).valueOf(),
    laterLimit: addDays(new Date(), 1).valueOf()
};

<Calendar
    value={ state.date }
    earlierLimit={ state.earlierLimit }
    laterLimit={ state.laterLimit }
    onValueChange={ (newDate) => {
        setState({
            date: newDate
        });
    } }
/>
```

### Недоступные даты
Случается, что некоторые даты нельзя выбрать. Например, выходные или праздники.
```jsx
const getTime = require('date-fns/get_time');
const addDays = require('date-fns/add_days');
const startOfDay = require('date-fns/start_of_day');

initialState = {
    date: Date.now()
};
const currentDate = new Date();
const offDays = [
    getTime(startOfDay(addDays(currentDate, 1))),
    getTime(startOfDay(addDays(currentDate, 4))),
    getTime(startOfDay(addDays(currentDate, 7)))
];

<Calendar
    value={ state.date }
    offDays={ offDays }
    onValueChange={ (newDate) => {
        setState({
            date: newDate
        });
    } }
/>
```

### Отметка о событии
К календарю могут быть привязаны события или мероприятия: запланированные платежи, даты сдачи отчётности в налоговую и т.д.
```jsx
const getTime = require('date-fns/get_time');
const addDays = require('date-fns/add_days');
const startOfDay = require('date-fns/start_of_day');

initialState = {
    date: Date.now()
};
const currentDate = new Date();
const eventDays = [
    getTime(startOfDay(addDays(currentDate, -25))),
    getTime(startOfDay(addDays(currentDate, -24))),
    getTime(startOfDay(addDays(currentDate, -23))),
    getTime(startOfDay(addDays(currentDate, -19))),
    getTime(startOfDay(addDays(currentDate, -18))),
    getTime(startOfDay(addDays(currentDate, -15))),
    getTime(startOfDay(addDays(currentDate, -14))),
    getTime(startOfDay(addDays(currentDate, -13))),
    getTime(startOfDay(addDays(currentDate, -12))),
    getTime(startOfDay(addDays(currentDate, 2))),
    getTime(startOfDay(addDays(currentDate, 4)))
];

<Calendar
    value={ state.date }
    eventDays={ eventDays }
    onValueChange={ (newDate) => {
        setState({
            date: newDate
        });
    } }
/>
```

### Отображение текущей даты
Обязательное состояние для любого календаря.
```jsx
<Calendar
    showToday={ true }
/>
```


===RULES===


### Передовой опыт

- В календаре отмечена текущая дата.
- Для выбранной даты используется акцентный цвет.
- Календарь автоматически закрываться после выбора конкретной даты, если не предусмотрен выбор периода.
- Не используется для выбора дат в далёком прошлом или будущем.
- Состояние календаря по умолчанию зависит от контекста: нет смысла показывать последние 18 лет, если требуется выбор дня рождения совершеннолетнего клиента.
