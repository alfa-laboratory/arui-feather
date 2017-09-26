Обычные кнопки
```jsx
const buttons = [
    { size: 's', name: 'Применить' },
    { size: 'm', name: 'Применить' },
    { size: 'l', name: 'Применить' },
    { size: 'xl', name: 'Применить' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row'>
            <div className='column' key={ size }>
                <Button size={ size }>{`${name}`}</Button>
            </div>
            <div className='column'>
                <Button size={ size } disabled={ true }>{`${name}`}</Button>
            </div>
        </div>
    ))}
</div>
```

Псевдокнопки
```jsx
const buttons = [
    { size: 's', name: 'Показать' },
    { size: 'm', name: 'Показать' },
    { size: 'l', name: 'Показать' },
    { size: 'xl', name: 'Показать' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button pseudo={ true } size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

Кнопки действия

```jsx
const buttons = [
    { size: 's', name: 'Продолжить' },
    { size: 'm', name: 'Продолжить' },
    { size: 'l', name: 'Продолжить' },
    { size: 'xl', name: 'Продолжить' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button view='action' size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

Экстра кнопки
```jsx
const buttons = [
    { size: 's', name: 'Оплатить' },
    { size: 'm', name: 'Оплатить' },
    { size: 'l', name: 'Оплатить' },
    { size: 'xl', name: 'Оплатить' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button view='extra' size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

Другие кнопки
```jsx
const buttons = [
    { size: 's', name: 'Подтвердить' },
    { size: 'm', name: 'Подтвердить' },
    { size: 'l', name: 'Подтвердить' },
    { size: 'xl', name: 'Подтвердить' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button view='other' size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```

С иконкой
```jsx
const buttons = [
    { size: 's', name: 'Скачать' },
    { size: 'm', name: 'Скачать' },
    { size: 'l', name: 'Скачать' },
    { size: 'xl', name: 'Скачать' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button size={ size }>
                <div style={ { marginRight: '8px', display: 'inline-block' } } >
                    <Icon size={ size } name='ok' />
                </div>
                {`${name}`}
            </Button>
        </div>
    ))}
</div>
```

Со 100%-й шириной
```jsx
const buttons = [
    { size: 's', name: 'Заказать карту' },
    { size: 'm', name: 'Заказать карту' },
    { size: 'l', name: 'Заказать карту' },
    { size: 'xl', name: 'Заказать карту' }
];
<div>
    {buttons.map(({ size, name }) => (
        <div className='row' key={ size }>
            <Button width='available' size={ size }>{`${name}`}</Button>
        </div>
    ))}
</div>
```
