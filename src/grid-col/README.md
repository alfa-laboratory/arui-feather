```jsx
import GridRow from 'arui-feather/grid-row';

const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    background: '#ff5c5c',
    textAlign: 'center',
    marginTop: 10
};

<div>
    <GridRow>
        <GridCol width={ { desktop: { m: 12 } } }>
            <div style={ { ...style, background: '#f04539', marginTop: 0 } }>12</div>
        </GridCol>
    </GridRow>
    <GridRow>
        {
            [1, 2].map(key => (
                <GridCol width='6' key={ key }>
                    <div style={ style }>6</div>
                </GridCol>
            ))
        }
    </GridRow>
    <GridRow>
        {
            [1, 2, 3].map(key => (
                <GridCol width='4' key={ key }>
                    <div style={ { ...style, background: '#f04539' } }>4</div>
                </GridCol>
            ))
        }
    </GridRow>
    <GridRow>
        {
            [1, 2, 3, 4].map(key => (
                <GridCol width='3' key={ key }>
                    <div style={ style }>3</div>
                </GridCol>
            ))
        }
    </GridRow>
    <GridRow>
        {
            [1, 2, 3, 4, 5, 6].map(key => (
                <GridCol width='2' key={ key }>
                    <div style={ { ...style, background: '#f04539' } }>2</div>
                </GridCol>
            ))
        }
    </GridRow>
    <GridRow>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(key => (
                <GridCol width='1' key={ key }>
                    <div style={ style }>1</div>
                </GridCol>
            ))
        }
    </GridRow>
</div>
```

### Адаптивная ширина

Сетку можно настроить для каждой контрольной точки для построения сложного адаптивного интерфейса.

```jsx
import GridRow from 'arui-feather/grid-row';

const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c',
    marginBottom: '10px'
};

<div style={ { marginBottom: '-10px' } }>
    <GridRow>
        <GridCol width={ { mobile: 12, tablet: 12, desktop: 4 } }>
            <div style={ style } />
        </GridCol>
        <GridCol width={ { mobile: 12, tablet: 6, desktop: 4 } }>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
        <GridCol width={ { mobile: 12, tablet: 6, desktop: 4 } }>
            <div style={ style } />
        </GridCol>
    </GridRow>
</div>
```

### Вертикальное выравнивание

```jsx
import GridRow from 'arui-feather/grid-row';

const style = {
    height: 30,
    background: '#ff5c5c'
};

<div style={ { background: '#f3f4f5' } }>
    <GridRow>
        <GridCol align='top'>
            <div style={ style } />
        </GridCol>
        <GridCol align='middle'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
        <GridCol align='bottom'>
            <div style={ style } />
        </GridCol>
        <div style={ { width: 0, height: 90, padding: 0 } } />
    </GridRow>
</div>
```

### Изменение порядка элементов

```jsx
import GridRow from 'arui-feather/grid-row';

const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c'
};

<GridRow>
    <GridCol order='1'>
        <div style={ style }>Первый (order=1)</div>
    </GridCol>
    <GridCol order='3'>
        <div style={ style }>Второй (order=3)</div>
    </GridCol>
    <GridCol order='2'>
        <div style={ { ...style, background: '#f04539' } }>Третий (order=2)</div>
    </GridCol>
</GridRow>
```

Для быстрого изменения порядка одного элемента, возможно использование значений `first` и `last`.

### Смещение колонок

```jsx
import GridRow from 'arui-feather/grid-row';

const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c'
};

<div>
    <GridRow>
        <GridCol width='4'>
            <div style={ style }>width 4</div>
        </GridCol>
        <GridCol width='4' offset='4'>
            <div style={ { ...style, background: '#f04539' } }>width 4, offset 4</div>
        </GridCol>
    </GridRow>
</div>
```
