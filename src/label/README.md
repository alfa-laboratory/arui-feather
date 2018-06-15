```jsx
const elipsisBoxStyles = {
    width: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

<div>
    {
        ['l'].map(size => (
            <div key={ size }>
                <div style={ elipsisBoxStyles }>
                    <Label size={ size } isNoWrap={ true }>
                        Гипермаркет
                    </Label>
                </div>
                <div style={ elipsisBoxStyles }>
                    <Label size={ size } isNoWrap={ true }>
                        Путешествие
                    </Label>
                </div>
                <div style={ elipsisBoxStyles }>
                    <Label size={ size } isNoWrap={ true }>
                        Мобильная связь, интернет, ТВ, телефон
                    </Label>
                </div>
                <div style={ elipsisBoxStyles }>
                    <Label size={ size } isNoWrap={ true }>
                        Кафе и рестораны
                    </Label>
                </div>
            </div>
        ))
    }
</div>
```
