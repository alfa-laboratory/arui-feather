```
<div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <CheckBox
                    text='Чекбокс'
                    size={size}
                />
            </div>
        ))}
    </div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <CheckBox
                    text='Чекбокс disabled'
                    size={size}
                    disabled={ true }
                />
            </div>
        ))}
    </div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <CheckBox
                    text='Чекбокс - кнопка'
                    size={size}
                    type='button'
                />
            </div>
        ))}
    </div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <CheckBox
                    text='Чекбокс - кнопка'
                    size={size}
                    type='button'
                    disabled={ true }
                />
            </div>
        ))}
    </div>
</div>
```
