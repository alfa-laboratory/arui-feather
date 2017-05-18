# Button

Компонент кнопки (да, она нажимается!).

```javascript
import Button from 'arui-feather/button';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| text | Node |  |  | Текст кнопки |
| icon | Node |  |  | Иконка кнопки |
| rightAddons | Node |  |  | Список произвольных элементов в левом слоте |
| leftAddons | Node |  |  | Список произвольных элементов в правом слоте |
| view | [ViewEnum](#ViewEnum) |  |  | Тип кнопки |
| type | [TypeEnum](#TypeEnum) | `'button'`  |  | Поведение кнопки |
| tag | [TagEnum](#TagEnum) | `'button'`  |  | HTML элемент, которым будет компонент в DOM |
| width | [WidthEnum](#WidthEnum) |  |  | Управление шириной кнопки. При значении 'available' растягивает кнопку на ширину родителя |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| disabled | Boolean |  |  | Управление возможности взаимодействия с компонентом |
| focused | Boolean |  |  | Отображение кнопки в состоянии фокуса |
| pseudo | Boolean |  |  | Псевдо представление кнопки |
| id | String |  |  | Идентификатор компонента в DOM |
| name | String |  |  | Имя компонента в DOM |
| title | String |  |  | Текст всплывающей подсказки |
| tabIndex | Number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| togglable | [TogglableEnum](#TogglableEnum) |  |  | Тип переключателя |
| checked | Boolean |  |  | Отображение кнопки в отмеченном (зажатом) состоянии |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Button` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onClick | Function |  |  | Обработчик клика по кнопке |
| onFocus | Function |  |  | Обработчик фокуса кнопки |
| onBlur | Function |  |  | Обработчик снятия фокуса кнопки |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на кнопку |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с кнопки |
| onMouseDown | Function |  |  | Обработчик события нажатия кнопки мыши в момент |
| onMouseUp | Function |  |  | Обработчик события отжатия кнопки мыши в момент |
| onKeyDown | Function |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onKeyUp | Function |  |  | Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Убирает фокус с поля ввода. |





## Типы






### <a id="ViewEnum"></a>ViewEnum

 * `'default'`
 * `'action'`
 * `'extra'`
 * `'other'`


### <a id="TypeEnum"></a>TypeEnum

 * `'button'`
 * `'reset'`
 * `'submit'`


### <a id="TagEnum"></a>TagEnum

 * `'button'`
 * `'span'`


### <a id="WidthEnum"></a>WidthEnum

 * `'default'`
 * `'available'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="TogglableEnum"></a>TogglableEnum

 * `'check'`
 * `'radio'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



