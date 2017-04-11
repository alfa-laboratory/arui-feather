# MenuItem

Компонент элемента меню. Как правило, используется совместно с `Menu`.

```javascript
import MenuItem from 'arui-feather/menu-item';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| type | Type.oneOf(['link', 'dropdown', 'block']) | `'link'`  |  | Тип элемента меню |
| view | Type.oneOf(['default', 'link', 'pseudo']) |  |  | Тип ссылки, для компонента с type='link' |
| url | Type.string |  |  | href ссылки, для компонента с type='link' |
| target | Type.oneOf(['_self', '_blank', '_parent', '_top']) |  |  | target для ссылки |
| value | Type.oneOfType([ Type.string, Type.number ]) |  |  | Уникальное значение элемента. Для использования в Menu |
| popup | Type.node |  |  | Попап для компонента с type='dropdown' |
| disabled | Type.bool |  |  | Управление возможностью выбирать данный компонент |
| checked | Type.bool |  |  | Управление состоянием выбран/не выбран компонента |
| hidden | Type.bool |  |  | Управление видимостью компонента |
| hovered | Type.bool |  |  | Управление визуальным выделением компонента |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) |  |  | Размер компонента |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `MenuItem` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onClick | Type.func |  |  | Только для type='link', обработчик клика по компоненту |
| onFocus | Type.func |  |  | Обработчик фокуса компонента |
| onBlur | Type.func |  |  | Обработчик снятия фокуса компонента |
| onMouseEnter | Type.func |  |  | Обработчик события наведения курсора на элемент меню |
| onMouseLeave | Type.func |  |  | Обработчик события снятия курсора с элемента меню |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |
| focus() | Устанавливает фокус на элементе меню. |
| blur() | Убирает фокус с элемента меню. |









