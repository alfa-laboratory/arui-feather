Обычные кнопки
```
const buttons = [
    { size: 's', name: 'Маленькая' },
    { size: 'm', name: 'Средняя' },
    { size: 'l', name: 'Большая' },
    { size: 'xl', name: 'Очень большая' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

Псевдокнопки
```
const buttons = [
    { size: 's', name: 'Маленькая' },
    { size: 'm', name: 'Средняя' },
    { size: 'l', name: 'Большая' },
    { size: 'xl', name: 'Очень большая' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button pseudo={ true } size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

Кнопки действия

```
const buttons = [
    { size: 's', name: 'Маленькая' },
    { size: 'm', name: 'Средняя' },
    { size: 'l', name: 'Большая' },
    { size: 'xl', name: 'Очень большая' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button view='action' size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

Экстра кнопки
```
const buttons = [
    { size: 's', name: 'Маленькая' },
    { size: 'm', name: 'Средняя' },
    { size: 'l', name: 'Большая' },
    { size: 'xl', name: 'Очень большая' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button view='extra' size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

Другие кнопки
```
const buttons = [
    { size: 's', name: 'Маленькая' },
    { size: 'm', name: 'Средняя' },
    { size: 'l', name: 'Большая' },
    { size: 'xl', name: 'Очень большая' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button view='other' size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

С иконкой
```
const buttons = [
    { size: 's', name: 'Маленькая' },
    { size: 'm', name: 'Средняя' },
    { size: 'l', name: 'Большая' },
    { size: 'xl', name: 'Очень большая' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button size={ size }>
                <div style={ { marginRight: '12px', display: 'inline-block' } } >
                    <Icon size={ size } icon='ok' />
                </div>
                {`${name}`}
            </Button>
        </div>
    ))}
</div>
```

Со 100%-ой шириной
```
const buttons = [
    { size: 's', name: 'Маленькая' },
    { size: 'm', name: 'Средняя' },
    { size: 'l', name: 'Большая' },
    { size: 'xl', name: 'Очень большая' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button width='available' size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

Disabled
```
const buttons = [
    { size: 's', name: 'Маленькая' },
    { size: 'm', name: 'Средняя' },
    { size: 'l', name: 'Большая' },
    { size: 'xl', name: 'Очень большая' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button size={ size } disabled={ true }>{`${name}`}</Button>
        </div>
    ))}
</div>
```