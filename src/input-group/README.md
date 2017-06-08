Группа полей для ввода
```
const inputs = [1, 2, 3, 4];
<InputGroup>
    { inputs.map((input, index) =>
        <Input
            key={ index }
            placeholder='Input ...'
        />
    ) }
</InputGroup>
```

Группа полей для ввода, растягивающаяся на всю ширину
```
const inputs = [1, 2, 3, 4];
<InputGroup width='available' >
    { inputs.map((input, index) =>
        <Input
            key={ index }
            placeholder='Input ...'
        />
    ) }
</InputGroup>
```