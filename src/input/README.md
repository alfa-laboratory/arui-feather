
```
function renderAddons() {
    return (
        <RadioGroup type={ 'button' }>
            {[1, 2, 3].map(item =>
                <Radio
                    key={ item }
                    size='m'
                    type={ 'button' }
                    text={ item }
                />
            )}
        </RadioGroup>
    );
}
<div>
    <Input
        size='m'
        placeholder='Input...'
        rightAddons={ renderAddons() }
        leftAddons={ renderAddons() }
    />
    <Input
        size='m'
        placeholder='Input with width available...'
        rightAddons={ renderAddons() }
        leftAddons={ renderAddons() }
        width='available'
    />
</div>    
```

Обычные
```
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='layout'>
             <Input
                placeholder='Введите что-нибудь...'
                view='line'
                size={ size }
             />
        </div>
    ))}
</div>
```

С крестиком "Очистить"
```
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='layout'>
             <Input
                placeholder='Введите что-нибудь...'
                clear={ true }
                view='line'
                size={ size }
             />
        </div>
    ))}
</div>
```

С шириной 100%
```
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='layout'>
             <Input
                placeholder='Введите что-нибудь...'
                width='available'
                view='line'
                size={ size }
             />
        </div>
    ))}
</div>
```

С ошибкой
```
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='layout'>
             <Input
                placeholder='Введите что-нибудь...'
                error='Что-то идет не так'
                view='line'
                size={ size }
             />
        </div>
    ))}
</div>
```

С Иконкой
```
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='layout'>
             <Input
                placeholder='Введите что-нибудь...'
                view='line'
                size={ size }
                icon={ <Icon size={ size } icon='ok' /> }
             />
        </div>
    ))}
</div>
```

Disabled
```
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='layout'>
             <Input
                placeholder='Введите что-нибудь...'
                disabled={ true }
                view='line'
                size={ size }
             />
        </div>
    ))}
</div>
```