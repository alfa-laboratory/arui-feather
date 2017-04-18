```
<div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <Button size={ size }>{`Button ${size}`}</Button>
            </div>
        ))}
    </div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <Button size={ size } disabled={ true }>{`disabled Button ${size}`}</Button>
            </div>
        ))}
    </div>
</div>
```
