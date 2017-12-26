Вертикальная группа радио инпутов с заголовком
```jsx
<RadioGroup>
    {['Один', 'Два', 'Три', 'Четыре'].map(text => (
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    ))}
</RadioGroup>
```

Та же группа, теперь с заголовком и ошибкой
```jsx
<RadioGroup error='Обязательно' label='Сколько?'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text => (
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    ))}
</RadioGroup>
```

Разные размеры групп
```jsx
<div className='row'>
    {['m', 'l'].map(size => (
        <div className='column'>
            <RadioGroup key={ size } size={ size } error='Обязательно' label='Сколько?'>
                {['Один', 'Два', 'Три', 'Четыре'].map(text =>
                    <Radio text={ text } key={ text } value={ text } />
                )}
            </RadioGroup>
        </div>
    ))}
</div>
```

Разные размеры групп радио кнопок
```jsx
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row'>
            <RadioGroup
                key={ size }
                error='Обязательно'
                label='Сколько?'
                size={ size }
                type='button'
            >
                {['Один', 'Два', 'Три', 'Четыре'].map(text => (
                    <Radio
                        key={ text }
                        size={ size }
                        text={ text }
                        type='button'
                        value={ text }
                    />
                ))}
            </RadioGroup>
        </div>
    ))}
</div>
```

Горизонтальная группа радио кнопок с ошибкой, состоящая из обычных кнопок
```jsx
<RadioGroup type='button' error='Обязательно'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text => (
        <Radio
            text={ text }
            key={ text }
            value={ text }
            type='button'
        />
    ))}
</RadioGroup>
```

Горизонтальная группа радио кнопок с подсказкой
```jsx
<RadioGroup type='button' hint='Уточняющий текст'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text => (
        <Radio
            text={ text }
            key={ text }
            value={ text }
            type='button'
        />
    ))}
</RadioGroup>
```

Горизонтальная группа радио кнопок со 100% шириной
```jsx
<RadioGroup width='available' type='button'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text => (
        <Radio
            text={ text }
            key={ text }
            value={ text }
            type='button'
        />
    ))}
</RadioGroup>
```

Горизонтальная группа радио кнопок
```jsx
<RadioGroup type='line'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text => (
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    ))}
</RadioGroup>
```

Горизонтальная группа радио кнопок с лейблом и со 100% шириной

```jsx
<RadioGroup label='Число' type='button' error='Обязательно' width='available'>
    {['Один', 'Два', 'Три', 'Четыре'].map(text => (
        <Radio
            text={ text }
            key={ text }
            value={ text }
            type='button'
        />
    ))}
</RadioGroup>
```
