Контрольные точки для медиа запросов | **`<`768p** | **`>=`768px** | **`>=`1024px** | **`>=`1440px**           
-------------------------------------|-------------|--------------------------------|---------------
Максимальная ширина контейнера       | Нет (авто)  | 720px         | 960px          | 1140px           

```jsx
<GridContainer width='available'>
    <div style={ { height: 30, background: '#FF5C5C' } } />
</GridContainer>
```
Использование горизонтального отступа совместно с `gutter` компонента `GridRow`.
```jsx
const style = {
    height: 30,
    background: '#ff5c5c'
};
<GridContainer width='available' gutter={ { sm: 8, xl: 16 } }>
    <GridRow gutter={ { sm: 8, xl: 16 } }>
        <GridCol>
            <div style={ style }></div>
        </GridCol>
        <GridCol>
            <div style={ { ...style, background: '#f04539' } }></div>
        </GridCol>
        <GridCol>
            <div style={ style }></div>
        </GridCol>
    </GridRow>
</GridContainer>
```
