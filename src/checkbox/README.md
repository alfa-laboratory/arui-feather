Чекбокс обычного вида
```jsx
import CheckBox from 'arui-feather/checkbox';

<div>
    <div>
        {
            ['m', 'l'].map(size => (
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
            ))
        }
    </div>
</div>
```

Чекбокс в виде кнопки (применяется обычно в нескольких экземплярах в [CheckboxGroup](#!/CheckBoxGroup))
```jsx
<div>
    <div>
        {
            ['s', 'm', 'l', 'xl'].map(size => (
                <div className='row' key={ size }>
                    <div className='column'>
                        <CheckBox
                            text='Согласен с условиями'
                            type='button'
                            size={ size }
                        />
                    </div>
                    <div className='column'>
                        <CheckBox
                            text='Согласен с условиями'
                            type='button'
                            size={ size }
                            disabled={ true }
                        />
                    </div>
                </div>
            ))
        }
    </div>
</div>
```

Чекбокс с неустановленным состоянием
```jsx
<div>
    {
        ['m', 'l'].map(size => (
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
        ))
    }
</div>
```
