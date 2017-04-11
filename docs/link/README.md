# Link

Компонент ссылки.

```javascript
import Link from 'arui-feather/link';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| icon | Type.node |  |  | Иконка ссылки |
| text | Type.node |  |  | Текст ссылки |
| url | Type.string | `'#'`  |  | href ссылки |
| target | Type.oneOf(['_self', '_blank', '_parent', '_top']) |  |  | target ссылки |
| tabIndex | Type.number | `0`  |  | Последовательность перехода между контролами при нажатии на Tab |
| disabled | Type.bool | `false`  |  | Управление возможностью клика по ссылке |
| checked | Type.bool | `false`  |  | Управление состоянием ссылки выбран/не выбран |
| pseudo | Type.bool | `false`  |  | Псевдо-ссылка (border-bottom: dotted) |
| size | Type.oneOf(['xs', 's', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `Link` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onClick | Type.func |  |  | Обработчик клика но ссылке |
| onFocus | Type.func |  |  | Обработчик фокуса компонента |
| onBlur | Type.func |  |  | Обработчик снятия фокуса компонента |
| onMouseEnter | Type.func |  |  | Обработчик события наведения курсора на ссылку |
| onMouseLeave | Type.func |  |  | Обработчик события снятия курсора с ссылки |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |
| focus() | Ставит фокус на ссылку. |
| blur() | Убирает фокус с ссылки. |









