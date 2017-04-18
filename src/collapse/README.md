
```
const LOREM_IPSUM = require('../vars').LOREM_IPSUM;
<Collapse
    collapsedLabel='Подробнее'
    expandedLabel='Скрыть' >
    <span>
        { LOREM_IPSUM.slice(0, 3) }
    </span>
</Collapse>
```

Открытый
```
const LOREM_IPSUM = require('../vars').LOREM_IPSUM;
function handleExpandedChange(isExpanded){
   setState({ isExpanded });
}
initialState = {
    isExpanded: true
};
<Collapse
    collapsedLabel='Подробнее'
    expandedLabel='Скрыть'
    isExpanded={ state.isExpanded }
    onExpandedChange={ value => handleExpandedChange(value) }>
    <span>
        { LOREM_IPSUM.slice(0, 3) }
    </span>
</Collapse>
```
