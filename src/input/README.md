
```
initialState = {
    money: ''
};
function handleMoneyChange(money) {
    setState({ money });
}
function renderAddons() {
    return (
        <RadioGroup type={ 'button' }>
            {['₽', '$', '€'].map(item =>
                <Radio
                    key={ item }
                    size='m'
                    type='button'
                    text={ item }
                    onChange={ handleMoneyChange }
                />
            )}
        </RadioGroup>
    );
}
<div>
    <Input
        size='m'
        placeholder='Введите сумму'
        rightAddons={ renderAddons() }
        type='number'
    />
</div>
```

Обычные
```
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='row'>
            <Input
                placeholder='Введите что-нибудь'
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
        <div className='row'>
            <Input
                placeholder='Введите что-нибудь'
                defaultValue='Корм для кота'
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
        <div className='row'>
            <Input
                placeholder='Введите что-нибудь длинное'
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
initialState = {
    value: 'Конsтантин',
    error: true
};
<div>
    {sizes.map(size => (
        <div className='row'>
            <Input
                placeholder='Введите что-нибудь'
                error={ state.error ? 'Только кириллические символы' : null }
                view='line'
                size={ size }
                value={ state.value }
                onChange={ value => setState({
                    value,
                    error: value.search(/[a-z]/i) !== -1
                }) }
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
        <div className='row'>
            <Input
                placeholder='Введите ваше имя'
                view='line'
                size={ size }
                icon={ <Icon size={ size } icon='user' /> }
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
        <div className='row'>
            <Input
                placeholder='Введите ваше имя'
                disabled={ true }
                view='line'
                size={ size }
            />
        </div>
    ))}
</div>
```
