Календарь с возможностью выбора даты
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
Календарь с выключенными датами до и от
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

Календарь с выключенными конкретными датами
```jsx
const getTime = require('date-fns/get_time');
const addDays = require('date-fns/add_days');
const startOfDay = require('date-fns/start_of_day');

initialState = {
    date: Date.now()
};
let currentDate = new Date();
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

Календарь с отображением событий
```jsx
const getTime = require('date-fns/get_time');
const addDays = require('date-fns/add_days');
const startOfDay = require('date-fns/start_of_day');

initialState = {
    date: Date.now()
};
let currentDate = new Date();
let daysOfEvents = [
    getTime(startOfDay(addDays(currentDate, 1))),
    getTime(startOfDay(addDays(currentDate, 4))),
    getTime(startOfDay(addDays(currentDate, 7)))
];

<Calendar
    value={ state.date }
    daysOfEvents={ daysOfEvents }
    onValueChange={ (newDate) => {
        setState({
            date: newDate
        });
    } }
/>
```

Календарь с отображением текущей даты
```jsx
<Calendar
    showToday={ true }
/>
```
