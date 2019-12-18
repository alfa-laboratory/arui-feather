```jsx
import Paragraph from 'arui-feather/paragraph';

function handleExpandedChange(isExpanded) {
    setState({ isExpanded });
}
initialState = {
    isExpanded: true
};
<Collapse
    collapsedLabel='Подробнее'
    expandedLabel='Скрыть'
    isExpanded={ state.isExpanded }
    onExpandedChange={ handleExpandedChange }
>
    <Paragraph>
        Альфа-Банк, основанный в 1990 году, является универсальным банком,
        осуществляющим все основные виды банковских операций, представленных
        на рынке финансовых услуг, включая обслуживание частных и корпоративных
        клиентов, инвестиционный банковский бизнес, торговое финансирование и т.д.
    </Paragraph>
</Collapse>
```
