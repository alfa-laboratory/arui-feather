```jsx
<div>
    {['action-error', 'action-fail', 'action-ok', 'action-ok-filled', 'tool-close', 'tool-calendar'].map(icon => (
        <div className='row' key={ icon } >
            {['s', 'm', 'l', 'xl'].map(size => (
                <div className='column l' key={ size } >
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
        <div className='row' key={ icon } >
            {['s', 'm', 'l', 'xl'].map(size => (
                <div className='column l' key={ size } >
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
