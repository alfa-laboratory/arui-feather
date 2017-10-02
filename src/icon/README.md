```jsx
<div>
    {['action-error', 'action-fail', 'action-ok', 'action-ok-filled', 'action-close', 'calendar'].map(icon => (
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
    {['action-error', 'action-ok'].map(icon => (
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
