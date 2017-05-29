# Radio

Компонент радио-кнопки.

```javascript
import Radio from 'arui-feather/radio';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| type | [TypeEnum](#TypeEnum) |  |  | Тип |
| checked | Boolean |  |  | Управление состоянием вкл/выкл компонента |
| disabled | Boolean |  |  | Управление возможностью изменения состояние 'checked' компонента |
| id | String |  |  | Уникальный идентификатор блока |
| name | String |  |  | Уникальное имя блока |
| value | String |  |  | Значение радио-кнопки, которое будет отправлено на сервер, если она выбрана |
| text | Node |  |  | Текст подписи к радио-кнопке |
| width | [WidthEnum](#WidthEnum) |  |  | Управление шириной кнопки для типа 'button'. При значении 'available' растягивает кнопку на ширину родителя |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| error | Boolean |  |  | Отображение в состоянии ошибки |
| tabIndex | Number | `0`  |  | Последовательность перехода между контролами при нажатии на Tab |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onChange | Function |  |  | Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента |
| onFocus | Function |  |  | Обработчик фокуса комнонента |
| onBlur | Function |  |  | Обработчик снятия фокуса с компонента |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на радио-кнопку |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с радио-кнопки |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на радио-кнопку. |
| blur() | Убирает фокус с радио-кнопки. |
| scrollTo() | Скроллит страницу до радио-кнопки. |





## Типы






### <a id="TypeEnum"></a>TypeEnum

 * `'normal'`
 * `'button'`


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



