Вертикальная группа чекбоксов
```
<CheckBoxGroup>
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
    <div className='row'>
        <div className='column'>
            <CheckBox
                disabled={ true }
                text='Текущий'
                type='button'
            />
        </div>
        <div className='column'>
            <CheckBox
                text='Основной'
                type='button'
            />
        </div>
        <div className='column'>
            <CheckBox
                text='Семейный'
                disabled={ true }
                type='button'
            />
        </div>
        <div className='column'>
            <CheckBox
                text='Зарплатный'
                type='button'
            />
        </div>
    </div>
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
