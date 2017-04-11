# Select

Компонент выпадающего списка.

```javascript
import Select from 'arui-feather/select';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| mode | Type.oneOf(['check', 'radio', 'radio-check']) | `'check'`  |  | Тип выпадающего списка |
| width | Type.oneOf(['default', 'available']) | `'default'`  |  | Управление возможностью компонента занимать всю ширину родителя |
| directions | Type.arrayOf(Type.oneOf([ 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right' ])) | `['bottom-left', 'bottom-right', 'top-left', 'top-right']`  |  | Направления, в которые может открываться попап компонента |
| placeholder | Type.string | `'Выберите:'`  |  | Подсказка, которая отображается в кнопке раскрывающегося списка, в случае, если ни один из пунктов выбран |
| disabled | Type.bool | `false`  |  | Управление возможностью редактирования значения |
| opened | Type.bool |  |  | Управление видимостью выпадающего списка |
| equalPopupWidth | Type.bool | `false`  |  | Ширинa выпадающего списка равна ширине кнопки |
| value | Type.arrayOf(Type.oneOfType([ Type.string, Type.number ])) |  |  | Список выбранных значений |
| options | Type.arrayOf(Type.shape({ /** Тип списка вариантов */ type: Type.oneOf(['item', 'group']), /** Уникальное значение, которое будет отправлено на сервер, если вариант выбран */ value: Type.oneOfType([ Type.string, Type.number ]), /** Текст варианта */ text: Type.node, /** Текст варианта для нативного режима */ nativeText: Type.string, /** Отображение варианта */ description: Type.node, /** Текст, который будет отображаться при выборе */ checkedText: Type.string, /** Иконка варианта */ icon: Type.node, /** Список вариантов, только для type='group' */ content: Type.array })) | `[]`  |  | Список вариантов выбора |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| id | Type.string |  |  | Уникальный идентификатор блока |
| name | Type.string |  |  | Уникальное имя блока |
| error | Type.node |  |  | Содержание попапа с ошибкой |
| errorDirections | Type.arrayOf(Type.oneOf([ 'anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right' ])) | `['right-center', 'right-top', 'right-bottom', 'bottom-left']`  |  | Расположение попапа с ошибкой (в порядке приоритета) относительно точки открытия |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| onFocus | Type.func |  |  | Обработчик фокуса на компоненте |
| onBlur | Type.func |  |  | Обработчик потери фокуса компонентом |
| onButtonFocus | Type.func |  |  | Обработчик фокуса на кнопке |
| onButtonBlur | Type.func |  |  | Обработчик потери у кнопки |
| onMenuFocus | Type.func |  |  | Обработчик фокуса на меню |
| onMenuBlur | Type.func |  |  | Обработчик потери фокуса у меню |
| onClick | Type.func |  |  | Обработчик клика по кнопке компонента |
| onClickOutside | Type.func |  |  | Обработчик клика вне компонента |
| onChange | Type.func |  |  | Обработчик изменения значения |
| onKeyDown | Type.func |  |  | Обработчик нажатия на клавишу |
| renderButtonContent | Type.func |  |  | Кастомный метод рендера содержимого кнопки, принимает на вход: массив элементов типа [CheckedOption](#CheckedOption) |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на компонент. |
| blur() | Убирает фокус с компонента. |
| scrollTo() | Скроллит страницу до компонента. |









