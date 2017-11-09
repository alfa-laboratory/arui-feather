```jsx
const radioStyle = {
    margin: '10px'
};
<div>
    <div>
        {['m', 'l'].map(size => (
            <span style={ radioStyle } key={ size } >
                <Radio
                    text='Текущий счёт'
                    size={ size }
                />
            </span>
        ))}
    </div>
    <div>
        {['m', 'l'].map(size => (
            <span style={ radioStyle } key={ size } >
                <Radio
                    text='Основной счёт'
                    size={ size }
                    error={ true }
                />
            </span>
        ))}
    </div>
    <div>
        {['m', 'l'].map(size => (
            <span style={ radioStyle } key={ size } >
                <Radio
                    text='Семейный счёт'
                    size={ size }
                    disabled={ true }
                />
            </span>
        ))}
    </div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <span style={ radioStyle } key={ size } >
                <Radio
                    text='Текущий счёт'
                    size={ size }
                    type='button'
                />
            </span>
        ))}
    </div>
    <div className='row'>
        {['s', 'm', 'l', 'xl'].map(size => (
            <span style={ radioStyle } key={ size } >
                <Radio
                    text='Семейный счёт'
                    size={ size }
                    type='button'
                    disabled={ true }
                />
            </span>
        ))}
    </div>
</div>
```