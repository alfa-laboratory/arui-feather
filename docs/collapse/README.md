# Collapse

Компонент "подката": позволяет спрятать кусок текста за ссылку "Еще...".

```javascript
import Collapse from 'arui-feather/collapse';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| isExpanded | Boolean |  |  | Управление состоянием `expand`/`collapse` компонента |
| collapsedLabel | String | `'Expand'`  |  | Текст ссылки в `expand` состоянии |
| expandedLabel | String | `'Collapse'`  |  | Текст ссылки в `collapse` состоянии |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Collapse` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onExpandedChange | Function |  |  | Обработчик смены состояния `expand`/`collapse` |







## Типы






### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



