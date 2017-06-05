```
<div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div
                key={ size }
                style={{ marginBottom: 10 }}
            >
                <Button size={ size }>{`Button ${size}`}</Button>
            </div>
        ))}
    </div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div
                key={ size }
                style={{ marginBottom: 10 }}
            >
                <Button size={ size } disabled={ true }>{`disabled Button ${size}`}</Button>
            </div>
        ))}
    </div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div
                key={ size }
                style={{ marginBottom: 10 }}
            >
                <Button size={ size } view='tag'>{`Tag ${size}`}</Button>
            </div>
        ))}
    </div>
    <div>
        {['m'].map(size => (
            <div
                key={ size }
                style={{ marginBottom: 10 }}
            >
                <Button size={ size } inlineSubmit={ true } />
            </div>
        ))}
    </div>
</div>
```
