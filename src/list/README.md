ol
```
const ITEMS_OL = [
    {
        key: 'one',
        value: 'One'
    },
    {
        key: 'two',
        value: 'Two'
    },
    {
        key: 'three',
        value: 'Three'
    }
];

<List
    items={ ITEMS_OL }
/>
```

ul
```
const ITEMS_UL = [
    {
        key: 'one',
        value: 'Apple'
    },
    {
        key: 'two',
        value: 'Orange'
    },
    {
        key: 'three',
        value: 'Banana'
    }
];
<List
    items={ ITEMS_UL }
    type='ordered'
/>
```