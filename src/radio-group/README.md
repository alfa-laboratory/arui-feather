Вертикальная группа радио инпутов с заголовком
```
<RadioGroup>
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    )}
</RadioGroup>
```

Та же группа, теперь с заголовком и ошибкой
```
<RadioGroup error='Обязательно' label='Сколько?'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    )}
</RadioGroup>
```

Горизонтальная группа радио кнопок с ошибкой, состоящая из обычных кнопок
```
<RadioGroup type='button' error='Обязательно'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
            type='button'
        />
    )}
</RadioGroup>
```

Горизонтальная группа радио кнопок со 100% шириной
```
<RadioGroup width='available' type='button'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
            type='button'
        />
    )}
</RadioGroup>
```

Горизонтальная группа радио кнопок
```
<RadioGroup type='line'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    )}
</RadioGroup>
```
