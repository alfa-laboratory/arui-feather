Обычный чекбокс
```jsx
<div>
    <div>
        {['m', 'l'].map(size => (
            <div className='row' key={ size }>
                <div className='column'>
                    <CheckBox
                        text='Согласен с условиями'
                        size={ size }
                    />
                </div>
                <div className='column'>
                    <CheckBox
                        text='Согласен с условиями'
                        size={ size }
                        disabled={ true }
                    />
                </div>
            </div>
        ))}
    </div>
</div>
```

Неустановленное состояние
```jsx
<div>
    {['m', 'l'].map(size => (
        <div className='row' key={ size }>
            <div className='column'>
                <CheckBox
                    text='Выбраны не все услуги'
                    size={ size }
                    indeterminate={ true }
                />
            </div>
            <div className='column'>
                <CheckBox
                    text='Выбраны не все услуги'
                    size={ size }
                    disabled={ true }
                    indeterminate={ true }
                />
            </div>
        </div>
    ))}
</div>
```
