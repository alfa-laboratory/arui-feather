```
const elipsisBoxStyles = {
    width: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

<div>
    {['s' , 'm', 'l', 'xl'].map(size => (
        <div>
            <div className='row' key={ size }>
                <Label size={ size }>Лейбл</Label>
            </div>
            <div className='row'>
                <div style={ elipsisBoxStyles }>
                    <Label size={ size } isNoWrap={ true }>
                        Очень длинная строка, которую необходимо скрыть за тремя точками
                    </Label>
                </div>
            </div>
        </div>
    ))}
</div>
```
