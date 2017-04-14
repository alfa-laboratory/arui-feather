# Textarea

Компонент многострочного текстового ввода.

```javascript
import Textarea from 'arui-feather/textarea';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| className | Function\|String |  |  | Дополнительный класс |
| width | [WidthEnum](#WidthEnum) | `'default'`  |  | Управление возможностью компонента занимать всю ширину родителя |
| autocomplete | Boolean | `true`  |  | Управление автозаполнением компонента |
| disabled | Boolean | `false`  |  | Управление возможностью изменения значения компонента |
| autosize | Boolean | `false`  |  | Управление возможностью подстраивать высоту компонента под высоту текста |
| maxLength | Number |  |  | Максимальное число символов |
| id | String |  |  | Уникальный идентификатор блока |
| name | String |  |  | Уникальное имя блока |
| value | String |  |  | Содержимое поля ввода, указанное по умолчанию |
| tabIndex | Number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| placeholder | String |  |  | Подсказка |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| resize | [ResizeEnum](#ResizeEnum) |  |  | Управление возможностью изменения размеров компонента |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| error | Node |  |  | Рисует попап с ошибкой в момент когда фокус находится в поле ввода |
| errorDirections | Array.<String> | `['right-top', 'right-center', 'right-bottom', 'bottom-left']`  |  | Расположение попапа с ошибкой (в порядке приоритета) относительно точки открытия |
| onChange | Function |  |  | Обработчик изменения значения 'value' |
| onFocus | Function |  |  | Обработчик фокуса поля |
| onBlur | Function |  |  | Обработчик снятия фокуса c поля |
| onPaste | Function |  |  | Обработчик события вставки текста в поле |
| onHeightChange | Function |  |  | Обработчик события изменения высоты компонента со значением параметра "autosize" = true |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Снимает фокус с поля ввода. |
| scrollTo() | Скроллит страницу до поля ввода. |





## Типы






### <a id="WidthEnum"></a>WidthEnum

 * `'default'`
 * `'available'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ResizeEnum"></a>ResizeEnum

 * `'both'`
 * `'horizontal'`
 * `'vertical'`
 * `'none'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



