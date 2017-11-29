```jsx
const IconClose = require('./../icon/ui/close').default;

<div className='row'>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span
            key={ size }
            className='column l'
        >
<<<<<<< HEAD
<<<<<<< HEAD
            <IconButton size={ size } onClick={ () => { alert('Подтвердите удаление') } }>
                <Icon size={ size } name='tool-close' />
=======
            <IconButton size={ size } onClick={ () => { confirm('Подтвердите удаление') } }>
                <IconClose size={ size } />
>>>>>>> b1f6d7a1... feat(*): reorganize icons
=======
            <IconButton size={ size } onClick={ () => { confirm('Подтвердите удаление') } }>
                <IconClose size={ size } />
>>>>>>> 9353fdc7... feat(*): reorganize icons
            </IconButton>
        </span>
    ))}
</div>
```
