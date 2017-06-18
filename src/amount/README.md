```
const AMOUNT = {
    value: 123535,
    currency: {
        code: 'RUR',
        minority: 100
    }
};
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <Amount
                size={ size }
                amount={ AMOUNT }
            />
        </div>
    ))}
</div>
```

Использовать компонент Heading для вывода числа
```
const AMOUNT = {
    value: 123343,
    currency: {
        code: 'RUR',
        minority: 10
    }
};
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <Amount
                size={ size }
                amount={ AMOUNT }
                isHeading={ true }
            />
        </div>
    ))}
</div>

```
