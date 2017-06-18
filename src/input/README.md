
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
        type='number'
        maskFormatCharacters={{ validate: (symb)=> symb === 'a'}}
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

class StateFullInput extends React.Component {
    constructor() {
        this.state = { value: 'Корм для кота' };
    }
    render() {
        return (
            <Input
                placeholder='Введите что-нибудь'
                value={ this.state.value }
                clear={ true }
                view='line'
                onChange={(value) => this.setState({ value })}
                size={ this.props.size }
             />
        );
    }
}
<div>
    {sizes.map(size => (
        <div className='row'>
             <StateFullInput size={ size } />
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
initialState = {
    value: 'Конsтантин',
    error: true
};
<div>
    {sizes.map(size => (
        <div className='row'>
             <Input
                placeholder='Введите что-нибудь'
                error={ state.error ? 'Только кириллические символы': null }
                view='line'
                size={ size }
                value={ state.value }
                onChange={ (value) => setState({
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
        <div className='row'>
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