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
].map(date => getTime(date));

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

```jsx
<Calendar
    showToday={ true }
/>
```
