Вертикальная группа чекбоксов с заголовком
```
<CheckBoxGroup label=<Label size='m'>Выберите счёт</Label>>
    <CheckBox
        text='Текущий счет'
    />
    <CheckBox
        text='Основной счет'
    />
    <CheckBox
        text='Семейный счет'
    />
    <CheckBox
        text='Зарплатный счет'
    />
</CheckBoxGroup>
```

Горизонтальная группа чекбоксов, состоящая из обычных кнопок
```
<CheckBoxGroup type='button'>
    <CheckBox
        disabled={ true }
        text='Текущий'
        type='button'
    />
    <CheckBox
        text='Основной'
        type='button'
    />
    <CheckBox
        text='Семейный'
        disabled={ true }
        type='button'
    />
    <CheckBox
        text='Зарплатный'
        type='button'
    />
</CheckBoxGroup>
```

Горизонтальная группа чекбоксов
```
<CheckBoxGroup type='line'>
    <CheckBox
        text='Текущий'
    />
    <CheckBox
        text='Основной'
    />
    <CheckBox
        text='Семейный'
    />
    <CheckBox
        text='Зарплатный'
    />
</CheckBoxGroup>
```
