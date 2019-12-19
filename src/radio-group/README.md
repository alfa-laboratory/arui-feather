Вертикальная группа радио инпутов с заголовком
```jsx
import Radio from 'arui-feather/radio';

<RadioGroup>
    {
        ['Один', 'Два', 'Три', 'Четыре'].map(text => (
            <Radio
                text={ text }
                key={ text }
                value={ text }
            />
        ))
    }
</RadioGroup>
```

Та же группа, теперь с заголовком и ошибкой
```jsx
import Radio from 'arui-feather/radio';

<RadioGroup error='Обязательно' label='Сколько?'>
    {
        ['Один', 'Два', 'Три', 'Четыре'].map(text => (
            <Radio
                text={ text }
                key={ text }
                value={ text }
            />
        ))
    }
</RadioGroup>
```

Разные размеры групп
```jsx
import Radio from 'arui-feather/radio';

<div className='row'>
    {
        ['m', 'l'].map(size => (
            <div key={ size } className='column'>
                <RadioGroup
                    key={ size }
                    size={ size }
                    error='Обязательно'
                    label='Сколько?'
                >
                    {
                        ['Один', 'Два', 'Три', 'Четыре'].map(text => <Radio text={ text } key={ text } value={ text } />
                        )
                    }
                </RadioGroup>
            </div>
        ))
    }
</div>
```

Разные размеры групп радио кнопок
```jsx
import Radio from 'arui-feather/radio';

<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size } className='row'>
                <RadioGroup
                    error='Обязательно'
                    label='Сколько?'
                    size={ size }
                    type='button'
                >
                    {
                        ['Один', 'Два', 'Три', 'Четыре'].map(text => (
                            <Radio
                                key={ text }
                                size={ size }
                                text={ text }
                                type='button'
                                value={ text }
                            />
                        ))
                    }
                </RadioGroup>
            </div>
        ))
    }
</div>
```

Горизонтальная группа радио кнопок с ошибкой, состоящая из обычных кнопок
```jsx
import Radio from 'arui-feather/radio';

<RadioGroup type='button' error='Обязательно'>
    {
        ['Один', 'Два', 'Три', 'Четыре'].map(text => (
            <Radio
                text={ text }
                key={ text }
                value={ text }
                type='button'
            />
        ))
    }
</RadioGroup>
```

Горизонтальная группа радио кнопок с подсказкой
```jsx
import Radio from 'arui-feather/radio';

<RadioGroup type='button' hint='Уточняющий текст'>
    {
        ['Один', 'Два', 'Три', 'Четыре'].map(text => (
            <Radio
                text={ text }
                key={ text }
                value={ text }
                type='button'
            />
        ))
    }
</RadioGroup>
```

Горизонтальная группа радио кнопок со 100% шириной
```jsx
import Radio from 'arui-feather/radio';

<RadioGroup width='available' type='button'>
    {
        ['Один', 'Два', 'Три', 'Четыре'].map(text => (
            <Radio
                text={ text }
                key={ text }
                value={ text }
                type='button'
            />
        ))
    }
</RadioGroup>
```

Горизонтальная группа радио кнопок
```jsx
import Radio from 'arui-feather/radio';

<RadioGroup type='line'>
    {
        ['Один', 'Два', 'Три', 'Четыре'].map(text => (
            <Radio
                text={ text }
                key={ text }
                value={ text }
            />
        ))
    }
</RadioGroup>
```

Горизонтальная группа радио кнопок с лейблом и со 100% шириной
```jsx
import Radio from 'arui-feather/radio';

<RadioGroup label='Число' type='button' error='Обязательно' width='available'>
    {
        ['Один', 'Два', 'Три', 'Четыре'].map(text => (
            <Radio
                text={ text }
                key={ text }
                value={ text }
                type='button'
            />
        ))
    }
</RadioGroup>
```
