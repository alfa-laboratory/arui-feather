```
const layoutStyle = {
    paddingRight: '10px'
};
<div>
    {['', 'pseudo', 'disabled', 'checked'].map(mod => (
        <div key={ mod }>
            {['s', 'm', 'l', 'xl'].map(size => (
                <span style={ layoutStyle }>
                    <Link {...{
                        text: `${mod} link`,
                        size,
                        [mod]: true
                    }} />
                </span>
            ))}
        </div>
    ))}
</div>
```

```
const layoutStyle = {
    paddingRight: '10px'
};
const iconStyle = {
    marginRight: '5px'
};
<div>
    {['', 'pseudo', 'disabled', 'checked'].map(mod => (
        <div key={ mod }>
            {['s', 'm', 'l', 'xl'].map(size => {
                const props = {
                    text: `${mod} link`,
                    size,
                    [mod]: true
                };
                return  (
                    <span style={ layoutStyle }>
                        <Link { ...props } >
                            <Icon { ...props } style={ iconStyle } icon='ok' />
                        </Link>
                    </span>
                );
            })}
        </div>
    ))}
</div>
```