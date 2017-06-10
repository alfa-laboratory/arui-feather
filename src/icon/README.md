```
<div>
    {['error', 'fail', 'ok', 'ok_filled', 'calendar', 'search', 'close', 'user'].map(icon => (
        <div className='layout' >
            {['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <div style={{ paddingRight: '30px' }} >
                    <Icon {...{size, icon}} />
                </div>
            ))}
        </div>
    ))}
</div>
```
Иконки error и ok поддерживающие цветную тему
```
<div>
    {['error', 'ok'].map(icon => (
        <div className='layout' >
            {['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <div style={{ paddingRight: '30px' }} >
                    <Icon {...{
                            size,
                            icon,
                            theme: 'alfa-on-colored'
                        }
                    } />
                </div>
            ))}
        </div>
    ))}
</div>
```
