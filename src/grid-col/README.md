```jsx
const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    background: '#ff5c5c',
    textAlign: 'center',
    marginTop: 10
};
<GridContainer width='available' gutter='8'>
    <GridRow gutter='8'>
        <GridCol width='12'>
            <div style={ { ...style, background: '#f04539', marginTop: 0 } }>12</div>
        </GridCol>
    </GridRow>
    <GridRow gutter='8'>
        {
            [1, 2].map(key => (
                <GridCol width='6' key={ key }>
                    <div style={ style }>6</div>
                </GridCol>
            ))
        }
    </GridRow>
    <GridRow gutter='8'>
        {
            [1, 2, 3].map(key => (
                <GridCol width='4' key={ key }>
                    <div style={ { ...style, background: '#f04539' } }>4</div>
                </GridCol>
            ))
        }
    </GridRow>
    <GridRow gutter='8'>
        {
            [1, 2, 3, 4].map(key => (
                <GridCol width='3' key={ key }>
                    <div style={ style }>3</div>
                </GridCol>
            ))
        }
    </GridRow>
    <GridRow gutter='8'>
        {
            [1, 2, 3, 4, 5, 6].map(key => (
                <GridCol width='2' key={ key }>
                    <div style={ { ...style, background: '#f04539' } }>2</div>
                </GridCol>
            ))
        }
    </GridRow>
    <GridRow gutter='8'>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(key => (
                <GridCol width='1' key={ key }>
                    <div style={ style }>1</div>
                </GridCol>
            ))
        }
    </GridRow>
</GridContainer>
```
### Автоматическая ширина
```jsx
const style = {
    height: 30,
    background: '#ff5c5c'
};
<GridRow gutter='0'>
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
Колонки автоматической ширины можно разместить в виде строк.
Но стоит обратить внимание на [баг](https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrapping-flex-items),
который нуждается в добавлении аттрибута `flex-basis` или `border`. 
 
```jsx
const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c'
};
<GridRow gutter='0'>
    <GridCol>
        <div style={ style }>Col</div>
    </GridCol>
    <GridCol>
        <div style={ { ...style, background: '#f04539' } }>Col</div>
    </GridCol>
    <GridCol width='available'></GridCol>
    <GridCol>
        <div style={ { ...style, background: '#f04539' } }>Col</div>
    </GridCol>
    <GridCol>
        <div style={ style }>Col</div>
    </GridCol>
</GridRow>
```
Установка ширины одной колонки.
```jsx
const style = {
    height: 30,
    background: '#ff5c5c'
};
<GridRow gutter='0'>
    <GridCol>
        <div style={ style } />
    </GridCol>
    <GridCol width='6'>
        <div style={ { ...style, background: '#f04539' } } />
    </GridCol>
    <GridCol>
        <div style={ style } />
    </GridCol>
</GridRow>
```
Установка ширины по содержимому колонки.
```jsx
const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    background: '#ff5c5c'
};
<GridRow justify='center' gutter='0'>
    <GridCol width='2'>
        <div style={ style } />
    </GridCol>
    <GridCol width='auto'>
        <div style={ { ...style, background: '#f04539', padding: '0 20px' } }>
            Ширина по содержимому колонки
        </div>
    </GridCol>
    <GridCol width='2'>
        <div style={ style } />
    </GridCol>
</GridRow>
```
### Адаптивная ширина
Сетка включает 5 контрольных точек для построения сложного адаптивного контента.

Все контрольные точки.
```jsx
const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c'
};
<GridRow gutter='0'>
    <GridCol width='2'>
        <div style={ style }>2</div>
    </GridCol>
    <GridCol width='3'>
        <div style={ { ...style, background: '#f04539' } }>3</div>
    </GridCol>
    <GridCol width='5'>
        <div style={ style }>5</div>
    </GridCol>
    <GridCol width='2'>
        <div style={ { ...style, background: '#f04539' } }>2</div>
    </GridCol>
</GridRow>
```
Разные контрольные точки.
```jsx
const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c',
    marginBottom: '5px 0'
};
<GridRow gutter='0'>
    <GridCol width='2'>
        <div style={ style }>width=2</div>
    </GridCol>
    <GridCol sm='10' md='5' lg='10' xl='3'>
        <div style={ { ...style, background: '#f04539' } }>sm=10 md=5 lg=10 xl=3</div>
    </GridCol>
    <GridCol sm='5' lg='10' xl='5'>
        <div style={ style }>sm=5 lg=10 xl=5</div>
    </GridCol>
    <GridCol sm='7' md='12' lg='2'>
        <div style={ { ...style, background: '#f04539' } }>sm=7 md=12 lg=2</div>
    </GridCol>
</GridRow>
```
Для разных контрольных точек, так же возможна ширина `auto` и `available`.

### Вертикальное выравнивание
```jsx
const style = {
    height: 30,
    background: '#ff5c5c'
};
<div style={ { background: '#f3f4f5' } }>
    <GridRow gutter='0'>
        <GridCol align='top'>
            <div style={ style } />
        </GridCol>
        <GridCol align='middle'>
            <div style={ { ...style, background: '#f04539' } } />
        </GridCol>
        <GridCol align='bottom'>
            <div style={ style }></div>
        </GridCol>
        <div style={ { width: 0, height: 90, padding: 0 } } />
    </GridRow>
</div>
```
### Изменение порядка элементов
```jsx
const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c'
};
<GridRow gutter='0'>
    <GridCol>
        <div style={ style }>Первый (order=0)</div>
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
const style = {
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    textAlign: 'center',
    background: '#ff5c5c'
};
<GridContainer width='available'>
    <GridRow gutter='0'>
        <GridCol width='4'>
            <div style={ style }>4</div>
        </GridCol>
        <GridCol width='4' offset='4'>
            <div style={ { ...style, background: '#f04539' } }>4 (offset=4)</div>
        </GridCol>
    </GridRow>
    <GridRow gutter='0'>
        <GridCol sm='4' offset={ { md: 2, lg: 0, xl: 2 } }>
            <div style={ { ...style, background: '#f04539', marginTop: 10 } }>
                sm=4 offset=&#123; md: 2, lg: 0, xl: 2 &#125;
            </div>
        </GridCol>
        <GridCol sm='4' offset={ { sm: 4, md: 0, lg: 1 } }>
            <div style={ { ...style, marginTop: 10 } }>
                sm=4 offset=&#123; sm: 4, md: 0, lg: 1 &#125;
            </div>
        </GridCol>
    </GridRow>
</GridContainer>
```
