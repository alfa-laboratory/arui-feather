```
<div>
    {['error', 'fail', 'ok', 'ok_filled', 'calendar', 'search', 'close', 'user'].map(icon => (
        <div>
            {['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <Icon {...{size, icon}} />
            ))}
        </div>
    ))}
</div>
```
