# Checkbox

Компонент чекбокса.

```javascript
import Checkbox from 'arui-feather/checkbox';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| text | Node |  |  | Текст подписи к чекбоксу |
| id | String |  |  | Идентификатор компонента в DOM |
| name | String |  |  | Имя компонента в DOM |
| title | String |  |  | Текст всплывающей подсказки |
| value | String |  |  | Значение чекбокса, которое будет отправлено на сервер, если он выбран |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| type | [TypeEnum](#TypeEnum) | `'normal'`  |  | Тип чекбокса |
| disabled | Boolean |  |  | Управление возможностью изменять состояние 'checked' компонента |
| checked | Boolean |  |  | Управление состоянием вкл/выкл компонента |
| indeterminate | Boolean |  |  | Управление неопределенным состоянием чекбокса |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onChange | Function |  |  | Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента |
| onFocus | Function |  |  | Обработчик фокуса комнонента |
| onBlur | Function |  |  | Обработчик снятия фокуса компонента |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на чекбокс |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с чекбокса |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на чекбокс. |
| blur() | Убирает фокус с чекбокса. |
| scrollTo() | Скроллит страницу до чекбокса. |





## Типы






### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="TypeEnum"></a>TypeEnum

 * `'normal'`
 * `'button'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



