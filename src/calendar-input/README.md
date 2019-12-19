```jsx
<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <div className='row' key={ size }>
                <CalendarInput
                    size={ size }
                    defaultValue='01.02.2016'
                />
            </div>
        ))
    }
</div>
```

```jsx
<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <div className='row' key={ size }>
                <CalendarInput size={ size } defaultValue='41.12.2031' error='Такой даты не существует' />
            </div>
        ))
    }
</div>
```

```jsx
const formatDate = require('date-fns/format');

<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <div className='row' key={ size }>
                <CalendarInput size={ size } placeholder={ formatDate(new Date(), 'DD.MM.YYYY') } width='available' />
            </div>
        ))
    }
</div>
```

С произвольной иконкой
```jsx
const IconOk = require('../../src/icon/ui/ok').default;

<div>
    { ['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <CalendarInput
                size={ size }
                defaultValue='01.02.2016'
                rightAddons={ <IconOk size={ size } colored={ true } /> }
            />
        </div>
    )) }
</div>
```

Без фолбэка на нативный контрол на мобильном устройстве
```
<div>
    <CalendarInput
        size='m'
        defaultValue='01.10.2017'
        mobileMode='popup'
    />
</div>
```

Без фолбэка на нативный контрол на мобильном устройстве
и без попапа с календарём. Обычный ввод в `input` с клавиатуры
```
<div>
    <CalendarInput
        size='m'
        defaultValue='01.10.2017'
        mobileMode='input'
    />
</div>
```

С отображением текущей даты
```jsx
const addDays = require('date-fns/add_days');
const formatDate = require('date-fns/format');

const currentDate = new Date();

const calendar = {
    showToday: true
};

<div>
    <CalendarInput
        size='m'
        calendar={ calendar }
        defaultValue={ formatDate(addDays(currentDate, 2), 'DD.MM.YYYY') }
        mobileMode='popup'
    />
</div>
```
