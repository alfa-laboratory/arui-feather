# Attach

Компонент прикрепления файлов

```javascript
import Attach from 'arui-feather/attach';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| value | Type.array |  |  | Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null. |
| name | Type.string |  |  | Уникальное имя блока |
| id | Type.string |  |  | Идентификатор компонента в DOM |
| tabIndex | Type.number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| noFileText | Type.string | `'Нет файла'`  |  | Текст для случая, когда файл не загружен |
| buttonContent | Type.node | `'Выберите файл'`  |  | Содержимое кнопки для выбора файла |
| buttonProps | Type.shape({ text: Type.node, icon: Type.node, rightAddons: Type.node, leftAddons: Type.node, view: Type.oneOf(['default', 'action', 'extra', 'other']), type: Type.oneOf(['button', 'reset', 'submit']), tag: Type.oneOf(['button', 'span']), width: Type.oneOf(['default', 'available']), size: Type.oneOf(['s', 'm', 'l', 'xl']), disabled: Type.bool, pseudo: Type.bool, id: Type.string, name: Type.string, title: Type.string, tabIndex: Type.number, togglable: Type.oneOf(['check', 'radio']), checked: Type.bool, theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']), className: Type.oneOfType([Type.func, Type.string]), onClick: Type.func, onFocus: Type.func, onBlur: Type.func, onMouseEnter: Type.func, onMouseLeave: Type.func, onMouseDown: Type.func, onMouseUp: Type.func, onKeyDown: Type.func, onKeyUp: Type.func }) | `{}`  |  | Свойства для кнопки |
| disabled | Type.bool | `false`  |  | Управление возможностью изменения значения компонента |
| multiple | Type.bool | `false`  |  | Управляет возможностью выбора нескольких файлов |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onClick | Type.func |  |  | Обработчик клика по компоненту кнопки |
| onChange | Type.func |  |  | Обработчик изменения значения 'value' |
| onFocus | Type.func |  |  | Обработчик фокуса компонента |
| onBlur | Type.func |  |  | Обработчик снятия фокуса компонента |
| onMouseEnter | Type.func |  |  | Обработчик события наведения курсора на кнопку |
| onMouseLeave | Type.func |  |  | Обработчик события снятия курсора с кнопки |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Ставит фокус на контрол. |
| blur() | Убирает фокус с контрола. |









