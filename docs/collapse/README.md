# Collapse

Компонент "подката": позволяет спрятать кусок текста за ссылку "Еще...".

```javascript
import Collapse from 'arui-feather/collapse';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| isExpanded | Type.bool |  |  | Управление состоянием `expand`/`collapse` компонента |
| collapsedLabel | Type.string | `'Expand'`  |  | Текст ссылки в `expand` состоянии |
| expandedLabel | Type.string | `'Collapse'`  |  | Текст ссылки в `collapse` состоянии |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `Collapse` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onExpandedChange | Type.func |  |  | Обработчик смены состояния `expand`/`collapse` |











