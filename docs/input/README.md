# Input

Компонент текстового поля ввода.

```javascript
import Input from 'arui-feather/input';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| type | Type.oneOf(['number', 'card', 'email', 'file', 'hidden', 'money', 'password', 'tel', 'text']) | `'text'`  |  | Тип поля.
Внимание, тип 'number' не умеет работать с масками, в том числе с 'selectionStart' и 'selectionEnd'.
Подробнее: http://w3c.github.io/html/sec-forms.html#does-not-apply |
| width | Type.oneOf(['default', 'available']) |  |  | Управление возможностью компонента занимать всю ширину родителя |
| view | Type.oneOf(['default', 'line']) | `'default'`  |  | Визуальный стиль поля |
| autocomplete | Type.bool |  |  | Управление автозаполнением компонента |
| disabled | Type.bool |  |  | Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления |
| disabledAttr | Type.bool |  |  | Управление возможностью изменения атрибута компонента (без установки класса-модификатора для оформления) |
| focused | Type.bool |  |  | Управление возможностью изменения класса-модификатора компонента |
| maxLength | Type.number |  |  | Максимальное число символов |
| icon | Type.node |  |  | Иконка компонента |
| clear | Type.bool |  |  | Управление наличием крестика, сбрасывающего значение 'value' |
| id | Type.string |  |  | Уникальный идентификатор блока |
| name | Type.string |  |  | Уникальное имя блока |
| value | Type.string |  |  | Содержимое поля ввода, указанное по умолчанию |
| tabIndex | Type.number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| placeholder | Type.string |  |  | Подсказка в текстовом поле |
| mask | Type.string |  |  | Определяет маску для ввода значений. [Шаблон маски](https://github.com/insin/inputmask-core#pattern) |
| maskFormatCharacters | Type.objectOf( Type.shape({ validate: Type.func.isRequired, transform: Type.func }) ) |  |  | Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core` |
| pattern | Type.string |  |  | Стандартное ствойство HTMLInputElement 'pattern'. Может быть использовано для показа корректной клавиатуры на мобильных устройствах. |
| noValidate | Type.bool | `false`  |  | Управление встроенной проверкой данных введённых пользователем в поле на корректность |
| leftAddons | Type.node |  |  | Добавление дополнительных элементов к инпуту слева |
| rightAddons | Type.node |  |  | Добавление дополнительных элементов к инпуту справа |
| error | Type.node |  |  | Отображение попапа с ошибкой в момент когда фокус находится в поле ввода |
| errorDirections | Type.arrayOf(Type.string) | `['right-center', 'right-top', 'right-bottom', 'bottom-left']`  |  | Расположение попапа с ошибкой (в порядке приоритета) относительно точки открытия |
| showErrorPopup | Type.bool | `true`  |  | Управление возможностью отображения попапа с ошибкой |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| title | Type.string |  |  | Тултип, который появляется при наведении |
| onChange | Type.func |  |  | Обработчик изменения значения 'value' |
| onFocus | Type.func |  |  | Обработчик фокуса поля |
| onClick | Type.func |  |  | Обработчик клика по полю |
| onBlur | Type.func |  |  | Обработчик снятия фокуса с поля |
| onClearClick | Type.func |  |  | Обработчик клика по крестику сбрасываещему значение 'value' |
| onKeyDown | Type.func |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onKeyUp | Type.func |  |  | Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onPaste | Type.func |  |  | Обработчик события вставки текста в поле |
| onTouchStart | Type.func |  |  | Обработчик события касания по полю |
| onTouchEnd | Type.func |  |  | Обработчик события прекращения касания по полю |
| onTouchMove | Type.func |  |  | Обработчик события перемещения при касании по полю |
| onTouchCancel | Type.func |  |  | Обработчик события прерывания касания по полю |
| onProcessMaskInputEvent | Type.func |  |  | Обработчик, вызываемый перед началом ввода в маскированное поле |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Убирает фокус с поля ввода. |
| scrollTo() | Скроллит страницу до поля ввода. |
| setSelectionRange(start, end) | Устанавливает начальное и конечное положение выделения текста в элементе. |
| getControl(): React.Component | Возвращает ссылку на инстанс контрола.
Для полей ввода с маской ссылку на объект `MaskedInput`. |









