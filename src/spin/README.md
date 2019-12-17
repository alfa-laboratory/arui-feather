```jsx
import Button from 'arui-feather/button';

const layoutStyle = {
    paddingRight: '10px'
};

<div>
    <div className='row'>
        {
            ['xl', 'l'].map(size => (
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
            ))
        }
    </div>
    <div className='row'>
        {
            ['m', 's'].map(size => (
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
            ))
        }
    </div>
</div>
```
