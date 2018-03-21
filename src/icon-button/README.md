```jsx
/* eslint-disable no-restricted-globals */
const IconClose = require('./../icon/ui/close').default;

<div className='row'>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span
            key={ size }
            className='column l'
        >
            <IconButton size={ size } onClick={ () => { confirm('Подтвердите удаление') } }>
                <IconClose size={ size } />
            </IconButton>
        </span>
    ))}
</div>
```
