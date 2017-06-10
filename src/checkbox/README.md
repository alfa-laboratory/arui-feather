Обычный чекбокс
```
<div>
    <div>
        {['m', 'l'].map(size => (
            <div className={'layout'} key={ size }>
                <CheckBox
                    text='Обычный чекбокс'
                    size={ size }
                />
            </div>
        ))}
    </div>
    <div>
        {['m', 'l'].map(size => (
            <div className={'layout'} key={ size }>
                <CheckBox
                    text='Обычный чекбокс'
                    size={ size }
                    disabled={ true }
                />
            </div>
        ))}
    </div>
</div>
```

Чекбокс - кнопка
```
<div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div className={'layout'} key={ size }>
                <CheckBox
                    text='Чекбокс - кнопка'
                    size={ size }
                    type='button'
                />
            </div>
        ))}
    </div>
    <br />
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div className={'layout'} key={ size }>
                <CheckBox
                    text='Чекбокс - кнопка'
                    size={ size }
                    type='button'
                    disabled={ true }
                />
            </div>
        ))}
    </div>
</div>
```
