<!-- eslint-disable no-alert -->

```jsx
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';

<Form onSubmit={ () => {
    alert('Мы перезвоним вам в течение 5 минут');
} }
>
    <FormField>
        <Input placeholder='Введите номер' />
    </FormField>
    <FormField>
        <Button view='extra' type='submit'>Отправить</Button>
    </FormField>
</Form>
```
