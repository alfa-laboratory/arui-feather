Группа полей для ввода
```jsx
const inputs = [1, 2, 3, 4];
<InputGroup>
    { inputs.map(input => (
        <Input
            key={ input }
            placeholder='Укажите получателя'
        />
    )) }
</InputGroup>
```

Группа полей для ввода, растягивающаяся на всю ширину
```jsx
const inputs = [1, 2, 3, 4];
<InputGroup width='available' >
    { inputs.map(input => (
        <Input
            key={ input }
            placeholder='Укажите получателя'
        />
    )) }
</InputGroup>
```