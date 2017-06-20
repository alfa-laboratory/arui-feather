Обычный чекбокс
```
<div>
    <div>
        {['m', 'l'].map(size => (
            <div className='row' key={ size }>
                <div className='column'>
                    <CheckBox
                        text='Обычный чекбокс'
                        size={ size }
                    />
                </div>
                <div className='column'>
                    <CheckBox
                        text='Обычный чекбокс'
                        size={ size }
                        disabled={ true }
                    />
                </div>
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
            <div className={'row'} key={ size }>
                <div className='column'>
                    <CheckBox
                        text='Чекбокс - кнопка'
                        size={ size }
                        type='button'
                    />
                </div>
                <div className='column'>
                    <CheckBox
                        text='Чекбокс - кнопка'
                        size={ size }
                        type='button'
                        disabled={ true }
                    />
                </div>
            </div>
        ))}
    </div>
</div>
```
