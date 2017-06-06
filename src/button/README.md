Обычные кнопки
```
const buttons = [
    { size: 's', name: 'маленькая'},
    { size: 'm', name: 'средняя'},
    { size: 'l', name: 'большая'},
    { size: 'xl', name: 'очень большая'}
];
<div>
    {buttons.map(({ size, name }) => (
        <div className={'layout'} key={ size }>
            <Button size={ size }>{`${ name }`}</Button>
        </div>
    ))}
</div>
```

Псевдокнопки
```
const buttons = [
    { size: 's', name: 'маленькая'},
    { size: 'm', name: 'средняя'},
    { size: 'l', name: 'большая'},
    { size: 'xl', name: 'очень большая'}
];
<div>
    {buttons.map(({ size, name }) => (
        <div className={'layout'} key={ size }>
            <Button pseudo={true} size={ size }>{`${ name }`}</Button>
        </div>
    ))}
</div>
```

Кнопки действия

```
const buttons = [
    { size: 's', name: 'маленькая'},
    { size: 'm', name: 'средняя'},
    { size: 'l', name: 'большая'},
    { size: 'xl', name: 'очень большая'}
];
<div>
    {buttons.map(({ size, name }) => (
        <div className={'layout'} key={ size }>
            <Button view="action" size={ size }>{`${ name }`}</Button>
        </div>
    ))}
</div>
```

Экстра кнопки
```
const buttons = [
    { size: 's', name: 'маленькая'},
    { size: 'm', name: 'средняя'},
    { size: 'l', name: 'большая'},
    { size: 'xl', name: 'очень большая'}
];
<div>
    {buttons.map(({ size, name }) => (
        <div className={'layout'} key={ size }>
            <Button view="extra" size={ size }>{`${ name }`}</Button>
        </div>
    ))}
</div>
```

Другие кнопки
```
const buttons = [
    { size: 's', name: 'маленькая'},
    { size: 'm', name: 'средняя'},
    { size: 'l', name: 'большая'},
    { size: 'xl', name: 'очень большая'}
];
<div>
    {buttons.map(({ size, name }) => (
        <div className={'layout'} key={ size }>
            <Button view="other" size={ size }>{`${ name }`}</Button>
        </div>
    ))}
</div>
```

С иконкой
```
const buttons = [
    { size: 's', name: 'маленькая'},
    { size: 'm', name: 'средняя'},
    { size: 'l', name: 'большая'},
    { size: 'xl', name: 'очень большая'}
];
<div>
    {buttons.map(({ size, name }) => (
        <div className={'layout'} key={ size }>
            <Button size={ size }>
                <Icon size={ size } icon='ok' />
                {`${ name }`}
            </Button>
        </div>
    ))}
</div>
```

Со 100%-ой шириной
```
const buttons = [
    { size: 's', name: 'маленькая'},
    { size: 'm', name: 'средняя'},
    { size: 'l', name: 'большая'},
    { size: 'xl', name: 'очень большая'}
];
<div>
    {buttons.map(({ size, name }) => (
        <div className={'layout'} key={ size }>
            <Button width="available" size={ size }>{`${ name }`}</Button>
        </div>
    ))}
</div>
```

Disabled
```
const buttons = [
    { size: 's', name: 'маленькая'},
    { size: 'm', name: 'средняя'},
    { size: 'l', name: 'большая'},
    { size: 'xl', name: 'очень большая'}
];
<div>
    {buttons.map(({ size, name }) => (
        <div className={'layout'} key={ size }>
            <Button size={ size } disabled={ true }>{`${ name }`}</Button>
        </div>
    ))}
</div>
```