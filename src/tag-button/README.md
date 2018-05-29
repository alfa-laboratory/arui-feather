```jsx
<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <div
                key={ size }
                style={ { marginBottom: 10 } }
            >
                <TagButton size={ size }>{ `Tag ${size}` }</TagButton>
            </div>
        ))
    }
</div>
```
