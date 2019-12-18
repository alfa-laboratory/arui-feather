Вертикальная группа чекбоксов с заголовком
```jsx
import CheckBox from 'arui-feather/checkbox';
import Label from 'arui-feather/label';

<CheckBoxGroup label={ <Label size='m'>Выберите счёт</Label> }>
    <CheckBox
        text='Текущий счет'
        value='Текущий'
    />
    <CheckBox
        text='Основной счет'
        value='Основной'
    />
    <CheckBox
        text='Семейный счет'
        value='Семейный'
    />
    <CheckBox
        text='Зарплатный счет'
        value='Зарплатный'
    />
</CheckBoxGroup>
```

Горизонтальная группа чекбоксов, состоящая из обычных кнопок
```jsx
import CheckBox from 'arui-feather/checkbox';

<CheckBoxGroup type='button'>
    <CheckBox
        disabled={ true }
        text='Текущий'
        type='button'
        value='Текущий'
    />
    <CheckBox
        text='Основной'
        type='button'
        value='Основной'
    />
    <CheckBox
        text='Семейный'
        disabled={ true }
        type='button'
        value='Семейный'
    />
    <CheckBox
        text='Зарплатный'
        type='button'
        value='Зарплатный'
    />
</CheckBoxGroup>
```

Горизонтальная группа неактивных чекбоксов, состоящая из обычных кнопок
```jsx
import CheckBox from 'arui-feather/checkbox';

<CheckBoxGroup type='button' disabled={ true }>
    <CheckBox
        text='Текущий'
        value='Текущий'
        type='button'
    />
    <CheckBox
        text='Основной'
        value='Основной'
        type='button'
    />
    <CheckBox
        text='Семейный'
        value='Семейный'
        type='button'
    />
    <CheckBox
        text='Зарплатный'
        value='Зарплатный'
        type='button'
    />
</CheckBoxGroup>
```

Горизонтальная группа чекбоксов
```jsx
import CheckBox from 'arui-feather/checkbox';

<CheckBoxGroup type='line'>
    <CheckBox
        text='Текущий'
        value='Текущий'
    />
    <CheckBox
        text='Основной'
        value='Основной'
    />
    <CheckBox
        text='Семейный'
        value='Семейный'
    />
    <CheckBox
        text='Зарплатный'
        value='Зарплатный'
    />
</CheckBoxGroup>
```

Горизонтальная группа неактивных чекбоксов
```jsx
import CheckBox from 'arui-feather/checkbox';

<CheckBoxGroup type='line' disabled={ true }>
    <CheckBox
        text='Текущий'
        value='Текущий'
    />
    <CheckBox
        text='Основной'
        value='Основной'
    />
    <CheckBox
        text='Семейный'
        value='Семейный'
    />
    <CheckBox
        text='Зарплатный'
        value='Зарплатный'
    />
</CheckBoxGroup>
```
