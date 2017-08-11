```jsx
const layoutStyle = {
    paddingRight: '10px'
};
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <span key={ size } style={ layoutStyle } >
            <Button
                icon={
                    <Spin
                        size={ size }
                        visible={ true }
                    />
                }
                size={ size }
            >
                Документы загружаются...
            </Button>
        </span>
    ))}
</div>
```