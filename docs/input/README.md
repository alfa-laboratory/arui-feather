# Input

Компонент текстового поля ввода.

```javascript
import Input from 'arui-feather/input';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| type | [TypeEnum](#TypeEnum) | `'text'`  |  | Тип поля.
Внимание, тип 'number' не умеет работать с масками, в том числе с 'selectionStart' и 'selectionEnd'.
Подробнее: http://w3c.github.io/html/sec-forms.html#does-not-apply |
| width | [WidthEnum](#WidthEnum) |  |  | Управление возможностью компонента занимать всю ширину родителя |
| autocomplete | Boolean |  |  | Управление автозаполнением компонента |
| disabled | Boolean |  |  | Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления |
| disabledAttr | Boolean |  |  | Управление возможностью изменения атрибута компонента (без установки класса-модификатора для оформления) |
| focused | Boolean |  |  | Управление возможностью изменения класса-модификатора компонента |
| maxLength | Number |  |  | Максимальное число символов |
| icon | Node |  |  | Иконка компонента |
| clear | Boolean |  |  | Управление наличием крестика, сбрасывающего значение 'value' |
| id | String |  |  | Уникальный идентификатор блока |
| name | String |  |  | Уникальное имя блока |
| value | String |  |  | Содержимое поля ввода, указанное по умолчанию |
| tabIndex | Number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| mask | String |  |  | Определяет маску для ввода значений. [Шаблон маски](https://github.com/insin/inputmask-core#pattern) |
| maskFormatCharacters | objectOf |  |  | Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core` |
| pattern | String |  |  | Стандартное ствойство HTMLInputElement 'pattern'. Может быть использовано для показа корректной клавиатуры на мобильных устройствах. |
| noValidate | Boolean | `false`  |  | Управление встроенной проверкой данных введённых пользователем в поле на корректность |
| leftAddons | Node |  |  | Добавление дополнительных элементов к инпуту слева |
| rightAddons | Node |  |  | Добавление дополнительных элементов к инпуту справа |
| placeholder | String |  |  | Подсказка в текстовом поле |
| hint | Node |  |  | Подсказка под полем |
| error | Node |  |  | Отображение ошибки |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| title | String |  |  | Тултип, который появляется при наведении |
| onChange | Function |  |  | Обработчик изменения значения 'value' |
| onFocus | Function |  |  | Обработчик фокуса поля |
| onClick | Function |  |  | Обработчик клика по полю |
| onBlur | Function |  |  | Обработчик снятия фокуса с поля |
| onClearClick | Function |  |  | Обработчик клика по крестику сбрасываещему значение 'value' |
| onKeyDown | Function |  |  | Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onKeyUp | Function |  |  | Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте |
| onPaste | Function |  |  | Обработчик события вставки текста в поле |
| onTouchStart | Function |  |  | Обработчик события касания по полю |
| onTouchEnd | Function |  |  | Обработчик события прекращения касания по полю |
| onTouchMove | Function |  |  | Обработчик события перемещения при касании по полю |
| onTouchCancel | Function |  |  | Обработчик события прерывания касания по полю |
| onProcessMaskInputEvent | Function |  |  | Обработчик, вызываемый перед началом ввода в маскированное поле |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |
| getBoxNode(): HTMLSpanElement | Возвращает ссылку на инстанс контейнера для контрола. |
| getControl(): union | Возвращает ссылку на инстанс контрола.
Для полей ввода с маской ссылку на объект `MaskedInput`. |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Убирает фокус с поля ввода. |
| scrollTo() | Скроллит страницу до поля ввода. |
| setSelectionRange(start, end) | Устанавливает начальное и конечное положение выделения текста в элементе. |





## Типы






### <a id="TypeEnum"></a>TypeEnum

 * `'number'`
 * `'card'`
 * `'email'`
 * `'file'`
 * `'hidden'`
 * `'money'`
 * `'password'`
 * `'tel'`
 * `'text'`


### <a id="WidthEnum"></a>WidthEnum

 * `'default'`
 * `'available'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



