```
const elipsisBoxStyles = {
    width: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

<div>
    {['s' , 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <Label size={ size }>Лейбл</Label>
            <div style={ elipsisBoxStyles }>
                <Label size={ size } isNoWrap={ true }>
                    Очень длинная срока, которую необходимо скыть за тремя точками
                </Label>
            </div>
        </div>
    ))}
</div>
```
