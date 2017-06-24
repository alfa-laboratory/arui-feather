```
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
    Альфа-Банк, основанный в&nbsp;1990 году, является универсальным банком,
    осуществляющим все основные виды банковских операций, представленных
    на&nbsp;рынке финансовых услуг, включая обслуживание частных и&nbsp;
    корпоративных клиентов, инвестиционный банковский бизнес, торговое финансирование и&nbsp;т.д.
</Collapse>
```