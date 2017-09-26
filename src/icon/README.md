```jsx
<div>
    {['error', 'fail', 'ok', 'ok_filled', 'calendar', 'search', 'close', 'user'].map(icon => (
        <div className='row' >
            {['s', 'm', 'l', 'xl'].map(size => (
                <div className='column l' >
                    <Icon
                        name={ icon }
                        size={ size }
                    />
                </div>
            ))}
        </div>
    ))}
</div>
```

Иконки error и ok поддерживающие цветную тему
```jsx
<div>
    {['error', 'ok'].map(icon => (
        <div className='row' >
            {['s', 'm', 'l', 'xl'].map(size => (
                <div className='column l' >
                    <Icon
                        name={ icon }
                        size={ size }
                        theme='alfa-on-colored'
                    />
                </div>
            ))}
        </div>
    ))}
</div>
```
