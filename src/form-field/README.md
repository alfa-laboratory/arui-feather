```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <FormField
                size={ size }
                label='Комментарий'
            >
                <Input size={ size } placeholder='Введите что-нибудь' />
            </FormField>
        </div>
    ))}
</div>
```
Компонент может использоваться для отображения заголовков слева от блока
```
const layoutStyles = {
    marginLeft: '120px'
};
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div style={ layoutStyles } key={ size }>
            <FormField
                size={ size }
                view='line'
                label={
                    <Label >Комментарий</Label>
                }
            >
                <Input size={ size } placeholder='Введите что-нибудь' />
            </FormField>
        </div>
    ))}
</div>
