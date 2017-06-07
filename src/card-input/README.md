```
const sizes = ['s', 'm', 'l', 'xl'];
<div>
    {sizes.map(size => (
        <div className='layout' >
            <CardInput size={ size } placeholder="Введите номер карты" />
        </div>
    ))}
</div>
```
