```
const OPTIONS_1 = [
    {
        value: 1,
        text: 'Календарь',
        checkedText: 'Calendar'
    },
    {
        value: 2,
        text: 'Пользователь',
        checkedText: 'User'
    },
    {
        value: 3,
        text: 'Поиск',
        checkedText: 'Search'
    }
];

<div>
    {['m', 'l'].map(size => (
        <div style={{ marginBottom: 20 }}>
            <Select
                mode='radio'
                size={ size }
                options={ OPTIONS_1 }
            />
        </div>
    ))}
</div>
```
