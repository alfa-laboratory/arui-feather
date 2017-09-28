```jsx
<div>
    {['error', 'fail', 'ok', 'ok-filled', 'calendar', 'search', 'close', 'user'].map(icon => (
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

Пример использования цветных иконок
```jsx
<div>
    {['error', 'ok'].map(icon => (
        <div className='row' >
            {['s', 'm', 'l', 'xl'].map(size => (
                <div className='column l' >
                    <Icon
                        name={ icon }
                        size={ size }
                        colored={ true }
                    />
                </div>
            ))}
        </div>
    ))}
</div>
```
