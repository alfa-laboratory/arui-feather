### Установка горизонтального отступа

```jsx
import GridCol from 'arui-feather/grid-col';

const style = {
    height: 30,
    background: '#ff5c5c'
};

<GridRow gutter={ { mobile: 0, tablet: 16, desktop: { m: 24 } } }>
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
```

### Выравнивание

По вертикали

```jsx
import GridCol from 'arui-feather/grid-col';

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

<div>
    <div style={ { background: '#f3f4f5', marginBottom: 10 } }>
        <GridRow align='top'>
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
        <GridRow align='middle'>
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
        <GridRow align='bottom'>
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
</div>
```

По горизонтали

```jsx
import GridCol from 'arui-feather/grid-col';

const style = {
    height: 30,
    background: '#ff5c5c',
    marginBottom: 10
};

<div>
    <GridRow justify='left'>
        <GridCol width='4'>
            <div style={ style } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
    </GridRow>
    <GridRow justify='center'>
        <GridCol width='4'>
            <div style={ style } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
    </GridRow>
    <GridRow justify='right'>
        <GridCol width='4'>
            <div style={ style } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
    </GridRow>
    <GridRow justify='around'>
        <GridCol width='4'>
            <div style={ style } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
    </GridRow>
    <GridRow justify='between'>
        <GridCol width='4'>
            <div style={ { ...style, marginBottom: 0 } } />
        </GridCol>
        <GridCol width='4'>
            <div style={ { ...style, background: '#f04539', marginBottom: 0 } } />
        </GridCol>
    </GridRow>
</div>
```
