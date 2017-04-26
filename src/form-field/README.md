```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <FormField
                size={size}
                label='Label...' >
                <Input placeholder='Input...' />
            </FormField>
        </div>
    ))}
</div>
```
Компонент может использоваться для отображения заголовков слева от блока
```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <FormField
                size={size}
                view='line'
                label={
                    <Label>Label...</Label>
                }>
                <Input placeholder='Input...' />
            </FormField>
        </div>
    ))}
</div>
