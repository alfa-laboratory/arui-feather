```jsx
import Input from 'arui-feather/input';

<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <FormField size={ size }>
                    <Input size={ size } placeholder='Введите что-нибудь' />
                </FormField>
            </div>
        ))
    }
</div>
```
