```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div
            key={ size }
            style={{ marginBottom: 10 }}
        >
            <Attach size={ size } />
        </div>
    ))}
</div>
```
