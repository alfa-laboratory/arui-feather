# Menu

Компонент меню.

```javascript
import Menu from 'arui-feather/menu';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| view | Type.string |  |  | Тип расположения меню: 'horizontal' |
| mode | Type.oneOf(['basic', 'check', 'radio', 'radio-check']) | `'basic'`  |  | Тип списка вариантов меню |
| disabled | Type.bool |  |  | Управление возможностью изменения значения |
| focused | Type.bool |  |  | Управление состоянием фокуса элемента |
| autoFocusFirstItem | Type.bool | `false`  |  | Управление автоматическим фокусом на первом элементе при вызове публичного метода focus |
| highlightedItem | Type.shape({ /** Уникальный идентификатор */ ref: Type.oneOfType([Type.number, Type.string]), /** Элемент списка типа ContentItem */ item: Type.any }) |  |  | Элемент меню, на котором стоит выделение |
| content | Type.arrayOf(Type.shape({ /** Тип элемента */ type: Type.oneOf(['item', 'group']), /** Только для type='item', свойство для компонента [MenuItem](../menu-item/) */ value: Type.oneOfType([Type.string, Type.number]), /** Содержание элемента */ content: Type.oneOfType([Type.node, Type.array]), /** Только для type='item': свойства для компонента [MenuItem](../menu-item/) */ props: Type.object })) |  |  | Список объектов ContentItem |
| checkedItems | Type.arrayOf(Type.oneOfType([ Type.string, Type.number ])) |  |  | Список значений выбранных элементов |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| style | CSSStyleDeclaration |  |  | Объект со стилями |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onItemClick | Type.func |  |  | Обработчик клика по варианту меню |
| onItemCheck | Type.func |  |  | Обработчик выбора варианта меню |
| onMouseEnter | Type.func |  |  | Обработчик события наведения курсора на меню |
| onMouseLeave | Type.func |  |  | Обработчик события снятия курсора с меню |
| onKeyDown | Type.func |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onKeyUp | Type.func |  |  | Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onFocus | Type.func |  |  | Обработчик фокуса |
| onBlur | Type.func |  |  | Обработчик снятия фокуса |
| onHighlightItem | Type.func |  |  | Обработчик события выделения элемента меню, принимает на вход переменную типа HighlightedItem |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на меню. |
| blur() | Убирает фокус с меню. |









