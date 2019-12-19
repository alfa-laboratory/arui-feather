<!-- eslint-disable no-alert -->

```jsx
const IconClose = require('../../src/icon/ui/close').default;

<div className='row'>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <span
                key={ size }
                className='column l'
            >
                <IconButton
                    size={ size }
                    onClick={ () => {
                        alert('Удаление завершено!')
                    } }
                >
                    <IconClose size={ size } />
                </IconButton>
            </span>
        ))
    }
</div>
```
