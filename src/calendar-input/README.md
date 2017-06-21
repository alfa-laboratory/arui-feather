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
            <CalendarInput size={ size } error='Что-то пошло не так' />
        </div>
    ))}
</div>
```

```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <CalendarInput size={ size } width='available' />
        </div>
    ))}
</div>
```
