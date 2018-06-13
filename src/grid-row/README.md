### Установка горизонтального отступа
```jsx
const style = {
    height: 30,
    background: '#ff5c5c'
};
<GridContainer width='available' gutter={ { sm: 0, md: 8, xl: 16 } }>
    <GridRow gutter={ { sm: 0, md: 8, xl: 16 } }>
        <GridCol>
            <div style={ style } />
        </GridCol>
        <GridCol>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
        <GridCol>
            <div style={ style } />
        </GridCol>
    </GridRow>
</GridContainer>
```
### Изменение направления колонок
```jsx
const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c'
};
<GridContainer width='available'>
    <GridRow reverse={ true }>
        <GridCol>
            <div style={ style }>Первая</div>
        </GridCol>
        <GridCol>
            <div style={ { ...style, background: '#f04539' } }>Вторая</div>
        </GridCol>
        <GridCol>
            <div style={ style }>Третья</div>
        </GridCol>
    </GridRow>
</GridContainer>
```
### Выравнивание
По вертикали.
```jsx
const style = {
    height: 30,
    background: '#ff5c5c'
};
const styleLastDiv = {
    width: 0,
    height: 90,
    padding: 0,
    marginBottom: 10
};
<GridContainer width='available' gutter='0'>
    <div style={ { background: '#f3f4f5', marginBottom: 10 } }>
        <GridRow align='top' gutter='0'>
            <GridCol>
                <div style={ style } />
            </GridCol>
            <GridCol>
                <div style={ { ...style, background: '#f04539' } } />
            </GridCol>
            <GridCol>
                <div style={ style } />
            </GridCol>
            <div style={ styleLastDiv } />
        </GridRow>
    </div>
    <div style={ { background: '#f3f4f5', marginBottom: 10 } }>
        <GridRow align='middle' gutter='0'>
            <GridCol>
                <div style={ style } />
            </GridCol>
            <GridCol>
                <div style={ { ...style, background: '#f04539' } } />
            </GridCol>
            <GridCol>
                <div style={ style } />
            </GridCol>
            <div style={ styleLastDiv } />
        </GridRow>
    </div>
    <div style={ { background: '#f3f4f5' } }>
        <GridRow align='bottom' gutter='0'>
            <GridCol>
                <div style={ style } />
            </GridCol>
            <GridCol>
                <div style={ { ...style, background: '#f04539' } } />
            </GridCol>
            <GridCol>
                <div style={ style } />
            </GridCol>
            <div style={ { ...styleLastDiv, marginBottom: 0 } } />
        </GridRow>
    </div>
</GridContainer>
```
По горизонтали.
```jsx
const style = {
    height: 30,
    background: '#ff5c5c',
    marginBottom: 10
};
<GridContainer width='available' gutter='0'>
    <GridRow justify='left' gutter='0'>
        <GridCol width='4'>
            <div style={ style } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
    </GridRow>
    <GridRow justify='center' gutter='0'>
        <GridCol width='4'>
            <div style={ style } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
    </GridRow>
    <GridRow justify='right' gutter='0'>
        <GridCol width='4'>
            <div style={ style } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
    </GridRow>
    <GridRow justify='around' gutter='0'>
        <GridCol width='4'>
            <div style={ style } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
    </GridRow>
    <GridRow justify='between' gutter='0'>
        <GridCol width='4'>
            <div style={ { ...style, marginBottom: 0 } } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539', marginBottom: 0 } } />
        </GridCol>
    </GridRow>
</GridContainer>
```
### Вложенность
```jsx
const style = {
    display: 'inline-block',
    color: '#fff',
    padding: '5px 10px'
};
<GridRow gutter='8'>
    <GridCol width='12' gutter='8'>
        <div style={ { background: '#ff5c5c' } }>
            <span style={ style }>Уровень 1</span>
            <GridRow gutter='8'>
                <GridCol width='9'>
                    <div style={ { background: '#f04539' } }>
                        <span style={ style }>Уровень 2</span>
                    </div>
                </GridCol>
            </GridRow>
        </div>
    </GridCol>
</GridRow>
```
