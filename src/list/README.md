Нумерованный список (ol)
```jsx
const ITEMS_OL = [
    {
        key: 'one',
        value: 'Накопительные счета'
    },
    {
        key: 'two',
        value: 'Депозиты'
    },
    {
        key: 'three',
        value: 'Бесплатные сервисы для накоплений'
    }
];

<List
    items={ ITEMS_OL }
    type='ordered'
/>
```

Маркированный список (ul)
```jsx
const ITEMS_UL = [
    {
        key: 'one',
        value: 'Индивидуальное обслуживание в любом отделении в России'
    },
    {
        key: 'two',
        value: 'Повышенные % ставки по депозитам'
    },
    {
        key: 'three',
        value: 'Льготная конвертация валют.'
    }
];
<List
    items={ ITEMS_UL }
/>
```
