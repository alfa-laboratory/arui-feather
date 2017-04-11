# Textarea

Компонент многострочного текстового ввода.

```javascript
import Textarea from 'arui-feather/textarea';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| width | Type.oneOf(['default', 'available']) | `'default'`  |  | Управление возможностью компонента занимать всю ширину родителя |
| autocomplete | Type.bool | `true`  |  | Управление автозаполнением компонента |
| disabled | Type.bool | `false`  |  | Управление возможностью изменения значения компонента |
| autosize | Type.bool | `false`  |  | Управление возможностью подстраивать высоту компонента под высоту текста |
| maxLength | Type.number |  |  | Максимальное число символов |
| id | Type.string |  |  | Уникальный идентификатор блока |
| name | Type.string |  |  | Уникальное имя блока |
| value | Type.string |  |  | Содержимое поля ввода, указанное по умолчанию |
| tabIndex | Type.number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| placeholder | Type.string |  |  | Подсказка |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| resize | Type.oneOf(['both', 'horizontal', 'vertical', 'none']) |  |  | Управление возможностью изменения размеров компонента |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| error | Type.node |  |  | Рисует попап с ошибкой в момент когда фокус находится в поле ввода |
| errorDirections | Type.arrayOf(Type.string) | `['right-top', 'right-center', 'right-bottom', 'bottom-left']`  |  | Расположение попапа с ошибкой (в порядке приоритета) относительно точки открытия |
| onChange | Type.func |  |  | Обработчик изменения значения 'value' |
| onFocus | Type.func |  |  | Обработчик фокуса поля |
| onBlur | Type.func |  |  | Обработчик снятия фокуса c поля |
| onPaste | Type.func |  |  | Обработчик события вставки текста в поле |
| onHeightChange | Type.func |  |  | Обработчик события изменения высоты компонента со значением параметра "autosize" = true |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Снимает фокус с поля ввода. |
| scrollTo() | Скроллит страницу до поля ввода. |









