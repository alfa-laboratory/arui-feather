# Checkbox

Компонент чекбокса.

```javascript
import Checkbox from 'arui-feather/checkbox';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| text | Type.node |  |  | Текст подписи к чекбоксу |
| id | Type.string |  |  | Идентификатор компонента в DOM |
| name | Type.string |  |  | Имя компонента в DOM |
| title | Type.string |  |  | Текст всплывающей подсказки |
| value | Type.string |  |  | Значение чекбокса, которое будет отправлено на сервер, если он выбран |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| type | Type.oneOf(['normal', 'button']) | `'normal'`  |  | Тип чекбокса |
| disabled | Type.bool |  |  | Управление возможностью изменять состояние 'checked' компонента |
| checked | Type.bool |  |  | Управление состоянием вкл/выкл компонента |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onChange | Type.func |  |  | Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента |
| onFocus | Type.func |  |  | Обработчик фокуса комнонента |
| onBlur | Type.func |  |  | Обработчик снятия фокуса компонента |
| onMouseEnter | Type.func |  |  | Обработчик события наведения курсора на чекбокс |
| onMouseLeave | Type.func |  |  | Обработчик события снятия курсора с чекбокса |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на чекбокс. |
| blur() | Убирает фокус с чекбокса. |
| scrollTo() | Скроллит страницу до чекбокса. |









