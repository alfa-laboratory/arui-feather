```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div
            key={ size }
            style={{ marginBottom: 10 }}
        >
            <InlineSubmitButton size={ size } />
        </div>
    ))}
</div>
```
