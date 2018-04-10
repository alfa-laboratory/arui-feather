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
const addDays = require('date-fns/addDays');
const subtractDays = require('date-fns/subDays');

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
const getTime = require('date-fns/getTime');
const addDays = require('date-fns/addDays');
const startOfDay = require('date-fns/startOfDay');

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
const getTime = require('date-fns/getTime');
const addDays = require('date-fns/addDays');
const startOfDay = require('date-fns/startOfDay');

initialState = {
    date: Date.now()
};
let currentDate = new Date();
let eventDays = [
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

Календарь с отображением текущей даты
```jsx
<Calendar
    showToday={ true }
/>
```
