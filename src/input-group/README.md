Группа полей для ввода
```
const inputs = [1, 2, 3, 4];
<InputGroup>
    { inputs.map(input =>
        <Input
            key={ input }
            placeholder='Input ...'
        />
    ) }
</InputGroup>
```

Группа полей для ввода, растягивающаяся на всю ширину
```
const inputs = [1, 2, 3, 4];
<InputGroup width='available' >
    { inputs.map(input =>
        <Input
            key={ input }
            placeholder='Input ...'
        />
    ) }
</InputGroup>
```