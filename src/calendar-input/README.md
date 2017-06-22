```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <CalendarInput
                size={ size }
                defaultValue='01.02.2016'
            />
        </div>
    ))}
</div>
```

```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <CalendarInput size={ size } defaultValue='41.12.2031' error='Что-то пошло не так' />
        </div>
    ))}
</div>
```

```
<div>
    const formatDate = require('date-fns/format').default;
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <CalendarInput size={ size } placeholder={ formatDate(new Date(), 'DD.MM.YYYY') } width='available' />
        </div>
    ))}
</div>
```
