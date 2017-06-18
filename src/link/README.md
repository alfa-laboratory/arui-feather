Обычная ссылка
```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span className='row'>
            <div className='column'>
                <Link
                    text='Ссылка'
                    size={ size }
                />
            </div>
            <div className='column'>
                <Link
                    text='Ссылка'
                    size={ size }
                    disabled={ true }
                />
            </div>
        </span>
    ))}
</div>
```
Псевдо ссылка
```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span className='row'>
            <div className='column'>
                <Link
                    text='Ссылка'
                    size={ size }
                    pseudo={ true }
                />
            </div>
            <div className='column'>
                <Link 
                    text='Ссылка'
                    size={ size }
                    pseudo={ true }
                    disabled={ true }
                />
            </div>
        </span>
    ))}
</div>
```

Ссылки без подчеркивания
```
const columnStyle = {
    justifyContent: 'center',
    display: 'flex',
    width: '50%'
};
<div style={{ width: '100%' }}>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span className='row'>
            <div className='column' style={ columnStyle }>
                <Link size={ size } >😊</Link>
            </div>
            
            <div className='column' style={ columnStyle }>
                <Link size={ size } >¯\_(ツ)_/¯</Link>
            </div>
        </span>
    ))}
</div>
```
