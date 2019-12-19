```jsx
const layoutStyle = {
    paddingRight: '10px'
};

<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <span style={ layoutStyle } key={ size }>
                <MenuItem
                    size={ size }
                    type='dropdown'
                    popup='Информация о тарифах'
                >
                    Тарифы
                </MenuItem>
            </span>
        ))
    }
</div>
```
```jsx
const layoutStyle = {
    paddingRight: '10px'
};

<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <span style={ layoutStyle } key={ size }>
                <MenuItem
                    size={ size }
                    type='block'
                >
                    Депозиты
                </MenuItem>
            </span>
        ))
    }
</div>
```
```jsx
const layoutStyle = {
    paddingRight: '10px'
};

<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <span style={ layoutStyle } key={ size }>
                <MenuItem
                    size={ size }
                    type='link'
                >
                    Овердрафты
                </MenuItem>
            </span>
        ))
    }
</div>
```
