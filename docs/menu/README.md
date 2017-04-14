# Menu

Компонент меню.

```javascript
import Menu from 'arui-feather/menu';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| view | String |  |  | Тип расположения меню: 'horizontal' |
| mode | [ModeEnum](#ModeEnum) | `'basic'`  |  | Тип списка вариантов меню |
| disabled | Boolean |  |  | Управление возможностью изменения значения |
| focused | Boolean |  |  | Управление состоянием фокуса элемента |
| autoFocusFirstItem | Boolean | `false`  |  | Управление автоматическим фокусом на первом элементе при вызове публичного метода focus |
| highlightedItem | [HighlightedItemType](#HighlightedItemType) |  |  | Элемент меню, на котором стоит выделение |
| content | Array.<[ContentType](#ContentType)> |  |  | Список объектов ContentItem |
| checkedItems | Array.<String\|Number> |  |  | Список значений выбранных элементов |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| style | CSSStyleDeclaration |  |  | Объект со стилями |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onItemClick | Function |  |  | Обработчик клика по варианту меню |
| onItemCheck | Function |  |  | Обработчик выбора варианта меню |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на меню |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с меню |
| onKeyDown | Function |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onKeyUp | Function |  |  | Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onFocus | Function |  |  | Обработчик фокуса |
| onBlur | Function |  |  | Обработчик снятия фокуса |
| onHighlightItem | Function |  |  | Обработчик события выделения элемента меню, принимает на вход переменную типа HighlightedItem |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на меню. |
| blur() | Убирает фокус с меню. |





## Типы




### <a id="ContentType"></a>ContentType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| type | [TypeEnum](#TypeEnum) | Тип элемента |
| value | String\|Number | Только для type='item', свойство для компонента [MenuItem](../menu-item/) |
| content | Node\|Array | Содержание элемента |
| props | Object | Только для type='item': свойства для компонента [MenuItem](../menu-item/) |


### <a id="HighlightedItemType"></a>HighlightedItemType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| ref | Number\|String | Уникальный идентификатор |
| item | any | Элемент списка типа ContentItem |







### <a id="ModeEnum"></a>ModeEnum

 * `'basic'`
 * `'check'`
 * `'radio'`
 * `'radio-check'`


### <a id="TypeEnum"></a>TypeEnum

 * `'item'`
 * `'group'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



