```jsx
<div>
    { ['s', 'm'].map(size => (
        <React.Fragment key={ size }>
            <div className='row'>
                <Toggle size={ size } />
            </div>
            <div className='row'>
                <Toggle label='Лейбл' size={ size } />
            </div>
            <div className='row'>
                <Toggle label='Лейбл' hint='Хинт' size={ size } />
            </div>
            <div className='row'>
                <Toggle label='Лейбл' disabled={ true } size={ size } />
            </div>
        </React.Fragment>
    )) }
</div>
```
