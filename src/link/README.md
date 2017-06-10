Обычная ссылка
```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span className={'layout'}>
            <Link {...{
                text: 'Ссылка',
                size,
            }} />
            <p style={{ width: '5px' }} />
            <Link {...{
                text: 'Ссылка',
                size,
                disabled: true
            }} />
        </span>
    ))}
</div>
```
Псевдо ссылка
```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span className={'layout'}>
            <Link {...{
                text: 'Ссылка',
                size,
                pseudo: true
            }} />
            <p style={{ width: '5px' }} />
            <Link {...{
                text: 'Ссылка',
                size,
                pseudo: true,
                disabled: true
            }} />
        </span>
    ))}
</div>
```

Ссылка с иконкой
```
const iconStyle = {
    marginRight: '5px',
    display: 'inline-block'
};
<div>
    {['s', 'm', 'l', 'xl'].map(size => {
        const props = {
            text: 'Ссылка',
            size
        };
        return  (
            <span className={'layout'} >
                <Link { ...props } >
                    <div style={ iconStyle }>
                        <Icon { ...props } 
                            style={ iconStyle }
                            icon='ok'
                        />
                    </div>
                </Link>
            </span>
        );
    })}
</div>
```

Ссылки без подчеркивания
```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span className={'layout'}>
            <Link {...{
                size,
            }} >😊</Link>
            <p style={{ width: '5px' }} />
            <Link {...{
                size,
                disabled: true
            }} >😊</Link>
        </span>
    ))}
</div>
```