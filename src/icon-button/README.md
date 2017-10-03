```jsx
<div className='row'>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span
            key={ size }
            className='column l'
        >
            <IconButton size={ size }>
                <Icon size={ size } name='tool-close' />
            </IconButton>
        </span>
    ))}
</div>
```
