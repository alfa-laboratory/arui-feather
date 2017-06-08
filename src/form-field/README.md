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
const layoutStyles = {
    marginLeft: '80px'
};
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div style={ layoutStyles } key={ size }>
            <FormField
                size={ size }
                view='line'
                label={
                    <Label>Label...</Label>
                }>
                <Input placeholder='Input...' />
            </FormField>
        </div>
    ))}
</div>
