# Attach

Компонент прикрепления файлов

```javascript
import Attach from 'arui-feather/attach';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| value | Array |  |  | Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null. |
| name | String |  |  | Уникальное имя блока |
| id | String |  |  | Идентификатор компонента в DOM |
| tabIndex | Number |  |  | Последовательность перехода между контролами при нажатии на Tab |
| noFileText | String | `'Нет файла'`  |  | Текст для случая, когда файл не загружен |
| buttonContent | Node | `'Выберите файл'`  |  | Содержимое кнопки для выбора файла |
| buttonProps | [ButtonPropsType](#ButtonPropsType) | `{}`  |  | Свойства для кнопки |
| accept | String |  |  | Доступные для выбора MIME типы файлов |
| disabled | Boolean | `false`  |  | Управление возможностью изменения значения компонента |
| multiple | Boolean | `false`  |  | Управляет возможностью выбора нескольких файлов |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onClick | Function |  |  | Обработчик клика по компоненту кнопки |
| onChange | Function |  |  | Обработчик изменения значения 'value' |
| onFocus | Function |  |  | Обработчик фокуса компонента |
| onBlur | Function |  |  | Обработчик снятия фокуса компонента |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на кнопку |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с кнопки |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Ставит фокус на контрол. |
| blur() | Убирает фокус с контрола. |





## Типы




### <a id="ButtonPropsType"></a>ButtonPropsType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| text | Node |  |
| icon | Node |  |
| rightAddons | Node |  |
| leftAddons | Node |  |
| view | [ViewEnum](#ViewEnum) |  |
| type | [TypeEnum](#TypeEnum) |  |
| tag | [TagEnum](#TagEnum) |  |
| width | [WidthEnum](#WidthEnum) |  |
| size | [SizeEnum](#SizeEnum) |  |
| disabled | Boolean |  |
| pseudo | Boolean |  |
| id | String |  |
| name | String |  |
| title | String |  |
| tabIndex | Number |  |
| togglable | [TogglableEnum](#TogglableEnum) |  |
| checked | Boolean |  |
| theme | [ThemeEnum](#ThemeEnum) |  |
| className | Function\|String |  |
| onClick | Function |  |
| onFocus | Function |  |
| onBlur | Function |  |
| onMouseEnter | Function |  |
| onMouseLeave | Function |  |
| onMouseDown | Function |  |
| onMouseUp | Function |  |
| onKeyDown | Function |  |
| onKeyUp | Function |  |







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


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



