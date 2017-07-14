```jsx
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='row' >
            <CardInput size={ size } placeholder='Введите номер карты' />
        </div>
    ))}
</div>
```
