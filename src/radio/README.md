```jsx
const radioStyle = {
    display: 'inline-block',
    margin: '0 10px 10px 0'
};

<div>
    <div>
        {
            ['m', 'l'].map(size => (
                <span style={ radioStyle } key={ size }>
                    <Radio
                        text='Текущий счёт'
                        size={ size }
                    />
                </span>
            ))
        }
    </div>
    <div>
        {
            ['m', 'l'].map(size => (
                <span style={ radioStyle } key={ size }>
                    <Radio
                        text='Семейный счёт'
                        size={ size }
                        disabled={ true }
                    />
                </span>
            ))
        }
    </div>
    <div>
        {
            ['m', 'l'].map(size => (
                <span style={ radioStyle } key={ size }>
                    <Radio
                        text='Дополнительный семейный счёт'
                        size={ size }
                        disabled={ true }
                        checked={ true }
                    />
                </span>
            ))
        }
    </div>
    <div>
        {
            ['s', 'm', 'l', 'xl'].map(size => (
                <span style={ radioStyle } key={ size }>
                    <Radio
                        text='Текущий счёт'
                        size={ size }
                        type='button'
                    />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl'].map(size => (
                <span style={ radioStyle } key={ size }>
                    <Radio
                        text='Семейный счёт'
                        size={ size }
                        type='button'
                        disabled={ true }
                    />
                </span>
            ))
        }
    </div>
</div>
```
