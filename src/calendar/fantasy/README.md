```
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

```
const addDays = require('date-fns/add_days');
const startOfDay = require('date-fns/start_of_day');
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

```
const addDays = require('date-fns/add_days');
const startOfDay = require('date-fns/start_of_day');
const subtractDays = require('date-fns/sub_days');
initialState = {
  date: Date.now()
};
const offDays = [subtractDays(new Date(), 2), addDays(new Date(), 2)]
    .map(date => startOfDay().valueOf());

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
