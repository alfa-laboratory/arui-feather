Обычные

```jsx
const SIZES = ['s', 'm', 'l', 'xl'];

<div>
    {
        SIZES.map(size => (
            <div key={ size } className='row'>
                <IntlPhoneInput size={ size } />
            </div>
        ))
    }
</div>
```
