# Button

Компонент кнопки (да, она нажимается!).

```javascript
import Button from 'arui-feather/button';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| text | Type.node |  |  | Текст кнопки |
| icon | Type.node |  |  | Иконка кнопки |
| rightAddons | Type.node |  |  | Список произвольных элементов в левом слоте |
| leftAddons | Type.node |  |  | Список произвольных элементов в правом слоте |
| view | Type.oneOf(['default', 'action', 'extra', 'other']) |  |  | Тип кнопки |
| type | Type.oneOf(['button', 'reset', 'submit']) | `'button'`  |  | Поведение кнопки |
| tag | Type.oneOf(['button', 'span']) | `'button'`  |  | HTML элемент, которым будет компонент в DOM |
| width | Type.oneOf(['default', 'available']) |  |  | Управление шириной кнопки. При значении 'available' растягивает кнопку на ширину родителя |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| disabled | Type.bool |  |  | Управление возможности взаимодействия с компонентом |
| focused | Type.bool |  |  | Отображение кнопки в состоянии фокуса |
| pseudo | Type.bool |  |  | Псевдо представление кнопки |
| id | Type.string |  |  | Идентификатор компонента в DOM |
| name | Type.string |  |  | Имя компонента в DOM |
| title | Type.string |  |  | Текст всплывающей подсказки |
| tabIndex | Type.number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| togglable | Type.oneOf(['check', 'radio']) |  |  | Тип переключателя |
| checked | Type.bool |  |  | Отображение кнопки в отмеченном (зажатом) состоянии |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `Button` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onClick | Type.func |  |  | Обработчик клика по кнопке |
| onFocus | Type.func |  |  | Обработчик фокуса кнопки |
| onBlur | Type.func |  |  | Обработчик снятия фокуса кнопки |
| onMouseEnter | Type.func |  |  | Обработчик события наведения курсора на кнопку |
| onMouseLeave | Type.func |  |  | Обработчик события снятия курсора с кнопки |
| onMouseDown | Type.func |  |  | Обработчик события нажатия кнопки мыши в момент |
| onMouseUp | Type.func |  |  | Обработчик события отжатия кнопки мыши в момент |
| onKeyDown | Type.func |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onKeyUp | Type.func |  |  | Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Убирает фокус с поля ввода. |









