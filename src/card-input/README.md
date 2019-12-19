```jsx
const sizes = ['s', 'm', 'l', 'xl'];

<div>
    {
        sizes.map(size => (
            <div className='row' key={ size }>
                <CardInput size={ size } placeholder='Введите номер карты' />
            </div>
        ))
    }
</div>
```
