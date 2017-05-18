# Notification

Компонент всплывающего окна.

```javascript
import Notification from 'arui-feather/notification';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| status | Type.oneOf(['error', 'fail', 'ok']) |  |  | Тип компонента |
| visible | Type.bool |  |  | Управление видимостью компонента |
| offset | Type.number | `0`  |  | Отступ от верхнего края |
| stickTo | Type.oneOf(['left', 'right']) | `'left'`  |  | К какому краю прижат попап |
| hasCloser | Type.bool | `true`  |  | Управляет отображением кнопки закрытия уведомления |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `Notification` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| title | Type.node |  |  | Заголовок сообщения |
| icon | Type.node |  |  | Замена стандартной иконки |
| autoCloseDelay | Type.number | `5000`  |  | Время до закрытия компонента |
| outsideClickClosable | Type.bool |  |  | Управление возможностью закрытия компонента по клику вне его |
| onCloseTimeout | Type.func |  |  | Обработчик события истечения времени до закрытия компонента |
| onCloserClick | Type.func |  |  | Обработчик клика по крестику компонента |
| onMouseEnter | Type.func |  |  | Обработчик события наведения курсора на попап |
| onMouseLeave | Type.func |  |  | Обработчик события снятия курсора с попапа |
| onClickOutside | Type.func |  |  | Обработчик клика вне компонента |
| onClick | Type.func |  |  | Обработчик клика по компоненту |











