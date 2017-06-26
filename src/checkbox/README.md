Обычный чекбокс
```
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